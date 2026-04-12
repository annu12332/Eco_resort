import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activities = () => {
    const [allActivities, setAllActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/activities`);
                const formattedData = res.data.map((act, index) => ({
                    title: act.title,
                    desc: act.description,
                    image: act.image,
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
            <Loader2 className="animate-spin text-[#3A6332]" size={40} />
        </div>
    );

    return (
        <section className="py-24 bg-[#F2F0D0] px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#3A6332]/10 border border-[#3A6332]/20 text-[#3A6332] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                    >
                        <Sparkles size={14} />
                        Curated Experiences
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-serif text-[#3A6332] italic mb-6 leading-tight"
                    >
                        Explore the <span className='text-[#78A370]'>Wilderness</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#2D3629]/70 text-lg md:text-xl font-sans font-light italic"
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
                            className={`${activity.span} group relative rounded-[2.5rem] overflow-hidden border border-[#A3C999]/30 bg-white shadow-sm h-[300px] md:h-[350px] hover:shadow-xl transition-all duration-500`}
                        >
                            {/* Image */}
                            <img 
                                src={activity.image} 
                                alt={activity.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3629]/90 via-[#2D3629]/20 to-transparent" />
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-[#F2F0D0] font-serif text-2xl md:text-3xl mb-3 group-hover:text-[#A3C999] transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-[#F2F0D0]/80 text-sm md:text-base max-w-sm group-hover:text-white transition-colors line-clamp-2 font-light">
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
                        className="inline-flex items-center gap-3 bg-[#3A6332] text-[#F2F0D0] px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(58,99,50,0.2)] transition-all duration-300 group"
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