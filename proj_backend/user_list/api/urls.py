from django.urls import path
from .views import get_user_list,get_current_user_details,update_profile,get_user_list_relation

app_name="userlist"

urlpatterns=[
    # path("all_users/",get_user_list,name="user_list"),
    path("get_user_details/",get_current_user_details,name="user_details"),#for profile page data
    path("update_profile/",update_profile,name="update_profile"),
    path("user_relation_list/",get_user_list_relation,name="userRelation"),#for userlist page
]