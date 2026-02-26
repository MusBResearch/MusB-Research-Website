from rest_framework import serializers
from .models import (
    HomePageSettings, SupportPageSettings, AboutPageSettings,
    InnovationPageSettings, Technology, TechnologyDocument, SponsorInquiry, BookletDownloadRequest,
    NewsItem, CareerCategory, JobOpening, JobApplication,
    Study, TeamMember, Advisor, ClinicalCollaborator, StaffMember,
    ResearchCapability, Facility, Partner, Certification, NewsletterSubscriber,
    FacilitiesPageSettings, FacilityPillar, FacilityModule, TrustBadge, SuccessSignal
)


# ============================================================
# PAGE SETTINGS (singletons)
# ============================================================

class HomePageSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = HomePageSettings
        fields = '__all__'
        read_only_fields = ['id', 'updated_at']


class SupportPageSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = SupportPageSettings
        fields = '__all__'
        read_only_fields = ['id', 'updated_at']


class AboutPageSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = AboutPageSettings
        fields = '__all__'
        read_only_fields = ['id', 'updated_at']


# ============================================================
# INNOVATION (existing)
# ============================================================

class TechnologyDocumentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = TechnologyDocument
        fields = ['id', 'document_type', 'title', 'description', 'file', 'external_link', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class TechnologySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    documents = TechnologyDocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Technology
        fields = [
            'id', 'name', 'tagline', 'positioning', 'focus_areas',
            'gradient_theme', 'icon_name', 'display_order', 'is_active',
            'documents', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class InnovationPageSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = InnovationPageSettings
        fields = [
            'id', 'hero_title', 'hero_subtitle',
            'hero_cta_primary_text', 'hero_cta_primary_link',
            'hero_cta_secondary_text', 'hero_cta_secondary_link',
            'show_industry_research_section', 'show_concept_to_product_section',
            'show_technologies_section', 'show_trust_grid_section', 'show_final_cta_section',
            'industry_research_cta_text', 'concept_to_product_cta_text', 'final_cta_text',
            'study_inquiry_email', 'concept_inquiry_email', 'partnership_inquiry_email',
            'updated_at'
        ]
        read_only_fields = ['id', 'updated_at']


class SponsorInquirySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = SponsorInquiry
        fields = [
            'id', 'name', 'email', 'company', 'phone',
            'inquiry_type', 'technology', 'message',
            'routed_to_email', 'submitted_at'
        ]
        read_only_fields = ['id', 'routed_to_email', 'submitted_at']

    def create(self, validated_data):
        return super().create(validated_data)


class BookletDownloadRequestSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = BookletDownloadRequest
        fields = [
            'id', 'first_name', 'last_name', 'company', 'designation',
            'email', 'phone', 'nda_agreed', 'technology_name', 'submitted_at'
        ]
        read_only_fields = ['id', 'submitted_at']


# ============================================================
# NEWS & EVENTS
# ============================================================

class NewsItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = NewsItem
        fields = [
            'id', 'title', 'type', 'excerpt', 'content', 'image', 'image_url',
            'date', 'is_featured', 'publish_status', 'tags',
            'start_time', 'end_time', 'location_type', 'location', 'registration_link',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


# ============================================================
# CAREERS
# ============================================================

class CareerCategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = CareerCategory
        fields = ['id', 'name', 'description', 'icon', 'display_order', 'is_active']
        read_only_fields = ['id']


class JobOpeningSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = JobOpening
        fields = [
            'id', 'title', 'department', 'location', 'type',
            'experience_level', 'summary', 'description', 'requirements',
            'is_featured', 'status', 'apply_url', 'deadline',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'name', 'email', 'phone', 'resume', 'cover_letter', 'submitted_at']
        read_only_fields = ['id', 'submitted_at']


# ============================================================
# STUDIES
# ============================================================

class StudySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Study
        fields = [
            'id', 'title', 'condition', 'type', 'duration', 'compensation_range', 
            'is_paid', 'is_free_testing', 'status',
            'description', 'benefit', 'eligibility', 'location', 'tags', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


# ============================================================
# TEAM
# ============================================================

class TeamMemberSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'role', 'bio', 'expanded_bio', 'image',
            'expertise_tags', 'areas_of_expertise', 'affiliations', 'publications',
            'linkedin_url', 'display_order', 'is_active'
        ]
        read_only_fields = ['id']


class AdvisorSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Advisor
        fields = [
            'id', 'name', 'advisory_role', 'expertise_area', 'organization',
            'bio', 'image', 'linkedin_url', 'display_order', 'is_active'
        ]
        read_only_fields = ['id']


class ClinicalCollaboratorSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = ClinicalCollaborator
        fields = ['id', 'name', 'specialty', 'location', 'logo', 'display_order', 'is_active']
        read_only_fields = ['id']


class StaffMemberSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = StaffMember
        fields = ['id', 'name', 'role', 'department', 'role_description', 'image', 'display_order', 'is_active']
        read_only_fields = ['id']


# ============================================================
# CAPABILITIES & FACILITIES
# ============================================================

class ResearchCapabilitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = ResearchCapability
        fields = ['id', 'title', 'description', 'icon', 'display_order', 'is_active']
        read_only_fields = ['id']


class FacilitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Facility
        fields = ['id', 'name', 'description', 'features', 'image', 'display_order', 'is_active']
        read_only_fields = ['id']


# ============================================================
# SHARED: PARTNERS & CERTIFICATIONS
# ============================================================

class PartnerSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Partner
        fields = ['id', 'name', 'logo', 'category', 'website_url', 'display_order', 'is_active']
        read_only_fields = ['id']


class CertificationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = Certification
        fields = ['id', 'label', 'image', 'image_url', 'display_order', 'is_active']
        read_only_fields = ['id']


# ============================================================
# NEWSLETTER
# ============================================================

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['id', 'subscribed_at']


# ============================================================
# FACILITIES PAGE (Rebuild)
# ============================================================

class FacilitiesPageSettingsSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = FacilitiesPageSettings
        fields = '__all__'
        read_only_fields = ['id', 'updated_at']


class FacilityPillarSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = FacilityPillar
        fields = '__all__'


class FacilityModuleSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = FacilityModule
        fields = '__all__'


class TrustBadgeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = TrustBadge
        fields = '__all__'


class SuccessSignalSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = SuccessSignal
        fields = '__all__'
