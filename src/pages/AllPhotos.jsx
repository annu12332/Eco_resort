import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Maximize2, Camera, Sparkles, Filter } from 'lucide-react';

const AllPhotos = () => {
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://eco-resort-server.onrender.com/api/gallery')
            .then(res => res.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];
    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <div className="min-h-screen bg-[#FDFCF9] pt-40 pb-32 px-6 lg:px-20 selection:bg-emerald-900 selection:text-white">
            
            {/* --- Artistic Header Section --- */}
            <div className="max-w-5xl mx-auto text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-emerald-900/20"></span>
                        <Camera size={18} className="text-emerald-800" strokeWidth={1.5} />
                        <span className="h-[1px] w-12 bg-emerald-900/20"></span>
                    </div>
                    
                    <h1 className="text-stone-900 text-7xl md:text-9xl font-serif italic leading-[0.85] mb-8">
                        Captured <br />
                        <span className="text-emerald-950 font-light not-italic">Moments</span>
                    </h1>
                    
                    <p className="text-stone-500 max-w-xl mx-auto text-lg font-light italic leading-relaxed">
                        A visual journey through the silent whispers of nature and the architecture of peace.
                    </p>
                </motion.div>

                {/* Glassmorphism Filter Tabs */}
                {!loading && categories.length > 1 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3 mt-16 p-2 bg-stone-100/50 backdrop-blur-md rounded-full w-fit mx-auto border border-stone-200"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${
                                    filter === cat 
                                    ? 'bg-emerald-950 text-white shadow-xl shadow-emerald-900/20 scale-105' 
                                    : 'text-stone-400 hover:text-stone-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* --- Masonry Gallery Grid --- */}
            {loading ? (
                <div className="flex flex-col justify-center items-center py-40 gap-6">
                    <Loader2 className="text-emerald-900 animate-spin" size={40} strokeWidth={1} />
                    <p className="text-stone-400 font-serif italic tracking-[0.2em] text-sm">Curation in progress...</p>
                </div>
            ) : (
                <motion.div 
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((img, index) => (
                            <motion.div 
                                key={img._id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.7, delay: index * 0.05 }}
                                onClick={() => setSelectedImg(img)}
                                className="group relative break-inside-avoid cursor-none"
                            >
                                {/* The Frame */}
                                <div className="relative overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-sm group-hover:shadow-3xl group-hover:shadow-emerald-900/10 transition-all duration-700">
                                    <img 
                                        src={img.image}
                                        alt={img.title}
                                        className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                                        loading="lazy"
                                    />
                                    
                                    {/* Minimal Overlay */}
                                    <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                                            <Maximize2 size={20} className="text-emerald-950" />
                                        </div>
                                    </div>

                                    {/* Bottom Info Tag */}
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                                            <p className="text-emerald-900 text-[9px] font-black uppercase tracking-[0.3em] mb-1">
                                                {img.category || 'Landscape'}
                                            </p>
                                            <p className="text-stone-900 font-serif italic text-xl">{img.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* --- Premium Lightbox --- */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/98 p-6 md:p-20 backdrop-blur-2xl"
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.button 
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-all z-[110]"
                        >
                            <X size={40} strokeWidth={1} />
                        </motion.button>

                        <div className="relative flex flex-col items-center max-w-7xl w-full">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 30 }}
                                className="relative group"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img 
                                    src={selectedImg.image}
                                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                                    alt={selectedImg.title}
                                />
                                
                                <div className="mt-12 text-center">
                                    <motion.h2 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-white font-serif text-4xl md:text-6xl italic tracking-tight"
                                    >
                                        {selectedImg.title}
                                    </motion.h2>
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center justify-center gap-6 mt-6"
                                    >
                                        <span className="h-[1px] w-12 bg-emerald-500/30"></span>
                                        <span className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.5em]">
                                            {selectedImg.category || 'Eco Gallery'}
                                        </span>
                                        <span className="h-[1px] w-12 bg-emerald-500/30"></span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllPhotos;