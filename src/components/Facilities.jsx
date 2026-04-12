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
        <section className="relative py-24 bg-[#F2F0D0] overflow-hidden px-6">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3C999] rounded-full blur-[150px] opacity-20 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#78A370] rounded-full blur-[150px] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 bg-[#3A6332]/10 px-4 py-1 rounded-full mb-4 border border-[#3A6332]/10"
                    >
                        <Sprout className="text-[#3A6332]" size={14} />
                        <span className="text-[#3A6332] uppercase tracking-[0.4em] text-[10px] font-black">Sustainable Luxury</span>
                    </motion.div>
                    
                    <h2 className="text-[#3A6332] text-5xl md:text-7xl font-serif leading-none mb-6">
                        Pure <span className="text-[#78A370] italic font-light">Amenities</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[500px]">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="col-span-2 h-[280px] rounded-[4rem_1rem] overflow-hidden border-4 border-[#F2F0D0] shadow-2xl"
                        >
                            <img src={images[0]} className="w-full h-full object-cover" alt="Resort" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-[1rem_1rem_1rem_4rem] overflow-hidden border-4 border-[#F2F0D0] shadow-xl"
                        >
                            <img src={images[1]} className="w-full h-full object-cover" alt="Tropical" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-[1rem_3rem_1rem_1rem] overflow-hidden border-4 border-[#F2F0D0] shadow-xl"
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
                                className="group p-6 bg-white rounded-[2rem_0.5rem] border border-[#A3C999]/30 hover:bg-[#3A6332] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3A6332]/20"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F2F0D0] flex items-center justify-center text-[#3A6332] group-hover:bg-[#78A370] group-hover:text-[#F2F0D0] transition-all duration-500 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[#3A6332] font-serif text-lg group-hover:text-[#F2F0D0] transition-colors mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-[#2D3629]/70 text-xs leading-relaxed group-hover:text-[#F2F0D0]/70 transition-colors">
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
                        <div className="h-[1px] w-24 bg-[#3A6332]"></div>
                        <Leaf size={24} className="text-[#3A6332]" />
                        <div className="h-[1px] w-24 bg-[#3A6332]"></div>
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