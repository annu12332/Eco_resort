import React, { useState, useEffect, useRef } from 'react'; // 1. IMPORTED: useRef
import axios from 'axios';
import { Loader2, PlusCircle, Trash2, Edit3, X, MapPin, Clock, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const AddActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null); // 2. ADDED: Ref for file input
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', duration: '', location: ''
    });

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-resort-server.onrender.com';
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; // 3. IMPORTANT: Setup this in .env

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/activities`);
            setActivities(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // --- SUBMIT: ADD/EDIT ACTIVITY ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        let imageUrl = formData.image; 

        try {
            // Upload image to ImgBB if a new file is selected
            if (imageFile) {
                const imgData = new FormData();
                imgData.append('image', imageFile);

                // 4. UPDATED: Use env variable instead of hardcoded key
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=4284488a37835ed459904bb22afad66f`, imgData);
                imageUrl = imgRes.data.data.url;
            }

            const finalData = { ...formData, image: imageUrl };

            if (editingId) {
                await axios.put(`${API_URL}/api/activities/${editingId}`, finalData);
                alert('Activity updated successfully!');
            } else {
                await axios.post(`${API_URL}/api/activities`, finalData);
                alert('Activity added successfully!');
            }

            // Reset Form and State
            setFormData({ title: '', description: '', price: '', duration: '', location: '' });
            setImageFile(null);
            setEditingId(null);
            
            // 5. FIXED: Safely clear file input using ref
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            
            fetchActivities();
        } catch (err) {
            console.error(err);
            alert('Operation failed. Check ImgBB Key or Server.');
            setLoading(false);
        }
    };

    // --- START EDIT MODE ---
    const startEdit = (activity) => {
        setEditingId(activity._id);
        setFormData({
            title: activity.title,
            description: activity.description,
            price: activity.price,
            duration: activity.duration,
            location: activity.location,
            image: activity.image
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- CANCEL EDIT MODE ---
    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ title: '', description: '', image: '', price: '', duration: '', location: '' });
        setImageFile(null);
        // 6. FIXED: Safely clear file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // --- DELETE ACTIVITY ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this activity?")) {
            try {
                await axios.delete(`${API_URL}/api/activities/${id}`);
                fetchActivities();
                alert('Activity deleted successfully!');
            } catch (err) {
                console.error(err);
                alert('Failed to delete activity.');
            }
        }
    };

    if (loading && activities.length === 0) return (
        <div className="h-screen bg-stone-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-700" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-20 px-6 font-sans text-stone-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-emerald-700 uppercase tracking-[0.4em] text-[10px] mb-2 font-bold">Admin Panel</p>
                    <h1 className="text-4xl md:text-6xl font-serif italic text-stone-950">Manage Activities</h1>
                </div>

                {/* --- ADD/EDIT ACTIVITY FORM --- */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="col-span-1 md:col-span-2 flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-serif text-stone-950">
                            {editingId ? "Edit Activity" : "Add New Activity"}
                        </h2>
                        {editingId && (
                            <button type="button" onClick={cancelEdit} className="text-stone-500 hover:text-red-500 flex items-center gap-1 text-sm">
                                <X size={16} /> Cancel
                            </button>
                        )}
                    </div>

                    <input type="text" name="title" placeholder="Activity Title" onChange={handleInputChange} value={formData.title} required className="p-4 bg-stone-50 border border-stone-100 rounded-xl" />
                    
                    {/* 7. UPDATED: File Input with ref */}
                    <div className="relative">
                        <input type="file" ref={fileInputRef} id="imageInput" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <label htmlFor="imageInput" className="p-4 bg-stone-50 border border-stone-100 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-300">
                            <span className="text-stone-500">{imageFile ? imageFile.name : "Select Activity Image"}</span>
                            <UploadCloud className="text-emerald-600" size={20}/>
                        </label>
                    </div>

                    <input type="number" name="price" placeholder="Price ($)" onChange={handleInputChange} value={formData.price} required className="p-4 bg-stone-50 border border-stone-100 rounded-xl" />
                    <input type="text" name="duration" placeholder="Duration (e.g. 2 Hours)" onChange={handleInputChange} value={formData.duration} required className="p-4 bg-stone-50 border border-stone-100 rounded-xl" />
                    <input type="text" name="location" placeholder="Location (e.g. On-site)" onChange={handleInputChange} value={formData.location} className="md:col-span-2 p-4 bg-stone-50 border border-stone-100 rounded-xl" />
                    <textarea name="description" placeholder="Description" onChange={handleInputChange} value={formData.description} required className="md:col-span-2 p-4 bg-stone-50 border border-stone-100 rounded-xl h-24"></textarea>

                    <button type="submit" className={`col-span-1 md:col-span-2 flex items-center justify-center gap-2 ${editingId ? 'bg-amber-600' : 'bg-emerald-700'} text-white p-4 rounded-xl font-bold hover:opacity-90 transition-colors`}>
                        {loading ? <Loader2 size={20} className='animate-spin'/> : (editingId ? <Edit3 size={20} /> : <PlusCircle size={20} />)}
                        {editingId ? "Update Activity" : "Add Activity"}
                    </button>
                </motion.form>

                {/* --- ACTIVITIES GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((act) => (
                        <motion.div
                            key={act._id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col relative"
                        >
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <button
                                    onClick={() => startEdit(act)}
                                    className="bg-white/70 backdrop-blur-sm text-stone-700 p-2.5 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(act._id)}
                                    className="bg-white/70 backdrop-blur-sm text-stone-700 p-2.5 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="relative h-60">
                                <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-xs">
                                    ${act.price}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-stone-950 mb-2">{act.title}</h3>
                                <p className="text-stone-600 text-sm mb-4 flex-grow">{act.description}</p>

                                <div className="flex justify-between items-center text-xs text-stone-500 mb-5 pt-4 border-t border-stone-100">
                                    <span className="flex items-center gap-1.5"><Clock size={15} className="text-emerald-600" /> {act.duration}</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={15} className="text-emerald-600" /> {act.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddActivities;