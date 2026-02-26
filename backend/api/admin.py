import csv
from django.contrib import admin
from django.http import HttpResponse
from .models import (
    HomePageSettings, SupportPageSettings, AboutPageSettings,
    InnovationPageSettings, Technology, TechnologyDocument, SponsorInquiry, BookletDownloadRequest,
    NewsItem, CareerCategory, JobOpening, JobApplication,
    Study, TeamMember, Advisor, ClinicalCollaborator, StaffMember,
    ResearchCapability, Facility, Partner, Certification, NewsletterSubscriber,
    FacilitiesPageSettings, FacilityPillar, FacilityModule, TrustBadge, SuccessSignal
)


# ============================================================
# SINGLETON ADMIN MIXIN
# ============================================================

class SingletonAdmin(admin.ModelAdmin):
    """Base admin for singleton models — prevents add/delete."""
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


# ============================================================
# PAGE SETTINGS
# ============================================================

@admin.register(HomePageSettings)
class HomePageSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ('Hero Section', {'fields': ('hero_slides',)}),
        ('Section Visibility', {'fields': (
            'show_trust_indicators', 'show_services_section',
            'show_capabilities_section', 'show_facilities_section',
            'show_studies_section', 'show_certifications_section',
            'show_partners_section', 'show_final_cta',
        )}),
        ('Final CTA', {'fields': (
            'final_cta_title', 'final_cta_subtitle',
            'final_cta_button_text', 'final_cta_button_link',
        )}),
        ('Metadata', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )
    readonly_fields = ['updated_at']


@admin.register(SupportPageSettings)
class SupportPageSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ('Hero', {'fields': ('hero_title', 'hero_subtitle')}),
        ('Section Visibility', {'fields': (
            'show_expertise_section', 'show_therapeutic_section',
            'show_why_partner_section', 'show_final_cta',
        )}),
        ('Final CTA', {'fields': ('final_cta_title', 'final_cta_button_text', 'final_cta_button_link')}),
        ('Metadata', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )
    readonly_fields = ['updated_at']


@admin.register(AboutPageSettings)
class AboutPageSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ('Hero Section', {'fields': (
            'page_title', 'page_subtitle', 'hero_tagline',
            'hero_title', 'hero_description', 'hero_image',
        )}),
        ('Three Ways Section', {
            'fields': ('three_ways_title', 'three_ways_subtitle', 'three_ways_cards', 'show_three_ways_section'),
            'classes': ('collapse',),
        }),
        ('Our Story', {
            'fields': ('story_title', 'story_content', 'story_image', 'show_story_section'),
            'classes': ('collapse',),
        }),
        ('Extended R&D Partner', {
            'fields': ('partner_title', 'partner_content', 'partner_features', 'show_partner_section'),
            'classes': ('collapse',),
        }),
        ('Mission & Vision', {
            'fields': ('mission_title', 'mission_content', 'vision_title', 'vision_content', 'show_mission_vision_section'),
            'classes': ('collapse',),
        }),
        ('Core Values', {
            'fields': ('core_values', 'show_core_values_section'),
            'classes': ('collapse',),
        }),
        ('Trust Indicators', {
            'fields': ('why_choose_title', 'why_choose_subtitle', 'trust_indicators', 'show_trust_indicators'),
            'classes': ('collapse',),
        }),
        ('Final CTA', {
            'fields': ('show_final_cta', 'final_cta_title', 'final_cta_subtitle'),
            'classes': ('collapse',),
        }),
        ('Metadata', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )
    readonly_fields = ['updated_at']


# ============================================================
# INNOVATION
# ============================================================

class TechnologyDocumentInline(admin.TabularInline):
    model = TechnologyDocument
    extra = 1
    fields = ['document_type', 'title', 'description', 'file', 'external_link']


@admin.register(InnovationPageSettings)
class InnovationPageSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ('Hero Section', {'fields': (
            'hero_title', 'hero_subtitle',
            ('hero_cta_primary_text', 'hero_cta_primary_link'),
            ('hero_cta_secondary_text', 'hero_cta_secondary_link'),
        )}),
        ('Section Visibility', {'fields': (
            'show_industry_research_section', 'show_concept_to_product_section',
            'show_technologies_section', 'show_trust_grid_section', 'show_final_cta_section',
        )}),
        ('CTA Text Overrides', {'fields': (
            'industry_research_cta_text', 'concept_to_product_cta_text', 'final_cta_text',
        )}),
        ('Email Routing', {'fields': (
            'study_inquiry_email', 'concept_inquiry_email', 'partnership_inquiry_email',
        )}),
        ('Metadata', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )
    readonly_fields = ['updated_at']


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'tagline', 'gradient_theme', 'display_order', 'is_active', 'updated_at']
    list_editable = ['display_order', 'is_active']
    list_filter = ['is_active', 'gradient_theme']
    search_fields = ['name', 'tagline', 'positioning']
    ordering = ['display_order', 'name']
    inlines = [TechnologyDocumentInline]


@admin.register(TechnologyDocument)
class TechnologyDocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'technology', 'document_type', 'uploaded_at']
    list_filter = ['document_type', 'technology']
    search_fields = ['title', 'description']
    ordering = ['-uploaded_at']
    readonly_fields = ['uploaded_at']


@admin.register(SponsorInquiry)
class SponsorInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'inquiry_type', 'technology', 'routed_to_email', 'is_processed', 'submitted_at']
    list_filter = ['inquiry_type', 'is_processed', 'submitted_at']
    search_fields = ['name', 'email', 'company', 'message']
    list_editable = ['is_processed']
    readonly_fields = ['submitted_at', 'routed_to_email']

    def has_add_permission(self, request):
        return False


