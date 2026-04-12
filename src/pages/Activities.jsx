import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, MapPin, Tent, Mountain, Waves, DollarSign, Clock, AlertTriangle, X, Info, ArrowRight, Compass } from 'lucide-react';

const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/activities`);
                setActivities(response.data);
                setLoading(false);
            } catch (err) {
                setError("Connection was interrupted. Please try again.");
                setLoading(false);
            }
        };
        fetchActivities();
        window.scrollTo(0, 0);
    }, []);

    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('camping')) return Tent;
        if (t.includes('trek') || t.includes('mountain') || t.includes('hill')) return Mountain;
        if (t.includes('kayak') || t.includes('river') || t.includes('lake')) return Waves;
        return Leaf;
    };

    const SkeletonLoader = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-[3rem] p-8 flex flex-col gap-8 animate-pulse border border-stone-100">
                    <div className="w-full h-72 bg-stone-100 rounded-[2.5rem]"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-stone-100 rounded-full w-2/3"></div>
                        <div className="h-4 bg-stone-100 rounded-full w-full"></div>
                        <div className="h-12 bg-stone-50 rounded-full w-1/3 mt-6"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFCF9] text-stone-900 selection:bg-emerald-900 selection:text-white">
            
            {/* --- Sophisticated Header --- */}
            <header className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="h-[1px] w-12 bg-emerald-900/20"></span>
                        <Compass className="text-emerald-800 animate-[spin_10s_linear_infinite]" size={20} strokeWidth={1} />
                        <span className="h-[1px] w-12 bg-emerald-900/20"></span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif italic text-stone-950 mb-8 tracking-tight leading-[0.85]">
                        The Call of <br /><span className="text-emerald-900 not-italic font-light">The Wild</span>
                    </h1>
                    <p className="text-stone-500 max-w-2xl mx-auto text-xl font-light italic leading-relaxed">
                        Curated experiences designed to harmonize human spirit with the raw, untamed beauty of the sanctuary.
                    </p>
                </motion.div>
            </header>

            {/* --- Main Content Grid --- */}
            <main className="max-w-7xl mx-auto px-6 pb-40">
                {loading && <SkeletonLoader />}

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-stone-100 rounded-[4rem] border border-stone-200">
                        <AlertTriangle size={48} className="mx-auto text-stone-400 mb-6" strokeWidth={1} />
                        <h3 className="text-2xl font-serif italic text-stone-800 mb-4">{error}</h3>
                        <button onClick={() => window.location.reload()} className="text-xs font-black uppercase tracking-[0.4em] border-b-2 border-emerald-900 pb-1 hover:text-emerald-800 transition-all">
                            Reconnect to Nature
                        </button>
                    </motion.div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {activities.map((activity, index) => {
                            const ActivityIcon = getIcon(activity.title);
                            return (
                                <motion.div
                                    key={activity._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className="group relative"
                                >
                                    {/* Image Stage */}
                                    <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-stone-200 shadow-2xl shadow-stone-900/5">
                                        <img 
                                            src={activity.image} 
                                            alt={activity.title}
                                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <div className="bg-emerald-950/90 backdrop-blur-xl text-white px-6 py-2.5 rounded-full flex items-center gap-2 border border-white/10">
                                                <DollarSign size={14} className="text-emerald-400" />
                                                <span className="font-black text-xs uppercase tracking-widest">{activity.price}</span>
                                            </div>
                                        </div>
                                        {/* Floating Badge */}
                                        <button 
                                            onClick={() => setSelectedActivity(activity)}
                                            className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-emerald-900 hover:text-white"
                                        >
                                            <ArrowRight size={24} />
                                        </button>
                                    </div>

                                    {/* Content Stage */}
                                    <div className="mt-10 px-4">
                                        <div className="flex items-center gap-4 mb-4">
                                            <ActivityIcon size={20} className="text-emerald-800" strokeWidth={1.5} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/40">
                                                {activity.duration} Experience
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-serif italic text-stone-950 mb-4 group-hover:translate-x-3 transition-transform duration-500">
                                            {activity.title}
                                        </h3>
                                        <p className="text-stone-500 text-lg font-light leading-relaxed line-clamp-2 italic">
                                            {activity.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* --- Elite Modal --- */}
            <AnimatePresence>
                {selectedActivity && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedActivity(null)}
                            className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative bg-[#FDFCF9] w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-3xl"
                        >
                            <button 
                                onClick={() => setSelectedActivity(null)}
                                className="absolute top-10 right-10 z-20 p-4 bg-emerald-950 text-white rounded-full hover:rotate-90 transition-all duration-500"
                            >
                                <X size={24} />
                            </button>
                            
                            <div className="flex flex-col lg:flex-row h-full lg:h-[600px]">
                                <div className="lg:w-1/2 relative h-64 lg:h-full">
                                    <img src={selectedActivity.image} className="w-full h-full object-cover grayscale-[0.2]" alt="" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FDFCF9]/10 lg:to-[#FDFCF9]" />
                                </div>
                                
                                <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                                    <span className="text-emerald-800 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Adventure Dossier</span>
                                    <h2 className="text-5xl font-serif italic mb-8 leading-tight">{selectedActivity.title}</h2>
                                    
                                    <div className="grid grid-cols-2 gap-8 mb-10">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Investment</p>
                                            <p className="text-xl font-serif italic text-emerald-900">{selectedActivity.price}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Timeframe</p>
                                            <p className="text-xl font-serif italic text-emerald-900">{selectedActivity.duration}</p>
                                        </div>
                                    </div>

                                    <p className="text-stone-500 leading-relaxed text-lg italic font-light mb-12">
                                        {selectedActivity.description}
                                    </p>
                                    
                                    <button className="w-full bg-emerald-950 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-900 transition-all flex items-center justify-center gap-4 group">
                                        Reserve Your Journey <MapPin size={16} className="group-hover:animate-bounce" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Bottom CTA --- */}
            <section className="relative py-48 bg-stone-950 text-stone-100 overflow-hidden text-center rounded-t-[6rem]">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                </div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10 px-6">
                    <h2 className="text-5xl md:text-7xl font-serif italic mb-8">Ready to write your story?</h2>
                    <p className="text-stone-400 mb-12 max-w-xl mx-auto text-xl font-light italic">
                        Our expert guides are ready to reveal the hidden geometry of the jungle.
                    </p>
                    <button className="bg-emerald-600 text-white px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40">
                        Join the Expedition
                    </button>
                </motion.div>
            </section>
        </div>
    );
};

export default ActivitiesPage;