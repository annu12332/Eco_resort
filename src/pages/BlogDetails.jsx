import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Share2, Clock, Leaf, Bookmark, Quote, Twitter, Facebook } from 'lucide-react';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    // Reading progress bar logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const API_URL = `https://eco-resort-server.onrender.com/api/blogs/${id}`;
                const res = await axios.get(API_URL);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setLoading(false);
            }
        };
        fetchBlogDetails();
        window.scrollTo(0, 0); 
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <Loader2 className="animate-spin text-emerald-800" size={56} strokeWidth={1} />
                    <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600/30" size={20} />
                </div>
                <p className="text-stone-400 font-serif italic tracking-[0.2em] animate-pulse">Unfolding the story...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center text-stone-900 px-6">
                <Leaf className="text-stone-200 mb-6" size={80} strokeWidth={1} />
                <h2 className="text-3xl font-serif italic mb-4">A Quiet Space</h2>
                <p className="mb-10 opacity-60 font-serif italic text-center max-w-md">This story seems to have drifted away into the winds of time.</p>
                <button 
                    onClick={() => navigate('/blog')} 
                    className="group flex items-center gap-4 px-10 py-4 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-emerald-800 shadow-xl"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Journal
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-700 origin-left z-[100]"
                style={{ scaleX }}
            />
            
            {/* --- Hero Image Section --- */}
            <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                />
                {/* Overlay for better text readability and depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FCFAF7]"></div>
                
                {/* Back Button */}
                <div className="absolute top-12 left-6 md:left-12 z-30">
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 p-2 pr-6 bg-white/10 hover:bg-white backdrop-blur-xl rounded-full text-white hover:text-stone-900 transition-all duration-500 border border-white/20 shadow-2xl"
                    >
                        <div className="p-3 bg-white rounded-full text-stone-900 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Go Back</span>
                    </button>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-4xl mx-auto px-6 -mt-32 md:-mt-52 relative z-20 pb-32">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] border border-stone-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
                >
                    {/* Header Meta */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                        <div className="space-y-6">
                            <span className="inline-block bg-emerald-50 text-emerald-800 px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] border border-emerald-100">
                                {blog.category || "Discovery"}
                            </span>
                            <div className="flex items-center gap-8 text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2.5">
                                    <Calendar size={14} className="text-emerald-600"/> 
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2.5">
                                    <Clock size={14} className="text-emerald-600"/> 
                                    8 Min Read
                                </span>
                            </div>
                        </div>
                        
                        {/* Interactive Actions */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-stone-50 text-stone-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-transparent hover:border-emerald-100 group">
                                <Bookmark size={16} className="group-hover:fill-current" />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Save Story</span>
                            </button>
                            <button className="p-3.5 rounded-full bg-stone-50 text-stone-400 hover:bg-emerald-800 hover:text-white transition-all shadow-sm">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-7xl font-serif italic text-stone-950 leading-[1.1] mb-12 tracking-tight">
                        {blog.title}
                    </h1>

                    {/* Intro Quote Styling */}
                    <div className="relative mb-16 pl-12">
                        <Quote className="absolute left-0 top-0 text-emerald-100" size={48} fill="currentColor" />
                        <p className="text-stone-500 font-serif italic text-xl md:text-2xl leading-relaxed">
                            {blog.intro || "Exploring the seamless boundary between human architecture and the untamed elegance of the natural world."}
                        </p>
                    </div>

                    {/* Body Text */}
                    <article className="prose prose-stone prose-lg max-w-none">
                        <p className="text-stone-700 text-lg md:text-xl leading-[2.2] font-light whitespace-pre-line first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-emerald-900">
                            {blog.description}
                        </p>
                    </article>

                    {/* Footer Content: Tags & Author */}
                    <div className="mt-24 pt-16 border-t border-stone-100">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex items-center gap-6 group">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full bg-stone-900 overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-105 duration-500">
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-stone-900">
                                            <User className="text-emerald-400" size={32} />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 p-2 rounded-full border-2 border-white">
                                        <Leaf size={12} className="text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.5em] text-emerald-700 font-black mb-1">Written By</p>
                                    <p className="text-xl font-serif italic text-stone-950">AlMaris Editorial Team</p>
                                    <p className="text-xs text-stone-400 mt-1">Sustainability & Lifestyle Architects</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {['Eco-Luxury', 'Sustainability', 'Nature'].map(tag => (
                                    <span key={tag} className="px-5 py-2 rounded-full border border-stone-100 text-[10px] font-bold text-stone-400 hover:text-emerald-800 hover:border-emerald-200 cursor-pointer uppercase tracking-widest transition-all">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- Newsletter --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-10 md:p-24 rounded-[3.5rem] bg-emerald-950 text-white relative overflow-hidden shadow-3xl"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 select-none pointer-events-none">
                        <Leaf size={400} />
                    </div>
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">The Weekly Journal</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">Keep the spirit of <br /> <span className="text-emerald-400 font-light not-italic">Adventure</span> alive.</h3>
                        <p className="text-emerald-100/60 text-lg mb-12 font-light leading-relaxed">Join our inner circle of eco-conscious travelers for bi-weekly insights on mindful luxury and sustainable living.</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 bg-white/5 p-2 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                            <input 
                                type="email" 
                                placeholder="Your email address..." 
                                className="bg-transparent px-8 py-5 flex-1 focus:outline-none text-sm placeholder:text-white/30" 
                            />
                            <button className="bg-white text-emerald-950 px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-emerald-400 hover:text-emerald-950 transition-all shadow-xl active:scale-95">
                                Join Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetails;