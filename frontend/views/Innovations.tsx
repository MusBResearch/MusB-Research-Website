import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Zap, TrendingUp, FlaskConical, Shield, ArrowRight, Target, FileText, BookOpen, Newspaper, Paperclip, Mail } from 'lucide-react';

import { useState, useEffect } from 'react';
import { fetchTechnologies } from '../api';

const defaultTechnologies = [
    {
        name: "IncreLac™",
        tagline: "GLP-1 Promoting Probiotics",
        positioning: "A next-generation probiotic platform designed to support endogenous GLP-1 stimulation for metabolic health and weight management.",
        focusAreas: ["Metabolic health", "GLP-1 signaling pathways", "Gut–endocrine axis"],
        includes: [
            { icon: FileText, text: "Scientific data & summaries" },
            { icon: BookOpen, text: "Publications & abstracts" },
            { icon: Newspaper, text: "News & updates" },
            { icon: Paperclip, text: "Flyers / one-pagers" },
            { icon: Mail, text: "Partnership inquiries" }
        ],
        icon: TrendingUp,
        gradient: "from-emerald-500 to-teal-500"
    }
];

export default function Innovations() {
    const [technologies, setTechnologies] = useState<any[]>(defaultTechnologies);

    useEffect(() => {
        fetchTechnologies().then((data: any[]) => {
            if (data.length) {
                const iconMap: Record<string, any> = {
                    trendingup: TrendingUp,
                    flaskconical: FlaskConical,
                    shield: Shield,
                    filetext: FileText,
                    bookopen: BookOpen,
                    newspaper: Newspaper,
                    paperclip: Paperclip,
                    mail: Mail
                };

                setTechnologies(data.map((d: any) => ({
                    name: d.name,
                    tagline: d.tagline,
                    positioning: d.description, // Mapping description to positioning
                    focusAreas: d.focus_areas || [],
                    includes: (d.features || []).map((f: string) => ({ icon: FileText, text: f })), // Simple mapping for now
                    icon: iconMap[d.icon?.toLowerCase()] || FlaskConical,
                    gradient: d.gradient || "from-blue-500 to-indigo-500"
                })));
            }
        }).catch(() => { });
    }, []);
    return (
        <div className="min-h-screen font-sans text-slate-200 relative overflow-hidden">
            {/* Atmospheric Background Layers - PRESERVED */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 space-y-20 pt-40 pb-24 animate-in fade-in duration-1000">
                {/* SECTION 1: HERO – INNOVATION WITH PURPOSE */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Left */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] uppercase">
                                    <span className="block text-white">Where Innovation</span>
                                    <span className="block text-cyan-400">Meets Scientific Proof</span>
                                </h1>
                                <div className="space-y-4 text-lg text-slate-300 font-medium leading-relaxed">
                                    <p className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <span>Partner with MusB™ Research to design and execute rigorous research</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <span>Transform ideas into scientifically validated products</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <span>Access proprietary, clinically informed microbiome technologies</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <Link to="/contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105">
                                    Start an Innovation Discussion
                                </Link>
                                <button className="border-2 border-cyan-400/40 bg-cyan-400/10 text-white px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300">
                                    Explore Our Technologies
                                </button>
                            </div>
                        </div>

                        {/* Visual Right */}
                        <div className="relative">
                            <div className="bg-[#111827]/40 backdrop-blur-xl p-16 rounded-[4rem] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative z-10 space-y-8">
                                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase">Science-First Innovation Engine</h3>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Where industry sponsors run credible studies, early concepts become validated products, and brands license scientifically proven technologies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: INNOVATE WITH US – INDUSTRY-SPONSORED RESEARCH */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12">
                    <div className="bg-[#0A0F1C]/60 backdrop-blur-2xl rounded-[5rem] p-16 md:p-24 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full"></div>

                        <div className="relative z-10 space-y-16">
                            <div className="text-center space-y-6 max-w-4xl mx-auto">
                                <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">INNOVATE WITH US – INDUSTRY-SPONSORED RESEARCH</span>
                                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight uppercase">
                                    Bring Your Product. <span className="text-cyan-400">We Bring the Science.</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                                    MusB Research invites industry sponsors, biotech companies, ingredient manufacturers, and brands to conduct high-quality preclinical and clinical research under one integrated ecosystem.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* We Support */}
                                <div className="bg-[#111827]/40 backdrop-blur-xl p-10 rounded-3xl border border-white/5">
                                    <h3 className="text-2xl font-black text-white uppercase mb-8">We support:</h3>
                                    <div className="space-y-4">
                                        {[
                                            "Proof-of-concept studies",
                                            "Mechanistic validation",
                                            "Human clinical trials",
                                            "Biomarkers, microbiome, and translational endpoints"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-slate-400 mt-6 text-sm leading-relaxed">
                                        All studies are designed to be regulatory-aligned, publication-ready, and decision-driven.
                                    </p>
                                </div>

                                {/* What Makes This Different */}
                                <div className="bg-[#111827]/40 backdrop-blur-xl p-10 rounded-3xl border border-white/5">
                                    <h3 className="text-2xl font-black text-white uppercase mb-8">What Makes This Different</h3>
                                    <div className="space-y-4">
                                        {[
                                            "Scientist-led study design",
                                            "Integrated research, central lab, and biorepository",
                                            "No bias toward company size—startups and global brands treated equally",
                                            "Clear timelines, transparent data, and actionable outcomes"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link to="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105">
                                    Run a Study With MusB Research
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: FROM CONCEPT TO PRODUCT – SCIENCE-DRIVEN DEVELOPMENT */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12">
                    <div className="bg-[#0A0F1C]/60 backdrop-blur-2xl rounded-[5rem] p-16 md:p-24 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full"></div>

                        <div className="relative z-10 space-y-16">
                            <div className="text-center space-y-6 max-w-4xl mx-auto">
                                <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">SECTION 3: FROM CONCEPT TO PRODUCT – SCIENCE-DRIVEN DEVELOPMENT</span>
                                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight uppercase">
                                    You Bring the Idea. <span className="text-cyan-400">We Build the Evidence.</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                                    Have an innovative concept but need scientific validation? <br />
                                    MusB Research specializes in converting early-stage ideas into market-ready, scientifically substantiated products. We work as your extended R&D partner, supporting every step from discovery to validation.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-3xl font-black text-white uppercase text-center">Our Concept-to-Product Pathway</h3>
                                <div className="grid md:grid-cols-5 gap-6">
                                    {[
                                        { step: 1, title: "Scientific feasibility & mechanism mapping" },
                                        { step: 2, title: "In vitro and in vivo validation" },
                                        { step: 3, title: "Biomarker and functional outcome identification" },
                                        { step: 4, title: "Human clinical evaluation" },
                                        { step: 5, title: "Data interpretation for claims, positioning, and go-to-market decisions" }
                                    ].map((item) => (
                                        <div key={item.step} className="bg-[#111827]/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 text-center space-y-4 hover:bg-white/10 transition-all duration-300 group">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xl group-hover:scale-110 transition-transform">
                                                {item.step}
                                            </div>
                                            <p className="text-sm text-slate-300 font-medium leading-snug">{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#111827]/40 backdrop-blur-xl p-10 rounded-3xl border border-white/5">
                                <h3 className="text-2xl font-black text-white uppercase mb-6 text-center">Ideal For</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[
                                        "New ingredients or formulations",
                                        "Next-generation probiotics / postbiotics",
                                        "Gut, metabolic, brain, aging, women's health innovations"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wider border border-cyan-500/20">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center">
                                <Link to="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105">
                                    Submit Your Concept
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: SCIENCE YOU CAN BUILD ON */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12">
                    <div className="bg-[#0A0F1C]/60 backdrop-blur-2xl rounded-[5rem] p-16 md:p-24 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden text-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

                        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-tight uppercase">
                                    Science <span className="text-cyan-400">You Can Build On.</span>
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-2xl text-slate-300 font-medium leading-relaxed">
                                        MusB Research develops proprietary, scientifically proven technologies and invites brands and partners to collaborate, license, or co-develop products backed by rigorous research.
                                    </p>
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                        Each technology page includes open, transparent access to supporting data and updates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: TECHNOLOGY SHOWCASE */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12 space-y-16">
                    <div className="text-center space-y-4">
                        <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">OUR INNOVATION PIPELINE</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Technology Showcase</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {technologies.map((tech, idx) => (
                            <div key={idx} className="bg-[#0D121F]/60 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:shadow-[0_50px_100px_-20px_rgba(6,182,212,0.15)] transition-all duration-700 group relative overflow-hidden flex flex-col">
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${tech.gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-all`}></div>

                                <div className="relative z-10 space-y-8 flex-grow">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center shadow-xl`}>
                                        <tech.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black text-white uppercase group-hover:text-cyan-400 transition-colors leading-tight">{tech.name}</h3>
                                        <p className="text-sm text-cyan-400 font-bold uppercase tracking-wider">{tech.tagline}</p>
                                        <p className="text-base text-slate-300 leading-relaxed font-medium">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">Positioning Line</span>
                                            {tech.positioning}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                            <Target className="w-4 h-4 text-cyan-400" />
                                            Focus Areas
                                        </h4>
                                        <div className="space-y-2">
                                            {tech.focusAreas.map((area: string, fIdx: number) => (
                                                <div key={fIdx} className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                    <span className="text-sm text-slate-400 font-medium">{area}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 space-y-4">
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">Technology Page Includes</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {tech.includes.map((item: any, iIdx: number) => (
                                                <div key={iIdx} className="flex items-center gap-3 text-xs text-slate-400 font-medium group/item hover:text-white transition-colors">
                                                    <item.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                    <span>{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-8 pt-8 border-t border-white/10 flex items-center justify-between group/btn">
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-300 group-hover/btn:text-white transition-colors">Explore {tech.name}</span>
                                    <ArrowRight className="w-5 h-5 text-cyan-400 group-hover/btn:translate-x-2 transition-all" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                {/* SECTION 6: WHY INNOVATE WITH MUSB RESEARCH */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12">
                    <div className="bg-[#0A0F1C]/60 backdrop-blur-2xl rounded-[5rem] p-16 md:p-24 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>

                        <div className="relative z-10 space-y-16">
                            <div className="text-center space-y-4">
                                <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">WHY INNOVATE WITH MUSB RESEARCH</span>
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Trust & Scientific Excellence</h2>
                            </div>

                            <div className="grid md:grid-cols-5 gap-8">
                                {[
                                    { title: "Scientist-founded and led", icon: Sparkles },
                                    { title: "Integrated research, lab, and biorepository", icon: FlaskConical },
                                    { title: "Regulatory-aligned execution", icon: Shield },
                                    { title: "Transparent, ethical, publication-ready science", icon: CheckCircle2 },
                                    { title: "Flexible partnerships and co-development models", icon: Zap }
                                ].map((point, idx) => (
                                    <div key={idx} className="bg-[#111827]/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-6 hover:bg-white/10 transition-all duration-300 group">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                                            <point.icon className="w-8 h-8" />
                                        </div>
                                        <p className="text-base text-slate-300 font-black uppercase tracking-tight leading-tight">{point.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* FINAL CALL TO ACTION */}
                <section className="max-w-[1700px] mx-auto px-6 md:px-12 pb-20">
                    <div className="bg-gradient-to-br from-[#0D121F]/80 to-[#070B14]/80 backdrop-blur-3xl rounded-[5rem] p-16 md:p-32 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] relative overflow-hidden text-center group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

                        <div className="relative z-10 space-y-12 max-w-5xl mx-auto">
                            <div className="space-y-6">
                                <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">Final Call to Action</span>
                                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1.1] uppercase">
                                    Innovation <span className="text-cyan-400">Without Evidence</span> is Speculation.
                                </h2>
                                <p className="text-2xl text-slate-300 font-medium leading-relaxed">
                                    At MusB Research, innovation is built on data, integrity, and scientific rigor.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <p className="text-lg text-white font-black uppercase tracking-widest">Whether you want to:</p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {["Run a study", "Validate a concept", "Partner on a proven technology"].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 px-8 py-4 bg-[#111827]/40 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-300">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                            <span className="text-slate-200 font-bold uppercase tracking-wide text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-10">
                                <p className="text-3xl font-black text-white uppercase tracking-tight">We are ready to collaborate.</p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Link to="/contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 active:scale-95">
                                        Start an Innovation Discussion
                                    </Link>
                                    <Link to="/contact" className="border-2 border-cyan-400/40 bg-cyan-400/10 text-white px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300">
                                        Contact Our Innovation Team
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
