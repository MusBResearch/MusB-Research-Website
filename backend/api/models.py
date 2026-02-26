from django.db import models
from django.core.validators import EmailValidator
import json


# ============================================================
# SINGLETON BASE
# ============================================================

class SingletonModel(models.Model):
    """Abstract base for singleton settings models."""
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = '000000000000000000000001'
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk='000000000000000000000001')
        return obj


# ============================================================
# HOME PAGE
# ============================================================

class HomePageSettings(SingletonModel):
    """Singleton settings for the Home page."""
    # Hero Slides stored as JSON: [{headline, subtext[], primaryCTA, secondaryCTA, image}]
    hero_slides = models.JSONField(
        default=list, blank=True,
        help_text='JSON array of hero slide objects'
    )
    # Section toggles
    show_trust_indicators = models.BooleanField(default=True)
    show_services_section = models.BooleanField(default=True)
    show_capabilities_section = models.BooleanField(default=True)
    show_facilities_section = models.BooleanField(default=True)
    show_studies_section = models.BooleanField(default=True)
    show_certifications_section = models.BooleanField(default=True)
    show_partners_section = models.BooleanField(default=True)
    show_final_cta = models.BooleanField(default=True)
    # CTA overrides
    final_cta_title = models.CharField(max_length=300, default='Your Science Partner for Evidence-Driven Growth', blank=True)
    final_cta_subtitle = models.TextField(default='', blank=True)
    final_cta_button_text = models.CharField(max_length=100, default='Start a Conversation', blank=True)
    final_cta_button_link = models.CharField(max_length=200, default='/contact', blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Home Page Settings'
        verbose_name_plural = 'Home Page Settings'

    def __str__(self):
        return 'Home Page Settings'


# ============================================================
# SUPPORT PAGE
# ============================================================

class SupportPageSettings(SingletonModel):
    """Singleton settings for the Support / For Businesses page."""
    hero_title = models.CharField(max_length=500, default='End-to-End Research Solutions for Business Success', blank=True)
    hero_subtitle = models.TextField(default='', blank=True)
    show_expertise_section = models.BooleanField(default=True)
    show_therapeutic_section = models.BooleanField(default=True)
    show_why_partner_section = models.BooleanField(default=True)
    show_final_cta = models.BooleanField(default=True)
    final_cta_title = models.CharField(max_length=300, default='Ready to Advance Your Product?', blank=True)
    final_cta_button_text = models.CharField(max_length=100, default='Request a Custom Proposal', blank=True)
    final_cta_button_link = models.CharField(max_length=200, default='/contact', blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Support Page Settings'
        verbose_name_plural = 'Support Page Settings'

    def __str__(self):
        return 'Support Page Settings'


# ============================================================
# ABOUT / WHY CHOOSE US PAGE
# ============================================================

class AboutPageSettings(SingletonModel):
    """Singleton settings for the About / Why Choose Us page."""
    # --- Hero Section ---
    page_title = models.CharField(max_length=200, default='Learn More About Us', blank=True)
    page_subtitle = models.TextField(default='Explore our research capabilities, facilities, team, and opportunities.', blank=True)
    hero_tagline = models.CharField(max_length=100, default='Scientist-Led Growth', blank=True)
    hero_title = models.CharField(max_length=500, default='Your Science Partner for Evidence-Driven Growth', blank=True)
    hero_description = models.TextField(
        default="At MusB™ Research, we don't just run studies—we help you understand your product's strengths, limitations, and real-world impact so you can make the best scientific, business, and health decisions.",
        blank=True
    )
    hero_image = models.ImageField(upload_to='about/', blank=True, null=True)

    # --- Three Ways We Support Section ---
    three_ways_title = models.CharField(max_length=300, default='Three Ways MusB™ Research Supports Your Program', blank=True)
    three_ways_subtitle = models.TextField(default='', blank=True)
    three_ways_cards = models.JSONField(
        default=list, blank=True,
        help_text='JSON array of {icon, title, who, deliverables[], quote, cta_text, cta_link, color}'
    )
    show_three_ways_section = models.BooleanField(default=True)

    # --- Our Story Section ---
    story_title = models.CharField(max_length=300, default='Our Story', blank=True)
    story_content = models.TextField(
        default='MusB™ Research was founded with a singular vision: to bridge the gap between groundbreaking scientific discovery and real-world health impact.',
        blank=True
    )
    story_image = models.ImageField(upload_to='about/', blank=True, null=True)
    show_story_section = models.BooleanField(default=True)

    # --- Extended R&D Partner Section ---
    partner_title = models.CharField(max_length=300, default='Your Extended R&D Partner', blank=True)
    partner_content = models.TextField(
        default='We operate as a seamless extension of your internal team, providing deep scientific expertise, operational agility, and end-to-end project management.',
        blank=True
    )
    partner_features = models.JSONField(
        default=list, blank=True,
        help_text='JSON array of {icon, title, description}'
    )
    show_partner_section = models.BooleanField(default=True)

    # --- Mission & Vision Section ---
    mission_title = models.CharField(max_length=200, default='Our Mission', blank=True)
    mission_content = models.TextField(
        default='To advance human health through rigorous, ethical, and innovative research that bridges scientific discovery with real-world impact.',
        blank=True
    )
    vision_title = models.CharField(max_length=200, default='Our Vision', blank=True)
    vision_content = models.TextField(
        default='To be the most trusted name in translational and clinical research, setting the global standard for scientific integrity and innovation.',
        blank=True
    )
    show_mission_vision_section = models.BooleanField(default=True)

    # --- Core Values Section ---
    core_values = models.JSONField(
        default=list, blank=True,
        help_text='JSON array of {icon, name, description}'
    )
    show_core_values_section = models.BooleanField(default=True)

    # --- Trust Indicators (Why Partner With Us) ---
    why_choose_title = models.CharField(max_length=300, default='Why MusB™ Research?', blank=True)
    why_choose_subtitle = models.TextField(default='', blank=True)
    trust_indicators = models.JSONField(
        default=list, blank=True,
        help_text='JSON array of {icon, title, description}'
    )
    show_trust_indicators = models.BooleanField(default=True)

    # --- Final CTA ---
    show_final_cta = models.BooleanField(default=True)
    final_cta_title = models.CharField(max_length=300, default='', blank=True)
    final_cta_subtitle = models.TextField(default='', blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'About Page Settings'
        verbose_name_plural = 'About Page Settings'

    def __str__(self):
        return 'About Page Settings'


# ============================================================
# INNOVATION PAGE (existing — keeping as-is)
# ============================================================

class InnovationPageSettings(models.Model):
    """Singleton model for Innovation page settings"""
    hero_title = models.CharField(max_length=500, default="Where Innovation Meets Scientific Proof")
    hero_subtitle = models.TextField(default="Partner with MusB™ Research to design and execute rigorous research")
    hero_cta_primary_text = models.CharField(max_length=100, default="Start an Innovation Discussion")
    hero_cta_primary_link = models.CharField(max_length=200, default="/contact")
    hero_cta_secondary_text = models.CharField(max_length=100, default="Explore Our Technologies")
    hero_cta_secondary_link = models.CharField(max_length=200, default="#technologies")
    show_industry_research_section = models.BooleanField(default=True)
    show_concept_to_product_section = models.BooleanField(default=True)
    show_technologies_section = models.BooleanField(default=True)
    show_trust_grid_section = models.BooleanField(default=True)
    show_final_cta_section = models.BooleanField(default=True)
    industry_research_cta_text = models.CharField(max_length=100, default="Run a Study With MusB™ Research", blank=True)
    concept_to_product_cta_text = models.CharField(max_length=100, default="Submit Your Concept", blank=True)
    final_cta_text = models.CharField(max_length=100, default="Start an Innovation Discussion", blank=True)
    study_inquiry_email = models.EmailField(default="sales@musbresearch.com")
    concept_inquiry_email = models.EmailField(default="innovation@musbresearch.com")
    partnership_inquiry_email = models.EmailField(default="partnerships@musbresearch.com")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Innovation Page Settings"
        verbose_name_plural = "Innovation Page Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Innovation Page Settings"


class Technology(models.Model):
    """Model for proprietary technologies (IncreLac™, Movix™, PlastiCheck™)"""
    GRADIENT_CHOICES = [
        ('emerald-teal', 'Emerald to Teal'),
        ('blue-indigo', 'Blue to Indigo'),
        ('purple-pink', 'Purple to Pink'),
        ('cyan-blue', 'Cyan to Blue'),
        ('orange-red', 'Orange to Red'),
    ]
    name = models.CharField(max_length=100, help_text="e.g., IncreLac™")
    tagline = models.CharField(max_length=200, help_text="e.g., GLP-1 Promoting Probiotics")
    positioning = models.TextField(help_text="Short positioning statement")
    focus_areas = models.JSONField(default=list, blank=True)
    gradient_theme = models.CharField(max_length=50, choices=GRADIENT_CHOICES, default='cyan-blue')
    icon_name = models.CharField(max_length=50, default='TrendingUp')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Technology"
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name


class TechnologyDocument(models.Model):
    """Documents and files for each technology"""
    DOCUMENT_TYPES = [
        ('scientific_data', 'Scientific Data'),
        ('publication', 'Publication'),
        ('news', 'News & Updates'),
        ('flyer', 'Flyer / Marketing Asset'),
        ('other', 'Other'),
    ]
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='technology_documents/', blank=True, null=True)
    external_link = models.URLField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.technology.name} - {self.title}"


class SponsorInquiry(models.Model):
    """Model to log sponsor inquiries with routing"""
    INQUIRY_TYPES = [
        ('run_study', 'Run a Study'),
        ('submit_concept', 'Submit Your Concept'),
        ('explore_technology', 'Explore Technology'),
        ('general', 'General Inquiry'),
    ]
    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_TYPES)
    technology = models.ForeignKey(Technology, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.TextField()
    routed_to_email = models.EmailField(help_text="Email address this inquiry was routed to")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = "Sponsor Inquiry"
        verbose_name_plural = "Sponsor Inquiries"

    def __str__(self):
        return f"{self.name} - {self.get_inquiry_type_display()} ({self.submitted_at.strftime('%Y-%m-%d')})"

    def save(self, *args, **kwargs):
        if not self.routed_to_email:
            settings = InnovationPageSettings.load()
            routing_map = {
                'run_study': settings.study_inquiry_email,
                'submit_concept': settings.concept_inquiry_email,
                'explore_technology': settings.partnership_inquiry_email,
                'general': settings.partnership_inquiry_email,
            }
            self.routed_to_email = routing_map.get(self.inquiry_type, settings.partnership_inquiry_email)
        super().save(*args, **kwargs)


class BookletDownloadRequest(models.Model):
    """Model to store booklet download form submissions."""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    nda_agreed = models.BooleanField(default=False)
    technology_name = models.CharField(max_length=200, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = "Booklet Download Request"
        verbose_name_plural = "Booklet Download Requests"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.technology_name}"


# ============================================================
# NEWS & EVENTS
# ============================================================

class NewsItem(models.Model):
    """News articles, events, partnerships, publications, educational materials."""
    TYPE_CHOICES = [
        ('News', 'News'),
        ('Event', 'Event'),
        ('Partnership', 'Partnership'),
        ('Publication', 'Publication'),
        ('Educational Material', 'Educational Material'),
    ]
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Published', 'Published'),
        ('Archived', 'Archived'),
    ]
    title = models.CharField(max_length=300)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    excerpt = models.TextField(help_text='Short summary for cards')
    content = models.TextField(help_text='Full article / event body')
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, help_text='External image URL (fallback)')
    date = models.CharField(max_length=50, help_text='Display date, e.g. "March 2026"')
    is_featured = models.BooleanField(default=False)
    publish_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    tags = models.JSONField(default=list, blank=True)
    # Event-specific fields
    start_time = models.CharField(max_length=50, blank=True)
    end_time = models.CharField(max_length=50, blank=True)
    location_type = models.CharField(max_length=20, blank=True, help_text='On-site / Virtual / Hybrid')
    location = models.CharField(max_length=200, blank=True)
    registration_link = models.URLField(blank=True)
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'News Item'
        verbose_name_plural = 'News Items'

    def __str__(self):
        return f"[{self.type}] {self.title}"


