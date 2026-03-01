import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaLeaf, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Cottages', href: '/all-rooms' },
        { name: 'Packages', href: '/packages' },
        { name: 'Activities', href: '/activities' },
        { name: 'Blog', href: '/blog' },
        { name: 'Offers', href: '/offers' },
        { name: 'About Us', href: '/about' },
    ];

    return (
        <>
            {/* Top Info Bar */}
            <div className="hidden md:flex justify-center items-center text-xs text-stone-600 bg-white/50 backdrop-blur-md py-1 gap-6 border-b border-stone-100 z-40 fixed w-full top-0">
                <div className="flex items-center gap-1">
                    <span className="text-emerald-600">📍</span> SREEMANGAL
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-emerald-600">📞</span> +880 123 456 7890
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-emerald-600">✉️</span> HELLO@ECO.COM
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ease-in-out top-6 md:top-6 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-stone-200'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center lg:items-start"
                    >
                        <Link to="/" className="flex flex-col items-center lg:items-start">
                            <h1 className="text-2xl md:text-3xl lg:text-3xl font-serif tracking-widest uppercase cursor-pointer text-stone-900">
                                Almaris <span className="text-emerald-600 font-bold">Eco</span>
                            </h1>
                            <div className="flex gap-1 mt-1 text-emerald-600 text-[10px] md:text-[11px] lg:text-xs">
                                {[...Array(5)].map((_, i) => (
                                    <FaLeaf key={i} />
                                ))}
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-10 text-stone-800 font-medium uppercase text-sm tracking-wide">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="relative group py-2 px-1 hover:text-emerald-600 transition-colors"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center gap-6">
                        {/* Social Icons */}
                        <div className="flex gap-3 text-stone-700 text-sm">
                            <FaFacebookF className="hover:text-emerald-600 transition-colors cursor-pointer" />
                            <FaInstagram className="hover:text-emerald-600 transition-colors cursor-pointer" />
                            <FaTwitter className="hover:text-emerald-600 transition-colors cursor-pointer" />
                        </div>

                        {/* Book Now Button */}
                        <Link to="/reservation">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-emerald-600 px-6 py-2.5 text-sm text-emerald-700 uppercase tracking-wider hover:bg-emerald-600 hover:text-white transition-all duration-300 rounded-full font-semibold"
                            >
                                Book Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-stone-950 lg:hidden text-3xl z-60 relative focus:outline-none"
                    >
                        {isOpen ? <HiX className="text-emerald-600" /> : <HiMenuAlt3 />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-screen w-[80%] bg-white/95 backdrop-blur-lg z-60 flex flex-col items-center justify-center space-y-8 shadow-2xl"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * index }}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-stone-900 text-lg font-medium tracking-wide uppercase hover:text-emerald-600 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <Link to="/reservation" onClick={() => setIsOpen(false)}>
                                    <button className="border-2 border-emerald-600 px-8 py-3 text-emerald-700 font-bold text-sm uppercase tracking-wider hover:bg-emerald-600 hover:text-white transition-all rounded-full shadow-sm">
                                        Book Now
                                    </button>
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;