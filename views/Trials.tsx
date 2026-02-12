import { useState } from 'react';
import { Search, Filter, ArrowRight, Activity, Clock, DollarSign, MapPin, ChevronDown, CheckCircle2, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Trials() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const trials = [
        {
            id: 1,
            title: "Bone Density & Nutrition Study",
            category: "Osteoporosis",
            compensation: "$350",
            duration: "4 Visits / 2 Months",
            location: "Main Clinic, Boston",
            status: "Recruiting",
            description: "Investigating the impact of high-protein diets on bone density recovery in active adults aged 45-65."
        },
        {
            id: 2,
            title: "ACL Repair Rehabilitation Protocol",
            category: "Sports Medicine",
            compensation: "$800",
            duration: "12 Weeks",
            location: "Sports Science Lab",
            status: "Recruiting",
            description: "Comparing two post-operative physical therapy regimens for accelerated ACL recovery in athletes."
        },
        {
            id: 3,
            title: "Vitamin D3 Absorption Analysis",
            category: "Nutrition",
            compensation: "$150",
            duration: "2 Visits",
            location: "Metabolic Unit",
            status: "Closing Soon",
            description: "A short-term study analyzing blood serum levels after ingestion of a novel Vitamin D3 formulation."
        },
        {
            id: 4,
            title: "Arthritis Pain Management Survey",
            category: "Rheumatology",
            compensation: "$50 Gift Card",
            duration: "1 Hour (Remote)",
            location: "Remote / Online",
            status: "Recruiting",
            description: "A remote survey study for patients diagnosed with Rheumatoid Arthritis to understand pain management trends."
        }
    ];

    const categories = ["All", "Osteoporosis", "Sports Medicine", "Nutrition", "Rheumatology"];

    const filteredTrials = trials.filter(trial => {
        const matchesCategory = selectedCategory === 'All' || trial.category === selectedCategory;
        const matchesSearch = trial.title.toLowerCase().includes(searchQuery.toLowerCase()) || trial.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-24 py-12 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="text-center space-y-8 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-blue-600 font-bold text-xs tracking-widest uppercase">
                    <FlaskConical className="w-4 h-4" /> Active Research
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">Current Clinical Trials</h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    Join our mission to advance healthcare. Browse currently recruiting studies to see if you qualify to participate and get compensated.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="glass p-3 rounded-[2.5rem] flex flex-col md:flex-row md:items-center gap-3 sticky top-28 z-30 shadow-2xl">
                <div className="relative flex-grow">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for conditions, keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 py-6 bg-white/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all font-semibold"
                    />
                </div>
                <div className="flex gap-3 overflow-x-auto p-2 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                                : 'glass text-slate-500 hover:bg-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trials Grid */}
            <div className="grid lg:grid-cols-2 gap-10">
                {filteredTrials.length > 0 ? (
                    filteredTrials.map((trial) => (
                        <div key={trial.id} className="group glass rounded-[3rem] p-10 hover:bg-white hover:-translate-y-2 transition-all duration-500 flex flex-col">
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-3">
                                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${trial.status === 'Recruiting'
                                        ? 'bg-green-50 text-green-600 border-green-100'
                                        : 'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                        {trial.status}
                                    </span>
                                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{trial.title}</h3>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                    <CategoryIcon category={trial.category} className="w-8 h-8" />
                                </div>
                            </div>

                            <p className="text-slate-500 font-medium mb-10 flex-grow leading-relaxed">
                                {trial.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                                <div className="glass p-4 rounded-2xl flex flex-col gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compensation</span>
                                    <div className="flex items-center gap-3 font-black text-slate-900">
                                        <DollarSign className="w-4 h-4 text-blue-600" /> {trial.compensation}
                                    </div>
                                </div>
                                <div className="glass p-4 rounded-2xl flex flex-col gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Duration</span>
                                    <div className="flex items-center gap-3 font-black text-slate-900">
                                        <Clock className="w-4 h-4 text-purple-600" /> {trial.duration}
                                    </div>
                                </div>
                                <div className="glass p-4 rounded-2xl flex flex-col gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</span>
                                    <div className="flex items-center gap-3 font-black text-slate-900">
                                        <MapPin className="w-4 h-4 text-orange-600" /> {trial.location}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <Link to={`/trials/${trial.id}`} className="text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:gap-4 transition-all group/link">
                                    Application Details <ArrowRight className="w-5 h-5 text-blue-600 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Trial ID: {trial.id}0023</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full glass text-center py-24 rounded-[3rem]">
                        <Activity className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No trials found</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* Trial Process FAQ */}
            <div className="glass rounded-[4rem] p-10 md:p-20 overflow-hidden relative shadow-2xl border-white/50">
                <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Participation</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">How It Works</h2>
                        </div>
                        <div className="space-y-8">
                            {[
                                { title: "1. Pre-Screening", desc: "Complete a brief online or phone questionnaire to determine initial eligibility." },
                                { title: "2. Consent & Screening Visit", desc: "Visit our clinic to meet the team, sign consent forms, and undergo screening tests." },
                                { title: "3. Participation", desc: "Follow the study protocol (medication, diet, or exercises) and attend check-in visits." },
                                { title: "4. Completion & Compensation", desc: "Finish the study and receive compensation for your time and travel." },
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center font-black text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                                        {idx + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-xl text-slate-900">{step.title}</h4>
                                        <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] group-hover:bg-blue-600/30 transition-all"></div>
                        <h3 className="text-3xl font-black tracking-tight relative z-10">Participant Safety First</h3>
                        <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                            All our studies are reviewed by an Independent Review Board (IRB) to ensure your rights and safety are protected. Our team consists of licensed medical professionals.
                        </p>
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-green-500" /> IRB Approved</div>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-green-500" /> Confidential</div>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-green-500" /> Voluntary</div>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-green-500" /> Free Care</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

function CategoryIcon({ category, className }: { category: string, className?: string }) {
    switch (category) {
        case 'Osteoporosis': return <Activity className={className} />;
        case 'Sports Medicine': return <Activity className={className} />; // Replace with better icon if avail
        case 'Nutrition': return <FlaskConical className={className} />;
        default: return <Activity className={className} />;
    }
}
