from django.urls import include, path
from rest_framework import routers

# from .views import ProfileViewSet

app_name = 'users'

router_v1 = routers.DefaultRouter()

# router_v1.register('profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router_v1.urls)),
    path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]
