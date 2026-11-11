import { useState, useEffect } from 'react';
import { Clock, Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ArchivePromotions() {
  const { applyVoucher, openCart } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  // Live countdown timer for allocation window
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApplyVoucher = (code) => {
    applyVoucher(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
      openCart();
    }, 600);
  };

  const vouchers = [
    {
      badge: 'FLAGSHIP PASS',
      title: '-15% VAULT PRIVILEGE',
      subtitle: 'Titanium Mobile, Foldables & Studio Audio',
      code: 'ACCESS2026',
      desc: 'Applies cryptographic 15% discount on all flagship hardware.'
    },
    {
      badge: 'AUDIO SYNERGY',
      title: '-10% STUDIO BUNDLE',
      subtitle: 'Buds Pro & Studio ANC Pairings',
      code: 'PRODIGY10',
      desc: 'Exclusive voucher for audiophile studio setups and GaN chargers.'
    },
    {
      badge: 'BTS SPECIAL ALLOCATION',
      title: 'SPECIAL COLLABORATION',
      subtitle: 'BTS Bora Purple Hardware Suite',
      code: 'BTS2026',
      desc: 'Unlocks priority handling & preloaded collector themes.'
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#f5f2eb]/15 pb-5 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
              ARCHIVE PROMOTIONS • TIME LOCK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#f5f2eb] tracking-tight">
              Curated Releases & Vault Codes
            </h2>
          </div>

          {/* Allocation Closes Live Timer */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#121214] border border-[#f5f2eb]/20 text-xs font-mono rounded">
            <Clock size={14} className="text-[#f5f2eb] animate-pulse" />
            <span className="text-[#9c978b] uppercase tracking-wider text-[11px]">
              Allocation Closes:
            </span>
            <span className="font-bold text-[#f5f2eb] tracking-widest">
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Voucher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className="p-5 bg-[#0e0e10] border border-[#f5f2eb]/15 flex flex-col justify-between space-y-4 hover:border-[#f5f2eb]/40 transition-all rounded group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1c1c20] text-[#9c978b] border border-[#f5f2eb]/10 rounded">
                    {v.badge}
                  </span>
                  <Sparkles size={13} className="text-[#f5f2eb]/40 group-hover:text-[#f5f2eb] transition-colors" />
                </div>

                <h3 className="text-base font-bold text-[#f5f2eb] tracking-wide pt-1">
                  {v.title}
                </h3>
                <div className="text-xs font-semibold text-[#9c978b]">
                  {v.subtitle}
                </div>
                <p className="text-[11px] text-[#636058] leading-relaxed">
                  {v.desc}
                </p>
              </div>

              {/* Code Apply Pill Button */}
              <div className="pt-2 border-t border-[#f5f2eb]/10 flex items-center justify-between gap-2">
                <div className="font-mono text-xs font-bold text-[#f5f2eb] bg-[#161618] px-3 py-1.5 border border-[#f5f2eb]/20 rounded">
                  {v.code}
                </div>

                <button
                  onClick={() => handleApplyVoucher(v.code)}
                  className="px-4 py-1.5 bg-[#f5f2eb] hover:bg-white text-[#080808] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all rounded active:scale-95"
                >
                  {copiedCode === v.code ? (
                    <>
                      <Check size={12} />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Tag size={12} />
                      <span>Apply Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