@admin.register(BookletDownloadRequest)
class BookletDownloadRequestAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'company', 'email', 'technology_name', 'submitted_at']
    list_filter = ['submitted_at', 'technology_name']
    search_fields = ['first_name', 'last_name', 'email', 'company']
    readonly_fields = ['submitted_at']

    def has_add_permission(self, request):
        return False


# ============================================================
# NEWS & EVENTS
# ============================================================

@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'date', 'publish_status', 'is_featured', 'created_at']
    list_editable = ['publish_status', 'is_featured']
    list_filter = ['type', 'publish_status', 'is_featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering = ['-created_at']
    fieldsets = (
        ('Content', {'fields': ('title', 'type', 'excerpt', 'content', 'image', 'image_url', 'date', 'tags')}),
        ('Status', {'fields': ('publish_status', 'is_featured')}),
        ('Event Details', {
            'fields': ('start_time', 'end_time', 'location_type', 'location', 'registration_link'),
            'classes': ('collapse',),
            'description': 'Fill these only for Event type items',
        }),
        ('Metadata', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ['created_at', 'updated_at']


# ============================================================
# CAREERS
# ============================================================

@admin.register(CareerCategory)
class CareerCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name']


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'location', 'type', 'experience_level', 'status', 'is_featured', 'created_at']
    list_editable = ['status', 'is_featured']
    list_filter = ['status', 'type', 'experience_level', 'department', 'is_featured']
    search_fields = ['title', 'summary', 'description']
    ordering = ['-is_featured', '-created_at']
    fieldsets = (
        ('Job Info', {'fields': ('title', 'department', 'location', 'type', 'experience_level')}),
        ('Content', {'fields': ('summary', 'description', 'requirements')}),
        ('Settings', {'fields': ('status', 'is_featured', 'apply_url', 'deadline')}),
        ('Metadata', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'job', 'submitted_at', 'is_reviewed']
    list_filter = ['is_reviewed', 'submitted_at', 'job']
    search_fields = ['name', 'email']
    list_editable = ['is_reviewed']
    readonly_fields = ['submitted_at']

    actions = ['export_as_csv']

    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="job_applications.csv"'
        writer = csv.writer(response)
        writer.writerow(['Name', 'Email', 'Phone', 'Job', 'Submitted At', 'Reviewed'])
        for app in queryset:
            writer.writerow([app.name, app.email, app.phone, app.job.title, app.submitted_at, app.is_reviewed])
        return response
    export_as_csv.short_description = 'Export selected as CSV'


# ============================================================
# FACILITIES PAGE (Rebuild)
# ============================================================

@admin.register(FacilitiesPageSettings)
class FacilitiesPageSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ('Hero Section', {'fields': (
            'hero_title', 'hero_subtext_1', 'hero_subtext_2', 'hero_image',
        )}),
        ('Pillar Titles & Intros', {'fields': (
            'research_pillar_title', 'research_pillar_desc',
            'lab_pillar_title', 'lab_pillar_desc',
            'bio_pillar_title', 'bio_pillar_desc',
        )}),
        ('Metadata', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )
    readonly_fields = ['updated_at']


@admin.register(FacilityPillar)
class FacilityPillarAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'cta_text', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(FacilityModule)
class FacilityModuleAdmin(admin.ModelAdmin):
    list_display = ['title', 'pillar', 'layout', 'display_order', 'is_active']
    list_filter = ['pillar', 'layout', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['title', 'description', 'one_line_summary']
    ordering = ['pillar', 'display_order']


@admin.register(TrustBadge)
class TrustBadgeAdmin(admin.ModelAdmin):
    list_display = ['label', 'icon', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']


@admin.register(SuccessSignal)
class SuccessSignalAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']

    def has_add_permission(self, request):
        return False


# ============================================================
# STUDIES
# ============================================================

@admin.register(Study)
class StudyAdmin(admin.ModelAdmin):
    list_display = ['title', 'condition', 'duration', 'status', 'is_active', 'created_at']
    list_editable = ['status', 'is_active']
    list_filter = ['condition', 'status', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['-created_at']


# ============================================================
# TEAM
# ============================================================

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'role', 'bio']
    fieldsets = (
        ('Basic Info', {'fields': ('name', 'role', 'bio', 'expanded_bio', 'image', 'linkedin_url')}),
        ('Expertise', {'fields': ('expertise_tags', 'areas_of_expertise', 'affiliations', 'publications')}),
        ('Display', {'fields': ('display_order', 'is_active')}),
    )


@admin.register(Advisor)
class AdvisorAdmin(admin.ModelAdmin):
    list_display = ['name', 'advisory_role', 'expertise_area', 'organization', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'organization']


@admin.register(ClinicalCollaborator)
class ClinicalCollaboratorAdmin(admin.ModelAdmin):
    list_display = ['name', 'specialty', 'location', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'specialty']


@admin.register(StaffMember)
class StaffMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'department', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'role', 'department']


# ============================================================
# CAPABILITIES & FACILITIES
# ============================================================

@admin.register(ResearchCapability)
class ResearchCapabilityAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['title', 'description']


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'description']


# ============================================================
# PARTNERS & CERTIFICATIONS
# ============================================================

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active', 'category']
    list_filter = ['category', 'is_active']
    search_fields = ['name']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['label', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    search_fields = ['label']


# ============================================================
# NEWSLETTER
# ============================================================

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'is_active']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    list_editable = ['is_active']

    actions = ['export_as_csv']

    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="newsletter_subscribers.csv"'
        writer = csv.writer(response)
        writer.writerow(['Email', 'Subscribed At', 'Active'])
        for sub in queryset:
            writer.writerow([sub.email, sub.subscribed_at, sub.is_active])
        return response
    export_as_csv.short_description = 'Export selected as CSV'
