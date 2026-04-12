import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Calendar, Clock } from 'lucide-react';

const SpecialOffers = () => {
    return (
        <section className="py-16 lg:py-24 bg-[#F2F0D0]/30 overflow-hidden px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* --- Left Side: Text Content --- */}
                <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[#3A6332] text-xs font-black tracking-[0.5em] uppercase mb-3">Hurry Up</p>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#3A6332] leading-tight italic">Special Offers</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="w-16 h-16 bg-[#3A6332] rounded-2xl flex items-center justify-center text-[#F2F0D0] shadow-lg shadow-[#3A6332]/20">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2D3629]">Reception 24/7</h3>
                            <p className="text-sm text-[#2D3629]/70 leading-relaxed font-medium">
                                Our dedicated team is nestled in nature's heart, ready to assist your journey at any hour of the day.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="w-16 h-16 bg-[#A3C999] rounded-2xl flex items-center justify-center text-[#3A6332] shadow-lg shadow-[#A3C999]/20">
                                <PhoneCall size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2D3629]">Instant Booking</h3>
                            <p className="text-sm text-[#2D3629]/70 leading-relaxed font-medium">
                                Secure your sanctuary effortlessly. Our online reservation ensures a seamless path to your eco-escape.
                            </p>
                        </motion.div>
                    </div>

                    {/* Special CTA Box */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border border-[#A3C999]/30 p-8 flex items-center gap-8 group cursor-pointer bg-white rounded-[2rem] shadow-xl shadow-[#3A6332]/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2F0D0] rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                        
                        <div className="w-16 h-16 bg-[#3A6332] rounded-full flex items-center justify-center text-[#F2F0D0] z-10">
                            <Calendar size={26} />
                        </div>
                        <div className="z-10">
                            <h4 className="text-lg font-serif font-bold text-[#3A6332] leading-none mb-2">Book Your Retreat</h4>
                            <p className="text-xs text-[#2D3629]/60 font-medium">Limited seasonal suites available for spring.</p>
                        </div>
                    </motion.div>
                </div>

                {/* --- Right Side: Image Collage --- */}
                <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
                    <div className="relative flex items-center gap-6 h-[450px] md:h-[550px]">

                        {/* Main Center Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-56 md:w-72 h-full overflow-hidden shadow-2xl rounded-[3rem] border-8 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=600"
                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                alt="Eco Reception"
                            />
                        </motion.div>

                        {/* Right Side Stacked Images */}
                        <div className="flex flex-col gap-6 h-full py-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="w-36 md:w-52 h-1/2 overflow-hidden shadow-xl rounded-[2.5rem] border-4 border-white"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=400"
                                    className="w-full h-full object-cover"
                                    alt="Guest Service"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="w-36 md:w-52 h-1/2 overflow-hidden shadow-xl rounded-[2.5rem] border-4 border-white"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400"
                                    className="w-full h-full object-cover"
                                    alt="Luxury Details"
                                />
                            </motion.div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-8 bg-[#3A6332] text-[#F2F0D0] px-8 py-6 rounded-[2rem] hidden md:block shadow-2xl z-20"
                        >
                            <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-1">Established</p>
                            <p className="font-serif text-xl italic">Since 1994</p>
                        </motion.div>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </section>
    );
};

export default SpecialOffers;