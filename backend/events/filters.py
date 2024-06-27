import django_filters
from django.db.models import Exists, OuterRef
from events.models import Event
from users.models import Specialization
from additions.models import City


class EventApplicationStatusFilter(django_filters.Filter):
    def filter(self, queryset, value):
        if value == 'true':
            # Получить только ивенты, у которых application_status не равен 'not_applied'
            return queryset.exclude(user_event__application_status='not_applied')
        elif value == 'false':
            # Получить только ивенты, у которых application_status равен 'not_applied'
            return queryset.filter(user_event__application_status='not_applied')
        return queryset

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
    event_id = django_filters.ModelMultipleChoiceFilter(
        field_name='id',
        to_field_name='id',
        queryset=Event.objects.all(),
        conjoined=False,
    )# фильтрация по ID ивента
    # Добавляем фильтр для application_status
    applied = django_filters.BooleanFilter(method='filter_by_application_status')

    def filter_by_application_status(self, queryset, name, value):
        if value:
            # Получаем события, у которых есть связанный userevent
            return queryset.filter(
                Exists(Event.objects.filter(id=OuterRef('id'), userevent__isnull=False))
            )
        else:
            # Получаем события, у которых нет связанного userevent
            return queryset.exclude(
                Exists(Event.objects.filter(id=OuterRef('id'), userevent__isnull=False))
            )
 

    class Meta:
        model = Event
        fields = [
            'event_id', 'name', 'date', 'specializations', 'city', 'online', 'offline', 'applied'
            ]
