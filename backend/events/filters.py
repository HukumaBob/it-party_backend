import django_filters
from events.models import Event
from users.models import Specialization
from additions.models import City


class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')  # фильтрация по части названия
    date = django_filters.DateFromToRangeFilter()  # фильтрация по диапазону дат
    specializations = django_filters.ModelMultipleChoiceFilter(
        field_name='specializations__specialization',
        to_field_name='specialization',
        queryset=Specialization.objects.all(),
        conjoined=False,  # измените на False, если хотите использовать OR вместо AND
    )
    city = django_filters.ModelChoiceFilter(queryset=City.objects.all())  # фильтрация по городу
 

    class Meta:
        model = Event
        fields = ['name', 'date', 'specializations', 'city']
