from django.core.management.base import BaseCommand
from api.models import Facility
from bson import ObjectId
from django.db import connections

class Command(BaseCommand):
    help = 'Seed the 7 official facilities for the home page'

    def handle(self, *args, **options):
        facilities_data = [
            {"name": "Multidisciplinary Clinical Research Site", "description": "Phase I–IV clinical infrastructure"},
            {"name": "Participant-Friendly Clinics", "description": "Designed for comfort and efficiency"},
            {"name": "Biorepository", "description": "Secure biospecimen processing and storage"},
            {"name": "Sample Processing Facilities", "description": "High-throughput biomarker processing"},
            {"name": "Secure Data and IT Systems", "description": "HIPAA-compliant data management"},
            {"name": "Mobile Clinic and Phlebotomy Services", "description": "Bringing research to the community"},
            {"name": "Metabolic Chambers", "description": "Precision energy expenditure measurement"}
        ]

        # Use refined access to database to avoid the Django-MongoDB 'id: null' collision
        connection = connections['default']
        coll = connection.get_collection('api_facility')
        
        # Clear collection
        coll.delete_many({})
        
        count = 0
        for idx, data in enumerate(facilities_data):
            oid = ObjectId()
            coll.insert_one({
                '_id': oid,
                'id': oid, 
                'name': data["name"],
                'description': data["description"],
                'display_order': (idx + 1) * 10,
                'is_active': True,
                'features': []
            })
            count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} facilities.'))
