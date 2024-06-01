from django import forms
from events.models import Event, Speaker, FormTemplate
from additions.models import City
from users.models import Specialization

class SpeakerForm(forms.ModelForm):
    class Meta:
        model = Speaker
        fields = ['foto', 'name', 'specializations', 'info']  

class SpecializationForm(forms.ModelForm):
    class Meta:
        model = Specialization
        fields = ['specialization', 'index']  

class FormTemplateForm(forms.ModelForm):
    class Meta:
        model = FormTemplate
        fields = ['name', 'fields']  

class EventForm(forms.ModelForm):
    speakers = forms.ModelMultipleChoiceField(
        queryset=Speaker.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    specializations = forms.ModelMultipleChoiceField(
        queryset=Specialization.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    form_template = forms.ModelChoiceField(
        queryset=FormTemplate.objects.all(),
        required=False
    )
    city = forms.ModelChoiceField(
        queryset=City.objects.all(),
        required=False
    )

    class Meta:
        model = Event
        fields = [
            'logo', 'name', 'date', 'time', 'city', 
            'specializations','address','description', 
            'gallery', 'speakers', 'online', 'offline', 
            'form_template', 'record_link',
            ]
        widgets = {
            'record_link': forms.URLInput(attrs={'placeholder': 'Record link'}),
        }
