import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Tent, Mountain, Waves } from 'lucide-react';

const activities = [
    {
        icon: Tent,
        title: "Eco Camping",
        description: "Experience the wilderness with our sustainable camping gear under the stars.",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600"
    },
    {
        icon: Mountain,
        title: "Nature Trekking",
        description: "Guided tours through lush forests and scenic mountain trails.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600"
    },
    {
        icon: Waves,
        title: "River Kayaking",
        description: "Paddle through crystal clear rivers surrounded by natural beauty.",
        image: "https://images.unsplash.com/photo-1544978835-234b3e34b76e?q=80&w=600"
    },
    {
        icon: Leaf,
        title: "Bird Watching",
        description: "Discover rare bird species in their natural, protected habitat.",
        image: "https://images.unsplash.com/photo-1596701083461-7132145b0475?q=80&w=600"
    }
];

const ActivitiesPage = () => {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="flex items-center justify-center gap-2 text-emerald-700 text-xs uppercase tracking-[0.3em] font-bold mb-3">
                        <Leaf size={14} /> Eco Experiences
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif italic text-stone-950 mb-6">
                        Immerse in Nature
                    </h1>
                    <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover a range of sustainable activities designed to connect you with the environment while leaving a minimal footprint.
                    </p>
                </motion.div>
            </div>

            {/* Activities Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Image */}
                            <div className="md:w-2/5 overflow-hidden">
                                <img 
                                    src={activity.image} 
                                    alt={activity.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            {/* Content */}
                            <div className="p-8 md:w-3/5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
                                            <activity.icon size={24} />
                                        </div>
                                        <h3 className="text-2xl font-serif italic text-stone-950">{activity.title}</h3>
                                    </div>
                                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                        {activity.description}
                                    </p>
                                </div>
                                <button className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Learn More <span className="text-xs">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-stone-100 rounded-t-[3rem] mt-10">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-4xl font-serif italic text-stone-950 mb-4">Plan Your Eco Adventure</h2>
                    <p className="text-stone-600 mb-8 max-w-lg mx-auto">Book your stay and activities together to ensure a seamless and sustainable nature experience.</p>
                    <button className="bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all flex items-center gap-2 mx-auto">
                        <MapPin size={16} /> Book Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage;