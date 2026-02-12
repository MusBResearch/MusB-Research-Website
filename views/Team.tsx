import { Mail } from 'lucide-react';
import { teamMembers } from '../data';

export default function Team() {
    return (
        <div className="space-y-24 py-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">The Experts</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">Our Researchers</h1>
                <p className="text-xl text-slate-500 font-medium">The brilliant minds dedicated to musculoskeletal advancement.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {teamMembers.map((member) => (
                    <div key={member.id} className="group glass flex flex-col md:flex-row p-8 rounded-[3rem] hover:bg-white transition-all duration-500 items-center md:items-start md:gap-10 shadow-2xl border-white/50">
                        <div className="w-40 h-40 rounded-[2rem] bg-slate-100 border border-slate-200/50 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                            {/* Placeholder for real team images */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                                <span className="text-slate-300 font-black text-4xl">{member.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="text-center md:text-left space-y-4 pt-6 md:pt-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{member.name}</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mt-1">{member.role}</p>
                            </div>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{member.bio}</p>
                            <div className="flex justify-center md:justify-start gap-4">
                                <div className="p-2 glass rounded-lg hover:text-blue-600 cursor-pointer transition-colors"><Mail className="w-4 h-4" /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
