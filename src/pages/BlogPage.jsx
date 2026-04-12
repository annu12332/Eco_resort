import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Loader2, Search, Leaf, Sparkles, X } from 'lucide-react';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const API_URL = 'https://eco-resort-server.onrender.com/api/blogs';

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(API_URL);
                setBlogs(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             blog.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <Loader2 className="animate-spin text-emerald-800" size={56} strokeWidth={1} />
                    <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600/20" size={24} />
                </div>
                <p className="text-stone-400 font-serif italic tracking-[0.2em] animate-pulse">Gathering stories from the wild...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
            
            {/* --- Elegant Header --- */}
            <header className="pt-32 pb-20 px-6 text-center bg-white border-b border-stone-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="flex items-center justify-center gap-2 text-emerald-800 uppercase tracking-[0.6em] text-[9px] font-black mb-6">
                        <Sparkles size={12} className="animate-pulse" /> The AlMaris Journal
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-12 text-stone-950 tracking-tight">
                        Nature <span className="text-emerald-900 font-light not-italic font-sans">&</span> Narratives
                    </h1>
                </motion.div>

                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Search Input */}
                    <div className="relative w-full md:flex-1 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-all duration-300" size={18} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            placeholder="Explore articles, guides, or tales..." 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-100 py-5 pl-14 pr-14 rounded-full focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-50/50 transition-all text-sm shadow-sm placeholder:text-stone-300"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm("")}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-900 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Quick Filters */}
                    <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide w-full md:w-auto px-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap border ${
                                    activeCategory === cat 
                                    ? "bg-emerald-900 text-white shadow-xl shadow-emerald-900/20 border-emerald-900 scale-105" 
                                    : "bg-white text-stone-400 border-stone-100 hover:border-emerald-200 hover:text-emerald-800"
                                }`}
                            >
                                {cat}
                                {cat !== "All" && (
                                    <span className={`ml-2 opacity-50 ${activeCategory === cat ? "text-emerald-200" : "text-stone-300"}`}>
                                        ({blogs.filter(b => b.category === cat).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* --- Masonry Grid --- */}
            <main className="max-w-[1440px] mx-auto px-6 py-24">
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredBlogs.map((blog) => (
                            <motion.article
                                layout
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="group bg-white rounded-[3rem] overflow-hidden border border-stone-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col h-full"
                            >
                                {/* Thumbnail */}
                                <Link to={`/blog/${blog._id}`} className="block relative aspect-[16/11] overflow-hidden">
                                    <img 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                                        <div className="bg-white text-emerald-950 w-16 h-16 rounded-full flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                            <ArrowRight size={28} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur-xl text-emerald-900 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/20">
                                            {blog.category}
                                        </span>
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                        <Calendar size={14} className="text-emerald-600" /> 
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                                    </div>

                                    <Link to={`/blog/${blog._id}`}>
                                        <h2 className="text-2xl md:text-3xl font-serif italic text-stone-900 mb-5 group-hover:text-emerald-800 transition-colors leading-[1.2] tracking-tight">
                                            {blog.title}
                                        </h2>
                                    </Link>

                                    <p className="text-stone-500 text-[15px] leading-relaxed line-clamp-3 mb-10 font-light italic">
                                        "{blog.description}"
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-stone-50">
                                        <Link 
                                            to={`/blog/${blog._id}`} 
                                            className="flex items-center justify-between group/link"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 group-hover/link:text-emerald-700 transition-colors">
                                                    Read Story
                                                </span>
                                                <div className="h-0.5 w-0 group-hover/link:w-full bg-emerald-700 transition-all duration-500 mt-1"></div>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center group-hover/link:bg-emerald-900 group-hover/link:text-white group-hover/link:border-emerald-900 transition-all duration-500 transform group-hover/link:rotate-[-45deg]">
                                                <ArrowRight size={18} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredBlogs.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-40 bg-white rounded-[4rem] border border-stone-50 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone-50 scale-[5] pointer-events-none select-none">
                            <Leaf size={100} />
                        </div>
                        <div className="relative z-10">
                            <Leaf size={64} className="mx-auto text-stone-200 mb-8 animate-bounce" />
                            <h2 className="text-3xl font-serif italic text-stone-400 mb-4">No stories found in this trail.</h2>
                            <p className="text-stone-300 text-sm mb-10 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                            <button 
                                onClick={() => {setSearchTerm(""); setActiveCategory("All")}}
                                className="group inline-flex items-center gap-3 bg-stone-900 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all shadow-xl"
                            >
                                Reset Journal <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* --- Newsletter/CTA Section --- */}
            <section className="px-6 mb-24">
                <div className="max-w-7xl mx-auto bg-emerald-950 rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden">
                    <div className="absolute -bottom-20 -left-20 text-white opacity-[0.03] rotate-12">
                        <Leaf size={400} />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif italic mb-8 relative z-10">Subscribe to our <span className="text-emerald-400">Newsletter</span></h3>
                    <p className="text-emerald-100/60 max-w-lg mx-auto mb-12 font-light text-lg relative z-10">Receive weekly stories about eco-luxury, nature preservation, and mindful living directly in your inbox.</p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
                        <input type="email" placeholder="Your email address" className="bg-white/10 border border-white/20 px-8 py-4 rounded-full flex-1 focus:outline-none focus:bg-white/20" />
                        <button className="bg-white text-emerald-950 px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all">Sign Up</button>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-24 bg-stone-950 text-white relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <Leaf className="text-emerald-500 mb-8 animate-pulse" size={40} />
                    <h4 className="text-[11px] font-black uppercase tracking-[0.8em] mb-6">AlMaris Eco Resort</h4>
                    <nav className="flex gap-8 mb-12 text-stone-500 text-[10px] font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Pinterest</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Journal</a>
                    </nav>
                    <div className="h-[1px] w-24 bg-stone-800 mb-12"></div>
                    <p className="text-stone-600 text-[10px] font-medium tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} AlMaris. Preserving the wild.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default BlogPage;