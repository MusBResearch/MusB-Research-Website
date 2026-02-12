import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="space-y-24 py-12 animate-in fade-in duration-700">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">Contact Us</h1>
                <p className="text-xl text-slate-500 font-medium">Get in touch with our team for inquiries, collaborations, or study participation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Contact Info */}
                <div className="grid gap-6">
                    <div className="glass p-8 rounded-[2rem] flex items-center space-x-6 hover:bg-white transition-all duration-500 group">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Email</h3>
                            <p className="text-lg font-bold text-slate-900">info@musbresearch.com</p>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-[2rem] flex items-center space-x-6 hover:bg-white transition-all duration-500 group">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</h3>
                            <p className="text-lg font-bold text-slate-900">+1- 813-419-0781</p>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-[2rem] flex items-center space-x-6 hover:bg-white transition-all duration-500 group">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Lab Location</h3>
                            <p className="text-lg font-bold text-slate-900 leading-tight">
                                6331 State Road 54,<br />
                                New Port Richey, FL 34653
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="glass p-10 rounded-[3rem] space-y-8 shadow-2xl">
                    <h3 className="text-2xl font-black text-slate-900">Send a Message</h3>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Name</label>
                        <input type="text" id="name" className="w-full p-4 rounded-2xl bg-white/50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all font-semibold" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                        <input type="email" id="email" className="w-full p-4 rounded-2xl bg-white/50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all font-semibold" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                        <textarea id="message" rows={4} className="w-full p-4 rounded-2xl bg-white/50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all font-semibold" placeholder="How can we help?" />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                        Send Message
                    </button>
                </form>
            </div>
        </div>

    );
}
