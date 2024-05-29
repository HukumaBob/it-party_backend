from django.contrib import messages
from django.shortcuts import get_object_or_404, render, redirect
from additions.models import City
from events.models import Event, Speaker, FormTemplate
from users.models import Specialization
from .forms import (
    EventForm, SpeakerForm,
    SpecializationForm, FormTemplateForm
)

# Ивенты
def event_list(request):
    events = Event.objects.all()
    return render(request, 'events/event_list.html', {'events': events})

def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    return render(request, 'events/event_detail.html', {'event': event})

def event_create(request):
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            event = form.save(commit=False)
            
            # Создаем список спикеров и ивентов
            speakers = form.cleaned_data.pop('speakers')
            
            specializations = form.cleaned_data.pop('specializations')
            
            # Создаем form_template
            form_template = form.cleaned_data.pop('form_template')

            # Получаем город по идентификатору
            city = form.cleaned_data.pop('city')

            # Получаем пользователя, сделавшего запрос
            user = request.user

            # Удаляем 'created_by' из cleaned_data, если он там есть
            form.cleaned_data.pop('created_by', None)

            # Создаем ивент
            event = Event.objects.create(
                created_by=user, form_template=form_template, city=city, **form.cleaned_data
            )

            # Добавляем спикеров к ивенту
            event.speakers.set(speakers)

            # Добавляем специализации к ивенту
            event.specializations.set(specializations)

            # Проверяем, что ивент был создан
            if Event.objects.filter(id=event.id).exists():
                messages.success(request, 'Событие успешно создано!')
                return redirect('mvt_admin:event_detail', event.id)
            else:
                messages.error(request, 'Произошла ошибка при создании события.')
        else:
            messages.error(request, 'Форма недействительна. Пожалуйста, проверьте введенные данные.')
            print(form.errors)
    else:
        form = EventForm()
        
    return render(request, 'events/event_create.html', {'form': form})

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
            return redirect('speaker_list')
    else:
        form = SpeakerForm(instance=speaker)
    return render(request, 'events/speaker_form.html', {'form': form})

def speaker_delete(request, pk):
    speaker = get_object_or_404(Speaker, pk=pk)
    if request.method == 'POST':
        speaker.delete()
        return redirect('speaker_list')
    return render(request, 'events/speaker_confirm_delete.html', {'speaker': speaker})