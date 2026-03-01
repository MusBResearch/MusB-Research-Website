import React, { useState, useEffect } from 'react';
import { Linkedin, ChevronDown, ChevronUp, Building2, Users, Stethoscope, Briefcase, Handshake, Activity, FileText } from 'lucide-react';
import { fetchTeamMembers, fetchAdvisors, fetchCollaborators, fetchStaffMembers, fetchPartners } from '@/api';

const TeamMemberCard = ({ member }: { member: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border-2 border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col">
            <div className="p-8 md:p-10 flex flex-col gap-6 items-center text-center flex-1">
                {/* Headshot */}
                <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className={`w-full h-full object-cover ${member.name.includes('Shalini') ? 'object-[50%_35%]' : member.name.includes('Hariom') ? 'object-[50%_25%]' : ''}`}
                            />
                        ) : (
                            <span className="text-slate-400 font-black text-6xl">{member.name.charAt(0)}</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="w-full space-y-6">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">{member.name}</h3>
                        <p className="text-cyan-400 font-bold uppercase tracking-wider mt-2 text-sm">{member.role}</p>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed">{member.bio}</p>

                    {/* Expertise Tags */}
                    {member.expertise_tags && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {member.expertise_tags.map((tag: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-xs font-bold bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* LinkedIn Icon */}
                    {member.linkedin_url && (
                        <div className="flex justify-center">
                            <a
                                href={member.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                                <span className="font-medium text-sm">View Profile</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Accordion Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors border-t border-white/10 group cursor-pointer"
            >
                <span className="font-bold text-slate-300 group-hover:text-white transition-colors">View Full Bio & Publications</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                )}
            </button>

            {/* Expanded Content */}
            {isOpen && (
                <div className="p-8 md:p-10 bg-black/20 border-t border-white/5 space-y-8 animate-in slide-in-from-top-2 duration-300">
                    {/* Expanded Bio Text */}
                    {member.expanded_bio && (
                        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
                            <p className="whitespace-pre-line">{member.expanded_bio}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Areas of Expertise */}
                        {member.areas_of_expertise && member.areas_of_expertise.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                                    <Activity className="w-4 h-4" /> Areas of Expertise
                                </h4>
                                <ul className="space-y-2">
                                    {member.areas_of_expertise.map((area: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Affiliations */}
                        {member.affiliations && member.affiliations.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                                    <Building2 className="w-4 h-4" /> Affiliations
                                </h4>
                                <ul className="space-y-2">
                                    {member.affiliations.map((aff: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                                            {aff}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Publications */}
                    {member.publications && member.publications.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                                <FileText className="w-4 h-4" /> Selected Publications
                            </h4>
                            <ul className="space-y-3">
                                {member.publications.map((pub: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm italic">
                                        <span className="text-cyan-500/50 not-italic">#{idx + 1}</span>
                                        {pub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const AdvisorCard = ({ advisor, isLastOdd }: { advisor: any, isLastOdd: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`bg-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 overflow-hidden hover:border-indigo-400/50 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col min-h-[26rem] ${isLastOdd ? 'lg:col-span-2 lg:w-[calc(50%-0.75rem)] lg:mx-auto' : ''}`}
        >
            <div className="p-8 flex-1 grid md:grid-cols-3 gap-6 items-center">
                {/* Left Side: Image Only */}
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                    <div className="w-32 h-40 md:w-48 md:h-64 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xl">
                        {advisor.image ? (
                            <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover object-[50%_25%]" />
                        ) : (
                            <span className="text-slate-400 font-black text-5xl">{advisor.name.charAt(0)}</span>
                        )}
                    </div>
                </div>

                {/* Right Side: All Details */}
                <div className="md:col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-3 h-full border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">

                    {/* Name & Role */}
                    <div className="space-y-1">
                        <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">{advisor.name}</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-400">{advisor.advisory_role}</p>
                    </div>

                    {/* Specs */}
                    <div className="w-full grid grid-cols-1 gap-4">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Expertise</span>
                            <span className="px-3 py-1 text-xs font-bold bg-indigo-400/10 text-indigo-400 rounded-full border border-indigo-400/20 inline-block">
                                {advisor.expertise_area}
                            </span>
                        </div>

                        {advisor.organization && (
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Organization</span>
                                <p className="text-sm text-slate-300 font-medium">{advisor.organization}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Accordion Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 transition-colors border-t border-white/10 group cursor-pointer mt-auto"
            >
                <span className="font-bold text-slate-300 group-hover:text-white transition-colors">View Profile & Bio</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                )}
            </button>

            {/* Expanded Content */}
            {isOpen && (
                <div className="p-8 bg-black/20 border-t border-white/5 space-y-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm">
                        <p>{advisor.bio}</p>
                    </div>

                    {/* LinkedIn */}
                    {advisor.linkedin_url && (
                        <div className="pt-2 flex justify-start">
                            <a
                                href={advisor.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span className="font-medium text-sm">LinkedIn Profile</span>
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function Team() {
    // Removed expandedBios, expandedAdvisors state - now handled internally in cards
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [clinicalCollaborators, setClinicalCollaborators] = useState<any[]>([]);
    const [staffMembers, setStaffMembers] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);

    // Fetch all team data from backend
    useEffect(() => {
        fetchTeamMembers().then((data: any[]) => { if (data.length) setTeamMembers(data as any); }).catch(() => { });
        fetchAdvisors().then((data: any[]) => { if (data.length) setAdvisors(data as any); }).catch(() => { });
        fetchCollaborators().then((data: any[]) => { if (data.length) setClinicalCollaborators(data as any); }).catch(() => { });
        fetchStaffMembers().then((data: any[]) => { if (data.length) setStaffMembers(data as any); }).catch(() => { });
        fetchPartners().then((data: any[]) => { if (data.length) setPartners(data as any); }).catch(() => { });
    }, []);

    return (
        <div className="min-h-screen font-sans text-slate-200 relative overflow-x-hidden">
            {/* ... Background & Hero ... */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left: Title + Intro */}
                        <div className="flex-1 space-y-6 text-left">
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                                Our <span className="text-cyan-400">Team</span>
                            </h1>
                            <div className="space-y-3 text-lg md:text-xl text-slate-300 font-medium max-w-2xl">
                                <p>A multidisciplinary team of scientists, clinicians, and professionals dedicated to advancing translational and clinical research.</p>
                                <p>Built on academic rigor, regulatory excellence, and community engagement.</p>
                            </div>
                        </div>

                        {/* Right: Subtle Visual Optional */}
                        <div className="flex-1 hidden md:flex justify-end">
                            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
                                <div className="absolute inset-8 border border-white/10 rounded-full flex items-center justify-center">
                                    <Users className="w-24 h-24 text-white/5" />
                                </div>
                                <div className="absolute inset-16 border border-cyan-400/10 xl:border-cyan-400/20 rounded-full flex items-center justify-center">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: Leadership & Scientific Team */}
            <section className="relative z-10 pt-8 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Leadership & Scientific Team
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} member={member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2: Advisors */}
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Advisors
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {advisors.map((advisor, index) => (
                            <AdvisorCard
                                key={index}
                                advisor={advisor}
                                isLastOdd={index === advisors.length - 1 && advisors.length % 2 !== 0}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: Clinical Collaborators */}
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Clinical Collaborators
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {clinicalCollaborators.map((collaborator) => (
                            <div
                                key={collaborator.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] text-center"
                            >
                                {/* Logo Placeholder */}
                                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                    {collaborator.logo ? (
                                        <img src={collaborator.logo} alt={collaborator.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Building2 className="w-10 h-10 text-purple-400" />
                                    )}
                                </div>

                                {/* Name & Specialty */}
                                <h3 className="text-lg font-black text-white leading-tight mb-2">{collaborator.name}</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">{collaborator.specialty}</p>
                                {collaborator.location && (
                                    <p className="text-xs text-slate-400 font-medium">{collaborator.location}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: Staff */}
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Staff
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {staffMembers.map((staff, index) => (
                            <div
                                key={staff.id}
                                className={`group bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${index === 8 ? 'lg:col-start-2' : ''}`}
                            >


                                {/* Name & Role */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-black text-white leading-tight">{staff.name}</h3>
                                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">{staff.role}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{staff.department}</p>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed pt-2">{staff.role_description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: Sponsors */}
            <section className="relative z-10 py-8 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">

                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Sponsors
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {partners.map((partner) => (
                            <div
                                key={partner.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 border-2 border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center"
                            >
                                {/* Logo Placeholder */}
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                    {partner.logo ? (
                                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Handshake className="w-8 h-8 text-indigo-400" />
                                    )}
                                </div>

                                {/* Partner Name */}
                                <h3 className="text-sm font-bold text-white leading-tight mb-2">{partner.name}</h3>

                                {/* Category Tag */}
                                {partner.category && (
                                    <span className="px-2 py-1 text-xs font-bold bg-indigo-400/10 text-indigo-400 rounded-full border border-indigo-400/20">
                                        {partner.category}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
