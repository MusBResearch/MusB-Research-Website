export default function About() {
    return (
        <div className="max-w-5xl mx-auto space-y-24 py-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Our Story</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">About Our Research</h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    Unraveling the complexities of musculoskeletal biology to build a healthier future for all.
                </p>
            </div>

            <div className="grid gap-12">
                <div className="glass p-12 md:p-20 rounded-[4rem] border-white/50 shadow-2xl space-y-16">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
                            <h3 className="text-3xl font-black text-slate-900">Our Mission</h3>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                The Musculoskeletal Biology (MusB) research group is dedicated to understanding the fundamental biological processes that govern the development, maintenance, and repair of bone, cartilage, and muscle tissues.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="h-1.5 w-16 bg-purple-600 rounded-full"></div>
                            <h3 className="text-3xl font-black text-slate-900">Research Focus</h3>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Our multidisciplinary team uses cutting-edge techniques in genetics, molecular biology, and bioengineering to address critical questions in orthopedics and rheumatology.
                            </p>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-slate-100/50">
                        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all"></div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Collaboration</h3>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
                                We believe in the power of collaboration. Our lab works closely with clinicians, engineers, and other scientists worldwide to accelerate the translation of benchside discoveries to the bedside.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

