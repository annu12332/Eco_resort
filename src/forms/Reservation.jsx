import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, ArrowRight, CheckCircle2, Loader2, MapPin, BedDouble } from 'lucide-react';
import axios from 'axios';

const ReservationForm = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // ডাইনামিক রুম লিস্টের জন্য স্টেট
    const [availableRooms, setAvailableRooms] = useState([]);
    const [fetchingRooms, setFetchingRooms] = useState(true);

    // ১. ফরম ডেটা স্টেট
    const [formData, setFormData] = useState({
        roomTitle: '', // এটি ডাইনামিকভাবে সেট হবে
        checkIn: '',
        checkOut: '',
        guestName: '',
        email: '',
        phone: '',
        address: '',
        members: '2 Adults'
    });

    // ডাটাবেজ থেকে রুমগুলো নিয়ে আসা
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get('https://eco-resort-server.onrender.com/api/cottages');
                // রুমের টাইটেলগুলো ডুপ্লিকেট রিমুভ করে ইউনিক লিস্ট তৈরি
                const uniqueRooms = [...new Set(res.data.map(room => room.title))];
                setAvailableRooms(uniqueRooms);
                
                // প্রথম রুমটিকে ডিফল্ট হিসেবে সেট করা
                if (uniqueRooms.length > 0) {
                    setFormData(prev => ({ ...prev, roomTitle: uniqueRooms[0] }));
                }
                setFetchingRooms(false);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setFetchingRooms(false);
            }
        };
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://eco-resort-server.onrender.com/api/bookings', {
                ...formData,
                totalPrice: 0 
            });
            
            if (response.data.success) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Booking Error:", error);
            alert("Reservation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-3xl border border-emerald-100 text-center space-y-4 max-w-sm mx-auto shadow-lg">
                <div className="flex justify-center">
                    <div className="bg-emerald-50 p-4 rounded-full"><CheckCircle2 size={32} className="text-emerald-700" /></div>
                </div>
                <h2 className="text-stone-900 text-xl font-serif italic">Request Received</h2>
                <p className="text-stone-600 text-xs leading-relaxed uppercase tracking-wider">
                    Thank you <span className="text-stone-950 font-bold">{formData.guestName}</span>. 
                </p>
                <button onClick={() => onClose ? onClose() : window.location.reload()} className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-emerald-300 pb-1">Dismiss</button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-2">
            {/* Compact Step Tracker */}
            <div className="flex justify-between mb-6 px-4">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center gap-1">
                        <div className={`h-[2px] w-12 rounded-full transition-all duration-700 ${step >= num ? 'bg-emerald-600' : 'bg-stone-200'}`} />
                        <span className={`text-[8px] uppercase tracking-[0.1em] font-bold ${step >= num ? 'text-emerald-700' : 'text-stone-400'}`}>0{num}</span>
                    </div>
                ))}
            </div>

            {/* Compact Form Container */}
            <form onSubmit={handleSubmit} className="bg-white border border-stone-100 rounded-3xl p-5 md:p-6 relative shadow-xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className="space-y-4">
                            <div>
                                <span className="text-emerald-700 text-[9px] uppercase tracking-[0.3em] font-bold">Inquiry</span>
                                <h3 className="text-stone-900 text-2xl font-serif mt-1 italic">Choose Suite</h3>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1">
                                        <BedDouble size={12} className="text-emerald-700" /> Room Selection
                                    </label>
                                    <div className="relative">
                                        {fetchingRooms ? (
                                            <div className="w-full bg-stone-50 py-2.5 px-3 text-stone-500 text-xs animate-pulse rounded-lg">Loading...</div>
                                        ) : (
                                            <select name="roomTitle" value={formData.roomTitle} onChange={handleChange} className="w-full bg-stone-50 border border-stone-100 py-2.5 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer">
                                                {availableRooms.map((title, index) => (
                                                    <option key={index} value={title} className="bg-white">{title}</option>
                                                ))}
                                                {availableRooms.length === 0 && <option className="bg-white">No rooms available</option>}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><Calendar size={12} className="text-emerald-700" /> Arrival</label>
                                        <input required name="checkIn" value={formData.checkIn} onChange={handleChange} type="date" className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><Calendar size={12} className="text-emerald-700" /> Departure</label>
                                        <input required name="checkOut" value={formData.checkOut} onChange={handleChange} type="date" className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className="space-y-4">
                            <div>
                                <span className="text-emerald-700 text-[9px] uppercase tracking-[0.3em] font-bold">Guest</span>
                                <h3 className="text-stone-900 text-2xl font-serif mt-1 italic">Who is Staying?</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><User size={12} className="text-emerald-700" /> Name</label>
                                    <input required name="guestName" value={formData.guestName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><Mail size={12} className="text-emerald-700" /> Email</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@domain.com" className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className="space-y-4">
                            <div>
                                <span className="text-emerald-700 text-[9px] uppercase tracking-[0.3em] font-bold">Contact</span>
                                <h3 className="text-stone-900 text-2xl font-serif mt-1 italic">Final Details</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><Users size={12} className="text-emerald-700" /> Members</label>
                                    <select name="members" value={formData.members} onChange={handleChange} className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none appearance-none cursor-pointer focus:border-emerald-500">
                                        <option className="bg-white">1 Adult</option>
                                        <option className="bg-white">2 Adults</option>
                                        <option className="bg-white">4 Adults</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><Phone size={12} className="text-emerald-700" /> Phone</label>
                                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+..." className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-2 text-[8px] uppercase text-stone-500 tracking-widest font-black ml-1"><MapPin size={12} className="text-emerald-700" /> Address</label>
                                    <input required name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Your City, Country" className="w-full bg-stone-50 border border-stone-100 py-2 px-3 text-stone-800 text-xs rounded-lg outline-none focus:border-emerald-500" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Compact Buttons */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-stone-500 hover:text-emerald-700 text-[9px] font-black uppercase tracking-[0.2em]">Back</button>
                    ) : <span />}

                    {step < 3 ? (
                        <button type="button" onClick={nextStep} className="group flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-800 transition-all">Next Step <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /></button>
                    ) : (
                        <button type="submit" disabled={loading} className="bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-800 transition-all disabled:opacity-50 flex items-center gap-2">
                            {loading && <Loader2 className="animate-spin" size={14} />}
                            {loading ? 'Sending...' : 'Confirm'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;