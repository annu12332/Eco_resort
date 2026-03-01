import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, Maximize, BedDouble, CheckCircle, Mail, MapPin, Zap, AlertTriangle, Users, Info } from 'lucide-react';
import axios from 'axios';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cottage, setCottage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [mainImage, setMainImage] = useState('');

    const [bookingData, setBookingData] = useState({
        guestName: '',
        email: '',
        phone: '',
        address: '',
        checkIn: '',
        checkOut: '',
        members: 1
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const fetchCottage = async () => {
            if (!id) {
                navigate('/');
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`https://eco-resort-server.onrender.com/api/cottages/${id}`);
                setCottage(res.data);
                if (res.data.images && res.data.images.length > 0) {
                    setMainImage(res.data.images[0]);
                } else if (res.data.image) {
                    setMainImage(res.data.image);
                }
            } catch (err) {
                console.error("Error fetching cottage:", err);
                setError("Failed to load cottage details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCottage();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
            setBookingStatus({ type: 'error', message: 'Check-out date must be after check-in date.' });
            return;
        }

        setIsSubmitting(true);
        setBookingStatus({ type: '', message: '' });

        try {
            const payload = {
                cottageId: cottage._id,
                cottageTitle: cottage.title,
                ...bookingData
            };
            
            await axios.post(`https://eco-resort-server.onrender.com/api/bookings`, payload);
            setBookingStatus({ type: 'success', message: 'Booking request sent successfully! We will contact you soon.' });
            setBookingData({ guestName: '', email: '', phone: '', address: '', checkIn: '', checkOut: '', members: 1 });
        } catch (err) {
            console.error("Booking Error:", err);
            setBookingStatus({ 
                type: 'error', 
                message: err.response?.data?.message || 'Booking failed. Please check your connection and try again.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-stone-50 flex flex-col items-center justify-center text-emerald-700">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="uppercase tracking-[0.3em] text-[10px] font-bold">Connecting to Nature...</p>
        </div>
    );

    if (error || !cottage) return (
        <div className="h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <AlertTriangle size={48} className="text-red-500" />
            <p className="font-serif text-2xl md:text-3xl">{error || "Cottage Not Found"}</p>
            <Link to="/" className="text-emerald-700 uppercase tracking-widest text-xs border-b border-emerald-700 pb-1">Return to Collection</Link>
        </div>
    );

    return (
        <div className="bg-stone-50 min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 text-stone-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-700 text-[10px] uppercase tracking-widest mb-8 transition-all group">
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-8">
                        <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-stone-200">
                            <img src={mainImage} className="w-full h-full object-cover" alt={cottage.title} />
                            <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${cottage.status === 'Booked' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {cottage.status || 'Available'}
                            </span>
                        </div>
                        
                        {cottage.images && cottage.images.length > 1 && (
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-8">
                                {cottage.images.map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setMainImage(img)}
                                        className={`rounded-xl overflow-hidden border-2 transition-all aspect-square ${mainImage === img ? 'border-emerald-600' : 'border-transparent hover:border-emerald-300'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-emerald-700 mb-2">
                            {cottage.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span className="text-xs uppercase tracking-wider">{cottage.location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Info size={16} />
                                <span className="text-xs uppercase tracking-wider">{cottage.category}</span>
                            </div>
                        </div>
                        
                        <h1 className="text-stone-950 text-4xl md:text-6xl font-serif mb-6">{cottage.title}</h1>
                        <p className="text-stone-600 text-base leading-relaxed mb-10">{cottage.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-stone-200">
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Size</span>
                                <div className="text-stone-800 flex items-center gap-2">
                                    <Maximize size={16}/> {cottage.size || 'N/A'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Bed</span>
                                <div className="text-stone-800 flex items-center gap-2">
                                    <BedDouble size={16}/> {cottage.bedType}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Capacity</span>
                                <div className="text-stone-800 flex items-center gap-2">
                                    <Users size={16}/> 
                                    {cottage.maxOccupancy?.adults} Adults, {cottage.maxOccupancy?.children} Children
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Rate</span>
                                <div className="text-emerald-700 text-2xl font-serif">
                                    ${cottage.price}<span className='text-sm text-stone-500'>/night</span>
                                </div>
                            </div>
                        </div>

                        {cottage.amenities && cottage.amenities.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-2xl font-serif mb-6 text-stone-950 flex items-center gap-3">
                                    <Zap className="text-emerald-600" /> Cottage Features
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {cottage.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                                            <CheckCircle size={18} className="text-emerald-600" />
                                            <span className="text-sm text-stone-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm">
                            {bookingStatus.type === 'success' ? (
                                <div className="text-center py-12">
                                    <CheckCircle size={40} className="text-emerald-600 mx-auto mb-4" />
                                    <h3 className="text-stone-950 text-xl font-serif">Request Received!</h3>
                                    <p className="text-stone-600 text-xs mt-2">{bookingStatus.message}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <h3 className="text-stone-950 text-xl font-serif mb-4">Book This Cottage</h3>
                                    
                                    {bookingStatus.type === 'error' && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2">
                                            <AlertTriangle size={16} /> {bookingStatus.message}
                                        </div>
                                    )}
                                    
                                    <input required name="guestName" value={bookingData.guestName} onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" />

                                    <div className="relative">
                                        <input required name="email" value={bookingData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" />
                                        <Mail size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input required name="phone" value={bookingData.phone} onChange={handleInputChange} type="tel" placeholder="Phone" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" />
                                        <input required name="members" value={bookingData.members} onChange={handleInputChange} type="number" placeholder="Guests" min="1" max={(cottage.maxOccupancy?.adults || 0) + (cottage.maxOccupancy?.children || 0)} className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" />
                                    </div>

                                    <input required name="address" value={bookingData.address} onChange={handleInputChange} type="text" placeholder="Address" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-stone-500 uppercase">Check In</label>
                                            <input required name="checkIn" value={bookingData.checkIn} onChange={handleInputChange} type="date" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-300 outline-none text-stone-900" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-stone-500 uppercase">Check Out</label>
                                            <input required name="checkOut" value={bookingData.checkOut} onChange={handleInputChange} type="date" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-300 outline-none text-stone-900" />
                                        </div>
                                    </div>

                                    <button disabled={isSubmitting || cottage.status === 'Booked'} className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-emerald-800 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed">
                                        {isSubmitting ? "Processing..." : cottage.status === 'Booked' ? "Already Booked" : "Confirm Reservation"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;