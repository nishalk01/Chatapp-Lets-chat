from django.urls import path
from .views import get_user_list,get_current_user_details,update_profile

app_name="userlist"

urlpatterns=[
    path("all_users/",get_user_list,name="user_list"),
    path("get_user_details/",get_current_user_details,name="user_details"),
    path("update_profile/",update_profile,name="update_profile"),
]