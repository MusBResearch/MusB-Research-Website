import { TeamMember, ResearchCapability, Facility, Study } from './types';

export const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Dr. Jane Doe',
        role: 'Principal Investigator',
        bio: 'Leading research in musculoskeletal biology for over 15 years.',
    },
    {
        id: '2',
        name: 'Dr. John Smith',
        role: 'Senior Researcher',
        bio: 'Specialist in bone biomechanics and regeneration.',
    }
];

export const capabilities: ResearchCapability[] = [
    {
        id: '1',
        title: 'Genomics',
        description: 'Advanced genomic sequencing and analysis for musculoskeletal traits.',
        icon: 'dna'
    },
    {
        id: '2',
        title: 'Imaging',
        description: 'High-resolution imaging including MicroCT and MRI.',
        icon: 'microscope'
    }
];

export const facilities: Facility[] = [
    {
        id: '1',
        name: 'Main Lab',
        description: 'State-of-the-art molecular biology laboratory.',
        features: ['PCR Machines', 'Cell Culture Hoods', 'Cryorage']
    }
];

export const studies: Study[] = [
    {
        id: '1',
        title: 'Gut Microbiome & Bone Health',
        condition: 'Gut',
        compensation: '$50 - $150',
        duration: '4 Weeks',
        isPaid: true,
        isFreeTesting: true
    },
    {
        id: '2',
        title: 'Cognitive Function in Aging',
        condition: 'Brain',
        compensation: '$200',
        duration: '3 Months',
        isPaid: true,
        isFreeTesting: false
    },
    {
        id: '3',
        title: 'Metabolic Markers Study',
        condition: 'Metabolic',
        compensation: 'Free Analysis',
        duration: '1 Visit',
        isPaid: false,
        isFreeTesting: true
    },
    {
        id: '4',
        title: 'Women’s Bone Density Study',
        condition: 'Women’s Health',
        compensation: '$100',
        duration: '6 Weeks',
        isPaid: true,
        isFreeTesting: true
    }
];
