import React, { useState } from 'react';
import { Download, Smartphone, X, Sparkles, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'mobile-drawer' | 'settings' | 'banner';
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  onInstalled
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installing, setInstalling] = useState(false);

  // If already running as an installed standalone PWA, completely hide the button!
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      const success = await install();
      setInstalling(false);
      if (success && onInstalled) {
        onInstalled();
      }
    } else {
      // If browser hasn't fired beforeinstallprompt or is on iOS/unsupported browser, show instruction guide
      setShowGuide(true);
    }
  };

  // Render button based on layout variant
  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          disabled={installing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/40 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
          title="Install Kishore Opinion App on your device"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Install App</span>
        </button>
      )}

      {variant === 'mobile-drawer' && (
        <button
          onClick={handleInstallClick}
          disabled={installing}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-slate-800/80 transition-all"
        >
          <Smartphone className="w-5 h-5 text-cyan-400" />
          <div className="text-left flex-1">
            <span className="block font-semibold">Install App</span>
            <span className="block text-[11px] text-slate-400">Add to phone home screen</span>
          </div>
          <Download className="w-4 h-4 text-cyan-400" />
        </button>
      )}

      {variant === 'settings' && (
        <button
          onClick={handleInstallClick}
          disabled={installing}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Install as Mobile App (PWA)</p>
              <p className="text-[11px] text-slate-400">Launch fullscreen from your home screen</p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-cyan-500 text-slate-950 px-2.5 py-1 rounded-lg">
            Install
          </span>
        </button>
      )}

      {variant === 'banner' && (
        <div className="glass-panel-elevated p-4 rounded-2xl border border-cyan-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shrink-0">
              <div className="w-full h-full bg-[#080D24] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Install Kishore Opinion</p>
              <p className="text-xs text-slate-400">Get the full app experience on your phone or tablet</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 shadow-lg shadow-cyan-500/20 transition-all"
          >
            Install
          </button>
        </div>
      )}

      {/* Guided Install Modal for iOS and Browsers needing manual step */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm glass-panel-elevated rounded-3xl p-6 border border-cyan-500/30 shadow-2xl relative text-center">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 glow-cyan">
              <Smartphone className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-white">Install Kishore Opinion</h3>
            <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
              {isIOS
                ? 'Follow these quick steps to install on your iPhone or iPad:'
                : 'Follow these steps to add this app to your home screen:'}
            </p>

            <div className="text-left bg-slate-900/80 rounded-2xl p-4 border border-white/10 space-y-3 text-xs text-slate-200">
              {isIOS ? (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">1</span>
                    <p>Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline text-cyan-400 ml-1" /> in the Safari bottom bar.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">2</span>
                    <p>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-cyan-400 ml-1" />.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">3</span>
                    <p>Tap <strong>Add</strong> at the top right. Kishore Opinion will appear on your home screen!</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">1</span>
                    <p>Open your browser menu (tap the three dots <strong className="text-cyan-400">⋮</strong> at top right).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">2</span>
                    <p>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
