import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, MapPin, ArrowRight, Loader2, Sparkles, Filter, Leaf, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import axios from 'axios';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Jungle View", "River Side", "Treehouse", "Family Cottage"];

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 800, once: true });

        const fetchAllRooms = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';
                const res = await axios.get(`${API_URL}/api/cottages`);
                setRooms(res.data);
                setFilteredRooms(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            }
        };
        fetchAllRooms();
    }, []);

    useEffect(() => {
        let results = rooms.filter(room =>
            room.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (activeCategory !== "All") {
            results = results.filter(room => room.category === activeCategory);
        }
        setFilteredRooms(results);
    }, [searchQuery, activeCategory, rooms]);

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-40 pb-32 px-6 lg:px-16 text-stone-900">
            {/* --- Architectural Header Section --- */}
            <header className="max-w-5xl mx-auto mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                        <Leaf size={14} className="text-emerald-800" />
                        <span className="text-emerald-900 uppercase tracking-[0.4em] text-[9px] font-black">
                            Curated Living Spaces
                        </span>
                    </div>
                    
                    <h1 className="text-stone-950 text-6xl md:text-8xl font-serif italic leading-tight mb-12">
                        Your <span className="text-emerald-900 font-light not-italic">Eco-Luxe</span> <br />
                        Sanctuary Awaits
                    </h1>
                </motion.div>

                {/* --- Integrated Search & Filter Hub --- */}
                <div className="relative z-10 bg-white/70 backdrop-blur-2xl p-3 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-1/3 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Find your escape..."
                                className="w-full bg-stone-50/50 py-4 pl-14 pr-6 rounded-full text-sm font-medium focus:outline-none focus:bg-white border border-transparent focus:border-emerald-100 transition-all"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        <div className="hidden lg:block h-10 w-[1px] bg-stone-200 mx-2" />

                        {/* Filter Categories */}
                        <div className="flex flex-wrap justify-center gap-2 p-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-black transition-all duration-500 whitespace-nowrap ${
                                        activeCategory === cat
                                            ? "bg-emerald-950 text-white shadow-xl shadow-emerald-900/20 scale-105"
                                            : "text-stone-400 hover:text-stone-900 hover:bg-stone-50"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Room Discovery Grid --- */}
            <main className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-40 gap-6">
                        <div className="relative">
                            <Loader2 className="animate-spin text-emerald-900" size={48} strokeWidth={1} />
                            <Wind className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-700/50" size={20} />
                        </div>
                        <p className="text-stone-400 font-serif italic tracking-widest text-lg">Harmonizing the view...</p>
                    </div>
                ) : (
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredRooms.map((room) => (
                                <motion.div
                                    layout
                                    key={room._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6 }}
                                    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-stone-50 hover:shadow-3xl transition-all duration-700"
                                >
                                    {/* Image with Dynamic Overlay */}
                                    <div className="relative h-[400px] overflow-hidden">
                                        <img
                                            src={room.image?.[0] || "https://placehold.co/800x1000?text=Eco+Luxury"}
                                            alt={room.title}
                                            className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110"
                                        />
                                        
                                        {/* Price Badge */}
                                        <div className="absolute top-8 left-8">
                                            <div className="bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl">
                                                <p className="text-emerald-950 font-black text-base">
                                                    ${room.price}<span className="text-[10px] text-stone-400 font-medium lowercase ml-1">/ Night</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Category Floating Tag */}
                                        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                             <div className="bg-emerald-950/80 backdrop-blur-md px-6 py-3 rounded-2xl">
                                                <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-center">
                                                    Available for Booking
                                                </p>
                                             </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-8 h-[1px] bg-emerald-200"></span>
                                            <span className="text-emerald-700 text-[10px] uppercase tracking-[0.4em] font-black">
                                                {room.category}
                                            </span>
                                        </div>

                                        <h3 className="text-stone-900 text-3xl font-serif italic leading-tight mb-6 group-hover:text-emerald-900 transition-colors">
                                            {room.title}
                                        </h3>

                                        <div className="flex items-center gap-8 mb-10 pt-6 border-t border-stone-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center">
                                                    <Users size={14} className="text-emerald-700" />
                                                </div>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                                                    {(room.maxOccupancy?.adults || 0) + (room.maxOccupancy?.children || 0)} Guests
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center">
                                                    <MapPin size={14} className="text-emerald-700" />
                                                </div>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 truncate max-w-[120px]">
                                                    {room.location || 'Sanctuary'}
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/room/${room._id}`}
                                            className="mt-auto group/btn flex items-center justify-between w-full bg-stone-900 text-white p-2 rounded-full hover:bg-emerald-900 transition-all duration-500"
                                        >
                                            <span className="pl-8 text-[11px] uppercase tracking-[0.2em] font-black">
                                                Discover Details
                                            </span>
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-emerald-900 transition-all duration-500">
                                                <ArrowRight size={20} />
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* --- Empty Result State --- */}
                {!loading && filteredRooms.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-40 bg-stone-50 rounded-[4rem] border border-dashed border-stone-200"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Filter size={32} className="text-stone-300" />
                        </div>
                        <h2 className="text-3xl font-serif italic text-stone-900 mb-4">No sanctuaries found</h2>
                        <p className="text-stone-400 max-w-xs mx-auto text-sm leading-relaxed mb-10">
                            We couldn't find a match for your current selection. Try broadening your search or resetting filters.
                        </p>
                        <button 
                            onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
                            className="px-10 py-4 bg-stone-900 text-white rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-emerald-900 transition-all active:scale-95"
                        >
                            View All Cottages
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AllRooms;