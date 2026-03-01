import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, MapPin, ArrowRight, Loader2 } from 'lucide-react';
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
        AOS.init({ duration: 800, once: true }); // Faster AOS for better performance

        const fetchAllRooms = async () => {
            try {
                // Production level API URL should be in .env
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

    // Filter Logic
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
        // Compacted Padding: pt-24 pb-16
        <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4 md:px-8 lg:px-16 text-stone-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 text-center" data-aos="fade-down">
                <span className="text-emerald-700 uppercase tracking-[0.3em] text-[11px] font-semibold">Discover Your Sanctuary</span>
                <h1 className="text-stone-950 text-4xl md:text-5xl lg:text-6xl font-serif mt-3 mb-6">
                    Eco-Friendly Accommodations
                </h1>

                {/* Search & Filter Bar - Compacted */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 rounded-2xl border border-stone-100 shadow-sm max-w-5xl mx-auto">
                    <div className="relative w-full md:w-2/5">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-12 pr-4 text-sm text-stone-900 focus:border-emerald-300 outline-none transition-all"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all border whitespace-nowrap ${activeCategory === cat
                                        ? "bg-emerald-700 text-white border-emerald-700"
                                        : "bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rooms Grid - Compact Gap */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex flex-col justify-center items-center py-20">
                        <Loader2 className="animate-spin text-emerald-700 mb-4" size={40} />
                        <p className="text-stone-500 text-sm">Loading sanctuaries...</p>
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div
                            key={room._id}
                            data-aos="fade-up"
                            className="group bg-white border border-stone-100 rounded-3xl overflow-hidden hover:border-emerald-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            {/* Image Wrapper - Smaller Height */}
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={room.image && room.image.length > 0 ? room.image[0] : "https://placehold.co/400x300?text=Eco+Room"}
                                    alt={room.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                />
                                {/* Compact Price Tag */}
                                <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm text-emerald-900 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/50 uppercase tracking-wider">
                                    ${room.price} / Night
                                </div>
                            </div>

                            {/* Content - User Friendly Sizes */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div>
                                    <span className="text-emerald-700 text-[10px] uppercase tracking-[0.2em] font-bold">
                                        {room.category}
                                    </span>
                                    <h3 className="text-stone-950 text-xl font-serif mt-1 mb-2 group-hover:text-emerald-800 transition-colors">
                                        {room.title}
                                    </h3>
                                </div>

                                {/* Dynamic Features */}
                                <div className="flex gap-4 mt-auto mb-5 pt-4 border-t border-stone-100 text-stone-600">
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <Users size={15} className="text-emerald-600" />
                                        <span>Up to {(room.maxOccupancy?.adults || 0) + (room.maxOccupancy?.children || 0)} Guests</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <MapPin size={15} className="text-emerald-600" />
                                        <span className="capitalize">{room.location || 'Rainforest'}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/room/${room._id}`}
                                    className="flex items-center justify-between w-full group/btn bg-stone-50 hover:bg-emerald-50 p-3 rounded-xl transition-colors"
                                >
                                    <span className="text-stone-900 text-xs uppercase tracking-widest font-bold group-hover/btn:text-emerald-800 transition-colors">
                                        View Details
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover/btn:bg-emerald-700 group-hover/btn:border-emerald-700 group-hover/btn:text-white transition-all">
                                        <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* No Results State */}
            {!loading && filteredRooms.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-stone-500 font-serif text-lg italic">No eco-sanctuaries found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AllRooms;