from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactPageSettings, ContactFormConfiguration, InquiryType, Submission
from .serializers import (
    ContactPageSettingsSerializer, 
    ContactFormConfigurationSerializer, 
    InquiryTypeSerializer, 
    SubmissionSerializer
)

class ContactPageSettingsView(generics.RetrieveAPIView):
    serializer_class = ContactPageSettingsSerializer
    
    def get_object(self):
        return ContactPageSettings.load()

class ContactFormConfigView(generics.RetrieveAPIView):
    serializer_class = ContactFormConfigurationSerializer
    
    def get_object(self):
        return ContactFormConfiguration.load()

class InquiryTypeListView(generics.ListAPIView):
    queryset = InquiryType.objects.filter(is_active=True)
    serializer_class = InquiryTypeSerializer

class SubmissionCreateView(generics.CreateAPIView):
    serializer_class = SubmissionSerializer
    
    def perform_create(self, serializer):
        submission = serializer.save()
        
        # Send Email Notification
        if submission.routed_to:
            subject = f"New Contact Inquiry: {submission.inquiry_type.label if submission.inquiry_type else 'General'}"
            message = f"""
            New inquiry received from website.
            
            Name: {submission.name}
            Email: {submission.email}
            Company: {submission.company}
            Phone: {submission.phone}
            
            Message:
            {submission.message}
            """
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [submission.routed_to],
                    fail_silently=True,
                )
                submission.is_processed = True # Mark as "processed" in terms of notification sent
                submission.save()
            except Exception as e:
                # Log error
                print(f"Error sending email: {e}")
