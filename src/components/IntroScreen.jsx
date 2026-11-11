import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import BTSLogo from './BTSLogo';

export default function IntroScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => handleEnter(), 350);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      onFinish();
    }, 600);
  };

  return (
    <div
      className={`intro-editorial fixed inset-0 z-50 flex items-center justify-center bg-[#080808] text-white overflow-hidden transition-all duration-700 ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cosmic Violet Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-700/25 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      {/* Holographic Glowing Light Circles */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full border border-purple-500/20 border-dashed animate-spin pointer-events-none [animation-duration:24s]" />
      <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full border border-violet-400/30 animate-ping pointer-events-none [animation-duration:6s] opacity-25" />

      {/* Center Cinematic Container */}
      <div className="relative z-10 max-w-2xl w-full px-4 sm:px-6 py-8 flex flex-col items-center text-center space-y-5 sm:space-y-6">
        
        {/* BTS Neon Logo Presentation */}
        <div className="relative animate-bounce-once">
          <div className="absolute -inset-6 bg-purple-600/40 rounded-full blur-2xl animate-pulse" />
          <div className="relative p-4 rounded-3xl bg-gradient-to-b from-[#190733] to-[#0d011c] border border-purple-400/40 shadow-[0_0_50px_rgba(168,85,247,0.7)] flex items-center justify-center">
            <BTSLogo size={64} />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-widest text-white leading-tight">
            BTS <span className="bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-300 bg-clip-text text-transparent">ELECTRONICS</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-[0.3em] text-purple-300 uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-purple-400" />
            Tech Beyond Limits
            <Sparkles size={14} className="text-purple-400" />
          </p>
        </div>

        {/* Featured BTS electronics */}
        <div className="grid w-full max-w-xl grid-cols-3 gap-2 sm:gap-3" aria-label="Featured electronics">
          {[
            {
              name: 'BTS earbuds',
              image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=85',
            },
            {
              name: 'BTS smartphone',
              image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=85',
            },
            {
              name: 'BTS headphones',
              image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=85',
            },
          ].map((item) => (
            <div key={item.name} className="group relative h-20 sm:h-28 overflow-hidden rounded-xl sm:rounded-2xl border border-purple-400/30 bg-purple-950/50 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090116]/90 via-transparent to-transparent" />
              <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] sm:text-[10px] font-semibold text-white/90">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Status Bar */}
        <div className="w-full space-y-2 pt-1 max-w-xs">
          <div className="w-full h-1.5 bg-purple-950/90 rounded-full overflow-hidden border border-purple-800/50">
            <div
              className="h-full bg-gradient-to-r from-violet-600 via-purple-400 to-pink-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,0.9)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/80">
            <span>SYNCHRONIZING GALAXY CORE</span>
            <span className="font-bold">{progress}%</span>
          </div>
        </div>

        {/* Enter Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleEnter}
            className="group inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 border border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(192,132,252,0.9)] transition-all hover:scale-105 active:scale-95"
          >
            <span>ENTER BTS EXPERIENCE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Bottom Legal / Signature line */}
      <div className="absolute bottom-6 text-center text-[10px] font-mono tracking-widest text-purple-400/50">
        BTS × SAMSUNG FLAGSHIP ARCHITECTURE · INFINITY DESIGN 2026
      </div>
    </div>
  );
}
