import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activities = () => {
    // 1. ADDED: State to manage activities data
    const [allActivities, setAllActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';

    // 2. ADDED: Fetch data from backend
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/activities`);
                // Backend data mapping to match UI structure
                const formattedData = res.data.map((act, index) => ({
                    title: act.title,
                    desc: act.description,
                    image: act.image,
                    // Dynamic span for layout (alternating grid)
                    span: index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
                }));
                setAllActivities(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching activities:", err);
                setLoading(false);
            }
        };

        fetchActivities();
    }, [API_URL]);

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
    );

    return (
        <section className="py-24 bg-transparent px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-700/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                    >
                        <Sparkles size={14} />
                        Curated Experiences
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-serif text-white italic mb-6 leading-tight"
                    >
                        Explore the <span className='text-emerald-300/90'>Wilderness</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-stone-300/80 text-lg md:text-xl font-light"
                    >
                        Disconnect from the rush and reconnect with nature through our tailored adventure and relaxation activities.
                    </motion.p>
                </div>

                {/* --- Activities Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {allActivities.slice(0, 4).map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className={`${activity.span} group relative rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.03] backdrop-blur-xl h-[300px] md:h-[350px] hover:border-emerald-500/30 transition-all duration-500`}
                        >
                            {/* Image */}
                            <img 
                                src={activity.image} 
                                alt={activity.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-white font-serif text-2xl md:text-3xl mb-3 group-hover:text-emerald-300 transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-white/60 text-sm md:text-base max-w-sm group-hover:text-white/80 transition-colors line-clamp-2">
                                    {activity.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- CTA Button --- */}
                <Link to={'/activities'} className="text-center block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 group"
                    >
                        View All Activities
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default Activities;