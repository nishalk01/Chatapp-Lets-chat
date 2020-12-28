from django.urls import path
from .views import get_current_user_details,update_profile,get_user_list_relation,remove_profile,change_status

app_name="userlist"

urlpatterns=[
    # path("all_users/",get_user_list,name="user_list"),
    path("get_user_details/",get_current_user_details,name="user_details"),#for profile page data
    path("update_profile/",update_profile,name="update_profile"),
    path("user_relation_list/",get_user_list_relation,name="userRelation"),#for userlist page
    path("remove_profile_pic/",remove_profile,name="delete_profile_pic"),
    path("change_status/",change_status,name="change_status"),
]
