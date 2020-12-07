from django.urls import path
from .views import get_user_list,get_current_user_details

app_name="userlist"

urlpatterns=[
    path("all_users/",get_user_list,name="user_list"),
    path("get_room_id/",get_current_user_details,name="user_id"),
]