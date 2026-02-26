from django.contrib import admin
from django.http import HttpResponse
import csv
from .models import ContactPageSettings, ContactFormConfiguration, InquiryType, Submission

class ContactPageSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Check if an instance already exists
        if ContactPageSettings.objects.exists():
            return False
        return True

class ContactFormConfigurationAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if ContactFormConfiguration.objects.exists():
            return False
        return True

class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'inquiry_type', 'company', 'submitted_at', 'is_processed')
    list_filter = ('inquiry_type', 'is_processed', 'submitted_at')
    search_fields = ('name', 'email', 'company', 'message')
    readonly_fields = ('submitted_at', 'ip_address', 'user_agent')
    actions = ['export_as_csv']
    
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected to CSV"

admin.site.register(ContactPageSettings, ContactPageSettingsAdmin)
admin.site.register(ContactFormConfiguration, ContactFormConfigurationAdmin)
admin.site.register(InquiryType)
admin.site.register(Submission, SubmissionAdmin)
