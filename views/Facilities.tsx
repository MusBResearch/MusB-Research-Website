import { ArrowRight, MapPin, Box, Zap, Wind, Microscope, Activity, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Facilities() {
    return (
        <div className="space-y-32 py-12 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="text-center space-y-8 max-w-4xl mx-auto">
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Infrastructure</span>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">World-Class Facilities</h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    Spanning over 20,000 sq. ft., our research complex integrates wet labs, imaging centers, and clinical spaces.
                </p>
            </div>

            {/* Facility Grid */}
            <div className="space-y-48">
                {[
                    {
                        title: "Center for Advanced Imaging",
                        desc: "Our imaging core provides non-destructive 3D analysis of bone, cartilage, and soft tissues. Equipped with industry-leading scanners for both in-vivo and ex-vivo applications.",
                        features: ["Scanco Medical µCT 40", "VivaCT 80 In-Vivo Scanner", "Faxitron X-Ray Cabinet"],
                        color: "blue",
                        icon: Microscope
                    },
                    {
                        title: "Biomechanics & Motion Lab",
                        desc: "A dedicated hall for analyzing functional movements and mechanical properties of tissues. Features a dual-belt instrumented treadmill and 12-camera motion capture system.",
                        features: ["Vicon Vantage Cameras", "AMTI Force Plates", "Instron Mechanical Testing Suite"],
                        color: "purple",
                        icon: Activity
                    },
                    {
                        title: "Molecular & Cellular Biology Core",
                        desc: "Fully equipped BL2 wet laboratories designed for high-throughput screening, cell culture, and molecular analysis of gene and protein expression.",
                        features: ["Flow Cytometry", "Real-Time PCR Machines", "Confocal Microscopy Suite"],
                        color: "orange",
                        icon: Beaker
                    }
                ].map((facility, idx) => (
                    <div key={idx} className={`flex flex-col gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        {/* Image Placeholder */}
                        <div className="w-full lg:w-1/2 h-[500px] glass rounded-[4rem] shadow-2xl relative overflow-hidden group border-white/50">
                            {/* Abstract decorative background */}
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-700 ${facility.color === 'blue' ? 'from-blue-600 to-cyan-600' :
                                facility.color === 'purple' ? 'from-purple-600 to-pink-600' :
                                    'from-orange-500 to-amber-500'
                                }`}></div>
                            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-[2000ms]">
                                <facility.icon className={`w-40 h-40 opacity-10 ${facility.color === 'blue' ? 'text-blue-900' :
                                    facility.color === 'purple' ? 'text-purple-900' :
                                        'text-orange-900'
                                    }`} />
                            </div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="glass p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 border-white/80">
                                    <div className="p-3 bg-white rounded-2xl shadow-inner">
                                        <MapPin className="text-slate-400 w-5 h-5" />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-widest text-slate-900">Building {String.fromCharCode(65 + idx)}, Floor {idx + 2}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-1/2 space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{facility.title}</h2>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                    {facility.desc}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Key Equipment</h4>
                                <div className="grid gap-3">
                                    {facility.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-4 p-5 glass rounded-2xl group/item hover:bg-white transition-all shadow-sm">
                                            <div className={`p-2 rounded-xl group-hover/item:scale-110 transition-transform ${facility.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                facility.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                    'bg-orange-50 text-orange-600'
                                                }`}>
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-900">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link to="/contact" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                                    Schedule a Tour <ArrowRight className="w-5 h-5 text-blue-400" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Environmental Control Badge */}
            <div className="grid md:grid-cols-3 gap-12 py-24 border-t border-slate-100/50">
                <div className="glass p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-2xl border-white/50">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                        <Wind className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">HEPA Filtration</h4>
                        <p className="text-sm font-medium text-slate-500">ISO Class 7 Cleanrooms</p>
                    </div>
                </div>
                <div className="glass p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-2xl border-white/50">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                        <Zap className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">Backup Power</h4>
                        <p className="text-sm font-medium text-slate-500">24/7 Generator Support</p>
                    </div>
                </div>
                <div className="glass p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-2xl border-white/50">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner">
                        <Box className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">Secure Storage</h4>
                        <p className="text-sm font-medium text-slate-500">-80°C Sample Banking</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
