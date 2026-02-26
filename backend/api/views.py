from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.db.models import Q
from .models import (
    HomePageSettings, SupportPageSettings, AboutPageSettings,
    InnovationPageSettings, Technology, SponsorInquiry, BookletDownloadRequest,
    NewsItem, CareerCategory, JobOpening, JobApplication,
    Study, TeamMember, Advisor, ClinicalCollaborator, StaffMember,
    ResearchCapability, Facility, Partner, Certification, NewsletterSubscriber,
    FacilitiesPageSettings, FacilityPillar, FacilityModule, TrustBadge, SuccessSignal
)
from .serializers import (
    HomePageSettingsSerializer, SupportPageSettingsSerializer, AboutPageSettingsSerializer,
    InnovationPageSettingsSerializer, TechnologySerializer, SponsorInquirySerializer, BookletDownloadRequestSerializer,
    NewsItemSerializer, CareerCategorySerializer, JobOpeningSerializer, JobApplicationSerializer,
    StudySerializer, TeamMemberSerializer, AdvisorSerializer,
    ClinicalCollaboratorSerializer, StaffMemberSerializer,
    ResearchCapabilitySerializer, FacilitySerializer,
    PartnerSerializer, CertificationSerializer, NewsletterSubscriberSerializer,
    FacilitiesPageSettingsSerializer, FacilityPillarSerializer, FacilityModuleSerializer,
    TrustBadgeSerializer, SuccessSignalSerializer
)


# ============================================================
# HEALTH CHECK
# ============================================================

@api_view(['GET'])
def health_check(request):
    return Response({
        'status': 'healthy',
        'message': 'MusB Research API (Django) is running'
    })


# ============================================================
# HOME PAGE
# ============================================================

@api_view(['GET'])
def home_settings(request):
    """Get Home page settings."""
    settings = HomePageSettings.load()
    serializer = HomePageSettingsSerializer(settings)
    return Response(serializer.data)


# ============================================================
# SUPPORT PAGE
# ============================================================

@api_view(['GET'])
def support_settings(request):
    """Get Support page settings."""
    settings = SupportPageSettings.load()
    serializer = SupportPageSettingsSerializer(settings)
    return Response(serializer.data)


# ============================================================
# ABOUT / WHY CHOOSE US
# ============================================================

@api_view(['GET'])
def about_settings(request):
    """Get About / Why Choose Us page settings."""
    settings = AboutPageSettings.load()
    serializer = AboutPageSettingsSerializer(settings)
    return Response(serializer.data)


# ============================================================
# INNOVATION (existing)
# ============================================================

@api_view(['GET'])
def innovation_settings(request):
    settings = InnovationPageSettings.load()
    serializer = InnovationPageSettingsSerializer(settings)
    return Response(serializer.data)


