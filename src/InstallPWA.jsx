import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone, Share, PlusSquare } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if it's an iOS device (iPhone/iPad)
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isApple);

    // 2. Android/Chrome handler for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt if not dismissed previously
      if (!localStorage.getItem('pwa_dismissed')) {
        setTimeout(() => setIsVisible(true), 1000); // Small delay
      }
    };

    // 3. iOS Logic: Check if already installed
    if (isApple && !localStorage.getItem('pwa_dismissed') && !window.navigator.standalone) {
      setTimeout(() => setIsVisible(true), 1000);
    }

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Trigger native browser install prompt for Android
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Remember dismissal
    localStorage.setItem('pwa_dismissed', 'true'); 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-0 right-0 z-[1000] flex justify-center px-4 pointer-events-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-full max-w-sm pointer-events-auto">
            
            {/* Top Section: Icon and Text */}
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-emerald-50 p-3 rounded-xl flex items-center justify-center">
                <Smartphone className="text-emerald-500" size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-base">Use as an App</h3>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 leading-snug mt-1">
                  {isIOS 
                    ? "Add our app to your home screen for quick access."
                    : "Add our app to your home screen for the best experience."}
                </p>
              </div>
            </div>

            {/* Direct Action Button Area */}
            {isIOS ? (
              <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                    <Share size={16} className="text-blue-500" /> Tap Share
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                    <PlusSquare size={16} /> Add to Home Screen
                </div>
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100"
              >
                <Download size={18} />
                Add to Home Screen
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;