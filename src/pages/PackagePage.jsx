import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Clock, ArrowUpRight, Compass, Inbox } from 'lucide-react';

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';
            try {
                const res = await axios.get(`${API_URL}/api/packages`);
                setPackages(res.data);
            } catch (err) {
                console.error("Error fetching packages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
        window.scrollTo(0, 0);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    if (loading) return (
        <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-emerald-800 mb-4" size={48} strokeWidth={1} />
            <p className="text-stone-400 font-serif italic tracking-[0.2em]">Preparing your journey...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 selection:bg-emerald-100 overflow-x-hidden">
            {/* --- Hero Header --- */}
            <header className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-emerald-800 mb-4"
                    >
                        <Compass size={18} />
                        <span className="uppercase tracking-[0.5em] text-[10px] font-black">Sustainable Luxury</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif italic text-stone-950 mb-6"
                    >
                        Curated Expeditions
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed italic"
                    >
                        "A collection of purposeful journeys designed to reconnect your soul with the whispers of nature."
                    </motion.p>
                </div>
            </header>

            {/* --- Grid Layout --- */}
            <main className="max-w-[1400px] mx-auto px-6 pb-32">
                {packages.length > 0 ? (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {packages.map((pkg) => (
                            <motion.div 
                                key={pkg._id} 
                                variants={itemVariants}
                                className="group bg-white rounded-[3rem] border border-stone-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-950/5 transition-all duration-700 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src={pkg.image || "https://placehold.co/800x600?text=Nature+Awaits"} 
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                                        alt={pkg.title}
                                        loading="lazy"
                                    />
                                    
                                    {/* Glassmorphism Price Overlay */}
                                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md text-stone-900 px-5 py-2 rounded-full font-serif italic text-lg shadow-sm flex items-center gap-2">
                                        <span className="text-[10px] not-italic font-black text-emerald-700 uppercase tracking-tighter">$</span>
                                        {pkg.price?.toLocaleString()}
                                    </div>

                                    {/* Hover Overlay Icon */}
                                    <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 h-16 rounded-full bg-white text-emerald-900 flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ArrowUpRight size={24} />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Content Area */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-stone-400 text-[9px] mb-4 font-black uppercase tracking-[0.3em]">
                                        <span className="flex items-center gap-1.5 text-emerald-700">
                                            <Clock size={12} strokeWidth={3} /> 
                                            {pkg.duration || "Custom Stay"}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-stone-200" />
                                        <span>All-Inclusive</span>
                                    </div>

                                    <h3 className="text-2xl font-serif italic text-stone-950 mb-4 leading-snug group-hover:text-emerald-800 transition-colors">
                                        {pkg.title}
                                    </h3>
                                    
                                    <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-2 mb-8 italic">
                                        {pkg.description || "An immersive experience tailored to provide peace and rejuvenation in the heart of our sanctuary."}
                                    </p>
                                    
                                    <div className="mt-auto">
                                        <Link 
                                            to={`/package/${pkg._id}`} 
                                            className="inline-flex items-center justify-between w-full bg-[#FCFAF7] group-hover:bg-stone-950 text-stone-950 group-hover:text-white px-8 py-4 rounded-full transition-all duration-500 overflow-hidden"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Begin Journey</span>
                                            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center text-stone-400">
                        <Inbox size={48} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="font-serif italic">New expeditions are currently being charted.</p>
                    </div>
                )}
            </main>

            {/* --- Subtle Background Elements --- */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-20">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-stone-200 rounded-full blur-[80px]" />
            </div>
        </div>
    );
};

export default PackagesPage;