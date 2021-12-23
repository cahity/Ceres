from django.contrib import admin
from .models import *
# Register your models here.

class CeresOpAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'id')

#class UserAdmin(admin.ModelAdmin):
#    list_display = ('name', 'id')

class EnvironmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'owner', 'id')

admin.site.register(CeresOp, CeresOpAdmin)
#admin.site.register(User, UserAdmin)
admin.site.register(Environment, EnvironmentAdmin)
