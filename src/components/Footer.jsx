import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#3A6332] pt-20 pb-10 overflow-hidden text-[#F2F0D0]">
            {/* Background Decorative Text - Subtly using the primary forest green */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[15vw] font-serif text-[#2D3629]/10 whitespace-nowrap pointer-events-none select-none">
                ALMARIS
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* --- Column 1: Brand --- */}
                    <div className="space-y-4">
                        <h3 className="text-[#F2F0D0] text-3xl font-serif tracking-tighter">
                            ALMARIS<span className="text-[#A3C999]">.</span>
                        </h3>
                        <p className="text-[#F2F0D0]/70 text-xs leading-relaxed max-w-xs">
                            A sanctuary of refined sustainability and organic luxury. Experience mindful hospitality in the heart of nature.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Instagram, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i} href="#"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="p-3 rounded-full bg-[#2D3629]/30 border border-[#A3C999]/20 text-[#F2F0D0] transition-all"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* --- Column 2: Quick Links --- */}
                    <div>
                        <h4 className="text-[#A3C999] uppercase tracking-[0.2em] text-[11px] font-black mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {['Our Story', 'Accommodations', 'Wellness Spa', 'Organic Dining', 'Experiences'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-[#F2F0D0]/80 hover:text-white text-[12px] transition-colors relative group/link inline-block">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A3C999] transition-all group-hover/link:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Column 3: Support --- */}
                    <div>
                        <h4 className="text-[#A3C999] uppercase tracking-[0.2em] text-[11px] font-black mb-6">Support</h4>
                        <ul className="space-y-4">
                            {['Booking FAQ', 'Sustainability Policy', 'Terms of Service', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-[#F2F0D0]/80 hover:text-white text-[12px] transition-colors relative group/link inline-block">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A3C999] transition-all group-hover/link:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Column 4: Contact --- */}
                    <div>
                        <h4 className="text-[#A3C999] uppercase tracking-[0.2em] text-[11px] font-black mb-6">Contact Us</h4>
                        <ul className="space-y-5 text-[12px] text-[#F2F0D0]/80">
                            <li className="flex items-start gap-4">
                                <MapPin size={16} className="text-[#A3C999] shrink-0 mt-0.5" />
                                <span>122 Hidden Valley,<br /> Sylhet, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                                <Phone size={16} className="text-[#A3C999] shrink-0" />
                                <a href="tel:+8801234567890">+880 1234-567890</a>
                            </li>
                            <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                                <Mail size={16} className="text-[#A3C999] shrink-0" />
                                <a href="mailto:nature@almaris.com">nature@almaris.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="mt-16 pt-8 border-t border-[#F2F0D0]/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#F2F0D0]/50 text-[10px] uppercase tracking-[0.3em] font-medium">
                        © 2026 Almaris Eco-Resort. Nurturing Nature & You.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-4 text-[#F2F0D0]/60 hover:text-[#A3C999] transition-all"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black">Back to Top</span>
                        <div className="w-12 h-12 rounded-full border border-[#F2F0D0]/20 flex items-center justify-center group-hover:border-[#A3C999] transition-all bg-[#2D3629]/20 group-hover:bg-[#2D3629]/40">
                            <Leaf size={18} className='group-hover:rotate-12 transition-transform'/>
                        </div>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
            `}</style>
        </footer>
    );
};

export default Footer;