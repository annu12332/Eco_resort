import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight, FaUsers, FaLeaf } from 'react-icons/fa';

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://eco-resort-server.onrender.com/api/cottages`);
                if (!response.ok) throw new Error('Failed to fetch accommodations');
                const data = await response.json();
                setDisplayRooms(Array.isArray(data) ? data.slice(0, 4) : []);
            } catch (err) {
                setError("Unable to load accommodations.");
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="relative py-16 md:py-24 bg-[#FBFBF9] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>

            <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-20">
                
                <div className="flex flex-row items-end justify-between mb-10 gap-4">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <FaLeaf className="text-[#78936D] text-[10px]" />
                            <span className="text-[#78936D] uppercase tracking-[0.3em] text-[9px] font-bold">Premium Stays</span>
                        </div>
                        <h2 className="text-[#2D3629] text-3xl md:text-5xl font-serif leading-tight">
                            Eco <span className="italic font-light text-[#78936D]">Cottages</span>
                        </h2>
                    </div>
                    <Link to="/all-rooms" className="text-[#2D3629] font-bold text-[10px] md:text-[11px] uppercase tracking-widest border-b border-[#2D3629]/20 pb-1 hover:text-[#78936D] transition-all whitespace-nowrap">
                        View All
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 md:h-80 bg-stone-100 rounded-2xl md:rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        {displayRooms.map((room) => (
                            <motion.div 
                                key={room._id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={cardVariants}
                                className="group relative overflow-hidden bg-white rounded-xl md:rounded-[32px] md:p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full"
                            >
                                {/* --- MOBILE UI: Image Background Style --- */}
                                <div className="block md:hidden relative h-64 w-full">
                                    <img 
                                        src={room.image?.[0] || '/placeholder.jpg'} 
                                        alt={room.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Dark Overlay for Text Visibility */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                                        <h3 className="text-white text-xs font-serif uppercase tracking-widest leading-relaxed drop-shadow-md">
                                            {room.title}
                                        </h3>
                                    </div>
                                    <Link to={`/room/${room.slug || room._id}`} className="absolute inset-0 z-10"></Link>
                                </div>

                                {/* --- DESKTOP UI: Professional Card Style --- */}
                                <div className="hidden md:flex flex-col h-full">
                                    <div className="relative overflow-hidden rounded-[24px] aspect-[4/5] mb-3">
                                        <img 
                                            src={room.image?.[0] || '/placeholder.jpg'} 
                                            alt={room.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                            <p className="text-[#2D3629] font-bold text-sm">${room.price}<span className="text-[10px] opacity-60">/n</span></p>
                                        </div>
                                        <Link to={`/room/${room.slug || room._id}`} className="absolute inset-0 z-10"></Link>
                                    </div>

                                    <div className="px-2 flex-1 flex flex-col">
                                        <p className="text-[#78936D] text-[9px] uppercase font-bold tracking-[0.2em] mb-1">{room.category || 'Luxury'}</p>
                                        <h3 className="text-[#2D3629] text-xl font-serif mb-2 line-clamp-1 group-hover:text-[#78936D] transition-colors">{room.title}</h3>
                                        
                                        <div className="flex items-center justify-between pt-2 border-t border-stone-50 mt-auto">
                                            <div className="flex items-center gap-1.5">
                                                <FaUsers className="text-[#78936D] text-[10px]" />
                                                <span className="text-[10px] font-medium text-stone-500">{(room.maxOccupancy?.adults || 0) + (room.maxOccupancy?.children || 0)} Guests</span>
                                            </div>
                                            <FaArrowRight className="text-[#2D3629]/20 group-hover:text-[#78936D] group-hover:translate-x-1 transition-all" size={10} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </section>
    );
};

export default Accommodation;