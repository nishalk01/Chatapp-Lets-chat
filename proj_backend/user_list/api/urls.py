from django.urls import path
from .views import get_user_list

app_name="userlist"

urlpatterns=[
    path("all_users/",get_user_list,name="user_list"),
]