import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLeaf, FaArrowRight, FaWind, FaUsers, FaBed, FaDollarSign } from 'react-icons/fa';

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://eco-resort-server.onrender.com/api/cottages`);
                if (!response.ok) throw new Error('Failed to fetch accommodations');
                const data = await response.json();
                setDisplayRooms(Array.isArray(data) ? data.slice(0, 4) : []);
            } catch (err) {
                setError("Unable to load accommodations at the moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#FBFBF9]">
            {/* --- NATURAL TEXTURE OVERLAY --- */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                 style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>

            <div className="relative z-10 container mx-auto px-6 lg:px-20">
                
                {/* --- SECTION HEADER --- */}
                <div className="max-w-3xl mb-20" data-aos="fade-right">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-[#78936D]"></div>
                        <span className="text-[#78936D] uppercase tracking-[0.4em] text-[10px] font-black">
                            Artisanal Living
                        </span>
                    </div>
                    
                    <h2 className="text-[#2D3629] text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                        Our <span className="italic font-light text-[#78936D]">Eco-Crafted</span> <br /> 
                        Sanctuaries
                    </h2>
                    
                    <p className="text-[#5B6356] text-lg font-sans font-light leading-relaxed max-w-xl italic border-l-2 border-[#78936D]/20 pl-6">
                        "Ekhane thaka mane prokritir buke fire jaoa. Protiti cottage toiri hoyeche local mud, bamboo, ebong forest wood diye."
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[500px] bg-stone-100 rounded-[40px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                        {displayRooms.map((room, index) => (
                            <motion.div 
                                key={room._id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={cardVariants}
                                className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
                            >
                                {/* IMAGE CONTAINER WITH ASYMMETRICAL MASK */}
                                <div className="relative mb-8 overflow-hidden rounded-[40px_15px_60px_20px] shadow-2xl transition-all duration-700 group-hover:shadow-[#4A5D43]/10">
                                    <img 
                                        src={room.image?.[0] || '/placeholder.jpg'} 
                                        alt={room.title} 
                                        className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-1000 scale-[1.02] group-hover:scale-110"
                                    />
                                    
                                    {/* PRICE TAG (RAW STYLE) */}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-lg border border-white/50">
                                        <p className="text-[#2D3629] font-serif italic text-xl">
                                            ${room.price}<span className="text-[10px] uppercase tracking-tighter not-italic font-bold opacity-60">/night</span>
                                        </p>
                                    </div>

                                    {/* CATEGORY OVERLAY */}
                                    <div className="absolute bottom-6 right-6 bg-[#2D3629]/80 backdrop-blur-sm text-[#FBFBF9] px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold">
                                        {room.category || 'Forest Suite'}
                                    </div>
                                </div>

                                {/* CONTENT AREA */}
                                <div className="px-2">
                                    <h3 className="text-[#2D3629] text-3xl md:text-4xl font-serif mb-4 group-hover:text-[#78936D] transition-colors">
                                        {room.title}
                                    </h3>
                                    
                                    <p className="text-[#5B6356] text-sm md:text-base leading-relaxed font-sans font-light mb-8 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {/* NATURAL FEATURES GRID */}
                                    <div className="flex items-center gap-8 py-6 border-y border-[#2D3629]/5 mb-8">
                                        <div className="flex items-center gap-3">
                                            <FaUsers className="text-[#78936D] text-sm" />
                                            <span className="text-[10px] uppercase tracking-widest font-black text-[#2D3629]/60">
                                                {(room.maxOccupancy?.adults || 0) + (room.maxOccupancy?.children || 0)} Guests
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaBed className="text-[#78936D] text-sm" />
                                            <span className="text-[10px] uppercase tracking-widest font-black text-[#2D3629]/60">
                                                {room.bedType || 'King Size'}
                                            </span>
                                        </div>
                                    </div>

                                    <Link 
                                        to={`/room/${room.slug || room._id}`}
                                        className="inline-flex items-center gap-4 text-[#2D3629] font-black text-[11px] uppercase tracking-[0.3em] group/btn"
                                    >
                                        Explore Ethics & Details
                                        <span className="w-10 h-[1px] bg-[#2D3629] transition-all duration-300 group-hover/btn:w-16 group-hover/btn:bg-[#78936D]"></span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* --- FOOTER CTA --- */}
                <div className="mt-32 text-center" data-aos="fade-up">
                    <Link 
                        to="/all-rooms" 
                        className="group relative inline-flex items-center gap-4 bg-[#2D3629] text-[#FBFBF9] px-12 py-6 rounded-none font-sans text-[11px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all shadow-2xl hover:bg-[#3A4535]"
                    >
                        <span className="relative z-10">All Accommodations</span>
                        <FaArrowRight className="relative z-10 text-[10px] transition-transform group-hover:translate-x-2" />
                    </Link>
                    <p className="mt-8 text-[#5B6356] text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 italic">
                        — Every stay plants a tree —
                    </p>
                </div>
            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>
        </section>
    );
};

export default Accommodation;