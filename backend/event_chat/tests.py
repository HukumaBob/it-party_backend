import asyncio
import json
from channels.testing import WebsocketCommunicator
from .consumers import ChatConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        re_path(r"^ws/chat/(?P<room_name>\w+)/$", ChatConsumer.as_asgi()),
    ])
})

async def test_websocket_communication():
    # Создайте экземпляр WebsocketCommunicator с вашим consumer и URL
    communicator = WebsocketCommunicator(application, "/ws/chat/myroom/")

    # Подключитесь к веб-сокету
    connected, subprotocol = await communicator.connect()
    assert connected

    # Отправьте сообщение через веб-сокет
    await communicator.send_to(text_data=json.dumps({"message": "hello", "user_id": 1, "event_id": 1}))

    # Получите ответ от веб-сокета
    response = await communicator.receive_from()
    assert json.loads(response) == {"message": "hello"}

    # Закройте соединение
    await communicator.disconnect()

# Запустите тестовую функцию
asyncio.run(test_websocket_communication())
