from django.core.management.base import BaseCommand
from api.models import Certification, Partner
from bson import ObjectId
from django.db import connections

class Command(BaseCommand):
    help = 'Seed official certifications and partners for the home page'

    def handle(self, *args, **options):
        # 1. Certifications
        certifications_data = [
            {"label": "IRB-approved studies"},
            {"label": "GCP-trained staff"},
            {"label": "HIPAA-compliant systems"},
            {"label": "CLIA/COLA partner laboratory"},
            {"label": "SOP-driven operations"},
            {"label": "ISO Certification"},
            {"label": "GLP Certification"}
        ]

        # 2. Partners (logos only requested)
        partners_data = [
            {"name": "University of South Florida", "category": "Academic"},
            {"name": "Tampa General Hospital", "category": "Academic"},
            {"name": "Global Pharma Solutions", "category": "Industry"},
            {"name": "BioTech Innovations Inc.", "category": "Industry"},
            {"name": "Clinical Research Alliance", "category": "CRO"},
            {"name": "MedTrials Network", "category": "CRO"},
            {"name": "Tampa Bay Health Foundation", "category": "Community"}
        ]

        connection = connections['default']
        cert_coll = connection.get_collection('api_certification')
        part_coll = connection.get_collection('api_partner')
        
        # Clear existing
        cert_coll.delete_many({})
        part_coll.delete_many({})
        
        # Insert Certs
        for idx, data in enumerate(certifications_data):
            oid = ObjectId()
            cert_coll.insert_one({
                '_id': oid,
                'id': oid, 
                'label': data["label"],
                'display_order': (idx + 1) * 10,
                'is_active': True,
                'image_url': ''
            })

        # Insert Partners
        for idx, data in enumerate(partners_data):
            oid = ObjectId()
            part_coll.insert_one({
                '_id': oid,
                'id': oid, 
                'name': data["name"],
                'category': data["category"],
                'display_order': (idx + 1) * 10,
                'is_active': True,
                'website_url': ''
            })
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(certifications_data)} certs and {len(partners_data)} partners.'))
