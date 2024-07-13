import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# Техдолг - пока передаем юзера в виде индекса, JWT не настроен
# from django_channels_jwt.middleware import JwtAuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import event_chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django_asgi_app = get_asgi_application()
from event_chat.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        ),    
})
