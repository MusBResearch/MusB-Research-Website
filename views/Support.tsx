import { ArrowRight, Microscope, Beaker, Zap, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const supportPillars = [
    {
        id: 'research',
        title: "Research and Innovation",
        icon: Zap,
        image: "/research.png",
        color: "blue",
        desc: "Transforming breakthrough science into clinical success. Our PhD-led research team partners with you to design robust protocols, discover novel biomarkers, and navigate the path from concept to cure with unparalleled musculoskeletal expertise.",
        features: [
            "Advanced Protocol Architecture",
            "Novel Biomarker Validation",
            "Translational Science Strategy",
            "Precision Therapeutic Design"
        ],
        cta: "Partner for Innovation"
    },
    {
        id: 'lab',
        title: "Central Laboratory Services",
        icon: Microscope,
        image: "/lab.png",
        color: "cyan",
        desc: "Global excellence in high-resolution analytical services. Operating within CLIA-certified facilities, we deliver high-throughput, gold-standard imaging and molecular profiling that provides the critical data your research demands.",
        features: [
            "CLIA-Certified Diagnostic Assays",
            "High-Resolution MicroCT Imaging",
            "Advanced Molecular Histology",
            "Global Logistics & High-Throughput"
        ],
        cta: "Request Lab Access"
    },
    {
        id: 'biorepository',
        title: "Biorepository Solutions",
        icon: Beaker,
        image: "/biorepository.png",
        color: "indigo",
        desc: "The vault for your life's work. Our GCP-compliant biorepository offers secure, cryogenic specimen management and seamless global logistics, ensuring your valuable research assets remain pristine and accessible for decades.",
        features: [
            "GCP-Compliant Specimen Custody",
            "24/7 Monitored Cryo-Storage",
            "Tailored Global Specimen Logistics",
            "Comprehensive Bio-Asset Management"
        ],
        cta: "Secure Your Research Assets"
    }
];

const colorMap: Record<string, { bg: string, text: string, border: string, bgSoft: string }> = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', bgSoft: 'bg-blue-50' },
    cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', border: 'border-cyan-600', bgSoft: 'bg-cyan-50' },
    indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600', bgSoft: 'bg-indigo-50' }
};

export default function Support() {
    return (
        <div className="space-y-32 py-12 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="text-center space-y-8 max-w-4xl mx-auto">
                <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em]">Our Support Model</span>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
                    Powering the Future of <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Musculoskeletal Research</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    MusB Research provides a tripartite support ecosystem designed to meet the rigorous demands of modern clinical and translational science.
                </p>
            </div>

            {/* Pillars Grid */}
            <div className="space-y-16">
                {supportPillars.map((pillar, idx) => {
                    const colors = colorMap[pillar.color as keyof typeof colorMap];
                    return (
                        <div
                            key={pillar.id}
                            className={`flex flex-col lg:flex-row items-stretch gap-12 group ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Visual Card */}
                            <div className="lg:w-1/2 relative overflow-hidden rounded-[4rem]">
                                <div className={`absolute inset-0 ${colors.bg}/20 blur-[100px] group-hover:${colors.bg}/30 transition-all duration-700`}></div>
                                <div className="relative h-[500px] w-full overflow-hidden border border-white/50 shadow-2xl glass group-hover:scale-[1.02] transition-transform duration-700">
                                    <img
                                        src={pillar.image}
                                        alt={pillar.title}
                                        className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-10 left-10 flex items-center gap-6">
                                        <div className={`w-20 h-20 ${colors.bgSoft} rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30`}>
                                            <pillar.icon className={`w-10 h-10 ${colors.text}`} />
                                        </div>
                                        <div className="text-white">
                                            <div className="text-xs font-black uppercase tracking-[0.3em] opacity-70">MusB Pillar</div>
                                            <div className="text-2xl font-black">{pillar.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="lg:w-1/2 flex flex-col justify-center space-y-10 p-4">
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-black text-slate-900 leading-tight">
                                        Authentic Support, <br />
                                        <span className={colors.text}>Extraordinary Results</span>
                                    </h3>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {pillar.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-4 text-slate-700 font-bold">
                                            <div className={`p-1.5 rounded-full ${colors.bgSoft} ${colors.text}`}>
                                                <Shield className="w-4 h-4" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 flex flex-wrap gap-6">
                                    <Link
                                        to="/contact"
                                        className={`bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:${colors.bg} hover:-translate-y-1 transition-all shadow-2xl flex items-center gap-3`}
                                    >
                                        {pillar.cta} <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <button className="glass-light text-slate-900 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3">
                                        Download Capabilities <Zap className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Inquiry Section */}
            <div className="glass rounded-[4rem] p-16 md:p-32 relative overflow-hidden text-center space-y-12">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600"></div>
                <div className="space-y-4 max-w-3xl mx-auto">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.4em]">Get in Touch</span>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">Ready to Start Your Next Project?</h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        Our experts are standing by to discuss how our research, laboratory, and biorepository services can support your specific needs.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                    <Link
                        to="/contact"
                        className="bg-cyan-600 text-white px-12 py-6 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-slate-900 hover:scale-105 transition-all shadow-2xl flex items-center gap-4"
                    >
                        <Mail className="w-6 h-6" /> Send an Enquiry
                    </Link>
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-16 h-16 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg z-${10 + i}`}>
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Expert" />
                            </div>
                        ))}
                        <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-lg z-0">
                            +12
                        </div>
                    </div>
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Consult with our Experts</span>
                </div>
            </div>
        </div>
    );
}
