export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl?: string;
}

export interface ResearchCapability {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Facility {
    id: string;
    name: string;
    description: string;
    features: string[];
}

export type Condition = 'Gut' | 'Brain' | 'Metabolic' | 'Aging' | 'Women’s Health' | 'Cancer Support';

export interface Study {
    id: string;
    title: string;
    condition: Condition;
    compensation: string;
    duration: string;
    isPaid: boolean;
    isFreeTesting: boolean;
}
