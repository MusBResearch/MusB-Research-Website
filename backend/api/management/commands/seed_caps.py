from django.core.management.base import BaseCommand
from api.models import ResearchCapability
from bson import ObjectId
from django.db import connections

class Command(BaseCommand):
    help = 'Seed specifically the 11 capabilities for the snapshot'

    def handle(self, *args, **options):
        capabilities_data = [
            {"title": "Clinical Trials", "description": "Phase I–IV, natural products, devices", "icon": "activity"},
            {"title": "Preclinical Research", "description": "In vitro and animal models", "icon": "flask-conical"},
            {"title": "Microbiome, Biotics & Omics", "description": "Integrated analysis of microbial systems", "icon": "microscope"},
            {"title": "Nutrition & Natural Products", "description": "Evidence-based validation of natural ingredients", "icon": "leaf"},
            {"title": "Aging, Metabolic & Brain Health", "description": "Specialized therapeutic focus areas", "icon": "brain"},
            {"title": "Leaky Gut, Inflammation, Skin & Women’s Health", "description": "Comprehensive wellness research", "icon": "stethoscope"},
            {"title": "Immunomodulatory Research", "description": "Immune system function and response", "icon": "shield-check"},
            {"title": "Muscle, Gut, Skin & Vascular Health", "description": "Multi-organ systems biology", "icon": "zap"},
            {"title": "Toxicology & Bioavailability", "description": "Safety and pharmacokinetics", "icon": "beaker"},
            {"title": "Biostatistics & Data Science", "description": "Rigorous data analysis and interpretation", "icon": "bar-chart"},
            {"title": "Regulatory Compliance Support", "description": "Sponsor-ready documentation and strategy", "icon": "file-text"}
        ]

        # Use the get_collection method from the connection
        connection = connections['default']
        coll = connection.get_collection('api_researchcapability')
        
        # Clear collection
        coll.delete_many({})
        
        count = 0
        for idx, data in enumerate(capabilities_data):
            oid = ObjectId()
            # We set both _id (primary key for MongoDB) and id (which Django uses and has a unique index on)
            coll.insert_one({
                '_id': oid,
                'id': oid, # Crucial: set id explicitly to avoid null collision
                'title': data["title"],
                'description': data["description"],
                "icon": data["icon"],
                "display_order": (idx + 1) * 10,
                "is_active": True
            })
            count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} capabilities via get_collection and direct insert.'))
