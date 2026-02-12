import React, { useState, useEffect } from 'react';
import {
    Microscope, Beaker, Archive, ArrowRight, ShieldCheck, Star,
    ChevronDown, ChevronUp, FileText, Activity, Layers, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchFacilitiesPageData, submitSponsorInquiry } from '../api';

export default function Facilities() {
    const [data, setData] = useState<any>(null);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formState, setFormState] = useState({
        name: '', email: '', company: '', role: '',
        interest: 'Research', stage: 'Concept'
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchFacilitiesPageData()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch facilities data", err);
                setLoading(false);
            });
    }, []);

    const toggleAccordion = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            await submitSponsorInquiry({
                name: formState.name,
                email: formState.email,
                company: formState.company,
                // Mapping fields to backend model expectation (using notes/message for extra fields)
                inquiry_type: 'general',
                message: `Role: ${formState.role}\nInterest: ${formState.interest}\nStage: ${formState.stage}\n\n(Submitted via Facilities Page)`,
                technology: null
            });
            setFormStatus('success');
            setFormState({ name: '', email: '', company: '', role: '', interest: 'Research', stage: 'Concept' });
        } catch (err) {
            setFormStatus('error');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-500">Loading Infrastructure...</div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">Failed to load content.</div>;

    const { settings, pillars, modules, trust_badges, success_signals } = data;

    // Helper to get icon component
    const getIcon = (name: string) => {
        const icons: any = { Microscope, Beaker, Archive, ArrowRight, ShieldCheck, Star, FileText, Activity, Layers, Database };
        return icons[name] || Activity;
    };

    return (
        <div className="min-h-screen font-sans text-slate-200 relative overflow-hidden selection:bg-cyan-500/30">
            {/* Atmospheric Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]"></div>
            </div>

            {/* 1) PAGE HEADER + HERO (Above Fold) */}
            <header className="relative pt-32 pb-20 px-6">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8 animate-in slide-in-from-left duration-700">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                            {settings.hero_title}
                        </h1>
                        <div className="space-y-4 text-lg text-slate-400 font-medium">
                            <p className="border-l-4 border-cyan-500 pl-4">{settings.hero_subtext_1}</p>
                            <p>{settings.hero_subtext_2}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="#lead-capture" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl font-bold uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/20">
                                Start a Project
                            </a>
                            <button className="flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all font-bold text-cyan-400 uppercase tracking-wide">
                                <FileText className="w-5 h-5" /> Capabilities Deck
                            </button>
                        </div>
                    </div>

                    {/* Hero Image / Visual */}
                    <div className="relative animate-in slide-in-from-right duration-700 delay-200">
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 relative group">
                            {settings.hero_image ? (
                                <img src={settings.hero_image} alt="Facilities" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                                    <Microscope className="w-20 h-20 opacity-20" />
                                </div>
                            )}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</div>
                                <div className="text-white font-bold">GLP & GCP Ready</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* "Choose Your Support" Lead Router */}
            <section className="relative z-20 -mt-10 px-6 pb-24">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <Link to="#research" onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' }); }} className="group bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20">
                        <div className="w-14 h-14 bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                            <Microscope className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Research & Innovation</h3>
                        <p className="text-slate-400 mb-6">Discovery through clinical trials.</p>
                        <div className="flex items-center text-cyan-400 font-bold uppercase text-sm tracking-wider group-hover:text-cyan-300">
                            Discuss Research <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link to="#lab" onClick={(e) => { e.preventDefault(); document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' }); }} className="group bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20">
                        <div className="w-14 h-14 bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <Beaker className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Central Lab Services</h3>
                        <p className="text-slate-400 mb-6">Biomarker & molecular testing.</p>
                        <div className="flex items-center text-indigo-400 font-bold uppercase text-sm tracking-wider group-hover:text-indigo-300">
                            Request Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 3 */}
                    <Link to="#bio" onClick={(e) => { e.preventDefault(); document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' }); }} className="group bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-purple-500/50 p-8 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20">
                        <div className="w-14 h-14 bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Archive className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Biorepository</h3>
                        <p className="text-slate-400 mb-6">Secure sample storage & tracking.</p>
                        <div className="flex items-center text-purple-400 font-bold uppercase text-sm tracking-wider group-hover:text-purple-300">
                            Explore Storage <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </section>

            {/* 2) PILLAR SECTION A: RESEARCH & INNOVATION */}
            <section id="research" className="py-24 px-6 relative border-t border-slate-900">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm">{settings.research_pillar_title}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">{settings.research_pillar_desc}</h2>
                        <div className="flex justify-center gap-4">
                            <a href="#lead-capture" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">Discuss a Research Plan</a>
                            <button className="text-slate-400 font-bold hover:text-white transition-colors">See Example Designs</button>
                        </div>
                    </div>

                    {/* Modules (Accordion + Split) */}
                    <div className="space-y-24">
                        {modules.filter((m: any) => m.pillar === 'Research').map((module: any, idx: number) => (
                            <div key={module.id} className={`flex flex-col lg:flex-row gap-12 items-center ${module.layout === 'ImageLeft' ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Text Content */}
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                                {/* Fallback Icon logic could be enhanced if icon_name was in model */}
                                                <Microscope className="w-5 h-5" />
                                            </div>
                                            {module.badge_label && <span className="text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-800 px-2 py-1 rounded">{module.badge_label}</span>}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white">{module.title}</h3>
                                        <p className="text-xl text-slate-400">{module.one_line_summary}</p>
                                    </div>

                                    {/* Accordion */}
                                    <div className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden">
                                        <button
                                            onClick={() => toggleAccordion(module.id)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                                        >
                                            <span className="font-bold text-slate-300">View Details</span>
                                            {activeAccordion === module.id ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                        </button>
                                        {activeAccordion === module.id && (
                                            <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                                                <p className="mb-4">{module.description}</p>
                                                <ul className="grid sm:grid-cols-2 gap-2">
                                                    {module.micro_bullets.map((bullet: string, i: number) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 relative group">
                                        {module.image ? (
                                            <img src={module.image} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700">
                                                <Activity className="w-20 h-20" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3) PILLAR SECTION B: CENTRAL LAB */}
            <section id="lab" className="py-24 px-6 relative bg-slate-900/30 border-t border-slate-800">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">{settings.lab_pillar_title}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">{settings.lab_pillar_desc}</h2>
                        <div className="flex justify-center gap-4">
                            <a href="#lead-capture" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">Request Lab Services</a>
                        </div>
                    </div>

                    <div className="space-y-24">
                        {modules.filter((m: any) => m.pillar === 'Lab').map((module: any) => (
                            <div key={module.id} className={`flex flex-col lg:flex-row gap-12 items-center ${module.layout === 'ImageLeft' ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                                                <Beaker className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">{module.title}</h3>
                                        </div>
                                        <p className="text-xl text-slate-400">{module.one_line_summary}</p>
                                    </div>
                                    <div className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden">
                                        <button onClick={() => toggleAccordion(module.id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
                                            <span className="font-bold text-slate-300">View Capabilities</span>
                                            {activeAccordion === module.id ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                        </button>
                                        {activeAccordion === module.id && ( // Reusing logic but could customize per pillar
                                            <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                                                <p className="mb-4">{module.description}</p>
                                                <ul className="grid sm:grid-cols-2 gap-2">
                                                    {module.micro_bullets.map((bullet: string, i: number) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900">
                                        {module.image ? <img src={module.image} className="w-full h-full object-cover" /> : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4) PILLAR SECTION C: BIOREPOSITORY */}
            <section id="bio" className="py-24 px-6 relative border-t border-slate-800">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">{settings.bio_pillar_title}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">{settings.bio_pillar_desc}</h2>
                        <div className="flex justify-center gap-4">
                            <a href="#lead-capture" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">Explore Biorepository</a>
                        </div>
                    </div>
                    <div className="space-y-24">
                        {modules.filter((m: any) => m.pillar === 'Biorepository').map((module: any) => (
                            <div key={module.id} className={`flex flex-col lg:flex-row gap-12 items-center ${module.layout === 'ImageLeft' ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400 border border-purple-500/30">
                                                <Archive className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">{module.title}</h3>
                                        </div>
                                        <p className="text-xl text-slate-400">{module.one_line_summary}</p>
                                    </div>
                                    {/* Accordion Logic (Shared) */}
                                    <div className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden">
                                        <button onClick={() => toggleAccordion(module.id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
                                            <span className="font-bold text-slate-300">View Storage specs</span>
                                            {activeAccordion === module.id ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                        </button>
                                        {activeAccordion === module.id && (
                                            <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                                                <p className="mb-4">{module.description}</p>
                                                <ul className="grid sm:grid-cols-2 gap-2">
                                                    {module.micro_bullets.map((bullet: string, i: number) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900">
                                        {module.image ? <img src={module.image} className="w-full h-full object-cover" /> : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5) CROSS-PILLAR TRUST STRIP */}
            <section className="py-16 border-y border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 px-6">
                    {trust_badges.map((badge: any, i: number) => {
                        const Icon = getIcon(badge.icon);
                        return (
                            <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                <Icon className="w-6 h-6 text-cyan-500" />
                                <span className="font-bold text-lg text-slate-300 uppercase tracking-wide">{badge.label}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 6) SUCCESS SIGNALS */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Why Sponsors Choose MusB</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {success_signals.map((signal: any, i: number) => {
                        const Icon = getIcon(signal.icon);
                        return (
                            <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
                                <Icon className="w-12 h-12 text-cyan-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">{signal.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{signal.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* 7) FINAL LEAD CAPTURE (Conversion Section) */}
            <section id="lead-capture" className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ready to Move Faster With Better Evidence?</h2>
                        <p className="text-xl text-slate-400">We can support research, testing, and biospecimen management—individually or as an integrated program.</p>
                        <ul className="space-y-4 pt-4">
                            {['Integrated Preclinical & Clinical', 'Sponsor-Ready Reporting', 'Regulatory Compliance'].map(item => (
                                <li key={item} className="flex items-center gap-3 font-bold text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full"></div>
                        <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Start the Conversation</h3>

                        {formStatus === 'success' ? (
                            <div className="text-center py-12 space-y-4 animate-in fade-in">
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h4 className="text-2xl font-bold text-white">Inquiry Received</h4>
                                <p className="text-slate-400">Our team will review your project needs and contact you shortly.</p>
                                <button onClick={() => setFormStatus('idle')} className="text-cyan-400 font-bold underline">Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">I'm Interested In</label>
                                        <select
                                            value={formState.interest}
                                            onChange={e => setFormState({ ...formState, interest: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        >
                                            <option>Research & Innovation</option>
                                            <option>Central Lab Services</option>
                                            <option>Biorepository</option>
                                            <option>Not sure (Help me choose)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Project Stage</label>
                                        <select
                                            value={formState.stage}
                                            onChange={e => setFormState({ ...formState, stage: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        >
                                            <option>Concept</option>
                                            <option>Preclinical</option>
                                            <option>Clinical</option>
                                            <option>Post-Market / Commercial</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                    <input
                                        type="text" required
                                        value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                                        placeholder="Dr. Jane Smith"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
                                        <input
                                            type="email" required
                                            value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                                            placeholder="jane@company.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</label>
                                        <input
                                            type="text"
                                            value={formState.company} onChange={e => setFormState({ ...formState, company: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                                            placeholder="BioTech Inc."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : 'Request Consultation'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
