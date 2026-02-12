import React, { useState, useEffect } from 'react';
import { Linkedin, ChevronDown, ChevronUp, Building2, Users, Stethoscope, Briefcase, Handshake } from 'lucide-react';
import { fetchTeamMembers, fetchAdvisors, fetchCollaborators, fetchStaffMembers, fetchPartners } from '../api';

export default function Team() {
    const [expandedBios, setExpandedBios] = useState<{ [key: string]: boolean }>({});
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

    const toggleBio = (id: string) => {
        setExpandedBios(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen font-sans text-slate-200 relative overflow-hidden">
            {/* Atmospheric Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6 max-w-7xl mx-auto">

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                            Our <span className="text-cyan-400">Team</span>
                        </h1>
                        <div className="space-y-3 text-lg md:text-xl text-slate-300 font-medium max-w-6xl mx-auto">
                            <p>A multidisciplinary team of scientists, clinicians, and professionals dedicated to advancing translational and clinical research.</p>
                            <p>Built on academic rigor, regulatory excellence, and community engagement.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: Leadership & Scientific Team */}
            <section className="relative z-10 pt-8 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">

                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Leadership & Scientific Team
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border-2 border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                            >
                                {/* Profile Header */}
                                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                                    {/* Headshot Placeholder */}
                                    <div className="w-32 h-32 rounded-[1.5rem] bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border-2 border-white/10 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <span className="text-slate-400 font-black text-5xl">{member.name.charAt(0)}</span>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1 text-center md:text-left space-y-3">
                                        <div>
                                            <h3 className="text-2xl font-black text-white leading-tight">{member.name}</h3>
                                            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400 mt-1">{member.role}</p>
                                        </div>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{member.bio}</p>

                                        {/* Expertise Tags */}
                                        {member.expertiseTags && (
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {member.expertiseTags.map((tag: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 text-xs font-bold bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-3 justify-center md:justify-start items-center pt-2">
                                            {member.linkedinUrl && (
                                                <a
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 rounded-lg hover:text-cyan-400 hover:bg-white/10 cursor-pointer transition-all border border-white/5"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.expandedBio && (
                                                <button
                                                    onClick={() => toggleBio(`leader-${member.id}`)}
                                                    className="px-4 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border border-cyan-400/20 flex items-center gap-2"
                                                >
                                                    View Bio
                                                    {expandedBios[`leader-${member.id}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Bio */}
                                {expandedBios[`leader-${member.id}`] && member.expandedBio && (
                                    <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
                                        <p className="text-slate-300 font-medium leading-relaxed">{member.expandedBio}</p>

                                        {member.areasOfExpertise && member.areasOfExpertise.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">Areas of Expertise</h4>
                                                <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                                    {member.areasOfExpertise.map((area: string, idx: number) => (
                                                        <li key={idx}>{area}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {member.affiliations && member.affiliations.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">Affiliations</h4>
                                                <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                                    {member.affiliations.map((affiliation: string, idx: number) => (
                                                        <li key={idx}>{affiliation}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {member.publications && member.publications.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">Publications & Highlights</h4>
                                                <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                                    {member.publications.map((pub: string, idx: number) => (
                                                        <li key={idx}>{pub}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2: Advisors */}
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">

                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Advisors
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {advisors.map((advisor) => (
                            <div
                                key={advisor.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                            >
                                <div className="grid md:grid-cols-3 gap-6 items-center h-full">
                                    {/* Left Side: Profile Info */}
                                    <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
                                        {/* Headshot / Image Slot */}
                                        <div className="w-24 h-24 rounded-[1.25rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-white/10 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                            {advisor.imageUrl ? (
                                                <img src={advisor.imageUrl} alt={advisor.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-slate-400 font-black text-4xl">{advisor.name.charAt(0)}</span>
                                            )}
                                        </div>

                                        {/* Name & Role */}
                                        <div>
                                            <h3 className="text-xl font-black text-white leading-tight">{advisor.name}</h3>
                                            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mt-1">{advisor.advisoryRole}</p>
                                        </div>

                                        {/* Expertise & Organization */}
                                        <div className="space-y-2 flex flex-col items-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="px-3 py-1 text-xs font-bold bg-indigo-400/10 text-indigo-400 rounded-full border border-indigo-400/20">
                                                    {advisor.expertiseArea}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 font-medium text-center">{advisor.organization}</p>
                                        </div>
                                    </div>

                                    {/* Right Side: Bio & Social - Centered */}
                                    <div className="md:col-span-2 flex flex-col justify-center items-center h-full border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed text-center">{advisor.bio}</p>

                                        {/* LinkedIn */}
                                        {advisor.linkedinUrl && (
                                            <div className="pt-4 flex justify-center">
                                                <a
                                                    href={advisor.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:text-indigo-400 hover:bg-white/10 cursor-pointer transition-all border border-white/5"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: Clinical Collaborators */}
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">

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
                                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <Building2 className="w-10 h-10 text-purple-400" />
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
                    <div className="text-center mb-8">

                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Staff
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {staffMembers.map((staff) => (
                            <div
                                key={staff.id}
                                className="group bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                            >
                                {/* Headshot Placeholder (optional) */}
                                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-slate-400 font-black text-2xl">{staff.name.charAt(0)}</span>
                                </div>

                                {/* Name & Role */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-black text-white leading-tight">{staff.name}</h3>
                                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">{staff.role}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{staff.department}</p>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed pt-2">{staff.roleDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: Sponsors */}
            <section className="relative z-10 py-8 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">

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
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                                    <Handshake className="w-8 h-8 text-indigo-400" />
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