# ============================================================
# CAREERS
# ============================================================

class CareerCategory(models.Model):
    """Career categories like Research & Innovation, Clinical Research, etc."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='briefcase', help_text='Lucide icon name')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        verbose_name = 'Career Category'
        verbose_name_plural = 'Career Categories'

    def __str__(self):
        return self.name


class JobOpening(models.Model):
    """Job openings manageable from admin."""
    TYPE_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Contract', 'Contract'),
        ('Internship', 'Internship'),
    ]
    EXPERIENCE_CHOICES = [
        ('Entry-level', 'Entry-level'),
        ('Mid-level', 'Mid-level'),
        ('Senior', 'Senior'),
        ('Executive', 'Executive'),
    ]
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Live', 'Live'),
        ('Closed', 'Closed'),
    ]
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES)
    summary = models.TextField(help_text='Short summary for listing cards')
    description = models.TextField(help_text='Full job description')
    requirements = models.JSONField(default=list, blank=True, help_text='JSON array of requirement strings')
    is_featured = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Draft')
    apply_url = models.URLField(blank=True)
    deadline = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = 'Job Opening'
        verbose_name_plural = 'Job Openings'

    def __str__(self):
        return f"{self.title} ({self.status})"


class JobApplication(models.Model):
    """Store job applications submitted through the website."""
    job = models.ForeignKey(JobOpening, on_delete=models.CASCADE, related_name='applications')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False)
    admin_notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} → {self.job.title}"


# ============================================================
# CLINICAL TRIALS / STUDIES
# ============================================================

class Study(models.Model):
    """Clinical studies available for participation."""
    CONDITION_CHOICES = [
        ('Gut', 'Gut'),
        ('Brain', 'Brain'),
        ('Metabolic', 'Metabolic'),
        ('Aging', 'Aging'),
        ("Women's Health", "Women's Health"),
        ('Cancer Support', 'Cancer Support'),
    ]
    STATUS_CHOICES = [
        ('Recruiting', 'Recruiting'),
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Upcoming', 'Upcoming'),
    ]
    TYPE_CHOICES = [
        ('Virtual', 'Virtual'),
        ('On-site', 'On-site'),
        ('Hybrid', 'Hybrid'),
    ]
    title = models.CharField(max_length=300)
    condition = models.CharField(max_length=50, choices=CONDITION_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='On-site')
    duration = models.CharField(max_length=100)
    compensation_range = models.CharField(max_length=100, blank=True, help_text='e.g. "$50 - $200"')
    is_paid = models.BooleanField(default=False)
    is_free_testing = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Recruiting')
    description = models.TextField(blank=True)
    benefit = models.CharField(max_length=300, blank=True, help_text='Short benefit text e.g. "No Cost Product & Report"')
    eligibility = models.TextField(blank=True, help_text='Who can participate')
    location = models.CharField(max_length=200, default='Tampa, FL', blank=True)
    tags = models.JSONField(default=list, blank=True, help_text='List of short tags e.g. ["Remote", "Compensation"]')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Study'
        verbose_name_plural = 'Studies'

    def __str__(self):
        return self.title


# ============================================================
# TEAM
# ============================================================

class TeamMember(models.Model):
    """Leadership & scientific team members."""
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    bio = models.TextField(help_text='Short bio for card')
    expanded_bio = models.TextField(blank=True, help_text='Full bio for expanded view')
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    expertise_tags = models.JSONField(default=list, blank=True)
    areas_of_expertise = models.JSONField(default=list, blank=True)
    affiliations = models.JSONField(default=list, blank=True)
    publications = models.JSONField(default=list, blank=True)
    linkedin_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'

    def __str__(self):
        return self.name


class Advisor(models.Model):
    """Scientific / clinical / industry advisors."""
    name = models.CharField(max_length=200)
    advisory_role = models.CharField(max_length=200)
    expertise_area = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    bio = models.TextField()
    image = models.ImageField(upload_to='advisors/', blank=True, null=True)
    linkedin_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class ClinicalCollaborator(models.Model):
    """External clinical collaborator institutions."""
    name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    logo = models.ImageField(upload_to='collaborators/', blank=True, null=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class StaffMember(models.Model):
    """Operational staff members."""
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    role_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='staff/', blank=True, null=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.name} — {self.department}"


# ============================================================
# CAPABILITIES
# ============================================================

class ResearchCapability(models.Model):
    """Research capabilities / areas of expertise."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='activity', help_text='Lucide icon name')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        verbose_name = 'Research Capability'
        verbose_name_plural = 'Research Capabilities'

    def __str__(self):
        return self.title


