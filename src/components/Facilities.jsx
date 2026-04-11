import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Utensils, Mountain, Wifi, Wind, Sprout } from 'lucide-react';

const Facilities = () => {
    const facilityList = [
        { icon: <Leaf size={18} />, title: "Eco-Friendly Design", desc: "Sustainable materials used." },
        { icon: <Droplets size={18} />, title: "Rainforest Spa", desc: "Organic treatments & rituals." },
        { icon: <Utensils size={18} />, title: "Farm-to-Table", desc: "Locally sourced organic food." },
        { icon: <Mountain size={18} />, title: "Guided Trekking", desc: "Explore pristine nature trails." },
        { icon: <Wind size={18} />, title: "Yoga Pavilion", desc: "Open-air tranquility sessions." },
        { icon: <Wifi size={18} />, title: "Digital Detox", desc: "Limited Wi-Fi, full immersion." },
    ];

    const images = [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512100356956-c1227c331e0c?q=80&w=1964&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544161515-4af6b1d8656b?q=80&w=2070&auto=format&fit=crop",
    ];

    return (
        <section className="relative py-24 bg-[#f0f4ee] overflow-hidden px-6">
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cbdcc1] rounded-full blur-[150px] opacity-40 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a3b899] rounded-full blur-[150px] opacity-30"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 bg-[#4a5d43]/10 px-4 py-1 rounded-full mb-4 border border-[#4a5d43]/10"
                    >
                        <Sprout className="text-[#4a5d43]" size={14} />
                        <span className="text-[#4a5d43] uppercase tracking-[0.4em] text-[10px] font-black">Sustainable Luxury</span>
                    </motion.div>
                    
                    <h2 className="text-[#2d3629] text-5xl md:text-7xl font-serif leading-none mb-6">
                        Pure <span className="text-[#78936d] italic font-light">Amenities</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[500px]">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="col-span-2 h-[280px] rounded-[4rem_1rem] overflow-hidden border-4 border-white shadow-2xl"
                        >
                            <img src={images[0]} className="w-full h-full object-cover" alt="Resort" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-[1rem_1rem_1rem_4rem] overflow-hidden border-4 border-white shadow-xl"
                        >
                            <img src={images[1]} className="w-full h-full object-cover" alt="Tropical" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-[1rem_3rem_1rem_1rem] overflow-hidden border-4 border-white shadow-xl"
                        >
                            <img src={images[2]} className="w-full h-full object-cover" alt="Spa" />
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {facilityList.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 bg-[#dbe4d5]/40 backdrop-blur-sm rounded-[2rem_0.5rem] border border-white/50 hover:bg-[#2d3629] transition-all duration-500 hover:shadow-2xl hover:shadow-[#2d3629]/20"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#f0f4ee] flex items-center justify-center text-[#4a5d43] group-hover:bg-[#78936d] group-hover:text-white transition-all duration-500 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[#2d3629] font-serif text-lg group-hover:text-[#f0f4ee] transition-colors mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-[#5b6356] text-xs leading-relaxed group-hover:text-[#f0f4ee]/70 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 flex justify-center opacity-30">
                    <div className="flex items-center gap-6">
                        <div className="h-[1px] w-24 bg-[#2d3629]"></div>
                        <Leaf size={24} className="text-[#2d3629]" />
                        <div className="h-[1px] w-24 bg-[#2d3629]"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </section>
    );
};

export default Facilities;