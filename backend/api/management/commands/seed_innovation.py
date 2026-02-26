from django.core.management.base import BaseCommand
from api.models import InnovationPageSettings, Technology

class Command(BaseCommand):
    help = 'Seeds initial data for the Innovation page'

    def handle(self, *args, **options):
        # 1. Seed Innovation Page Settings
        settings = InnovationPageSettings.load()
        settings.hero_title = "Where Innovation Meets Scientific Proof"
        settings.hero_subtitle = "Partner with MusB™ Research to design and execute rigorous research"
        settings.study_inquiry_email = "sales@musbresearch.com"
        settings.concept_inquiry_email = "innovation@musbresearch.com"
        settings.partnership_inquiry_email = "partnerships@musbresearch.com"
        settings.save()
        self.stdout.write(self.style.SUCCESS('Successfully seeded Innovation Page Settings'))

        # 2. Seed Technologies
        tech_data = [
            {
                'name': "IncreLac™",
                'tagline': "GLP-1 Promoting Probiotics",
                'positioning': "A next-generation probiotic platform designed to support endogenous GLP-1 stimulation for metabolic health and weight management.",
                'focus_areas': ["Metabolic health", "GLP-1 signaling pathways", "Gut–endocrine axis"],
                'icon_name': "TrendingUp",
                'gradient_theme': "emerald-teal",
                'display_order': 1
            },
            {
                'name': "Movix™",
                'tagline': "Gut Health Promoting Cocktail",
                'positioning': "A multi-component gut health formulation designed to improve digestive function, tolerance, and microbiome balance.",
                'focus_areas': ["Gut barrier integrity", "Digestive comfort", "Microbiome modulation"],
                'icon_name': "FlaskConical",
                'gradient_theme': "blue-indigo",
                'display_order': 2
            },
            {
                'name': "PlastiCheck™",
                'tagline': "Microplastic-Reducing Probiotics",
                'positioning': "An innovative probiotic technology aimed at binding, reducing, or mitigating microplastic burden through gut-based mechanisms.",
                'focus_areas': ["Environmental health", "Gut detoxification", "Emerging exposome science"],
                'icon_name': "Shield",
                'gradient_theme': "purple-pink",
                'display_order': 3
            }
        ]

        for data in tech_data:
            tech, created = Technology.objects.update_or_create(
                name=data['name'],
                defaults=data
            )
            status = 'created' if created else 'updated'
            self.stdout.write(self.style.SUCCESS(f'Technology "{tech.name}" {status}'))

        self.stdout.write(self.style.SUCCESS('Innovation seeding complete!'))
