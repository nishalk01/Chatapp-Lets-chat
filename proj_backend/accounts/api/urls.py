from django.urls import path
from accounts.api.views import registration_view,VerifyEmail

# app_name="account"

urlpatterns=[
    path('register',registration_view,name="register"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
]