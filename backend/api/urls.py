from django.urls import path
from . import views

urlpatterns = [
    # Health check
    path('health/', views.health_check, name='health_check'),
    path('contact/', views.contact_inquiry, name='contact_inquiry'),

    # Home
    path('home/settings/', views.home_settings, name='home_settings'),

    # Support
    path('support/settings/', views.support_settings, name='support_settings'),

    # About / Why Choose Us
    path('about/settings/', views.about_settings, name='about_settings'),

    # Innovation
    path('innovation/settings/', views.innovation_settings, name='innovation_settings'),
    path('innovation/technologies/', views.technologies_list, name='technologies_list'),
    path('innovation/technologies/<str:pk>/', views.technology_detail, name='technology_detail'),
    path('innovation/inquiry/', views.sponsor_inquiry, name='sponsor_inquiry'),
    path('innovation/booklet-download/', views.booklet_download_request, name='booklet_download_request'),

    # News & Events
    path('news/', views.news_list, name='news_list'),
    path('news/<str:pk>/', views.news_detail, name='news_detail'),

    # Careers
    path('careers/categories/', views.career_categories, name='career_categories'),
    path('careers/jobs/', views.job_openings_list, name='job_openings_list'),
    path('careers/jobs/<str:pk>/', views.job_detail, name='job_detail'),
    path('careers/apply/', views.job_apply, name='job_apply'),

    # Studies / Clinical Trials
    path('studies/', views.studies_list, name='studies_list'),

    # Team
    path('team/members/', views.team_members_list, name='team_members_list'),
    path('team/advisors/', views.advisors_list, name='advisors_list'),
    path('team/collaborators/', views.collaborators_list, name='collaborators_list'),
    path('team/staff/', views.staff_members_list, name='staff_members_list'),

    # Capabilities
    path('capabilities/', views.capabilities_list, name='capabilities_list'),

    # Facilities
    path('facilities/', views.facilities_list, name='facilities_list'),

    # Partners & Certifications
    path('partners/', views.partners_list, name='partners_list'),
    path('certifications/', views.certifications_list, name='certifications_list'),

    # Newsletter
    path('newsletter/subscribe/', views.newsletter_subscribe, name='newsletter_subscribe'),
    path('facilities-page/', views.facilities_page_data, name='facilities_page_data'),
    path('facilities-inquiry/', views.facility_inquiry, name='facility_inquiry'),
]
