import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Github, Twitter, Linkedin, Mail, MapPin, Phone, ChevronDown } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

interface NavItem {
    path: string;
    label: string;
    children?: { path: string; label: string }[];
}

export default function Layout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const location = useLocation();

    const navItems: NavItem[] = [
        { path: '/', label: 'Home' },
        { path: '/support', label: 'For Businesses' },
        { path: '/trials', label: 'For Patients' },
        {
            path: '#',
            label: 'About Us',
            children: [
                { path: '/about', label: 'Why Choose MusB Research' },
                { path: '/facilities', label: 'Facilities' },
                { path: '/team', label: 'Our Team' },
                { path: '/trials', label: 'Find a Study' },
            ]
        },
        { path: '#', label: 'Innovations' },
        { path: '#', label: 'News & Events' },
        { path: '#', label: 'Careers' },
        { path: '/contact', label: 'Contact Us' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white/30">
            {/* Animated Mesh Background */}
            <div className="mesh-container">
                <div className="mesh-circle mesh-1"></div>
                <div className="mesh-circle mesh-2"></div>
                <div className="mesh-circle mesh-3"></div>
                <div className="mesh-circle mesh-4"></div>

                {/* Vivid Bloom Accents for Aurora Deep */}
                <div className="bloom-accent top-[-25%] right-[0%] opacity-60"></div>
                <div className="bloom-accent bottom-[5%] left-[-20%] opacity-70 bg-indigo-500/40"></div>
                <div className="bloom-accent top-[35%] left-[25%] opacity-40 bg-cyan-400/30"></div>
            </div>

            {/* Sticky Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav h-24 transition-all duration-500">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
                        <div className="h-14 bg-white px-4 py-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <img src="/logo.jpg" alt="MusB Research" className="h-full w-auto object-contain mix-blend-multiply" />
                        </div>
                    </Link>

                    {/* Right-aligned Navigation Group */}
                    <div className="hidden xl:flex items-center gap-12 ml-auto">
                        {/* Desktop Navigation */}
                        <nav className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative group/nav"
                                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        to={item.path}
                                        className={`text-[13px] font-black tracking-[0.12em] uppercase transition-all hover:text-cyan-600 flex items-center gap-1.5 py-8 ${location.pathname === item.path ? 'text-cyan-600' : 'text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                        {item.children && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                                        <span className={`absolute bottom-6 left-0 w-full h-0.5 bg-cyan-600 transform origin-left transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'}`}></span>
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {item.children && (
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-2 transition-all duration-300 transform origin-top ${openDropdown === item.label ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-2'
                                            }`}>
                                            <div className="space-y-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path + child.label}
                                                        to={child.path}
                                                        className="block px-5 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/contact"
                                className="text-slate-600 px-5 py-3 rounded-full font-black text-xs uppercase tracking-[0.15em] hover:text-slate-900 transition-all"
                            >
                                Contact Sales
                            </Link>
                            <Link
                                to="/trials"
                                className="bg-slate-900 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.15em] hover:bg-cyan-600 hover:-translate-y-0.5 transition-all shadow-xl flex items-center gap-2"
                            >
                                Join Study
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden p-2 text-slate-900 hover:text-cyan-600 bg-white/50 rounded-lg border border-slate-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="xl:hidden absolute top-24 left-6 right-6 glass rounded-3xl shadow-2xl animate-in fade-in slide-in-from-top-4 z-40 overflow-hidden border border-slate-200 max-h-[calc(100vh-8rem)] overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <div className="space-y-1">
                                            <div className="px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-4 first:mt-0">
                                                {item.label}
                                            </div>
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.path + child.label}
                                                    to={child.path}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className={`block p-4 rounded-xl text-base font-bold uppercase tracking-widest border border-transparent ${location.pathname === child.path
                                                        ? 'bg-cyan-50 text-cyan-600 border-cyan-100'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block p-4 rounded-xl text-base font-bold uppercase tracking-widest border border-transparent ${location.pathname === item.path
                                                ? 'bg-cyan-50 text-cyan-600 border-cyan-100'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 space-y-3">
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center border-2 border-slate-900 text-slate-900 p-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                                >
                                    Contact Sales
                                </Link>
                                <Link
                                    to="/trials"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center bg-slate-900 text-white p-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all flex items-center justify-center gap-2"
                                >
                                    Join Study
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-32 pb-20 max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10">
                {children}
            </main>

            {/* CTA & Footer Section */}
            <footer className="relative z-10 mt-auto">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-20 relative">
                    {/* Visual Accents behind CTAs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
                        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[80%] bg-cyan-400/20 blur-[120px] rounded-full mix-blend-soft-light animate-pulse"></div>
                        <div className="absolute top-[10%] right-[20%] w-[40%] h-[80%] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-overlay"></div>
                    </div>



                    {/* Main Footer */}
                    <div className="glass-dark rounded-[3.5rem] p-16 border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                            <div className="space-y-8">
                                <Link to="/" className="flex items-center gap-4 group">
                                    <div className="h-14 bg-white px-4 py-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-white/50 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                        <img src="/logo.jpg" alt="MusB Research" className="h-full w-auto object-contain mix-blend-multiply" />
                                    </div>
                                </Link>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    Advancing bone biology and biomechanics research to improve human health and quality of life.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-black uppercase tracking-[0.2em] text-[11px] mb-10">Solutions</h4>
                                <ul className="space-y-5">
                                    {[
                                        { label: 'For Businesses', path: '/support' },
                                        { label: 'For Patients', path: '/trials' },
                                        { label: 'Innovations', path: '/innovations' },
                                        { label: 'Clinical Trials', path: '/trials' }
                                    ].map((item) => (
                                        <li key={item.label}><Link to={item.path} className="text-slate-400 hover:text-cyan-400 text-[13px] transition-colors font-bold">{item.label}</Link></li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-black uppercase tracking-[0.2em] text-[11px] mb-10">About MusB</h4>
                                <ul className="space-y-5">
                                    {[
                                        { label: 'Why Choose Us', path: '/about' },
                                        { label: 'Facilities', path: '/facilities' },
                                        { label: 'Our Team', path: '/team' },
                                        { label: 'Careers', path: '/careers' }
                                    ].map((item) => (
                                        <li key={item.label}><Link to={item.path} className="text-slate-400 hover:text-cyan-400 text-[13px] transition-colors font-bold">{item.label}</Link></li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Contact</h4>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-3 text-slate-400 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                                        <span>6331 State Road 54,<br />New Port Richey, FL 34653</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                                        <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                                        <span>+1- 813-419-0781</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            <p>© {new Date().getFullYear()} MusB Research Group.</p>
                            <div className="flex gap-10">
                                <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                                <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                                <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
