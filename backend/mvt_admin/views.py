from django.contrib import messages
from django.db.models import Count, Case, When, IntegerField
from django.shortcuts import get_object_or_404, render, redirect
from additions.models import City
from events.models import Event, Speaker, FormTemplate
from userevents.models import UserEvent
from users.models import Specialization
from .forms import (
    EventForm, SpeakerForm,
    SpecializationForm, FormTemplateForm
)

# Ивенты
def event_list(request):
    events = Event.objects.annotate(
        none_count=Count(Case(When(userevent__application_status='none', then=1), output_field=IntegerField())),
        pending_count=Count(Case(When(userevent__application_status='pending', then=1), output_field=IntegerField())),
        approved_count=Count(Case(When(userevent__application_status='approved', then=1), output_field=IntegerField())),
        rejected_count=Count(Case(When(userevent__application_status='rejected', then=1), output_field=IntegerField())),
    )
    return render(request, 'events/event_list.html', {'events': events})

def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    event_statuses = UserEvent.objects.filter(event=event)
    return render(request, 'events/event_detail.html', {'event': event, 'event_statuses': event_statuses})

def event_create(request, event_id=None):
    if event_id:
        event = get_object_or_404(Event, id=event_id)
        form = EventForm(instance=event)
        title = 'Редактировать событие'
        button = 'Изменить'
    else:
        event = None
        form = EventForm()
        title = 'Создать событие'
        button = 'Создать'

    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES, instance=event)
        if form.is_valid():
            event = form.save(commit=False)
            event.save()  # Сначала сохраняем событие
            # Добавляем спикеров и специализации к событию
            event.speakers.set(form.cleaned_data['speakers'])
            event.specializations.set(form.cleaned_data['specializations'])
            event.save()  # Затем сохраняем событие с добавленными спикерами и специализациями
            messages.success(request, 'Событие успешно сохранено!')
            return redirect('mvt_admin:event_list')
        else:
            messages.error(request, 'Форма недействительна. Пожалуйста, проверьте введенные данные.')

    return render(request, 'events/event_create.html', {'form': form, 'title': title, 'button': button})

# Спикеры
def speaker_list(request):
    speakers = Speaker.objects.all()
    return render(request, 'events/speaker_list.html', {'speakers': speakers})

def speaker_detail(request, pk):
    speaker = get_object_or_404(Speaker, pk=pk)
    return render(request, 'events/speaker_detail.html', {'speaker': speaker})

def speaker_create(request):
    if request.method == 'POST':
        form = SpeakerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Спикер успешно создан!')
            return redirect('mvt_admin:speaker_list')
    else:
        form = SpeakerForm()
    return render(request, 'events/speaker_form.html', {'form': form})

def speaker_update(request, pk):
    speaker = get_object_or_404(Speaker, pk=pk)
    if request.method == 'POST':
        form = SpeakerForm(request.POST, instance=speaker)
        if form.is_valid():
            form.save()
            return redirect('mvt_admin:speaker_list')
    else:
        form = SpeakerForm(instance=speaker)
    return render(request, 'events/speaker_form.html', {'form': form})

def speaker_delete(request, pk):
    speaker = get_object_or_404(Speaker, pk=pk)
    if request.method == 'POST':
        speaker.delete()
        return redirect('mvt_admin:speaker_list')
    return render(request, 'events/speaker_confirm_delete.html', {'speaker': speaker})