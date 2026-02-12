import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ClinicalStudyFinder from '../components/ClinicalStudyFinder';

const slides = [
    {
        id: 1,
        headline: "Your Trusted Partner in R&D Excellence",
        subtext: [
            "Comprehensive solutions from early screening to clinical studies",
            "Led by world-class scientists and experienced industry professionals",
            "Community-based clinical trials and translational research under one umbrella"
        ],
        primaryCTA: "Find a Clinical Study",
        secondaryCTA: "Work With Us (Sponsors & Partners)",
        image: "/hero1.png"
    },
    {
        id: 2,
        headline: "Advancing Bone Biology & Biomechanics",
        subtext: [
            "Leveraging state-of-the-art CLIA labs for precise discovery",
            "Dedicated to improving human health through musculoskeletal research",
            "Innovative methodologies bridging the gap between bench and bedside"
        ],
        primaryCTA: "Our Methodology",
        secondaryCTA: "Explore Publications",
        image: "/hero2.png"
    },
    {
        id: 3,
        headline: "World-Class Research Facilities",
        subtext: [
            "Equipped with cutting-edge medical imaging and diagnostic technology",
            "Fostering a collaborative environment for groundbreaking discoveries",
            "Supporting sponsors with reliable, high-integrity data collections"
        ],
        primaryCTA: "Tour Facilities",
        secondaryCTA: "Meet Our Team",
        image: "/hero3.png"
    }
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Optional: Auto-slide every 8 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative -mt-32 -mx-6 md:-mx-12 overflow-hidden">
            {/* Slider Container */}
            <div className="relative h-[95vh] min-h-[900px] w-full flex items-center overflow-hidden">

                {/* Visual Background (High-Contrast Blurs) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[100%] bg-cyan-400/20 blur-[120px] rounded-full mix-blend-soft-light animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[80%] bg-indigo-500/20 blur-[140px] rounded-full mix-blend-overlay"></div>
                    {/* Add a subtle highlight flare behind the text area */}
                    <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-white/30 blur-[100px] rounded-full pointer-events-none"></div>
                </div>

                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                            }`}
                    >
                        {/* Full-Width Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={slide.image}
                                alt={slide.headline}
                                className="w-full h-full object-cover"
                            />
                            {/* Cinematic Gradient Overlays (Vibrant Reference Match) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/95 via-cyan-50/70 to-transparent z-10 hidden lg:block"></div>
                            <div className="absolute inset-0 bg-cyan-50/90 z-10 lg:hidden text-center"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-transparent to-cyan-400/10 z-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent z-20"></div>
                        </div>

                        {/* Content Container */}
                        <div className="relative z-30 h-full max-w-full mx-auto px-8 md:px-20 lg:px-32 flex items-center pt-40">
                            <div className="max-w-3xl space-y-10 animate-in slide-in-from-left-12 duration-1000">
                                <div className="space-y-6">
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight">
                                        {slide.headline.split(' ').map((word, i) => (
                                            word === "Excellence" || word === "Biology" || word === "Facilities" ? (
                                                <span key={i} className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">{word} </span>
                                            ) : (
                                                <span key={i}>{word} </span>
                                            )
                                        ))}
                                    </h1>
                                    <div className="space-y-4">
                                        {slide.subtext.map((line, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="mt-2.5 w-2 h-2 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                                                <p className="text-slate-600 text-xl md:text-2xl font-semibold leading-relaxed">
                                                    {line}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-5 pt-4">
                                    <Link
                                        to="/trials"
                                        className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-cyan-600 hover:-translate-y-1 transition-all shadow-2xl flex items-center gap-3 group"
                                    >
                                        {slide.primaryCTA}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="bg-white/40 backdrop-blur-xl border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:-translate-y-1 transition-all shadow-lg"
                                    >
                                        {slide.secondaryCTA}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <div className="absolute bottom-4 right-6 md:right-12 z-20 flex gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-xl group"
                    >
                        <ChevronLeft className="w-6 h-6 group-active:scale-95" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-xl group"
                    >
                        <ChevronRight className="w-6 h-6 group-active:scale-95" />
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-6 md:left-12 z-20 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-12 bg-slate-900' : 'w-4 bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
            {/* Clinical Study Finder Section */}
            <ClinicalStudyFinder />
        </div>
    );
}
