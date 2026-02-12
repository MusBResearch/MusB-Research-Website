import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Microscope, Brain, GraduationCap, Database, Workflow, HeartPulse,
    FlaskConical, Beaker, ShieldCheck, Zap, Target, Users, RefreshCcw, Lightbulb,
    Globe, Award, BookOpen, Layers, CheckCircle2, Sparkles, Eye, Heart
} from 'lucide-react';
import { fetchAboutSettings } from '../api';

// Icon lookup map for dynamic rendering from backend data
const iconMap: Record<string, React.ElementType> = {
    brain: Brain, microscope: Microscope, 'graduation-cap': GraduationCap,
    database: Database, workflow: Workflow, 'heart-pulse': HeartPulse,
    'flask-conical': FlaskConical, beaker: Beaker, 'shield-check': ShieldCheck,
    zap: Zap, target: Target, users: Users, 'refresh-ccw': RefreshCcw,
    lightbulb: Lightbulb, globe: Globe, award: Award, 'book-open': BookOpen,
    layers: Layers, sparkles: Sparkles, eye: Eye, heart: Heart,
};

const getIcon = (name: string) => iconMap[name] || Globe;

// Default trust indicators (used when backend doesn't provide them)
const defaultTrustIndicators = [
    { icon: 'brain', title: "Multidisciplinary Expertise", description: "Clinical and preclinical research expertise across diverse therapeutic areas." },
    { icon: 'graduation-cap', title: "Academia-Affiliated", description: "Led by academia-affiliated scientists and board-certified clinicians." },
    { icon: 'database', title: "Integrated Services", description: "Integrated research, lab, and biorepository services for seamless project execution." },
    { icon: 'workflow', title: "End-to-End Support", description: "Comprehensive research support from discovery to validation." },
    { icon: 'heart-pulse', title: "Ethical & Community-Focused", description: "Commitment to community-focused, transparent, and ethical research practices." }
];

// Default three ways cards
const defaultThreeWays = [
    {
        icon: 'flask-conical', title: 'Research & Innovation', color: 'cyan',
        who: 'Biotech, nutrition, pharma, ingredient, and wellness companies seeking scientific validation.',
        deliverables: ['Preclinical screening and mechanistic studies', 'In vitro, C. elegans, and animal models', 'Human clinical trials and translational research', 'Biomarkers, microbiome, and functional outcomes'],
        quote: 'We turn scientific concepts into credible evidence that informs product development, claims, and commercialization.',
        cta_text: 'Discuss a Research Project', cta_link: '/contact'
    },
    {
        icon: 'microscope', title: 'Central Laboratory Services', color: 'indigo',
        who: 'Sponsors needing reliable, compliant testing to support research and clinical studies.',
        deliverables: ['Clinical and research biomarker testing', 'ELISA, proteomics, real-time PCR', 'Microbiome and molecular analysis', 'SOP-driven workflows with sponsor-ready reporting'],
        quote: 'Our central lab services ensure accuracy, reproducibility, and data integrity across preclinical and clinical programs.',
        cta_text: 'Request Laboratory Services', cta_link: '/contact'
    },
    {
        icon: 'database', title: 'Biorepository', color: 'blue',
        who: 'Organizations managing biological samples across studies, sites, or timepoints.',
        deliverables: ['Sample processing, labeling, and tracking', 'Secure, long-term storage under controlled conditions', 'Support for longitudinal and multi-omics studies', 'Retrieval and chain-of-custody documentation'],
        quote: 'Our biorepository protects the long-term value of your samples and supports future discovery and regulatory needs.',
        cta_text: 'Explore Biorepository Support', cta_link: '/contact'
    }
];

// Default core values
const defaultCoreValues = [
    { icon: 'shield-check', name: 'Integrity', description: 'We uphold the highest standards of scientific and ethical conduct in every study we perform.' },
    { icon: 'zap', name: 'Innovation', description: 'We continuously push boundaries, leveraging emerging technologies and novel approaches.' },
    { icon: 'users', name: 'Collaboration', description: 'We work as an extension of your team, aligning with your goals and timelines.' },
    { icon: 'target', name: 'Responsibility', description: 'We take ownership of outcomes and ensure every project meets the highest quality standards.' },
    { icon: 'refresh-ccw', name: 'Continuous Improvement', description: 'We learn from every study to refine our processes and deliver ever-better results.' },
    { icon: 'heart', name: 'Community Impact', description: 'We are driven by the belief that ethical research can transform public health and wellbeing.' }
];

