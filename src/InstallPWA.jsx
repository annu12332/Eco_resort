import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare, Smartphone } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ১. ডিভাইস ডিটেকশন
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isApple);

    // ২. অ্যান্ড্রয়েড ইভেন্ট হ্যান্ডলার
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!localStorage.getItem('pwa_dismissed')) {
        setTimeout(() => setIsVisible(true), 3000); // ৩ সেকেন্ড পর পপআপ আসবে
      }
    };

    // ৩. iOS চেক
    if (isApple && !localStorage.getItem('pwa_dismissed') && !window.navigator.standalone) {
      setTimeout(() => setIsVisible(true), 3000);
    }

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setIsVisible(false);
    // চাইলে নির্দিষ্ট সময়ের জন্য হাইড করে রাখতে পারেন
    localStorage.setItem('pwa_dismissed', 'true'); 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="fixed bottom-0 left-0 right-0 z-[10000] p-4 flex justify-center pointer-events-none"
        >
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-3xl p-5 w-full max-w-md pointer-events-auto relative overflow-hidden">
            
            {/* ডেকোরেশন গ্লো (Background Glow) */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="flex items-start gap-4">
              {/* অ্যাপ আইকন উইথ অ্যানিমেশন */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                <Smartphone size={28} />
              </motion.div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">AlMaris Eco Resort</h3>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">Official Mobile App</p>
                  </div>
                  <button onClick={dismiss} className="text-slate-400 hover:text-slate-600 p-1">
                    <X size={18} />
                  </button>
                </div>
                
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isIOS 
                    ? 'আপনার iPhone-এ অ্যাপটি যোগ করতে নিচের ধাপে শেয়ার করুন।' 
                    : 'দ্রুত বুকিং এবং অফার পেতে সরাসরি আপনার ফোনে অ্যাপটি ইনস্টল করুন।'}
                </p>
              </div>
            </div>

            {/* অ্যাকশন এরিয়া */}
            <div className="mt-5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
              {isIOS ? (
                <div className="flex items-center gap-3 w-full justify-center text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-1 rounded-md shadow-sm">
                    <Share size={14} className="text-blue-500" /> Share
                  </div>
                  <span>➜</span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-1 rounded-md shadow-sm">
                    <PlusSquare size={14} /> Add to Home Screen
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs text-slate-500 font-medium ml-2">Size: ~1 MB</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInstall}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-200 dark:shadow-none"
                  >
                    <Download size={16} />
                    Install Now
                  </motion.button>
                </>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;