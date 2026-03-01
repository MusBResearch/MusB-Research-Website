from django.core.management.base import BaseCommand
from api.models import AboutPageSettings

class Command(BaseCommand):
    help = 'Update About Page Settings with new content'

    def handle(self, *args, **options):
        self.stdout.write('Updating About Page Settings...')
        
        settings = AboutPageSettings.load()
        
        # 1. Update Hero/Vertical Spacing isn't directly in DB (it's CSS), 
        # but we can update the hero description if needed.
        # Actually the user only asked for Three Ways and Our Story content updates in the DB.
        
        # 2. Update Three Ways Section
        settings.three_ways_title = 'Three Integrated Ways We Support Your Innovation'
        settings.three_ways_subtitle = 'MusB Research offers flexible, end-to-end support—whether you need discovery research, laboratory testing, or secure sample management.'
        settings.three_ways_cards = [
            {
                "icon": "flask-conical", 
                "title": "Research & Innovation", 
                "color": "cyan",
                "tagline": "From ideas to evidence.",
                "description": "We design and execute rigorous preclinical and clinical research programs to scientifically substantiate your products. Our expertise spans discovery, mechanistic validation, efficacy, safety, and translational studies.",
                "deliverables": [
                    "In vitro and in vivo research", 
                    "Human clinical trials", 
                    "Microbiome, biotics, aging, and metabolic health research", 
                    "Biomarkers, functional outcomes, and data interpretation"
                ],
                "cta_text": "Discuss a Research Project", 
                "cta_link": "/contact"
            },
            {
                "icon": "microscope", 
                "title": "Central Laboratory Services", 
                "color": "indigo",
                "tagline": "Data you can trust.",
                "description": "Our central laboratory services deliver accurate, reproducible, and compliant testing to support research, clinical studies, and product validation.",
                "deliverables": [
                    "ELISA, proteomics, and real-time PCR", 
                    "Microbiome and molecular analysis", 
                    "SOP-driven workflows and sponsor-ready reporting"
                ],
                "cta_text": "Request Laboratory Support", 
                "cta_link": "/contact"
            },
            {
                "icon": "database", 
                "title": "Biorepository", 
                "color": "blue",
                "tagline": "Protecting the long-term value of your samples.",
                "description": "We provide secure biospecimen processing, tracking, and storage to support longitudinal research, multi-omics analysis, and future regulatory needs.",
                "deliverables": [
                    "Sample processing and standardized storage", 
                    "Chain-of-custody and retrieval", 
                    "Support for multi-site and long-term studies"
                ],
                "cta_text": "Explore Biorepository Services", 
                "cta_link": "/contact"
            }
        ]
        
        # 3. Update Our Story Section
        settings.story_title = 'Our Story'
        settings.story_content = (
            "MusB Research was founded by highly experienced scientists with a shared mission: "
            "to elevate the scientific integrity of products reaching the market.\n\n"
            "Led by world-renowned experts including Dr. Hariom Yadav and Dr. Shalini Jain, "
            "MusB Research was created to support innovators who value evidence, transparency, and responsible growth.\n\n"
            "We believe every product in the market should be scientifically understood—not just for its benefits, "
            "but also for its limitations. This clarity empowers better business decisions, better healthcare choices, "
            "and greater public trust.\n\n"
            "We do not differentiate between large and small partners. "
            "We treat every collaboration with the same scientific rigor, commitment, and respect."
        )

        # 4. Update Extended R&D Partner Section
        settings.partner_title = 'An Extension of Your R&D Team'
        settings.partner_content = (
            "MusB Research functions as an extension of your internal R&D—providing facilities, expertise, and resources that scale with your needs.\n\n"
            "Whether you are an early-stage innovator or an established global brand, we integrate seamlessly with your team to deliver credible, actionable science."
        )
        settings.partner_features = [
            {"icon": "layers", "title": "Flexible engagement models", "description": "Tailored partnerships that align with your specific research objectives and budget."},
            {"icon": "users", "title": "Scalable support", "description": "Infrastructure and expertise that grows alongside your startups or global enterprise."},
            {"icon": "zap", "title": "Transparent collaboration", "description": "Clear communication and seamless integration with your internal research teams."},
            {"icon": "shield-check", "title": "Science-first execution", "description": "Marketing-aware research that maintains the highest levels of scientific integrity."}
        ]
        
        # 5. Update Mission Section
        settings.mission_title = 'Our Mission'
        settings.mission_content = (
            "MusB Research is committed to being your growth partner by providing robust, reliable scientific evidence for your products. "
            "We are passionate about supporting your success through meticulous research, innovative approaches, and uncompromising scientific integrity."
        )
        
        # 6. Update Vision Section
        settings.vision_title = 'Our Vision'
        settings.vision_content = "We envision becoming a global leader in healthcare research—driving groundbreaking innovations that enhance public health and well-being for all."
        
        # 7. Update Core Values
        settings.core_values = [
            {"icon": "star", "name": "Excellence", "description": "We pursue the highest standards to ensure exceptional quality and reliability."},
            {"icon": "shield-check", "name": "Integrity", "description": "We uphold ethical research practices built on transparency and trust."},
            {"icon": "zap", "name": "Innovation", "description": "We embrace cutting-edge technologies and forward-thinking approaches."},
            {"icon": "users", "name": "Collaboration", "description": "We work closely with our partners to drive shared success."},
            {"icon": "heart", "name": "Commitment", "description": "We are dedicated to advancing public health through rigorous science."},
            {"icon": "target", "name": "Client Focus", "description": "We deliver personalized, tailored solutions aligned with your goals."},
            {"icon": "refresh-cw", "name": "Continuous Improvement", "description": "We constantly refine our methods through learning and evaluation."},
            {"icon": "globe", "name": "Responsibility", "description": "We ensure our research contributes positively to society and global health."},
            {"icon": "flame", "name": "Passion", "description": "We are driven by a deep passion for science and innovation."},
            {"icon": "check-circle", "name": "Quality", "description": "We ensure excellence through meticulous attention to detail and quality control."}
        ]
        
        settings.save()
        self.stdout.write(self.style.SUCCESS('✓ About Page Settings updated successfully'))
