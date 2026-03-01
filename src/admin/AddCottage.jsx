import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, X, Plus, Leaf, MapPin, DollarSign, BedDouble, Users, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const AddCottageForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'Bamboo Cabin',
        size: '',
        bedrooms: '1',
        adults: 2,
        children: 1,
        location: '',
        hasWifi: false,
        hasBreakfast: false,
        solarPower: true,
    });

    const [amenities, setAmenities] = useState([]);
    const [currentAmenity, setCurrentAmenity] = useState("");
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const addAmenity = () => {
        if (currentAmenity.trim() && !amenities.includes(currentAmenity)) {
            setAmenities([...amenities, currentAmenity]);
            setCurrentAmenity("");
        }
    };

    const removeAmenity = (index) => {
        setAmenities(amenities.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert("You can only upload a maximum of 5 images.");
            return;
        }

        setImages(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const uploadedImages = [];
            
            for (const image of images) {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "hotel presets");
                data.append("cloud_name", "hotelproject");

                const cloudinaryRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/hotelproject/image/upload",
                    data
                );
                uploadedImages.push(cloudinaryRes.data.secure_url);
            }

            const finalCottageData = { 
                ...formData, 
                image: uploadedImages[0] || "",
                images: uploadedImages, 
                amenities,
                maxOccupancy: { adults: Number(formData.adults), children: Number(formData.children) } 
            };

            const response = await axios.post('https://eco-resort-server.onrender.com/api/rooms', finalCottageData);

            if (response.status === 201) {
                setIsSuccess(true);
                setFormData({ title: '', price: '', description: '', category: 'Bamboo Cabin', size: '', bedrooms: '1', adults: 2, children: 1, location: '', hasWifi: false, hasBreakfast: false, solarPower: true });
                setAmenities([]);
                setImages([]); 
                setPreviews([]);
                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-stone-100 relative overflow-hidden"
        >
            <AnimatePresence>
                {isSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                        <CheckCircle2 size={80} className="text-emerald-500 mb-4 animate-bounce" />
                        <h3 className="text-3xl font-black text-stone-800">Eco-Cottage Published!</h3>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="mb-12">
                <h2 className="text-3xl font-black text-stone-800 uppercase tracking-tight flex items-center gap-3">
                    <Leaf className="text-emerald-600" /> List New Eco-Cottage
                </h2>
                <p className="text-stone-600">Fill in the comprehensive details of your sustainable cottage.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2">Cottage Title</label>
                        <input required type="text" placeholder="e.g. Riverside Bamboo Villa" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2">Category</label>
                        <select className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                            <option>Bamboo Cabin</option>
                            <option>Tree House</option>
                            <option>Clay Cottage</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><DollarSign size={14} className="text-emerald-600"/> Price/Night ($)</label>
                        <input required type="number" placeholder="100" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><BedDouble size={14} className="text-emerald-600"/> Bedrooms</label>
                        <input required type="number" placeholder="1" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} value={formData.bedrooms}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><Users size={14} className="text-emerald-600"/> Adults</label>
                        <input required type="number" placeholder="2" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, adults: e.target.value})} value={formData.adults}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><Users size={14} className="text-emerald-600"/> Children</label>
                        <input required type="number" placeholder="1" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, children: e.target.value})} value={formData.children}/>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><MapPin size={14} className="text-emerald-600"/> Location Address</label>
                    <input required type="text" placeholder="e.g. 123 Eco Village, Chittagong" className="w-full px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300" onChange={(e) => setFormData({...formData, location: e.target.value})} value={formData.location}/>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2">Description</label>
                    <textarea required rows="4" placeholder="Describe the ambiance, view, and sustainable features..." className="w-full px-6 py-4 rounded-3xl bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 resize-none" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description}></textarea>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2">Key Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-stone-50 rounded-3xl">
                        {[
                            { name: 'hasWifi', label: 'Wi-Fi' },
                            { name: 'hasBreakfast', label: 'Breakfast' },
                            { name: 'solarPower', label: 'Solar Power' },
                        ].map(amenity => (
                            <label key={amenity.name} className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer">
                                <input type="checkbox" checked={formData[amenity.name]} onChange={e => setFormData({...formData, [amenity.name]: e.target.checked})} className="accent-emerald-600 w-5 h-5"/>
                                {amenity.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><Leaf size={14} className="text-emerald-600"/> Additional Amenities</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="e.g. Private Deck (+)" 
                            className="flex-1 px-6 py-4 rounded-full bg-stone-50 border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300"
                            value={currentAmenity}
                            onChange={(e) => setCurrentAmenity(e.target.value)}
                        />
                        <button type="button" onClick={addAmenity} className="px-6 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-colors">
                            <Plus />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {amenities.map((amt, index) => (
                            <span key={index} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-100">
                                {amt}
                                <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeAmenity(index)} />
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- Updated Image Upload Area --- */}
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><ImageIcon size={14} className="text-emerald-600"/> Cottage Photos (Max 5)</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        {images.length < 5 && (
                            <label className="aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-stone-300 rounded-2xl bg-stone-50 hover:border-emerald-300 transition-colors">
                                <Upload size={24} className="text-emerald-600" />
                                <span className="text-xs font-bold text-stone-600">Add Photo</span>
                                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                            </label>
                        )}
                    </div>
                </div>

                <button disabled={isSubmitting} className={`w-full py-6 rounded-full font-black text-lg text-white transition-all uppercase tracking-widest ${isSubmitting ? 'bg-stone-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-2xl active:scale-[0.98]'}`}>
                    {isSubmitting ? "Processing..." : "Publish Cottage"}
                </button>
            </form>
        </motion.div>
    );
};

export default AddCottageForm;