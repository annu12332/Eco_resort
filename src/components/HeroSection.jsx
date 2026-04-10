import React, { useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F1EA]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000"
          alt="Eco Resort"
          className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${isLoaded ? 'scale-100' : 'scale-110'}`}
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 pt-20 md:pt-32 pb-12">
        <div 
          className={`transition-all duration-1000 ease-out transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-1 bg-white/10 rounded-[32px] blur-sm"></div>
            
            <div className="relative bg-white/10 backdrop-blur-md md:backdrop-blur-lg rounded-[32px] border border-white/30 shadow-2xl overflow-hidden">
              <div className="py-10 px-6 md:py-16 md:px-16 text-center">
                
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
                  <span className="text-emerald-400 text-[10px] animate-pulse">●</span>
                  <span className="font-sans text-[10px] tracking-[0.2em] text-white font-bold uppercase">
                    Sustainable Sanctuary
                  </span>
                </div>
                
                <h1 className="font-['Playball'] text-5xl md:text-7xl lg:text-8xl text-white leading-[1.2] mb-6 drop-shadow-md">
                  The Longer You Stay
                </h1>
                
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="h-px bg-white/30 flex-1 max-w-[60px]"></div>
                  <p className="font-sans text-[11px] md:text-xs tracking-[0.5em] text-white/90 font-medium uppercase whitespace-nowrap">
                    The Less You Pay
                  </p>
                  <div className="h-px bg-white/30 flex-1 max-w-[60px]"></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-white text-[#4A5D43] px-10 py-4 rounded-2xl font-sans text-xs font-black uppercase tracking-widest hover:bg-[#78936D] hover:text-white transition-all duration-300 shadow-lg active:scale-95">
                    Book Retreat
                  </button>
                  <button className="w-full sm:w-auto bg-black/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-300">
                    View Escape
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-8 md:px-16 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-2 pr-5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#78936D] flex items-center justify-center text-white shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="hidden md:block">
            <p className="text-white text-[9px] uppercase tracking-widest font-bold opacity-60">Certified</p>
            <p className="text-white text-[11px] font-semibold">100% Eco-Friendly</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playball&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </section>
  );
};

export default Hero;