@api_view(['GET'])
def technologies_list(request):
    technologies = Technology.objects.filter(is_active=True)
    serializer = TechnologySerializer(technologies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def technology_detail(request, pk):
    try:
        technology = Technology.objects.get(pk=pk, is_active=True)
        serializer = TechnologySerializer(technology)
        return Response(serializer.data)
    except Technology.DoesNotExist:
        return Response({'error': 'Technology not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def sponsor_inquiry(request):
    serializer = SponsorInquirySerializer(data=request.data)
    if serializer.is_valid():
        inquiry = serializer.save()
        try:
            from django.core.mail import send_mail
            from django.conf import settings as django_settings
            subject = f"New {inquiry.get_inquiry_type_display()} Inquiry"
            message = (
                f"New inquiry received from {inquiry.name} ({inquiry.email})\n"
                f"Company: {inquiry.company or 'N/A'}\n"
                f"Phone: {inquiry.phone or 'N/A'}\n"
                f"Type: {inquiry.get_inquiry_type_display()}\n"
                f"Technology: {inquiry.technology.name if inquiry.technology else 'N/A'}\n\n"
                f"Message:\n{inquiry.message}"
            )
            send_mail(subject, message, django_settings.DEFAULT_FROM_EMAIL, [inquiry.routed_to_email], fail_silently=True)
        except Exception as e:
            print(f"Failed to send email: {e}")
        return Response({
            'success': True,
            'message': 'Inquiry submitted successfully.',
            'routed_to': inquiry.routed_to_email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================================================
# BOOKLET DOWNLOAD
# ============================================================

@api_view(['POST'])
def booklet_download_request(request):
    serializer = BookletDownloadRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Form submitted successfully. Your download will begin shortly.',
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================================================
# CONTACT (legacy endpoint)
# ============================================================

@api_view(['POST'])
def contact_inquiry(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    inquiry_type = data.get('inquiryType')
    message = data.get('message')
    print(f"New Inquiry from {name} ({email}): [{inquiry_type}] {message}")
    return Response({
        'success': True,
        'message': 'Inquiry received and routed successfully.'
    }, status=status.HTTP_200_OK)


# ============================================================
# NEWS & EVENTS
# ============================================================

@api_view(['GET'])
def news_list(request):
    """List published news items. Optionally filter by ?type= and ?search="""
    queryset = NewsItem.objects.filter(publish_status='Published')
    news_type = request.query_params.get('type')
    search = request.query_params.get('search')
    if news_type:
        queryset = queryset.filter(type=news_type)
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | Q(excerpt__icontains=search) | Q(tags__icontains=search)
        )
    serializer = NewsItemSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def news_detail(request, pk):
    """Get single news item."""
    try:
        item = NewsItem.objects.get(pk=pk, publish_status='Published')
        serializer = NewsItemSerializer(item)
        return Response(serializer.data)
    except NewsItem.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


# ============================================================
# CAREERS
# ============================================================

@api_view(['GET'])
def career_categories(request):
    """List active career categories."""
    categories = CareerCategory.objects.filter(is_active=True)
    serializer = CareerCategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def job_openings_list(request):
    """List live job openings. Optionally filter by ?department= and ?type= and ?search="""
    queryset = JobOpening.objects.filter(status='Live')
    department = request.query_params.get('department')
    job_type = request.query_params.get('type')
    search = request.query_params.get('search')
    if department:
        queryset = queryset.filter(department__icontains=department)
    if job_type:
        queryset = queryset.filter(type=job_type)
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | Q(summary__icontains=search) | Q(department__icontains=search)
        )
    serializer = JobOpeningSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def job_detail(request, pk):
    """Get single job opening."""
    try:
        job = JobOpening.objects.get(pk=pk, status='Live')
        serializer = JobOpeningSerializer(job)
        return Response(serializer.data)
    except JobOpening.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def job_apply(request):
    """Submit a job application."""
    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        application = serializer.save()
        try:
            from django.core.mail import send_mail
            from django.conf import settings as django_settings
            send_mail(
                subject=f"New Application: {application.job.title}",
                message=f"Application from {application.name} ({application.email})\nJob: {application.job.title}\n\nCover Letter:\n{application.cover_letter}",
                from_email=django_settings.DEFAULT_FROM_EMAIL,
                recipient_list=[django_settings.DEFAULT_FROM_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass
        return Response({'success': True, 'message': 'Application submitted!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================================================
# STUDIES
# ============================================================

@api_view(['GET'])
def studies_list(request):
    """List active studies. Optionally filter by ?condition= and ?status="""
    queryset = Study.objects.filter(is_active=True)
    condition = request.query_params.get('condition')
    study_status = request.query_params.get('status')
    is_paid = request.query_params.get('is_paid')
    is_free_testing = request.query_params.get('is_free_testing')
    
    if condition:
        queryset = queryset.filter(condition=condition)
    if study_status:
        queryset = queryset.filter(status=study_status)
    if is_paid:
        queryset = queryset.filter(is_paid=is_paid.lower() == 'true')
    if is_free_testing:
        queryset = queryset.filter(is_free_testing=is_free_testing.lower() == 'true')
        
    serializer = StudySerializer(queryset, many=True)
    return Response(serializer.data)


# ============================================================
# TEAM
# ============================================================

@api_view(['GET'])
def team_members_list(request):
    members = TeamMember.objects.filter(is_active=True)
    serializer = TeamMemberSerializer(members, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def advisors_list(request):
    advisors = Advisor.objects.filter(is_active=True)
    serializer = AdvisorSerializer(advisors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def collaborators_list(request):
    collabs = ClinicalCollaborator.objects.filter(is_active=True)
    serializer = ClinicalCollaboratorSerializer(collabs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def staff_members_list(request):
    staff = StaffMember.objects.filter(is_active=True)
    serializer = StaffMemberSerializer(staff, many=True)
    return Response(serializer.data)


# ============================================================
# CAPABILITIES
# ============================================================

@api_view(['GET'])
def capabilities_list(request):
    caps = ResearchCapability.objects.filter(is_active=True)
    serializer = ResearchCapabilitySerializer(caps, many=True)
    return Response(serializer.data)


# ============================================================
# FACILITIES
# ============================================================

@api_view(['GET'])
def facilities_list(request):
    facs = Facility.objects.filter(is_active=True)
    serializer = FacilitySerializer(facs, many=True)
    return Response(serializer.data)


# ============================================================
# PARTNERS & CERTIFICATIONS
# ============================================================

@api_view(['GET'])
def partners_list(request):
    """List partners. Optionally filter by ?category="""
    queryset = Partner.objects.filter(is_active=True)
    category = request.query_params.get('category')
    if category:
        queryset = queryset.filter(category=category)
    serializer = PartnerSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def certifications_list(request):
    certs = Certification.objects.filter(is_active=True)
    serializer = CertificationSerializer(certs, many=True)
    return Response(serializer.data)


# ============================================================
# NEWSLETTER
# ============================================================

@api_view(['POST'])
def newsletter_subscribe(request):
    """Subscribe an email to the newsletter."""
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    subscriber, created = NewsletterSubscriber.objects.get_or_create(
        email=email,
        defaults={'is_active': True}
    )
    if not created and not subscriber.is_active:
        subscriber.is_active = True
        subscriber.save()
        return Response({'success': True, 'message': 'Re-subscribed successfully!'})
    elif not created:
        return Response({'success': True, 'message': 'Already subscribed.'})

    return Response({'success': True, 'message': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)


# ============================================================
# FACILITIES PAGE (Rebuild)
# ============================================================

@api_view(['GET'])
def facilities_page_data(request):
    """Get all data for the Facilities page rebuild."""
    settings = FacilitiesPageSettings.load()
    pillars = FacilityPillar.objects.filter(is_active=True)
    modules = FacilityModule.objects.filter(is_active=True)
    badges = TrustBadge.objects.filter(is_active=True)
    signals = SuccessSignal.objects.filter(is_active=True)

    return Response({
        'settings': FacilitiesPageSettingsSerializer(settings).data,
        'pillars': FacilityPillarSerializer(pillars, many=True).data,
        'modules': FacilityModuleSerializer(modules, many=True).data,
        'trust_badges': TrustBadgeSerializer(badges, many=True).data,
        'success_signals': SuccessSignalSerializer(signals, many=True).data,
    })
