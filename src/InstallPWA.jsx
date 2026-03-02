import React, { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // চেক করা হচ্ছে ইউজার আগে রিজেক্ট করেছে কি না
    const isDismissed = localStorage.getItem('pwa_install_dismissed');

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // যদি ইউজার আগে রিজেক্ট না করে থাকে তবেই দেখাবে
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    // ২৪ ঘণ্টার জন্য হাইড করে রাখা (ঐচ্ছিক লজিক)
    localStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-4 max-w-sm w-full flex items-center gap-4">
        {/* অ্যাপ আইকন বা লোগো */}
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
          <svg xmlns='/public/icons/icon-512x512.png' className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-800 dark:text-white">App Install করুন</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">সেরা ইউজার অভিজ্ঞতার জন্য আমাদের অ্যাপটি ফোনে রাখুন।</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={handleInstallClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-transform active:scale-90"
          >
            Install
          </button>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-[10px] font-medium text-center"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;