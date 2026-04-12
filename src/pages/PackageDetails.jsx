import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
    CheckCircle, 
    Loader2, 
    Calendar, 
    Users, 
    Phone, 
    Mail, 
    ArrowLeft, 
    ShieldCheck, 
    Sparkles, 
    User,
    ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    // Controlled Form State
    const [formData, setFormData] = useState({ 
        userName: '', 
        email: '', 
        phone: '', 
        checkIn: '', 
        guests: 1 
    });

    // Fetch Package Data
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axios.get(`https://eco-resort-server.onrender.com/api/packages/${id}`);
                setPkg(res.data);
            } catch (err) {
                navigate('/packages');
            }
        };
        fetchPackage();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    // Derived State: Dynamic Price Calculation
    const totalEstimate = useMemo(() => {
        if (!pkg) return 0;
        return (pkg.price * formData.guests).toLocaleString();
    }, [pkg, formData.guests]);

    // Generic Input Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            await axios.post('https://eco-resort-server.onrender.com/api/bookings', { 
                ...formData, 
                packageId: id,
                packageName: pkg.title 
            });

            Swal.fire({
                icon: 'success',
                title: 'Request Received',
                text: 'Our concierge will contact you within 24 hours.',
                background: '#FCFAF7',
                color: '#1c1917',
                confirmButtonColor: '#064e3b',
                customClass: {
                    popup: 'rounded-[2rem] font-serif',
                    confirmButton: 'rounded-full px-8 py-3 uppercase tracking-widest text-[10px] font-black'
                }
            });

            // Reset state after successful submission
            setFormData({ userName: '', email: '', phone: '', checkIn: '', guests: 1 });
            
        } catch (err) {
            Swal.fire({ 
                icon: 'error', 
                title: 'Selection Unavailable', 
                text: 'Please try again or contact support.',
                background: '#FCFAF7' 
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (!pkg) return (
        <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-emerald-800 mb-4" size={48} strokeWidth={1} />
            <p className="text-stone-400 font-serif italic tracking-widest">Gathering journey details...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 pb-32">
            {/* Header Navigation */}
            <nav className="pt-32 pb-10 px-6 max-w-7xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-stone-400 hover:text-emerald-900 transition-all"
                >
                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Journeys</span>
                </button>
            </nav>

            <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">
                
                {/* --- Left Column: Experience Gallery & Details --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-7"
                >
                    <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl shadow-emerald-900/5 mb-12 group">
                        <img 
                            src={pkg.image} 
                            className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                            alt={pkg.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-emerald-800">
                            <Sparkles size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Curated Expedition</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-serif italic text-stone-950 leading-tight">
                            {pkg.title}
                        </h1>

                        <p className="text-stone-500 text-xl font-light leading-relaxed italic border-l-2 border-emerald-100 pl-8">
                            {pkg.description}
                        </p>

                        <div className="pt-10 border-t border-stone-100">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-900 mb-8">
                                Signature Inclusions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pkg.features?.map((feature, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="text-stone-600 text-sm font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- Right Column: Elegant Booking Card --- */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5"
                >
                    <div className="bg-white border border-stone-100 p-10 md:p-14 rounded-[4rem] sticky top-32 shadow-2xl shadow-emerald-900/5 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -z-10 opacity-50" />
                        
                        <div className="mb-10 text-center">
                            <h3 className="text-2xl font-serif italic text-stone-950 mb-2">Reserve Experience</h3>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-stone-300 text-sm font-light">$</span>
                                <span className="text-5xl font-serif italic text-emerald-900">{totalEstimate}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">
                                    {formData.guests > 1 ? 'Total Est.' : 'Per Journey'}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleBooking} className="space-y-5">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                                <input 
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    type="text" placeholder="Full Name" required 
                                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm" 
                                />
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email" placeholder="Email Address" required 
                                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm" 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                                    <input 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        type="tel" placeholder="Phone" required 
                                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm" 
                                    />
                                </div>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                                    <input 
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        type="number" min="1" max="20" placeholder="Guests" required 
                                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm" 
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
                                <input 
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    required 
                                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-200 outline-none transition-all text-xs uppercase tracking-widest text-stone-600" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="w-full group/btn relative flex items-center justify-between p-2 rounded-full bg-stone-950 hover:bg-emerald-900 transition-all duration-500 shadow-xl disabled:opacity-70"
                            >
                                <span className="pl-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                                    {submitting ? 'Processing...' : 'Confirm Interest'}
                                </span>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-emerald-900 transition-all">
                                    {submitting ? <Loader2 className="animate-spin" size={18} /> : <ChevronRight size={20} />}
                                </div>
                            </button>
                        </form>

                        <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
                            <ShieldCheck size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Secure Reservation Protocol</span>
                        </div>
                    </div>
                </motion.div>

            </main>
        </div>
    );
};

export default PackageDetails;