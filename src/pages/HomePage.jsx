import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Cpu, Sparkles, Layers } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import ArchivePromotions from '../components/ArchivePromotions';
import HardwareConcierge from '../components/HardwareConcierge';
import BTSLogo from '../components/BTSLogo';
import { products } from '../data/products';

export default function HomePage() {
  const trendingProducts = products.filter((p) => p.isTrending);
  const flagshipEcosystem = products.filter((p) => !p.isTrending);

  return (
    <div className="min-h-screen text-[#f5f2eb]">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Department Hardware Categories */}
      <CategoryGrid />

      {/* 3. Special Offer & Trending Hardware Vault (Access-Self Inspired) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Box: Special Allocation Vault Card */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0d0d0f] border border-[#f5f2eb]/15 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left group">
              
              <div className="space-y-2 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#161619] border border-[#f5f2eb]/15 text-[10px] font-mono uppercase tracking-widest text-[#9c978b]">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  <span>VAULT ALLOCATION</span>
                </div>

                <div className="space-y-1 pt-1">
                  <h3 className="text-3xl sm:text-4xl font-black text-[#f5f2eb] leading-tight">
                    Up to <br />
                    <span className="text-purple-400 font-mono">40% OFF</span>
                  </h3>
                  <p className="text-xs text-[#9c978b] font-mono leading-relaxed">
                    BTS Bora Purple Collection & Studio Acoustics
                  </p>
                </div>
              </div>

              {/* Center 3D Floating Product Graphics */}
              <div className="py-6 flex items-center justify-center relative z-10">
                <div className="relative w-44 sm:w-52 aspect-square rounded-xl bg-[#121214] border border-[#f5f2eb]/15 flex items-center justify-center p-3">
                  <img
                    src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=85"
                    alt="BTS Buds Pro Capsule"
                    className="w-36 sm:w-44 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#080808] border border-[#f5f2eb]/20 text-[9px] font-mono font-bold px-2 py-0.5 rounded text-[#f5f2eb]">
                    SPECIAL RELEASE
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-2 z-10">
                <Link
                  to="/products?sort=discount"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5f2eb] hover:bg-white text-[#080808] text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 rounded"
                >
                  <span>Explore Allocation</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>

            {/* Right Box: Trending Hardware Archive Grid */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              
              <div className="flex items-center justify-between text-left border-b border-[#f5f2eb]/15 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
                    HARDWARE VAULT • TOP PICKS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#f5f2eb] tracking-tight flex items-center gap-2">
                    Trending Electronics
                    <Sparkles size={16} className="text-purple-400" />
                  </h3>
                </div>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#f5f2eb]/20 text-xs font-bold uppercase tracking-wider text-[#9c978b] hover:text-[#f5f2eb] hover:border-[#f5f2eb] transition-colors rounded"
                >
                  <span>Catalog</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {trendingProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Archive Promotions with Countdown Timer */}
      <ArchivePromotions />

      {/* 5. Flagship Computing & Entertainment Slates */}
      {flagshipEcosystem.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-[#f5f2eb]/15 pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
                  DEPARTMENT OVERVIEW • 2026 RELEASES
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#f5f2eb] tracking-tight">
                  Flagship Computing & Displays
                </h3>
              </div>

              <Link
                to="/products?category=smartphones"
                className="text-xs font-bold uppercase tracking-wider text-[#9c978b] hover:text-[#f5f2eb] font-mono"
              >
                Inspect All Models →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {flagshipEcosystem.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. Hardware Concierge / Interactive FAQ */}
      <section id="about" className="scroll-mt-24 border-y border-[#f5f2eb]/10 bg-[#0d0d0c] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9c978b]">ABOUT THE ARCHIVE</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f2eb] sm:text-3xl">Technology with a signature.</h2>
            <p className="mt-3 text-sm leading-6 text-[#9c978b]">BTS Electronics brings together considered personal technology, studio audio, and connected devices in one curated collection. Explore the hardware, compare details, and find the pieces that fit your everyday.</p>
          </div>
          <Link to="/products" className="inline-flex min-h-11 items-center justify-center gap-2 justify-self-start border border-[#f5f2eb]/25 px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#f5f2eb] transition-colors hover:bg-[#f5f2eb] hover:text-[#080808] md:justify-self-end">Explore products <ArrowRight size={14} /></Link>
        </div>
      </section>

      <div id="faq" className="scroll-mt-24">
        <HardwareConcierge />
      </div>

      {/* 7. Access Guarantee Strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full rounded-xl bg-[#0d0d0f] border border-[#f5f2eb]/15 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs font-mono">
          
          <div className="flex items-center gap-3.5 px-3 py-2">
            <div className="p-2.5 border border-[#f5f2eb]/20 text-[#f5f2eb] rounded bg-[#141416]">
              <Truck size={18} />
            </div>
            <div>
              <div className="font-bold text-[#f5f2eb] uppercase tracking-wider">Priority Air Courier</div>
              <div className="text-[10px] text-[#9c978b]">Complimentary over ₹999 / $50</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2 border-t sm:border-t-0 sm:border-l border-[#f5f2eb]/10">
            <div className="p-2.5 border border-[#f5f2eb]/20 text-[#f5f2eb] rounded bg-[#141416]">
              <Shield size={18} />
            </div>
            <div>
              <div className="font-bold text-[#f5f2eb] uppercase tracking-wider">OEM Certified Care</div>
              <div className="text-[10px] text-[#9c978b]">24 Months Full Replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2 border-t sm:border-t-0 sm:border-l border-[#f5f2eb]/10">
            <div className="p-2.5 border border-[#f5f2eb]/20 text-[#f5f2eb] rounded bg-[#141416]">
              <Cpu size={18} />
            </div>
            <div>
              <div className="font-bold text-[#f5f2eb] uppercase tracking-wider">Cryptographic Proof</div>
              <div className="text-[10px] text-[#9c978b]">100% Verified Authentic Hardware</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
