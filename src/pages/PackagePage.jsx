import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Clock, Tag } from 'lucide-react';

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // প্রোডাকশন লেভেলে .env ফাইল থেকে API URL নেওয়া ভালো
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';
        
        axios.get(`${API_URL}/api/packages`)
            .then(res => { 
                console.log("Fetched packages:", res.data); // ডাটা কনসোলে চেক করুন
                setPackages(res.data); 
                setLoading(false); 
            })
            .catch((err) => {
                console.error("Error fetching packages:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="h-screen bg-stone-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-700" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-20 px-6 font-sans">
            <div className="text-center mb-16">
                <p className="text-emerald-700 uppercase tracking-[0.4em] text-[10px] mb-2 font-bold">Sustainable Packages</p>
                <h1 className="text-4xl md:text-6xl font-serif italic text-stone-950">Eco-Luxury Escapes</h1>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {packages.map((pkg) => (
                    <motion.div 
                        key={pkg._id} 
                        whileHover={{ y: -5 }} 
                        className="bg-white rounded-3xl border border-stone-100 overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                        <div className="relative h-64 overflow-hidden">
                            {/* --- IMAGE RENDERING WITH FALLBACK --- */}
                            <img 
                                src={pkg.image || "https://placehold.co/600x400?text=No+Image"} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                alt={pkg.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400?text=Broken+Image";
                                }}
                            />
                            
                            {/* Price Tag */}
                            <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1">
                                <Tag size={16} /> ${pkg.price}
                            </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-stone-950 mb-2 group-hover:text-emerald-700 transition-colors">
                                {pkg.title}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-stone-500 text-[10px] mb-4 uppercase tracking-widest mt-auto">
                                <span className="flex items-center gap-1">
                                    <Clock size={12} className="text-emerald-600"/> 
                                    {pkg.duration}
                                </span>
                            </div>
                            
                            <Link to={`/package/${pkg._id}`} className="block text-center bg-emerald-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-800 transition-all">
                                Explore Package
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PackagesPage;