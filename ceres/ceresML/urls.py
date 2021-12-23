from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^api/signup$', views.SignUpUser),
    url(r'^api/signin$', views.SignInUser),
    url(r'^api/signout$', views.SignOutUser),
    url(r'^api/environments$', views.UserEnvironments),
    url(r'^api/environments/(?P<eid>[0-9]+)$', views.UserEnvironmentDetail),
    url(r'^api/environments/(?P<eid>[0-9]+)/ops$', views.UserEnvironmentOPs),
    url(r'^api/environments/(?P<eid>[0-9]+)/ops/(?P<oid>[0-9]+)$', views.UserEnvironmentOPDetails),
    url(r'^api/environments/(?P<eid>[0-9]+)/run$', views.RunEnvironment),
    url(r'^api/datasetUpload$', views.UserUploadDataset),
    url(r'^api/datasets$', views.UserDatasets),
    url(r'^api/publicenvironments$', views.PublicEnvironments),
    url(r'^api/publicenvironments/(?P<eid>[0-9]+)$', views.PublicEnvironmentDetail),
    url(r'^api/publicenvironments/(?P<eid>[0-9]+)/ops$', views.PublicEnvironmentOPs),
    url(r'^api/publicenvironments/(?P<eid>[0-9]+)/fork$', views.PublicEnvironmentFork),
    url(r'^api/starenvironment$', views.StarEnvironment),
    url(r'^api/starredenvironments$', views.UserStarredEnvironments),
    url(r'^api/updateoplink/(?P<eid>[0-9]+)$', views.UpdateOpLink),
    url(r'^api/authtoken$', obtain_auth_token)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