# ============================================================
# FACILITIES
# ============================================================

class Facility(models.Model):
    """Research facilities and infrastructure."""
    name = models.CharField(max_length=200)
    description = models.TextField()
    features = models.JSONField(default=list, blank=True, help_text='JSON array of feature strings')
    image = models.ImageField(upload_to='facilities/', blank=True, null=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        verbose_name = 'Facility'
        verbose_name_plural = 'Facilities'

    def __str__(self):
        return self.name


# ============================================================
# SHARED: PARTNERS & CERTIFICATIONS
# ============================================================

class Partner(models.Model):
    """Partner organizations."""
    CATEGORY_CHOICES = [
        ('Academic', 'Academic'),
        ('Industry', 'Industry'),
        ('CRO', 'CRO'),
        ('Community', 'Community'),
    ]
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Industry')
    website_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class Certification(models.Model):
    """Certifications and accreditations."""
    label = models.CharField(max_length=200)
    image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, help_text='Fallback image path')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.label


# ============================================================
# NEWSLETTER
# ============================================================

class NewsletterSubscriber(models.Model):
    """Newsletter email subscriptions from the footer."""
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email


# ============================================================
# NEW FACILITIES PAGE MODELS (Rebuild)
# ============================================================

class FacilitiesPageSettings(SingletonModel):
    """Singleton settings for Facilities page header/hero."""
    hero_title = models.CharField(max_length=300, default='Facilities & Infrastructure Built for Sponsor-Ready Research')
    hero_subtext_1 = models.CharField(max_length=500, default='Integrated, regulatory-compliant infrastructure supporting preclinical discovery through human clinical trials.', blank=True)
    hero_subtext_2 = models.CharField(max_length=500, default='Designed for scientific rigor, scalability, and decision-grade data.', blank=True)
    hero_image = models.ImageField(upload_to='facilities/', blank=True, null=True)
    
    # Pillar Settings
    research_pillar_title = models.CharField(max_length=200, default='Research & Innovation')
    research_pillar_desc = models.TextField(default='Preclinical and clinical infrastructure to validate mechanisms, efficacy, and safety with speed and rigor.')
    
    lab_pillar_title = models.CharField(max_length=200, default='Central Laboratory Services')
    lab_pillar_desc = models.TextField(default='Reliable, scalable biomarker and molecular testing with sponsor-ready workflows and documentation.')
    
    bio_pillar_title = models.CharField(max_length=200, default='Biorepository')
    bio_pillar_desc = models.TextField(default='Secure biospecimen processing, tracking, and storage to protect your samples and your future discoveries.')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Facilities Page Settings'
        verbose_name_plural = 'Facilities Page Settings'

    def __str__(self):
        return 'Facilities Page Settings'


