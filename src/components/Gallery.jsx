import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios'; 

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get('https://eco-resort-server.onrender.com/api/gallery');
                setImages(res.data);
            } catch (err) {
                console.error("Gallery Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading && images.length === 0) {
        return (
            <div className="py-24 bg-[#F2F0D0] flex justify-center items-center">
                <Loader2 className="animate-spin text-[#3A6332]" size={30} />
            </div>
        );
    }

    const duplicatedImages = [...images, ...images];

    return (
        <section className="py-24 bg-[#F2F0D0] overflow-hidden text-[#2D3629]">
            {/* --- Header Section --- */}
            <div className="container mx-auto px-6 mb-12 text-center md:text-left">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#3A6332] uppercase tracking-[0.5em] text-[10px] font-black">
                        Nature's Gallery
                    </span>
                    <h2 className="text-[#3A6332] text-4xl md:text-5xl font-serif mt-3 italic leading-tight">
                        Visual Sanctuary
                    </h2>
                </motion.div>
            </div>

            {/* --- Infinite Scroll Row --- */}
            <div className="relative flex overflow-hidden group mb-16">
                {images.length > 0 ? (
                    <motion.div 
                        className="flex gap-6 pr-6"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ 
                            ease: "linear", 
                            duration: images.length * 10, 
                            repeat: Infinity 
                        }}
                    >
                        {duplicatedImages.map((img, idx) => (
                            <div 
                                key={idx} 
                                className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] shrink-0 overflow-hidden rounded-[2rem] border-4 border-white shadow-xl shadow-[#3A6332]/5"
                            >
                                <img 
                                    src={img.image} 
                                    alt={img.title || "Gallery Image"} 
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                {/* Soft Organic Overlay */}
                                <div className="absolute inset-0 bg-[#3A6332]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Hover Label */}
                                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white/90 p-4 backdrop-blur-md rounded-2xl shadow-lg border border-[#A3C999]/20">
                                    <span className="text-[#3A6332] text-[11px] uppercase tracking-[0.2em] font-bold block mb-1">
                                        {img.title || 'Resort Haven'}
                                    </span>
                                    <span className="text-[#78A370] text-[9px] uppercase tracking-widest font-medium">Eco Sanctuary</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="w-full text-center text-[#2D3629]/50 py-10 font-serif italic">No photos found in gallery.</div>
                )}
            </div>

            {/* --- See All Photos Button --- */}
            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link 
                        to="/gallery" 
                        className="group flex items-center gap-6 bg-white text-[#3A6332] hover:bg-[#3A6332] hover:text-[#F2F0D0] transition-all duration-500 border border-[#A3C999]/30 px-10 py-5 rounded-full shadow-[0_15px_30px_-10px_rgba(58,99,50,0.1)]"
                    >
                        <span className="text-[11px] uppercase tracking-[0.4em] font-black">Explore All</span>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-[#F2F0D0] group-hover:bg-[#78A370]">
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </motion.div>
            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </section>
    );
};

export default Gallery;