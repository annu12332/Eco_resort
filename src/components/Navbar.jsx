import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Cottages', href: '/all-rooms' },
        { name: 'Packages', href: '/packages' },
        { name: 'Activities', href: '/activities' },
        { name: 'About', href: '/about' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-[100] transition-all duration-700 ease-in-out px-4 md:px-10 ${scrolled ? 'top-0 py-2' : 'top-3 md:top-6 py-0'}`}>
                <div className={`max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all duration-500 border border-white/40 ${scrolled ? 'bg-[#F2F0D0]/90 backdrop-blur-2xl shadow-xl rounded-xl' : 'bg-[#F2F0D0]/40 backdrop-blur-md rounded-[20px] shadow-lg'}`}>
                    
                    <Link to="/" className="relative z-[110]">
                        <h1 className="text-xl md:text-2xl font-serif tracking-tighter text-[#3A6332] leading-none">
                            Almaris<span className="text-[#78A370] italic font-bold">Eco</span>
                        </h1>
                        <div className="h-[1.5px] w-8 bg-[#3A6332] mt-0.5"></div>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D3629] hover:text-[#3A6332] transition-all relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3A6332] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/reservation" className="hidden sm:block">
                            <button className="bg-[#3A6332] backdrop-blur-sm text-[#F2F0D0] px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#78A370] transition-all shadow-md active:scale-95 border border-white/20">
                                Book Now
                            </button>
                        </Link>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden p-2 bg-[#A3C999]/30 backdrop-blur-md rounded-lg text-[#3A6332] border border-[#A3C999]/50 shadow-sm active:scale-90 transition-transform"
                        >
                            <HiMenuAlt3 className="text-2xl" />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-[#2D3629]/60 backdrop-blur-sm z-[120]"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className="fixed right-0 top-0 h-screen w-[260px] sm:w-[320px] bg-[#F2F0D0] z-[130] flex flex-col shadow-2xl border-l border-[#A3C999]/30"
                            >
                                <div className="p-6 flex justify-end">
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="p-3 bg-[#A3C999]/20 rounded-full text-[#3A6332] hover:bg-[#3A6332] hover:text-[#F2F0D0] transition-all"
                                    >
                                        <HiX className="text-xl" />
                                    </button>
                                </div>

                                <div className="flex flex-col space-y-6 px-10 pt-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                        >
                                            <Link
                                                to={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-2xl font-serif text-[#3A6332] hover:text-[#78A370] transition-colors italic block"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    
                                    <div className="pt-8">
                                        <Link to="/reservation" onClick={() => setIsOpen(false)}>
                                            <button className="w-full bg-[#3A6332] text-[#F2F0D0] py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                                                Check Availability
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-auto p-10 border-t border-[#A3C999]/30">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#78A370] font-bold mb-5">Connect</p>
                                    <div className="flex flex-col gap-4 text-[#2D3629]">
                                        <span className="hover:text-[#3A6332] cursor-pointer font-bold text-[10px] tracking-widest transition-colors">INSTAGRAM</span>
                                        <span className="hover:text-[#3A6332] cursor-pointer font-bold text-[10px] tracking-widest transition-colors">FACEBOOK</span>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;