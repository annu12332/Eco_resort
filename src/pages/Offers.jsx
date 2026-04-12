import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, DollarSign, Loader2, Tag, Sparkles, Percent, Ticket, Check } from 'lucide-react';
import axios from 'axios';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get('https://eco-resort-server.onrender.com/api/offers');
                setOffers(res.data);
            } catch (err) {
                console.error("Error fetching offers:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
        window.scrollTo(0, 0);
    }, []);

    const handleCopyCode = (id, code) => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
            <div className="relative mb-8">
                <Loader2 className="animate-spin text-emerald-800" size={56} strokeWidth={1} />
                <Sparkles className="absolute -top-2 -right-2 text-emerald-400 animate-pulse" size={20} />
            </div>
            <p className="text-stone-400 font-serif italic tracking-[0.3em] animate-pulse">Curating exclusive escapes...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">

            {/* Background Aesthetic Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-stone-100 rounded-full blur-[100px]" />
            </div>

            {/* Header Section */}
            <header className="relative pt-32 pb-20 px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="flex items-center justify-center gap-3 text-emerald-800 uppercase tracking-[0.6em] text-[9px] font-black mb-6">
                        <div className="h-[1px] w-8 bg-emerald-200" />
                        Exclusive Privileges
                        <div className="h-[1px] w-8 bg-emerald-200" />
                    </span>
                    <h1 className="text-stone-950 text-5xl md:text-8xl font-serif italic mb-8 tracking-tight">
                        Limited <span className="text-emerald-900 font-light not-italic font-sans">&</span> Eco Stays
                    </h1>
                    <p className="text-stone-500 font-light max-w-2xl mx-auto leading-relaxed text-lg italic opacity-80">
                        Thoughtfully crafted packages designed to deepen your connection with nature while honoring your journey to tranquility.
                    </p>
                </motion.div>
            </header>

            {/* Grid Section */}
            <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    <AnimatePresence>
                        {offers.map((offer, index) => (
                            <motion.div
                                key={offer._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-[3.5rem] overflow-hidden border border-stone-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(6,78,59,0.1)] transition-all duration-700 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden m-4 rounded-[2.8rem]">
                                    <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                                    <img
                                        src={offer.imageUrl}
                                        alt={offer.title}
                                        className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                    />

                                    {/* Discount Badge */}
                                    <div className="absolute top-6 right-6 z-20">
                                        <div className="bg-white/90 backdrop-blur-xl text-emerald-950 text-[10px] font-black px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 uppercase tracking-widest border border-white/20">
                                            <Percent size={12} className="text-emerald-600" /> {offer.discount || 'Luxury'}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-10 pt-4 flex flex-col flex-grow">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-emerald-700 text-[10px] uppercase tracking-[0.4em] font-black">Active Offer</span>
                                        </div>
                                        <h3 className="text-stone-900 text-3xl font-serif italic group-hover:text-emerald-950 transition-colors leading-tight">
                                            {offer.title}
                                        </h3>
                                    </div>

                                    <p className="text-stone-400 text-[15px] leading-relaxed mb-8 font-light line-clamp-3 italic">
                                        "{offer.description}"
                                    </p>

                                    {/* Promo Code UI (If exists) */}
                                    {offer.promoCode && (
                                        <button
                                            onClick={() => handleCopyCode(offer._id, offer.promoCode)}
                                            className="mb-8 flex items-center justify-between bg-stone-50 border border-dashed border-stone-200 p-4 rounded-2xl group/code hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Ticket size={16} className="text-stone-400 group-hover/code:text-emerald-600" />
                                                <span className="text-[11px] font-black uppercase tracking-widest text-stone-600 group-hover/code:text-emerald-900">{offer.promoCode}</span>
                                            </div>
                                            {copiedId === offer._id ? <Check size={14} className="text-emerald-600" /> : <span className="text-[9px] text-stone-300 font-bold uppercase tracking-tighter">Copy</span>}
                                        </button>
                                    )}

                                    {/* Meta Info Bar */}
                                    <div className="flex items-center justify-between py-6 border-y border-stone-50 mb-10">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] uppercase font-black text-stone-300 tracking-[0.2em]">Investment</span>
                                            <div className="flex items-baseline text-emerald-900">
                                                <span className="text-sm font-bold mr-0.5">$</span>
                                                <span className="text-3xl font-serif italic font-light tracking-tighter">{offer.price}</span>
                                                <span className="text-[10px] text-stone-400 ml-1 font-bold">/STAY</span>
                                            </div>
                                        </div>
                                        <div className="h-10 w-[1px] bg-stone-100" />
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[9px] uppercase font-black text-stone-300 tracking-[0.2em]">Expires</span>
                                            <div className="flex items-center gap-2 text-stone-600 font-bold text-[10px] uppercase tracking-wide">
                                                <CalendarDays size={14} className="text-emerald-600" /> {offer.validity}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link
                                        to={`/offers/${offer._id}`}
                                        className="mt-auto group/btn relative flex items-center justify-between w-full bg-stone-950 text-white p-2.5 rounded-full hover:bg-emerald-900 transition-all duration-500 shadow-2xl shadow-stone-200 hover:shadow-emerald-900/30 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-emerald-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10 pl-8 text-[11px] font-black uppercase tracking-[0.4em]">
                                            View Package
                                        </span>
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-emerald-900 transition-all duration-500">
                                            <ArrowRight size={20} strokeWidth={1.5} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {!loading && offers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-40 bg-white rounded-[4rem] border border-stone-50 shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] rotate-12 scale-[3]">
                            <Tag size={200} />
                        </div>
                        <div className="relative z-10">
                            <Tag size={64} strokeWidth={1} className="mx-auto text-stone-200 mb-8" />
                            <h2 className="text-3xl font-serif italic text-stone-900 mb-4">No active privileges</h2>
                            <p className="text-stone-400 text-[15px] font-light max-w-xs mx-auto mb-10 italic">Our seasonal offers have currently returned to the wild. Please check back with the next full moon.</p>
                            <Link to="/rooms" className="text-emerald-700 font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-emerald-50 hover:border-emerald-700 pb-2 transition-all">Explore All Sanctuaries</Link>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Newsletter Minimal */}
            <section className="bg-stone-950 py-24 px-6 text-center text-white relative">
                <div className="max-w-xl mx-auto">
                    <Sparkles className="mx-auto text-emerald-500 mb-6 opacity-50" size={32} />
                    <h4 className="text-2xl font-serif italic mb-6">Be the first to hear about our next retreat.</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="email@example.com" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                        <button className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Notify Me</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Offers;