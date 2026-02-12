export default function Innovations() {
    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em]">Pushing Boundaries</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9]">
                    Research <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Innovations</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                    Discover our latest breakthroughs in bone biology, regenerative medicine, and musculoskeletal technology.
                </p>
            </section>

            <section className="min-h-[40vh] flex items-center justify-center glass rounded-[3rem]">
                <p className="text-slate-400 font-bold uppercase tracking-widest">Innovation projects coming soon...</p>
            </section>
        </div>
    );
}
