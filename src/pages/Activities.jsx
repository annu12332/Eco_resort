import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Tent, Mountain, Waves, DollarSign, Clock, AlertTriangle } from 'lucide-react';

const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'https://eco-resort-server.onrender.com';

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/activities`);
                setActivities(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching activities:", err);
                setError("Failed to load activities. Please try again later.");
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    // Icon mapper based on keywords
    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('camping')) return Tent;
        if (t.includes('trek') || t.includes('mountain')) return Mountain;
        if (t.includes('kayak') || t.includes('river')) return Waves;
        if (t.includes('bird')) return Leaf;
        return Leaf;
    };

    // Skeleton Loader for production-like loading experience
    const SkeletonLoader = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-[2rem] border border-stone-100 p-6 flex flex-col md:flex-row gap-6 animate-pulse">
                    <div className="md:w-2/5 h-60 bg-stone-200 rounded-3xl"></div>
                    <div className="md:w-3/5 flex flex-col gap-4">
                        <div className="h-8 bg-stone-200 rounded-full w-3/4"></div>
                        <div className="h-4 bg-stone-200 rounded-full w-full"></div>
                        <div className="h-4 bg-stone-200 rounded-full w-full"></div>
                        <div className="h-10 bg-stone-200 rounded-full w-1/3 mt-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="flex items-center justify-center gap-2 text-emerald-700 text-xs uppercase tracking-[0.3em] font-bold mb-3">
                        <Leaf size={14} /> Eco Experiences
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif italic text-stone-950 mb-6">
                        Immerse in Nature
                    </h1>
                    <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover a range of sustainable activities designed to connect you with the environment while leaving a minimal footprint.
                    </p>
                </motion.div>
            </div>

            {/* Activities Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                
                {loading && <SkeletonLoader />}
                
                {error && (
                    <div className="flex flex-col items-center justify-center py-20 text-red-600 bg-red-50 rounded-3xl border border-red-100">
                        <AlertTriangle size={48} className="mb-4" />
                        <p className="text-xl font-semibold">{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-sm underline">Try Again</button>
                    </div>
                )}

                {!loading && !error && activities.length === 0 && (
                    <div className="text-center py-20 text-stone-500 bg-white rounded-3xl border border-stone-100">
                        <Leaf size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-xl font-semibold">No activities found</p>
                        <p>Check back later for more adventures.</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activities.map((activity, index) => {
                            const ActivityIcon = getIcon(activity.title);
                            return (
                                <motion.div
                                    key={activity._id}
                                    className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Image with Price Tag */}
                                    <div className="md:w-2/5 overflow-hidden relative">
                                        <img 
                                            src={activity.image} 
                                            alt={activity.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy" // Production optimization
                                        />
                                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-emerald-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1 shadow-inner">
                                            <DollarSign size={16} />
                                            {activity.price}
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-8 md:w-3/5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl">
                                                    <ActivityIcon size={28} />
                                                </div>
                                                <h3 className="text-2xl font-serif italic text-stone-950 leading-tight">{activity.title}</h3>
                                            </div>
                                            <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                                {activity.description}
                                            </p>
                                        </div>
                                        
                                        {/* Bottom Meta Info */}
                                        <div className="flex justify-between items-center mt-auto pt-5 border-t border-stone-100">
                                            <div className="flex items-center gap-2 text-xs text-stone-500">
                                                <Clock size={14} className="text-emerald-600" />
                                                {activity.duration}
                                            </div>
                                            <button className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-100 transition-all">
                                                Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-stone-100 rounded-t-[3rem] mt-10">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-4xl font-serif italic text-stone-950 mb-4">Plan Your Eco Adventure</h2>
                    <p className="text-stone-600 mb-8 max-w-lg mx-auto">Book your stay and activities together to ensure a seamless and sustainable nature experience.</p>
                    <button className="bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-emerald-500/20">
                        <MapPin size={16} /> Book Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage;