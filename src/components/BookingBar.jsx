import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Users, ArrowRight } from 'lucide-react';

const BookingBar = () => {
    return (
        <section className="relative -mt-12 z-40 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // Light, organic container to match the soft yellow/green theme
                    className="bg-white/80 backdrop-blur-2xl border border-[#A3C999]/30 rounded-[2rem] p-4 md:p-2 shadow-[0_30px_60px_-15px_rgba(58,99,50,0.15)]"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                        {/* Check-In Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer border-b md:border-b-0 md:border-r border-[#A3C999]/20">
                            <div className="p-3 rounded-xl bg-[#F2F0D0] text-[#3A6332] group-hover:bg-[#3A6332] group-hover:text-[#F2F0D0] transition-all duration-500 shadow-sm">
                                <CalendarDays size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#2D3629]/50 font-black">Check-In</span>
                                <input
                                    type="text"
                                    placeholder="24 Feb 2026"
                                    className="bg-transparent text-[#2D3629] font-serif text-sm focus:outline-none placeholder:text-[#3A6332]/70 cursor-pointer w-full"
                                />
                            </div>
                        </div>

                        {/* Check-Out Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer border-b md:border-b-0 md:border-r border-[#A3C999]/20">
                            <div className="p-3 rounded-xl bg-[#F2F0D0] text-[#3A6332] group-hover:bg-[#3A6332] group-hover:text-[#F2F0D0] transition-all duration-500 shadow-sm">
                                <CalendarDays size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#2D3629]/50 font-black">Check-Out</span>
                                <input
                                    type="text"
                                    placeholder="26 Feb 2026"
                                    className="bg-transparent text-[#2D3629] font-serif text-sm focus:outline-none placeholder:text-[#3A6332]/70 cursor-pointer w-full"
                                />
                            </div>
                        </div>

                        {/* Guests Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer">
                            <div className="p-3 rounded-xl bg-[#F2F0D0] text-[#3A6332] group-hover:bg-[#3A6332] group-hover:text-[#F2F0D0] transition-all duration-500 shadow-sm">
                                <Users size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#2D3629]/50 font-black">Guests</span>
                                <select className="bg-transparent text-[#2D3629] font-serif text-sm focus:outline-none cursor-pointer appearance-none w-full">
                                    <option className="bg-[#F2F0D0]">02 Adults, 01 Child</option>
                                    <option className="bg-[#F2F0D0]">01 Adult</option>
                                    <option className="bg-[#F2F0D0]">04 Adults</option>
                                </select>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="w-full md:w-[22%] p-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                // Deep Forest Green Button with Eco Shadow
                                className="w-full bg-[#3A6332] hover:bg-[#2D3629] text-[#F2F0D0] font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-300 group shadow-[0_15px_30px_-5px_rgba(58,99,50,0.3)]"
                            >
                                <span className="uppercase text-[11px] tracking-widest">Check Availability</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>

                    </div>
                </motion.div>
            </div>
            
            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </section>
    );
};

export default BookingBar;