from django.urls import include, path, reverse_lazy
from rest_framework import routers
from .views import (
    ActivateAccountView,
    CustomPasswordResetConfirmView,
    UserProfileViewSet,
    SpecializationViewSet,
    StackViewSet,
    ExperienceViewSet,
    SuccessView,
    )


app_name = 'users'

router_v1 = routers.DefaultRouter()

router_v1.register(
    r'userprofiles', UserProfileViewSet, basename='profile'
    )
router_v1.register(
    r'specialization', SpecializationViewSet, basename='specialization'
    )
router_v1.register(
    r'stack', StackViewSet, basename='stack'
    )
router_v1.register(
    r'experience', ExperienceViewSet, basename='experience'
    )

urlpatterns = [
    path('', include(router_v1.urls)),
    path(
        'activate/<uidb64>/<token>/',
        ActivateAccountView.as_view(),
        name='activate'
        ),
    path(
        'password/reset/confirm/<uidb64>/<token>/',
        CustomPasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
        ),
    path('success/', SuccessView.as_view(), name='success'),        
]
