import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Leaf, ShieldCheck, Award, Coffee, Mountain, Wind, ArrowRight } from 'lucide-react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ 
            duration: 1500,
            once: true,
            easing: 'ease-out-cubic'
        });
    }, []);

    const stats = [
        { label: "Eco Conscious", value: "100%" },
        { label: "Pristine Jungle", value: "50+" },
        { label: "Native Species", value: "200+" },
        { label: "Refined Stays", value: "10k+" }
    ];

    return (
        <div className="bg-[#FCFAF7] text-stone-900 overflow-hidden selection:bg-emerald-900 selection:text-white">
            
            {/* --- Hero Section: Cinematic Entrance --- */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img 
                        initial={{ scale: 1.2, filter: 'blur(10px)' }}
                        animate={{ scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
                        className="w-full h-full object-cover opacity-80"
                        alt="Luxury Eco Exterior"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-[#FCFAF7]"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <span className="text-emerald-900 uppercase tracking-[0.8em] text-[10px] font-black block mb-10 opacity-70">
                            The Sanctuary Archive — Est. 1994
                        </span>
                        <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.85] mb-12 text-stone-950">
                            Defined by <br /> 
                            <span className="italic font-light text-emerald-900/80 font-serif">Simplicity</span>
                        </h1>
                        <div className="flex items-center justify-center gap-6">
                            <div className="w-20 h-[1px] bg-emerald-900/20"></div>
                            <Wind className="text-emerald-800 animate-pulse" size={24} strokeWidth={1} />
                            <div className="w-20 h-[1px] bg-emerald-900/20"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Section 01: Heritage & Philosophy --- */}
            <section className="py-40 px-6 lg:px-24 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-32 items-center">
                    <div className="lg:w-1/2 relative" data-aos="fade-up">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/10 group">
                            <img 
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                                alt="Eco Philosophy" 
                                className="w-full h-[700px] object-cover transition-transform duration-[3s] group-hover:scale-110"
                            />
                        </div>
                        {/* Abstract Floating Element */}
                        <div className="absolute -bottom-16 -right-16 bg-emerald-950 p-16 rounded-[4rem] hidden xl:block shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-700">
                            <Leaf className="text-emerald-100/50" size={60} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-12" data-aos="fade-left">
                        <div className="space-y-6">
                            <span className="text-emerald-800 uppercase tracking-[0.4em] text-[11px] font-black border-b border-emerald-100 pb-2">Manifesto</span>
                            <h2 className="text-6xl md:text-8xl font-serif text-stone-950 leading-tight">
                                Where Silence <br /><span className="italic font-light">is the New Luxury</span>
                            </h2>
                        </div>
                        <p className="text-emerald-900/70 font-serif text-3xl leading-relaxed italic border-l-4 border-emerald-900/10 pl-10">
                            "We believe the loudest statement is made in the quietest moments of nature."
                        </p>
                        <p className="text-stone-500 font-light leading-[2] text-xl max-w-xl">
                            Almaris Eco isn't just a destination; it's a rebellion against the chaotic world. We’ve meticulously crafted an escape that honors the rugged landscape of Chittagong while providing the uncompromising elegance of a boutique sanctuary.
                        </p>
                        <div className="pt-8">
                            <button className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-stone-900 hover:text-emerald-800 transition-colors">
                                Our Collective Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 02: Minimalism Stats --- */}
            <section className="py-32 bg-stone-100/50 border-y border-stone-200">
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-20">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                            <h3 className="text-emerald-950 text-7xl font-serif mb-4 italic group-hover:scale-110 transition-transform duration-500">{stat.value}</h3>
                            <p className="text-stone-400 uppercase tracking-[0.5em] text-[10px] font-black">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 03: Values (Refined Cards) --- */}
            <section className="py-40 px-6 lg:px-24 container mx-auto">
                <div className="text-center mb-32 space-y-6" data-aos="fade-up">
                    <span className="text-emerald-900 uppercase tracking-[0.6em] text-[10px] font-black">Our Principles</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-stone-950 italic">The Pillars of Almaris</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        { icon: ShieldCheck, title: "Unseen Privacy", desc: "Every villa is positioned to ensure the only witness to your retreat is the horizon." },
                        { icon: Award, title: "Zero Trace", desc: "Powered by solar intelligence and rainwater cycles, ensuring our jungle footprint remains invisible." },
                        { icon: Coffee, title: "Hilltop Harvest", desc: "Experience 100% farm-to-table dining, curated daily from our private botanical gardens." }
                    ].map((val, idx) => (
                        <div key={idx} className="relative p-16 rounded-[4rem] bg-white border border-stone-100 hover:border-emerald-900/20 hover:shadow-2xl transition-all duration-700 group overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000 opacity-50"></div>
                            <val.icon className="text-emerald-900 mb-12 transition-transform duration-700 group-hover:rotate-[360deg]" size={50} strokeWidth={1} />
                            <h4 className="text-stone-950 text-3xl font-serif mb-6 italic">{val.title}</h4>
                            <p className="text-stone-500 text-lg font-light leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 04: The Founder's Note (High-Contrast) --- */}
            <section className="py-48 bg-emerald-950 text-stone-100 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col xl:flex-row gap-32 items-center">
                        <div className="relative shrink-0" data-aos="zoom-in">
                            <div className="w-72 h-96 rounded-[4rem] overflow-hidden border-[12px] border-emerald-900/50 shadow-3xl rotate-[-3deg]">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" alt="Founder" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                            </div>
                            <div className="absolute -top-10 -left-10 text-[15rem] font-serif text-emerald-900/30 leading-none select-none">“</div>
                        </div>
                        
                        <div className="space-y-12" data-aos="fade-left">
                            <p className="text-4xl md:text-6xl font-serif italic text-emerald-50 leading-[1.3] relative z-10">
                                Almaris is a living testament to the beauty that survives when luxury learns to listen to the Earth.
                            </p>
                            <div className="flex items-center gap-10">
                                <div className="w-24 h-[1px] bg-emerald-50/20"></div>
                                <div>
                                    <h5 className="text-emerald-100 font-black uppercase tracking-[0.5em] text-sm">Julian Almaris</h5>
                                    <p className="text-emerald-500 text-[10px] uppercase font-bold mt-3 tracking-widest">Architect of Sanctuary</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;