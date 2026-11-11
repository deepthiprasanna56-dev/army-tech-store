import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Cpu, Heart } from 'lucide-react';
import { heroSlides } from '../data/products';
import BTSLogo from './BTSLogo';

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  const prev = () => setSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  const next = () => setSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(timer);
  }, [slideIndex]);

  const currentSlide = heroSlides[slideIndex];

  return (
    <section id="home" className="scroll-mt-24 relative overflow-hidden pt-6 pb-12 px-4 sm:px-6 lg:px-8 text-[#f5f2eb]">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#f5f2eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl bg-[#0c0c0e] border border-[#f5f2eb]/15 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl beam-effect">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Eyebrow Tagline matching access-self */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#161619] border border-[#f5f2eb]/15">
                <BTSLogo size={14} />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9c978b]">
                  ACCESS • 2026 HARDWARE ARCHIVE
                </span>
              </div>

              {/* Bold Minimalist Luxury Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#f5f2eb]">
                  Engineered Beyond Tomorrow.
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#9c978b]">
                  Experienced Today.
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#9c978b] font-normal leading-relaxed max-w-lg">
                Discover flagship personal technology engineered beyond conventions. Studio acoustics, foldable optics, and precision hardware certified for tomorrow.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 rounded"
                >
                  <span>Explore 2026 Flagships</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/products?sort=discount"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141416] hover:bg-[#1a1a1d] text-[#f5f2eb] border border-[#f5f2eb]/20 font-bold text-xs uppercase tracking-wider transition-colors rounded"
                >
                  <span>Unlock Vault Deals</span>
                </Link>
              </div>

              {/* 3 Hardware Guarantees Strip */}
              <div className="pt-4 border-t border-[#f5f2eb]/10 grid grid-cols-3 gap-3 text-[11px] font-mono text-[#9c978b]">
                <div className="flex items-center gap-1.5">
                  <Truck size={13} className="text-[#f5f2eb] shrink-0" />
                  <span className="truncate">Priority Air</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#f5f2eb] shrink-0" />
                  <span className="truncate">2-Year OEM Care</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu size={13} className="text-[#f5f2eb] shrink-0" />
                  <span className="truncate">Verified Genuine</span>
                </div>
              </div>

              {/* Slider Arrows & Dots */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={prev}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded border border-[#f5f2eb]/20 bg-[#121214] text-[#9c978b] hover:text-[#f5f2eb] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        slideIndex === idx ? 'w-6 bg-[#f5f2eb]' : 'w-2 bg-[#2a2a2e]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded border border-[#f5f2eb]/20 bg-[#121214] text-[#9c978b] hover:text-[#f5f2eb] flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

            {/* Right 3D Stage (6 Cols) */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              
              {/* Glowing Industrial Ring */}
              <div className="absolute w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border border-[#f5f2eb]/10 shadow-[0_0_80px_rgba(168,85,247,0.15)] pointer-events-none" />

              {/* Floating Monogram / Script Badge */}
              <div className="absolute top-2 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#141418] border border-[#f5f2eb]/20 text-xs font-mono text-[#f5f2eb]">
                <BTSLogo size={12} />
                <span>BTS VAULT EDITION</span>
                <Heart size={12} className="fill-purple-400 text-purple-400" />
              </div>

              {/* 3D Floating Composite */}
              <div className="relative z-10 w-full max-w-lg flex items-center justify-center">

                {/* Studio Headphones (Back Left) */}
                <div className="absolute -left-2 sm:left-4 -top-6 sm:top-2 w-32 sm:w-44 animate-float-gentle z-10">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=85"
                    alt="BTS Studio Headphones"
                    className="w-full object-contain rounded-xl border border-[#f5f2eb]/15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Center BTS Buds Pro Capsule */}
                <div className="relative z-25 w-40 sm:w-52 -mt-2 animate-float-slow">
                  <div className="p-1 rounded-2xl bg-[#121216] border border-[#f5f2eb]/20 shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                    <img
                      src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=85"
                      alt="BTS Buds Pro"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Galaxy Fold Flagship (Back Right) */}
                <div className="absolute -right-2 sm:right-4 top-2 sm:top-6 w-44 sm:w-56 animate-float-gentle z-15">
                  <img
                    src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=85"
                    alt="Galaxy Fold6 Bora Purple"
                    className="w-full object-cover rounded-xl border border-[#f5f2eb]/20 shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Watch X (Bottom Right) */}
                <div className="absolute right-6 sm:right-16 -bottom-6 sm:-bottom-8 w-24 sm:w-32 animate-float-slow z-25">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=85"
                    alt="Watch X Pro"
                    className="w-full object-cover rounded-xl border border-[#f5f2eb]/20 shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
