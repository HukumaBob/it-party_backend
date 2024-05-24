import django_filters
from events.models import Event
from users.models import Specialization
from additions.models import City


class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')  # фильтрация по части названия
    date = django_filters.DateFromToRangeFilter()  # фильтрация по диапазону дат
    specializations = django_filters.ModelMultipleChoiceFilter(
        field_name='specializations__id',
        to_field_name='id',
        queryset=Specialization.objects.all(),
        conjoined=False,  # измените на False, если хотите использовать OR вместо AND
    )
    city = django_filters.ModelChoiceFilter(queryset=City.objects.all())  # фильтрация по городу
    online = django_filters.BooleanFilter()  # фильтрация по полю online
    offline = django_filters.BooleanFilter()  # фильтрация по полю offline
 

    class Meta:
        model = Event
        fields = ['name', 'date', 'specializations', 'city', 'online', 'offline']
