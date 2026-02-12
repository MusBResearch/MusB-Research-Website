export default function Careers() {
    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em]">Join Our Mission</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9]">
                    Build Your <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Career</span> With Us
                </h1>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                    We're looking for passionate researchers, clinicians, and innovators to join our world-class team.
                </p>
            </section>

            <section className="min-h-[40vh] flex items-center justify-center glass rounded-[3rem]">
                <p className="text-slate-400 font-bold uppercase tracking-widest">Career opportunities coming soon...</p>
            </section>
        </div>
    );
}
