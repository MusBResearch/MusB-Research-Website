from django.urls import path
from .views import (
    ContactPageSettingsView, 
    ContactFormConfigView, 
    InquiryTypeListView, 
    SubmissionCreateView
)

urlpatterns = [
    path('settings/', ContactPageSettingsView.as_view(), name='contact-settings'),
    path('form-config/', ContactFormConfigView.as_view(), name='contact-form-config'),
    path('inquiry-types/', InquiryTypeListView.as_view(), name='inquiry-types'),
    path('submit/', SubmissionCreateView.as_view(), name='contact-submit'),
]
