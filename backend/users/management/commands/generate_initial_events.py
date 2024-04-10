# management/commands/generate_events.py
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
from faker import Faker
from events.models import Event, Speaker
import random

fake = Faker()


class Command(BaseCommand):
    help = 'Generate test events'

    def handle(self, *args, **options):
        for _ in range(100):
            # Generate an event
            event = Event.objects.create(
                logo=self.create_image_file(),
                name=fake.sentence(),
                data=fake.date_between(start_date='-1y', end_date='+1y'),
                time=fake.time(),
                position=fake.address(),
                description=fake.text(),
                gallery=self.create_image_file(),
                online=fake.boolean()
            )

            # Generate 4-5 speakers and attach them to the event
            for _ in range(random.randint(4, 5)):
                speaker = Speaker.objects.create(
                    foto=self.create_image_file(),
                    name=fake.name(),
                    specialization=fake.job(),
                    info=fake.text()
                )
                event.speakers.add(speaker)

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created event "{event.name}"'
                    )
                )

    def create_image_file(self):
        # Create a new image with PIL
        image = Image.new('RGB', (50, 50))

        # Save the image to a BytesIO object
        image_io = BytesIO()
        image.save(image_io, format='JPEG')

        # Create a Django ContentFile from the BytesIO object
        image_content_file = ContentFile(image_io.getvalue(), 'example.jpg')

        return image_content_file