class FacilityPillar(models.Model):
    """(Optional) Dynamic definition of pillars if we want them fully dynamic later.
    For now, we can hardcode the 3 main ones or use this. Let's use this for flexibility."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, help_text='research, lab, biorepository')
    short_desc = models.TextField()
    cta_text = models.CharField(max_length=100)
    cta_link = models.CharField(max_length=200)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class FacilityModule(models.Model):
    """Detailed accordion/image blocks for each pillar."""
    PILLAR_CHOICES = [
        ('Research', 'Research & Innovation'),
        ('Lab', 'Central Laboratory Services'),
        ('Biorepository', 'Biorepository'),
    ]
    LAYOUT_CHOICES = [
        ('TextLeft', 'Text Left / Image Right'),
        ('ImageLeft', 'Image Left / Text Right'),
    ]
    pillar = models.CharField(max_length=20, choices=PILLAR_CHOICES)
    title = models.CharField(max_length=200)
    one_line_summary = models.CharField(max_length=300)
    description = models.TextField(help_text='Main accordion text')
    micro_bullets = models.JSONField(default=list, help_text='List of strings')
    image = models.ImageField(upload_to='facilities/', blank=True, null=True)
    badge_label = models.CharField(max_length=100, blank=True)
    layout = models.CharField(max_length=20, choices=LAYOUT_CHOICES, default='TextLeft')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"[{self.pillar}] {self.title}"


class TrustBadge(models.Model):
    """Logos/badges for the trust strip."""
    label = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default='ShieldCheck')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.label


class SuccessSignal(models.Model):
    """'Why Sponsors Choose MusB' cards."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='Star')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
