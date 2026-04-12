import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Loader2, ChevronLeft, Maximize, BedDouble, CheckCircle, 
    Mail, MapPin, Zap, AlertTriangle, Users, 
    Calendar, Phone, User, Home, ShieldCheck
} from 'lucide-react';
import axios from 'axios';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cottage, setCottage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' });

    const [bookingData, setBookingData] = useState({
        guestName: '', email: '', phone: '', address: '', checkIn: '', checkOut: '', members: 1
    });

    useEffect(() => {
        const fetchCottage = async () => {
            if (!id) return navigate('/cottages');
            try {
                const res = await axios.get(`https://eco-resort-server.onrender.com/api/cottages/${id}`);
                setCottage(res.data);
                if (res.data.image?.length > 0) setMainImage(res.data.image[0]);
            } catch (err) {
                setBookingStatus({ type: 'error', message: "Failed to load sanctuary details." });
            } finally {
                setLoading(false);
            }
        };
        fetchCottage();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    // Calculate dynamic price based on days
    const totalCost = useMemo(() => {
        if (!cottage || !bookingData.checkIn || !bookingData.checkOut) return 0;
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays || 1) * cottage.price;
    }, [cottage, bookingData.checkIn, bookingData.checkOut]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const checkIn = new Date(bookingData.checkIn);
        const checkOut = new Date(bookingData.checkOut);

        if (checkIn >= checkOut) {
            setBookingStatus({ type: 'error', message: 'Departure must be after arrival.' });
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`https://eco-resort-server.onrender.com/api/bookings`, {
                cottageId: cottage._id,
                cottageTitle: cottage.title,
                totalPrice: totalCost,
                ...bookingData
            });
            setBookingStatus({ type: 'success', message: 'Booking request sent successfully!' });
        } catch (err) {
            setBookingStatus({ type: 'error', message: 'Connection lost. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-emerald-800 mb-4" size={48} strokeWidth={1} />
            <p className="text-stone-400 font-serif italic tracking-widest">Unveiling sanctuary details...</p>
        </div>
    );

    return (
        <div className="bg-[#FCFAF7] min-h-screen pt-32 pb-24 text-stone-900 selection:bg-emerald-100">
            <div className="max-w-7xl mx-auto px-6">
                
                <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-stone-400 hover:text-emerald-900 transition-all mb-12">
                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                        <ChevronLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Collection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* --- Left Column --- */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
                        <div className="relative rounded-[3.5rem] overflow-hidden mb-6 aspect-video border border-stone-100 shadow-2xl shadow-emerald-900/5 group">
                            <img src={mainImage || "https://placehold.co/1200x800?text=Eco+Resort"} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt={cottage.title} />
                            <div className="absolute top-8 right-8 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${cottage.status === 'Booked' ? 'text-red-600' : 'text-emerald-700'}`}>
                                    {cottage.status || 'Available'}
                                </span>
                            </div>
                        </div>

                        {cottage.image?.length > 1 && (
                            <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
                                {cottage.image.map((img, index) => (
                                    <button key={index} onClick={() => setMainImage(img)} className={`flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${mainImage === img ? 'border-emerald-600 scale-95' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                                        <img src={img} className="w-full h-full object-cover" alt="interior" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="space-y-8">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 px-5 py-2 bg-emerald-50 rounded-full text-emerald-800">
                                    <MapPin size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cottage.location}</span>
                                </div>
                                <div className="flex items-center gap-2 px-5 py-2 bg-stone-100 rounded-full text-stone-500">
                                    <Home size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cottage.category}</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-serif italic text-stone-950 leading-[0.9]">{cottage.title}</h1>
                            <p className="text-stone-500 text-xl font-light leading-relaxed italic border-l-2 border-emerald-100 pl-8 max-w-3xl">{cottage.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-stone-100">
                                {[
                                    { label: 'Footprint', value: cottage.size, icon: Maximize },
                                    { label: 'Rest', value: cottage.bedType, icon: BedDouble },
                                    { label: 'Guests', value: `${cottage.maxOccupancy?.adults} Adults`, icon: Users },
                                    { label: 'Nightly', value: `$${cottage.price}`, icon: Zap }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{item.label}</span>
                                        <div className="flex items-center gap-3 text-stone-800 font-medium">
                                            <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center text-emerald-700 shadow-sm"><item.icon size={14} /></div>
                                            <span className="text-sm">{item.value || 'N/A'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-900 mb-8">Sanctuary Inclusions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {cottage.amenities?.map((amenity, index) => (
                                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={index} className="flex items-center gap-3 p-5 bg-white rounded-[2rem] border border-stone-50 shadow-sm group hover:border-emerald-100 transition-all">
                                            <CheckCircle size={16} className="text-emerald-600" />
                                            <span className="text-xs font-medium text-stone-600">{amenity}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Column: Booking Card --- */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4">
                        <div className="sticky top-32 bg-white border border-stone-100 p-10 md:p-12 rounded-[4rem] shadow-2xl shadow-emerald-950/5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -z-10 opacity-40" />
                            
                            <AnimatePresence mode="wait">
                                {bookingStatus.type === 'success' ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={32} className="text-emerald-600" />
                                        </div>
                                        <h3 className="text-2xl font-serif italic text-stone-950 mb-2">Request Lodged</h3>
                                        <p className="text-stone-400 text-sm italic">Our concierge will contact you via email shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="text-center mb-10">
                                            <h3 className="text-3xl font-serif italic text-stone-950">Reservation</h3>
                                            <div className="flex items-baseline justify-center gap-1 mt-2">
                                                <span className="text-stone-400 text-xs">$</span>
                                                <span className="text-4xl font-serif text-emerald-900">{totalCost > 0 ? totalCost.toLocaleString() : cottage.price}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 ml-1">
                                                    {totalCost > 0 ? 'Total' : 'Per Night'}
                                                </span>
                                            </div>
                                        </div>

                                        {bookingStatus.type === 'error' && (
                                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                                                <AlertTriangle size={14} /> {bookingStatus.message}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={16} />
                                                <input required name="guestName" value={bookingData.guestName} onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 outline-none transition-all text-sm" />
                                            </div>

                                            <div className="relative group">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={16} />
                                                <input required name="email" value={bookingData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 outline-none transition-all text-sm" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative group">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={16} />
                                                    <input required name="phone" value={bookingData.phone} onChange={handleInputChange} type="tel" placeholder="Phone" className="w-full pl-12 pr-2 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 outline-none transition-all text-sm" />
                                                </div>
                                                <div className="relative group">
                                                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={16} />
                                                    <input required name="members" value={bookingData.members} onChange={handleInputChange} type="number" min="1" max={cottage.maxOccupancy?.adults + 2} className="w-full pl-12 pr-2 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-100 outline-none transition-all text-sm" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <div className="space-y-2">
                                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-400 ml-2">Arrival</label>
                                                    <input required name="checkIn" min={new Date().toISOString().split('T')[0]} value={bookingData.checkIn} onChange={handleInputChange} type="date" className="w-full px-4 py-4 bg-stone-50 border border-transparent rounded-2xl text-[10px] focus:bg-white focus:border-emerald-100 outline-none uppercase font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-400 ml-2">Departure</label>
                                                    <input required name="checkOut" min={bookingData.checkIn || new Date().toISOString().split('T')[0]} value={bookingData.checkOut} onChange={handleInputChange} type="date" className="w-full px-4 py-4 bg-stone-50 border border-transparent rounded-2xl text-[10px] focus:bg-white focus:border-emerald-100 outline-none uppercase font-bold" />
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            disabled={isSubmitting || cottage.status === 'Booked'} 
                                            className="w-full mt-6 bg-stone-950 text-white font-black py-6 rounded-full uppercase text-[10px] tracking-[0.4em] hover:bg-emerald-900 transition-all shadow-xl disabled:bg-stone-100 disabled:text-stone-300"
                                        >
                                            {isSubmitting ? "Processing..." : cottage.status === 'Booked' ? "Reserved" : "Confirm Interest"}
                                        </button>

                                        <div className="flex items-center justify-center gap-2 opacity-30 mt-4">
                                            <ShieldCheck size={12} />
                                            <span className="text-[7px] font-black uppercase tracking-widest">Privacy Protected Protocol</span>
                                        </div>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;