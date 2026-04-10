import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const EcoPremiumBanner = () => {
  return (
    <section className="relative py-24 md:py-40 bg-[#FBFBF9] overflow-hidden">
      {/* Background Decorative SVG Texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 20 Q60 40 50 60 Q40 40 50 20" fill="#4A5D43" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Artistic Image Composition */}
          <div className="relative w-full lg:w-1/2">
            {/* Organic Shape Background */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#E8EEDF] rounded-full blur-3xl opacity-60 animate-pulse"></div>
            
            <div className="relative">
              {/* Main Image with Masking Effect */}
              <div className="relative z-10 rounded-[60px_20px_100px_40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(74,93,67,0.3)] border-[8px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=1000" 
                  alt="Eco Interior" 
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating Glass Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute -bottom-10 -right-6 md:right-10 z-20 bg-white/70 backdrop-blur-2xl p-8 rounded-[30px] shadow-2xl border border-white/50 max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#78936D] flex items-center justify-center text-white shadow-lg">
                    <span className="text-xl">🌿</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Purity Level</p>
                    <p className="text-stone-800 font-serif font-bold italic">99.9% Organic</p>
                  </div>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">
                  Every material used in our cottages is sourced responsibly from local forests.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-[#78936D]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#78936D]">
                  The Soul of Almaris
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.1] mb-8">
                Breath In, <br />
                <span className="text-[#78936D] italic">Reconnect</span> with <br />
                the Earth.
              </h2>

              <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-12 font-sans font-light italic">
                "In every walk with nature, one receives far more than he seeks." 
                <span className="block mt-4 not-italic font-bold text-sm text-stone-400 tracking-tighter uppercase">— John Muir</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col gap-2">
                  <h4 className="text-stone-800 font-bold text-sm uppercase tracking-widest">Heritage Design</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Traditional Sreemangal architecture blended with modern eco-tech.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-stone-800 font-bold text-sm uppercase tracking-widest">Solar Powered</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Our entire resort runs on 100% clean, renewable energy systems.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-[#2D3629] text-white px-12 py-5 rounded-full font-sans text-xs font-bold uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(45,54,41,0.3)]"
                >
                  Explore Our Ethics
                </motion.button>
                
                <Link to="/rooms" className="text-stone-800 font-bold text-xs uppercase tracking-widest border-b-2 border-[#78936D] pb-1 hover:text-[#78936D] transition-colors">
                  View Cottages
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Aesthetic Floating Leaf */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-[5%] opacity-20 hidden lg:block"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="#78936D">
          <path d="M50 10 Q70 10 80 40 Q90 70 50 90 Q10 70 20 40 Q30 10 50 10" />
        </svg>
      </motion.div>
    </section>
  );
};

export default EcoPremiumBanner;