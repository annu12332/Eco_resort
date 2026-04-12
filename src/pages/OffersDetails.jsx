import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    CalendarDays, 
    DollarSign, 
    CheckCircle, 
    Loader2, 
    ArrowLeft, 
    Tag, 
    Sparkles, 
    ShieldCheck, 
    MapPin, 
    Phone, 
    Mail, 
    User 
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const OfferDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        guestName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        members: 1,
        address: ''
    });

    useEffect(() => {
        const fetchOfferDetails = async () => {
            try {
                const res = await axios.get('https://eco-resort-server.onrender.com/api/offers');
                const foundOffer = res.data.find(o => o._id === id);

                if (foundOffer) {
                    setOffer(foundOffer);
                } else {
                    toast.error("Offer not found");
                }
            } catch (err) {
                console.error("Error fetching offer:", err);
                toast.error("Failed to load offer details");
            } finally {
                setLoading(false);
            }
        };

        fetchOfferDetails();
        window.scrollTo(0, 0);
    }, [id]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const bookingPayload = {
            roomId: `OFFER_${offer._id}`,
            roomTitle: `Offer: ${offer.title}`,
            totalPrice: offer.price,
            ...formData
        };

        try {
            await axios.post('https://eco-resort-server.onrender.com/api/bookings', bookingPayload);
            toast.success('Reservation request received! Our concierge will contact you shortly.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
            });
            setFormData({
                guestName: '', email: '', phone: '',
                checkIn: '', checkOut: '', members: 1, address: ''
            });
        } catch (err) {
            toast.error("Submission failed. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-emerald-800 mb-6" size={48} strokeWidth={1} />
                <p className="text-stone-400 font-serif italic tracking-[0.2em]">Unfolding details...</p>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center text-center px-6">
                <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm">
                    <p className="text-stone-400 font-serif italic text-xl mb-8">This experience has returned to the wild.</p>
                    <button 
                        onClick={() => navigate('/offers')} 
                        className="bg-stone-900 text-white px-10 py-4 rounded-full hover:bg-emerald-900 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        Explore Other Offers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFAF7] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 pb-20">
            <ToastContainer />
            
            {/* --- Hero Back Button --- */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-10">
                <motion.button
                    onClick={() => navigate('/offers')}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group flex items-center gap-3 text-stone-400 hover:text-emerald-800 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-emerald-800 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Return to Journal</span>
                </motion.button>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* --- Left Column: Offer Content --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7 space-y-12"
                    >
                        {/* Featured Image */}
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/5 group">
                            <img
                                src={offer.imageUrl}
                                alt={offer.title}
                                className="w-full h-[500px] object-cover transition-transform duration-[3s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md text-emerald-900 px-6 py-2 rounded-full font-black shadow-xl flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
                                    <Tag size={14} className="text-emerald-600" /> {offer.discount || 'Special Privilage'}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-stone-50">
                            <div className="flex items-center gap-2 text-emerald-800 mb-6">
                                <Sparkles size={20} strokeWidth={1.5} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Exclusive Package</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif italic text-stone-950 mb-8 leading-[1.1]">
                                {offer.title}
                            </h1>
                            <p className="text-stone-500 text-lg font-light leading-relaxed mb-12 italic">
                                "{offer.description}"
                            </p>

                            {/* Meta Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="bg-[#FCFAF7] p-8 rounded-[2rem] border border-stone-100 flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-700 shadow-sm">
                                        <DollarSign size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mb-1">From</p>
                                        <span className="text-2xl font-serif italic text-stone-900">{offer.price}</span>
                                    </div>
                                </div>
                                <div className="bg-[#FCFAF7] p-8 rounded-[2rem] border border-stone-100 flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-700 shadow-sm">
                                        <CalendarDays size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mb-1">Validity</p>
                                        <span className="text-2xl font-serif italic text-stone-900">{offer.validity}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Inclusions */}
                            <div className="border-t border-stone-100 pt-10">
                                <h3 className="text-xl font-serif italic text-stone-900 mb-8 flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-700" size={24} /> What’s Included:
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                    {[
                                        "Welcome drink & eco-tour",
                                        "Organic breakfast daily",
                                        "15% off Spa treatments",
                                        "Complimentary bicycles",
                                        "Turndown service",
                                        "Guided nature walks"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 group">
                                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                                                <CheckCircle size={14} />
                                            </div>
                                            <span className="text-stone-600 text-sm font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Column: Booking Form --- */}
                    <motion.aside 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 sticky top-10"
                    >
                        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-emerald-950/5 p-10 md:p-12 border border-stone-100 relative overflow-hidden">
                            {/* Form Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-serif italic text-stone-950 mb-3">Begin Your Escape</h2>
                                <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">Request a Reservation</p>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-6">
                                {/* Guest Name */}
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                    <input
                                        type="text" name="guestName" value={formData.guestName} onChange={handleFormChange}
                                        className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm"
                                        placeholder="Full Name" required
                                    />
                                </div>

                                {/* Contacts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleFormChange}
                                            className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm"
                                            placeholder="Email" required
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleFormChange}
                                            className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm"
                                            placeholder="Phone" required
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 pl-2">Check-In</label>
                                        <input
                                            type="date" name="checkIn" value={formData.checkIn} onChange={handleFormChange}
                                            className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 text-xs focus:bg-white focus:border-emerald-200 outline-none transition-all" required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 pl-2">Check-Out</label>
                                        <input
                                            type="date" name="checkOut" value={formData.checkOut} onChange={handleFormChange}
                                            className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 text-xs focus:bg-white focus:border-emerald-200 outline-none transition-all" required
                                        />
                                    </div>
                                </div>

                                {/* Guests & Address */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-1">
                                        <input
                                            type="number" name="members" min="1" value={formData.members} onChange={handleFormChange}
                                            className="w-full px-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 outline-none text-center text-sm font-bold" required
                                        />
                                    </div>
                                    <div className="md:col-span-3 relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                        <input
                                            name="address" value={formData.address} onChange={handleFormChange}
                                            className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-900 outline-none focus:bg-white focus:border-emerald-200 transition-all text-sm"
                                            placeholder="City, Country" required
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={submitting}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full group relative flex items-center justify-between p-2 rounded-full transition-all duration-500 shadow-xl shadow-stone-100 ${
                                        submitting ? 'bg-stone-300 cursor-not-allowed' : 'bg-stone-900 hover:bg-emerald-900'
                                    }`}
                                >
                                    <span className="pl-8 text-[10px] font-black uppercase tracking-[0.4em] text-white">
                                        {submitting ? 'Sending Request...' : 'Confirm Interest'}
                                    </span>
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowLeft size={18} className="rotate-180" />}
                                    </div>
                                </motion.button>
                            </form>

                            <div className="mt-8 flex items-center justify-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-700" />
                                <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">
                                    Transparent Booking • No Hidden Fees
                                </span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* Subtle Footer Brand */}
            <div className="mt-32 text-center opacity-30">
                <p className="text-[9px] font-black uppercase tracking-[0.8em]">AlMaris Eco Sanctuary</p>
            </div>
        </div>
    );
};

export default OfferDetails;