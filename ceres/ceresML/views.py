from rest_framework import viewsets
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from .we_creator import *
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.db.models import Q
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
import ceresML.file_handler
import os
import uuid
import json

# Checks whether User with given id exist
# @returns is_error, User or Error
# if exists returns False, User
# if not exists returns True, Error
#def CheckUser(id):
#    try:
#        return False, User.objects.get(pk = id)
#    except User.DoesNotExist:
#        return True, JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Checks whether User with given id exist and Environment with given id exist
# @returns is_error, User or Error, Environment or None
# if user exists and environment exists returns False, User, Environment
# if user exists and environment not exists returns True, Error, None
# if user does not exists returns True, Error, None
#def CheckUserAndEnvironment(uid, eid):
#    err, owner = CheckUser(uid)
#    if err:
#        return True, owner, None
#    try:
#        return False, owner, Environment.objects.filter(owner = uid).get(pk = eid)
#    except Environment.DoesNotExist:
#        return True, JsonResponse({'message': 'The environment does not exist'}, status=status.HTTP_404_NOT_FOUND), None

# Checks whether User with given id exist and Environment with given id exist and CeresOp with given id exists
# @returns is_error, User or Error, Environment or None, CeresOp or None
# if user exists and environment exists and CeresOp exists returns False, User, Environment, CeresOp
# if user exists and environment exists and CeresOp not exists returns True, Error, None, None
# if user exists and environment not exists returns True, Error, None, None
# if user does not exists returns True, Error, None, None
#def CheckUserAndEnvironmentAndOP(uid, eid, oid):
#    err, owner, env = CheckUserAndEnvironment(uid, eid)
#    if err:
#        return True, owner, None, None
#    try:
#        return False, owner, env, CeresOp.objects.filter(we = eid).get(pk = oid)
#    except CeresOp.DoesNotExist:
#        return True, JsonResponse({'message': 'The op does not exist'}, status=status.HTTP_404_NOT_FOUND), None, None

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def SignUpUser(request):
    if request.method == 'POST':
        sign_data = JSONParser().parse(request)
        username = sign_data['username']
        password = sign_data['password']
        email = sign_data['email']
        if User.objects.filter(username = username).exists():
            return JsonResponse({'message': 'Username taken'}, status=status.HTTP_400_BAD_REQUEST)
        User.objects.create_user(username, email = email, password = password)
        user = authenticate(username = username, password = password)
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key}, status=status.HTTP_201_CREATED)
    return JsonResponse({'message': 'uwu error uwu'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def SignInUser(request):
    if request.method == 'POST':
        sign_data = JSONParser().parse(request)
        username = sign_data['username']
        password = sign_data['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': token.key, 'user_id': user.id}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message': 'Invalid login'}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'message': 'uwu error uwu'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def SignOutUser(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'DELETE'])
def UserEnvironments(request):
    # check for errors
    #err, owner = CheckUser(uid)
    #if err:
    #   return owner
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    if request.method == 'GET':
        envs = Environment.objects.filter(owner = request.user.id)
        env_serializer = EnvironmentSerializer(envs, many = True)
        return JsonResponse(env_serializer.data, safe = False)
    elif request.method == 'POST':
        env_data = JSONParser().parse(request)
        env_data['owner'] = request.user.id
        env_serializer = EnvironmentSerializer(data=env_data)
        if env_serializer.is_valid():
            env_serializer.save()
            return JsonResponse(env_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(env_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        envs = Environment.objects.filter(owner = request.user.id)
        envs.delete()
        return JsonResponse({'message': 'Environments deleted'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PATCH', 'DELETE'])
def UserEnvironmentDetail(request, eid):
    # check for errors
    #err, owner, env = CheckUserAndEnvironment(uid, eid)
    #if err:
    #    return owner
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    env = Environment.objects.filter(owner = request.user.id).get(pk = eid)
    if request.method == 'GET':
        env_serializer = EnvironmentSerializer(env)
        return JsonResponse(env_serializer.data)
    elif request.method == 'PATCH':
        env_data = JSONParser().parse(request)
        env_serializer = EnvironmentSerializer(env, data=env_data, partial=True)
        if env_serializer.is_valid():
            env_serializer.save()
            return JsonResponse(env_serializer.data)
        return JsonResponse(env_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        env.delete()
        return JsonResponse({'message': 'Environment deleted'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def UserEnvironmentOPs(request, eid):
    # check for errors
    #err, owner, env = CheckUserAndEnvironment(uid, eid)
    #if err:
    #    return owner
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    if request.method == 'GET':
        ops = CeresOp.objects.filter(we = eid)
        ops_serializer = CeresOpPolymorphicSerializer(ops, many = True)
        return JsonResponse(ops_serializer.data, safe=False)
    elif request.method == 'POST':
        op_data = JSONParser().parse(request)
        op_data['we'] = eid
        op_serializer = CeresOpPolymorphicSerializer(data=op_data)
        if op_serializer.is_valid():
            op_serializer.save()
            return JsonResponse(op_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(op_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def UserEnvironmentOPDetails(request, eid, oid):
    # check for errors
    #err, owner, env, op = CheckUserAndEnvironmentAndOP(uid, eid, oid)
    #if err:
    #    return owner
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    op = CeresOp.objects.filter(we = eid).get(pk = oid)
    if request.method == 'GET':
        op_serializer = CeresOpPolymorphicSerializer(op)
        return JsonResponse(op_serializer.data)
    elif request.method == 'PATCH':
        op_data = JSONParser().parse(request)
        op_serializer = CeresOpPolymorphicSerializer(op, data=op_data, partial=True)
        if op_serializer.is_valid():
            op_serializer.save()
            return JsonResponse(op_serializer.data)
        return JsonResponse(op_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        # this is ugly
        linked = CeresOp.objects.filter(Q(DataModifyOp___data_object_op = oid) | 
        Q(DataVisualizeOp___data_object_op = oid) | Q(ModelCreateOp___associated_data_op = oid) |
        Q(ModelTrainOp___model_object_op = oid) | Q(ModelVisualizeOp___model_object_op = oid))

        for l in linked:
            l.set_input_op(-1)

        op.delete()
        return JsonResponse({'message': 'CeresOp deleted'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def UpdateOpLink(request, eid):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        method = body['method']
        out_op_id = body['out_op']
        in_op_id = body['in_op']
        out_op = 0
        in_op = 0
        try:
            out_op = CeresOp.objects.get(pk = out_op_id)
        except CeresOp.DoesNotExist:
            return JsonResponse({'message': 'Out op does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            in_op = CeresOp.objects.get(pk = in_op_id)
        except CeresOp.DoesNotExist:
            return JsonResponse({'message': 'In op does not exist'}, status=status.HTTP_400_BAD_REQUEST)        

        res = 'Invalid method. Supported methods \'add\' or \'delete\''
        if method == 'add':
            res = in_op.set_input_op(out_op_id)
        elif method == 'delete':
            res = in_op.set_input_op(-1)            
        return JsonResponse({'message': res}, status=status.HTTP_200_OK)


@api_view(['POST'])
def RunEnvironment(request, eid):
    # check for errors
    #err, owner, env = CheckUserAndEnvironment(uid, eid)
    #if err:
    #    return owner
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # extract the ran op
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    oid = body['op_id']
    op = CeresOp.objects.filter(pk = oid).get()
    suc, cont = run_we(op, request.user.id, eid)
    if cont is not None:
        return JsonResponse({'path': os.path.join(request.get_host(),cont)})
    return JsonResponse({'message': suc}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def UserUploadDataset(request):
    # check for errors
    #err, user = CheckUser(uid)
    #if err:
    #    return user
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    if request.method == 'POST':
        for filename, file in request.FILES.items():
            name = request.FILES[filename].name
            # handle_file(request.FILES[filename], name, request.user.id)
            ceresML.file_handler.save_dataset(request.FILES[filename], name, request.user.id)
            dataset = Dataset(name = name, owner = request.user)
            dataset.save()
        return JsonResponse({'message': 'Files uploaded'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def UserDatasets(request):
    # check for errors
    #err, user = CheckUser(uid)
    #if err:
    #    return user
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    # handle request
    if request.method == 'GET':
        datasets = Dataset.objects.filter(owner = request.user.id)
        dataset_serializer = DatasetSerializer(datasets, many = True)
        return JsonResponse(dataset_serializer.data, safe = False)

@api_view(['GET'])
def PublicEnvironments(request):
    # handle request
    if request.method == 'GET':
        envs = Environment.objects.filter(public = True)
        env_serializer = EnvironmentSerializer(envs, many = True)
        return JsonResponse(env_serializer.data, safe = False)

@api_view(['GET'])
def PublicEnvironmentDetail(request, eid):
    # handle request
    if request.method == 'GET':
        try:
            env = Environment.objects.get(pk = eid)
            if env.public:
                env_serializer = EnvironmentSerializer(env)        
                return JsonResponse(env_serializer.data, safe = False)
            else:
                return JsonResponse({'message': 'The environment is not public'}, status=status.HTTP_404_NOT_FOUND)
        except Environment.DoesNotExist:
            return JsonResponse({'message': 'The environment does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def PublicEnvironmentOPs(request, eid):
    # handle request
    if request.method == 'GET':
        env = None
        try:
            env = Environment.objects.get(pk = eid)
        except Environment.DoesNotExist:
            return JsonResponse({'message': 'The environment does not exist'}, status=status.HTTP_404_NOT_FOUND)            
        if not env.public:
            return JsonResponse({'message': 'The environment is not public'}, status=status.HTTP_404_NOT_FOUND)
        ops = CeresOp.objects.filter(we = eid)
        ops_serializer = CeresOpPolymorphicSerializer(ops, many = True)
        return JsonResponse(ops_serializer.data, safe=False)

@api_view(['GET'])
def PublicEnvironmentFork(request, eid):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        env = None
        try:
            env = Environment.objects.get(pk = eid)
        except Environment.DoesNotExist:
            return JsonResponse({'message': 'The environment does not exist'}, status=status.HTTP_404_NOT_FOUND)            
        if not env.public:
            return JsonResponse({'message': 'The environment is not public'}, status=status.HTTP_404_NOT_FOUND)
        # copy env and set owner to new user
        env.pk = None
        env.owner = request.user
        env._state.adding = True
        env.save()
        # copy ops in environment and set we to new we         
        ops = CeresOp.objects.filter(we = eid)
        for op in ops:
            # normally id can be automatically generated by django when set to None
            # however i think there is a bug with polymorphic models which results in no id change
            # so i manually assign new unique ids
            uid = uuid.uuid4().int % 9223372036854775807 # just shortening the uuid for sqlite integer (sinful i know)
            op.pk = uid
            op.id = uid
            op.we = env
            op._state.adding = True
            op.save()
        return JsonResponse({'message': 'Environment forked'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def StarEnvironment(request):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        method = body['method']
        eid = body['eid']
        env = None
        try:
            env = Environment.objects.get(pk = eid)
        except Environment.DoesNotExist:
            return JsonResponse({'message': 'The environment does not exist'}, status=status.HTTP_404_NOT_FOUND)            
        if not env.public:
            return JsonResponse({'message': 'The environment is not public'}, status=status.HTTP_404_NOT_FOUND)
        stars = Star.objects.filter(eid=eid, uid=request.user.id)
        star = None
        if len(stars) != 0:
            star = stars[0]       
        if star is None and method == 'star':
            star = Star()
            star.eid = env
            star.uid = request.user
            star.save()
            env.star_count += 1
            env.save()
        elif star is not None and method == 'unstar':
            star.delete()
            env.star_count -= 1
            env.save()
        else:
            return JsonResponse({'message': method + ' can not be done.'}, status=status.HTTP_200_OK)            
        return JsonResponse({'message': method + ' done.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def UserStarredEnvironments(request):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        stars = Star.objects.filter(uid = request.user.id)
        envs = []
        for star in stars:
            eid = star.eid.id
            env = Environment.objects.get(pk=eid)
            envs.append(env)
        env_serializer = EnvironmentSerializer(envs, many = True)
        return JsonResponse(env_serializer.data, safe = False)
