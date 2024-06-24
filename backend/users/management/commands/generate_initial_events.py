from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
from faker import Faker
from events.models import Event, Speaker, Specialization
from additions.models import City
import random

fake = Faker()


class Command(BaseCommand):
    help = 'Generate test events'

    def handle(self, *args, **options):
        for _ in range(50):
            # Generate an event
            event = Event.objects.create(
                logo=self.create_image_file(),
                name=fake.sentence(),
                date=fake.date_between(start_date='-1y', end_date='+1y'),
                time=fake.time(),
                city=City.objects.order_by('?').first(),
                address=fake.address(),
                description=fake.text(),
                gallery=self.create_image_file(),
                online=fake.boolean()
            )

            # Generate 1-4 specializations and attach them to the event
            specializations = Specialization.objects.order_by('?')[:random.randint(1, 4)]
            event.specializations.set(specializations)

            # Generate 4-5 speakers and attach them to the event
            for _ in range(random.randint(4, 5)):
                speaker = Speaker.objects.create(
                    foto=self.create_image_file(),
                    name=fake.name(),
                    info=fake.text()
                )
                speaker.specializations.set([random.choice(specializations)])  # Используйте set() для специализаций
                event.speakers.add(speaker)

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created event "{event.name}"'
                    )
                )

    def create_image_file(self):
        # Generate a random color
        color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

        # Create a new image with PIL
        image = Image.new('RGB', (50, 50), color=color)

        # Save the image to a BytesIO object
        image_io = BytesIO()
        image.save(image_io, format='JPEG')

        # Create a Django ContentFile from the BytesIO object
        image_content_file = ContentFile(image_io.getvalue(), 'example.jpg')

        return image_content_file