// Default partner features
const defaultPartnerFeatures = [
    { icon: 'layers', title: 'Full-Spectrum Services', description: 'From discovery to clinical validation, we cover every stage of the research lifecycle.' },
    { icon: 'users', title: 'Dedicated Project Teams', description: 'Your study is led by named scientists who understand your therapeutic area.' },
    { icon: 'zap', title: 'Operational Agility', description: 'Lean teams, fast timelines, and adaptive protocols that keep your program moving.' },
    { icon: 'shield-check', title: 'Regulatory Confidence', description: 'GLP/GCP-compliant workflows and sponsor-ready documentation and reporting.' }
];

export default function WhyChooseUs() {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetchAboutSettings()
            .then(data => setSettings(data))
            .catch(() => setSettings(null)); // Fall back to defaults
    }, []);

    // Use backend data if available, otherwise defaults
    const trustIndicators = settings?.trust_indicators?.length ? settings.trust_indicators : defaultTrustIndicators;
    const threeWays = settings?.three_ways_cards?.length ? settings.three_ways_cards : defaultThreeWays;
    const coreValues = settings?.core_values?.length ? settings.core_values : defaultCoreValues;
    const partnerFeatures = settings?.partner_features?.length ? settings.partner_features : defaultPartnerFeatures;
    const heroTagline = settings?.hero_tagline || 'Scientist-Led Growth';
    const heroTitle = settings?.hero_title || 'Your Science Partner for <span class="text-cyan-400">Evidence-Driven</span> Growth';
    const heroDesc = settings?.hero_description || "At MusB™ Research, we don't just run studies—we help you understand your product's strengths, limitations, and real-world impact so you can make the best scientific, business, and health decisions.";
    const storyTitle = settings?.story_title || 'Our Story';
    const storyContent = settings?.story_content || "MusB™ Research was founded with a singular vision: to bridge the gap between groundbreaking scientific discovery and real-world health impact. Born from a deep commitment to scientific rigor and community wellbeing, our team of scientists, clinicians, and innovators has built a platform that empowers companies to develop products with credible, evidence-based claims.\n\nFrom humble beginnings to a 20,000+ sq. ft. research complex, we've grown to serve sponsors worldwide — while staying true to our founding principle: that great science should serve everyone.";
    const partnerTitle = settings?.partner_title || 'Your Extended R&D Partner';
    const partnerContent = settings?.partner_content || 'We operate as a seamless extension of your internal team, providing deep scientific expertise, operational agility, and end-to-end project management.';
    const missionTitle = settings?.mission_title || 'Our Mission';
    const missionContent = settings?.mission_content || 'To advance human health through rigorous, ethical, and innovative research that bridges scientific discovery with real-world impact.';
    const visionTitle = settings?.vision_title || 'Our Vision';
    const visionContent = settings?.vision_content || 'To be the most trusted name in translational and clinical research, setting the global standard for scientific integrity and innovation.';

    const colorMap: Record<string, { accent: string; bg: string; glow: string; dot: string }> = {
        cyan: { accent: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-[0_0_8px_rgba(34,211,238,0.6)]', dot: 'bg-cyan-400' },
        indigo: { accent: 'text-indigo-400', bg: 'bg-indigo-500/10', glow: 'shadow-[0_0_8px_rgba(129,140,248,0.6)]', dot: 'bg-indigo-400' },
        blue: { accent: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-[0_0_8px_rgba(96,165,250,0.6)]', dot: 'bg-blue-400' },
    };

    return (
        <div className="min-h-screen font-sans text-slate-200 relative overflow-hidden">
            {/* Atmospheric Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 space-y-0 pt-40 pb-24 animate-in fade-in duration-1000">

                {/* ============================================================ */}
                {/* SECTION 1: Hero */}
                {/* ============================================================ */}
                <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold text-xs tracking-widest uppercase">
                                <Microscope className="w-4 h-4" /> {heroTagline}
                            </div>
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] uppercase"
                                dangerouslySetInnerHTML={{ __html: heroTitle }}
                            />
                            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                                {heroDesc}
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <Link to="/contact" className="grow-0 bg-cyan-500 text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2">
                                    Start the Conversation <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/capabilities" className="grow-0 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center gap-2">
                                    Explore Our Capabilities
                                </Link>
                            </div>
                        </div>
                        <div className="relative animate-fade-in-up stagger-1">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 rounded-[4rem] blur-[80px]"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-4 overflow-hidden shadow-2xl group">
                                <img
                                    src="/mission_innovation.png"
                                    alt="Clinical Research"
                                    className="w-full h-[500px] object-cover rounded-[3.5rem] brightness-90 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-x-8 bottom-8 p-10 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-white/10 space-y-3">
                                    <h4 className="text-white font-black text-xl uppercase tracking-wider">Mission-Driven Innovation</h4>
                                    <p className="text-slate-400 text-lg font-medium">Empowering brands with credible scientific substantiation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 2: Three Ways We Support Your Program */}
                {/* ============================================================ */}
                {(settings?.show_three_ways_section !== false) && (
                    <section className="py-16 relative z-10 mb-16">
                        <div className="max-w-[1700px] mx-auto px-6 md:px-12">
                            <div className="text-center space-y-8 mb-24 max-w-7xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                                    {settings?.three_ways_title || 'Three Ways MusB™ Research Supports Your Program'}
                                </h2>
                                {(settings?.three_ways_subtitle) && (
                                    <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
                                        {settings.three_ways_subtitle}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {threeWays.map((card: any, idx: number) => {
                                    const colors = colorMap[card.color] || colorMap.cyan;
                                    const IconComp = getIcon(card.icon);
                                    return (
                                        <div key={idx} className="group relative bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-700 flex flex-col">
                                            <div className={`w-20 h-20 mb-10 rounded-3xl ${colors.bg} flex items-center justify-center ${colors.accent} group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500 shadow-xl`}>
                                                <IconComp className="w-10 h-10" />
                                            </div>
                                            <h3 className={`text-3xl font-black text-white mb-8 group-hover:${colors.accent} transition-colors`}>{card.title}</h3>
                                            <div className="space-y-8 flex-grow">
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Who it's for:</h4>
                                                    <p className="text-slate-300 font-bold leading-relaxed">{card.who}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">What we deliver:</h4>
                                                    <ul className="space-y-4">
                                                        {card.deliverables?.map((item: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-2 ${colors.glow}`}></div>
                                                                <span className="text-slate-400 text-sm font-medium">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {card.quote && (
                                                    <div className={`p-6 rounded-2xl ${card.color === 'indigo' ? 'bg-indigo-400/5 border border-indigo-400/10' : card.color === 'blue' ? 'bg-blue-400/5 border border-blue-400/10' : 'bg-cyan-400/5 border border-cyan-400/10'}`}>
                                                        <p className={`text-xs ${card.color === 'indigo' ? 'text-indigo-200/80' : card.color === 'blue' ? 'text-blue-200/80' : 'text-cyan-200/80'} leading-relaxed italic`}>
                                                            {card.quote}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <Link to={card.cta_link || '/contact'} className={`mt-12 w-full ${card.color === 'indigo' ? 'bg-indigo-500' : card.color === 'blue' ? 'bg-blue-500' : 'bg-cyan-500'} text-slate-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group/btn`}>
                                                {card.cta_text || 'Learn More'}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 3: Our Story */}
                {/* ============================================================ */}
                {(settings?.show_story_section !== false) && (
                    <section className="py-32 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                            <div className="grid lg:grid-cols-2 gap-20 items-center">
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-400/10 border border-indigo-400/20 text-indigo-400 font-bold text-xs tracking-widest uppercase">
                                        <BookOpen className="w-4 h-4" /> About MusB™
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                                        {storyTitle}
                                    </h2>
                                    {storyContent.split('\n\n').map((para: string, i: number) => (
                                        <p key={i} className="text-lg text-slate-400 font-medium leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                                <div className="relative animate-fade-in-up stagger-1">
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-3xl opacity-50 rounded-[4rem]"></div>
                                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-6 overflow-hidden shadow-2xl">
                                        <div className="aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                                            <FlaskConical className="w-32 h-32 text-indigo-400/20" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                                            <div className="absolute bottom-8 left-8 right-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                                        <Award className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-sm uppercase tracking-wider">20,000+ sq. ft.</p>
                                                        <p className="text-slate-400 text-xs">Research Complex</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 4: Extended R&D Partner */}
                {/* ============================================================ */}
                {(settings?.show_partner_section !== false) && (
                    <section className="py-24 relative z-10 bg-slate-900/30 border-y border-white/5">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                            <div className="text-center space-y-6 mb-20">
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                                    {partnerTitle}
                                </h2>
                                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
                                    {partnerContent}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {partnerFeatures.map((feature: any, idx: number) => {
                                    const IconComp = getIcon(feature.icon);
                                    return (
                                        <div key={idx} className="p-8 rounded-[2.5rem] bg-slate-950/50 border border-white/5 hover:bg-slate-900 hover:border-cyan-500/30 transition-all duration-500 group flex flex-col items-center text-center gap-5 shadow-2xl">
                                            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500">
                                                <IconComp className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                                                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 5: Mission & Vision */}
                {/* ============================================================ */}
                {(settings?.show_mission_vision_section !== false) && (
                    <section className="py-32 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Mission */}
                                <div className="p-16 rounded-[4rem] bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent border border-white/5 backdrop-blur-3xl space-y-8 group hover:border-cyan-500/30 transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/10 transition-colors"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500">
                                        <Target className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{missionTitle}</h3>
                                    <p className="text-lg text-slate-400 font-medium leading-relaxed">{missionContent}</p>
                                </div>
                                {/* Vision */}
                                <div className="p-16 rounded-[4rem] bg-gradient-to-br from-indigo-500/10 via-slate-900/50 to-transparent border border-white/5 backdrop-blur-3xl space-y-8 group hover:border-indigo-500/30 transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-900 transition-all duration-500">
                                        <Eye className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{visionTitle}</h3>
                                    <p className="text-lg text-slate-400 font-medium leading-relaxed">{visionContent}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 6: Core Values */}
                {/* ============================================================ */}
                {(settings?.show_core_values_section !== false) && (
                    <section className="py-24 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                            <div className="text-center space-y-6 mb-20">
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Our Core Values</h2>
                                <div className="h-1.5 w-24 bg-cyan-500 mx-auto rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {coreValues.map((value: any, idx: number) => {
                                    const IconComp = getIcon(value.icon);
                                    return (
                                        <div key={idx} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 group flex flex-col gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500">
                                                <IconComp className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-xl font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{value.name}</h3>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed">{value.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 7: Trust Indicators / Why Partner With Us */}
                {/* ============================================================ */}
                {(settings?.show_trust_indicators !== false) && (
                    <section className="py-24 relative z-10 bg-slate-900/40 backdrop-blur-3xl border-y border-white/5">
                        <div className="max-w-[1700px] mx-auto px-6 md:px-12">
                            <div className="text-center space-y-6 mb-20">
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                                    {settings?.why_choose_title || 'Why Partner With Us'}
                                </h2>
                                <div className="h-1.5 w-24 bg-cyan-500 mx-auto rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                                {trustIndicators.map((item: any, idx: number) => {
                                    const IconComponent = getIcon(item.icon);
                                    return (
                                        <div key={idx} className="p-8 rounded-[2.5rem] bg-slate-950/50 border border-white/5 hover:bg-slate-900 hover:border-cyan-500/30 transition-all duration-500 group flex flex-col items-center text-center gap-5 shadow-2xl">
                                            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500">
                                                <IconComponent className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ============================================================ */}
                {/* SECTION 8: Final Call to Action */}
                {/* ============================================================ */}
                {(settings?.show_final_cta !== false) && (
                    <section className="max-w-[1400px] mx-auto px-6 md:px-12 text-center space-y-12 py-32">
                        <div className="space-y-6">
                            <p className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tighter">
                                Choosing MusB™ Research means partnering with a leader in <span className="text-cyan-400">scientific innovation</span>, flexibility, and execution excellence.
                            </p>
                            <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                                We deliver tailored, responsive, and cost-effective solutions—without compromising scientific rigor.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6 justify-center pt-4">
                            <Link to="/contact" className="bg-cyan-500 text-slate-900 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2">
                                Get In Touch <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/trials" className="bg-white/5 text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center gap-2">
                                Join a Study
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
