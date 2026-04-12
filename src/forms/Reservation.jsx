import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, ArrowRight, CheckCircle2, Loader2, MapPin, BedDouble } from 'lucide-react';
import axios from 'axios';

const ReservationForm = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [fetchingRooms, setFetchingRooms] = useState(true);

    const [formData, setFormData] = useState({
        roomTitle: '',
        checkIn: '',
        checkOut: '',
        guestName: '',
        email: '',
        phone: '',
        address: '',
        members: '2 Adults'
    });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get('https://eco-resort-server.onrender.com/api/cottages');
                const uniqueRooms = [...new Set(res.data.map(room => room.title))];
                setAvailableRooms(uniqueRooms);
                
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
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white p-10 rounded-[2.5rem] border border-[#A3C999]/20 text-center space-y-6 max-w-sm mx-auto shadow-2xl mt-12"
            >
                <div className="flex justify-center">
                    <div className="bg-[#F2F0D0] p-6 rounded-full">
                        <CheckCircle2 size={40} className="text-[#3A6332]" />
                    </div>
                </div>
                <div>
                    <h2 className="text-[#2D3629] text-2xl font-serif italic">Request Received</h2>
                    <p className="text-[#2D3629]/60 text-[10px] leading-relaxed uppercase tracking-[0.2em] mt-2">
                        Confirmed for <span className="text-[#3A6332] font-black">{formData.guestName}</span>
                    </p>
                </div>
                <button 
                    onClick={() => onClose ? onClose() : window.location.reload()} 
                    className="text-[#3A6332] text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-[#A3C999] pb-1 hover:text-[#2D3629] transition-colors"
                >
                    Dismiss
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-4 mt-8">
            <div className="flex justify-between mb-10 px-8">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center gap-2">
                        <div className={`h-[3px] w-16 rounded-full transition-all duration-700 ${step >= num ? 'bg-[#3A6332]' : 'bg-[#F2F0D0]'}`} />
                        <span className={`text-[9px] uppercase tracking-[0.2em] font-black ${step >= num ? 'text-[#3A6332]' : 'text-[#2D3629]/30'}`}>Phase 0{num}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-[#A3C999]/10 rounded-[3rem] p-8 md:p-10 relative shadow-2xl shadow-[#3A6332]/5">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div>
                                <span className="text-[#A3C999] text-[10px] uppercase tracking-[0.4em] font-black">Selection</span>
                                <h3 className="text-[#3A6332] text-3xl font-serif mt-2 italic">Choose Your Suite</h3>
                            </div>
                            
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1">
                                        <BedDouble size={14} className="text-[#3A6332]" /> Cottage Type
                                    </label>
                                    <div className="relative">
                                        {fetchingRooms ? (
                                            <div className="w-full bg-[#F2F0D0]/30 py-4 px-5 text-[#2D3629]/40 text-xs animate-pulse rounded-2xl">Searching availability...</div>
                                        ) : (
                                            <select name="roomTitle" value={formData.roomTitle} onChange={handleChange} className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white transition-all appearance-none cursor-pointer font-bold">
                                                {availableRooms.map((title, index) => (
                                                    <option key={index} value={title} className="bg-white">{title}</option>
                                                ))}
                                                {availableRooms.length === 0 && <option className="bg-white">No suites found</option>}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><Calendar size={14} className="text-[#3A6332]" /> Arrival</label>
                                        <input required name="checkIn" value={formData.checkIn} onChange={handleChange} type="date" className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><Calendar size={14} className="text-[#3A6332]" /> Departure</label>
                                        <input required name="checkOut" value={formData.checkOut} onChange={handleChange} type="date" className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white transition-all font-bold" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div>
                                <span className="text-[#A3C999] text-[10px] uppercase tracking-[0.4em] font-black">Identity</span>
                                <h3 className="text-[#3A6332] text-3xl font-serif mt-2 italic">Guest Details</h3>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><User size={14} className="text-[#3A6332]" /> Legal Name</label>
                                    <input required name="guestName" value={formData.guestName} onChange={handleChange} type="text" placeholder="MD. ANAS" className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><Mail size={14} className="text-[#3A6332]" /> Email Address</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="anas@example.com" className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white font-bold" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div>
                                <span className="text-[#A3C999] text-[10px] uppercase tracking-[0.4em] font-black">Contact</span>
                                <h3 className="text-[#3A6332] text-3xl font-serif mt-2 italic">Final Logistics</h3>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><Users size={14} className="text-[#3A6332]" /> Party Size</label>
                                    <select name="members" value={formData.members} onChange={handleChange} className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white appearance-none cursor-pointer font-bold">
                                        <option className="bg-white">1 Adult</option>
                                        <option className="bg-white">2 Adults</option>
                                        <option className="bg-white">4 Adults</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><Phone size={14} className="text-[#3A6332]" /> Phone</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+880..." className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] uppercase text-[#2D3629]/50 tracking-[0.2em] font-black ml-1"><MapPin size={14} className="text-[#3A6332]" /> Location</label>
                                        <input required name="address" value={formData.address} onChange={handleChange} type="text" placeholder="City, Country" className="w-full bg-[#F2F0D0]/30 border border-transparent py-4 px-5 text-[#2D3629] text-xs rounded-2xl outline-none focus:border-[#3A6332] focus:bg-white font-bold" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#F2F0D0]">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-[#2D3629]/40 hover:text-[#3A6332] text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Previous</button>
                    ) : <div />}

                    {step < 3 ? (
                        <button type="button" onClick={nextStep} className="group flex items-center gap-3 bg-[#3A6332] text-[#F2F0D0] px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2D3629] transition-all shadow-lg shadow-[#3A6332]/20">
                            Continue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button type="submit" disabled={loading} className="bg-[#3A6332] text-[#F2F0D0] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2D3629] transition-all disabled:opacity-50 flex items-center gap-3 shadow-lg shadow-[#3A6332]/20">
                            {loading && <Loader2 className="animate-spin" size={16} />}
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;