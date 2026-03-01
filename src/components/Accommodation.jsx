import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLeaf, FaArrowRight, FaWind, FaUsers, FaBed, FaDollarSign } from 'react-icons/fa';

// প্রোডাকশন লেভেলে .env ফাইল থেকে API URL নেওয়া ভালো
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AOS initialization
        AOS.init({ duration: 800, once: true });

        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://eco-resort-server.onrender.com/api/rooms`);
                
                if (!response.ok) throw new Error('Failed to fetch accommodations');
                
                const data = await response.json();
                setDisplayRooms(Array.isArray(data) ? data.slice(0, 4) : []);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setError("Unable to load accommodations at the moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Skeleton Loader Component for Better UX
    const SkeletonCard = () => (
        <div className="bg-white rounded-3xl p-5 border border-stone-100 animate-pulse">
            <div className="rounded-2xl bg-stone-200 aspect-[16/10] mb-6"></div>
            <div className="h-4 bg-stone-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-stone-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-stone-200 rounded w-full mb-6"></div>
            <div className="flex justify-between gap-2">
                <div className="h-6 bg-stone-200 rounded w-1/3"></div>
                <div className="h-6 bg-stone-200 rounded w-1/3"></div>
            </div>
        </div>
    );

    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-stone-50 text-stone-900">
            {/* --- Organic Decorative Background --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-stone-50 to-stone-50"></div>
                <div className="absolute -top-40 -left-20 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[120px] opacity-40"></div>
                <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-stone-200 rounded-full blur-[120px] opacity-40"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
                
                {/* --- Section Header --- */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="h-px w-8 bg-emerald-700/30"></span>
                        <span className="text-emerald-800 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-2">
                            <FaLeaf size={10} /> Sanctuary Awaits
                        </span>
                        <span className="h-px w-8 bg-emerald-700/30"></span>
                    </div>
                    
                    <h2 className="text-stone-950 text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-tight mb-4">
                        Discover Your <span className="italic font-light text-emerald-700">Private</span> Oasis
                    </h2>
                    
                    <p className="text-stone-700 max-w-lg mx-auto text-base font-light leading-relaxed">
                        Thoughtfully designed to blend with the surrounding rainforest.
                    </p>
                </div>

                {/* --- Room Grid & Error/Loading States --- */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-red-100 shadow-sm">
                        <p className="text-stone-800 font-medium">{error}</p>
                    </div>
                ) : displayRooms.length === 0 ? (
                    <div className="text-center py-16 text-stone-600">No rooms available currently.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {displayRooms.map((room) => (
                            <motion.div 
                                key={room._id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={cardVariants}
                                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)" }}
                                className="group relative bg-white rounded-3xl p-5 shadow-lg shadow-stone-200/50 border border-stone-100 flex flex-col transition-all duration-300"
                            >
                                {/* --- Card Top: Image --- */}
                                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6">
                                    <img 
                                        src={room.image || room.thumbnail} 
                                        alt={room.type} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    
                                    {/* Price Badge */}
                                    <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl shadow-inner">
                                        <div className="text-stone-950 text-lg md:text-xl font-serif flex items-center gap-1">
                                            <FaDollarSign size={14} className="text-emerald-700" />
                                            {room.price}<span className="text-xs font-sans text-stone-700 font-medium">/night</span>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Card Bottom: Info --- */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="bg-emerald-50 text-emerald-800 text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full">
                                            {room.category || 'Suite'}
                                        </div>
                                        <div className="flex gap-2 text-stone-400 text-sm">
                                            <FaWind title="Air Conditioning" /> <FaUsers title="Capacity" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-stone-950 text-2xl font-serif tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
                                        {room.type}
                                    </h3>
                                    
                                    <p className="text-stone-600 text-sm leading-relaxed font-light mb-6 flex-1 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {/* --- Detailed Info: Capacity & Bed --- */}
                                    <div className="flex items-center gap-6 pb-6 border-b border-stone-100 mb-6 text-stone-500 text-xs font-medium">
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-emerald-600" />
                                            <span>Up to {room.maxOccupancy?.adults + room.maxOccupancy?.children || '2'} Guests</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaBed className="text-emerald-600" />
                                            <span>{room.bedType || 'King Bed'}</span>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        to={`/room/${room.slug || room._id}`}
                                        className="group/btn inline-flex items-center gap-2 text-emerald-800 font-semibold text-xs mt-auto hover:text-emerald-600"
                                    >
                                        Explore Room Details
                                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* --- Footer CTA --- */}
                <div className="mt-20 text-center" data-aos="fade-up">
                    <Link 
                        to="/all-rooms" 
                        className="group inline-flex items-center gap-3 bg-emerald-700 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        View All Escapes
                        <FaArrowRight size={10} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Accommodation;