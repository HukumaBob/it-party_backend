import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatMessage, User, Event

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, user_id, event_id, message):
        user = User.objects.get(id=user_id)
        event = Event.objects.get(id=event_id)
        ChatMessage.objects.create(user=user, event=event, message=message)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        event_id = text_data_json['event_id']   
        user_id = text_data_json['user_id']    
        # Получаем текущего пользователя, когда настроим аутентификацию
        # user = self.scope["user"]
        # Сохраняем сообщение в базе данных
        await self.save_message(user_id, event_id, message)        

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
