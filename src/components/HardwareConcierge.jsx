import { useState } from 'react';
import { ChevronDown, Shield, Truck, Cpu, Headphones, Check } from 'lucide-react';

export default function HardwareConcierge() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      icon: Shield,
      q: 'How does the 2-Year Manufacturer Care & OEM Certification work?',
      a: 'Every hardware model archived through ACCESS is sealed in factory condition with verifiable cryptographic serial numbers. You receive 24 months of full hardware replacement, zero-deductible repairs, and direct liaison with official service centers.'
    },
    {
      icon: Truck,
      q: 'What are the logistics transit windows and customs coverage?',
      a: 'All allocations above ₹999 / $50 qualify for Priority Air Dispatch. Shipments are packed in tamper-evident electrostatic containers with real-time GPS telemetry and pre-cleared customs clearance.'
    },
    {
      icon: Cpu,
      q: 'Can I request pre-configured firmware or language environments?',
      a: 'Yes. Upon order authorization, your staging engineer can preload official global multilingual firmware, unlocked network bands, and optional BTS signature lockscreen themes.'
    },
    {
      icon: Headphones,
      q: 'How do I contact the Human Hardware Engineers?',
      a: 'Our dedicated audio, computing, and RF engineers are accessible 24 hours a day, 7 days a week via live concierge chat or toll-free priority telephone.'
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-left border-b border-[#f5f2eb]/15 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
            HARDWARE CONCIERGE • FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f5f2eb] tracking-tight">
            Frequently Requested Inquiries
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-2 text-left">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const Icon = faq.icon;
            return (
              <div
                key={faq.q}
                className="bg-[#0e0e10] border border-[#f5f2eb]/15 rounded overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-[#141418] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 border border-[#f5f2eb]/20 text-[#f5f2eb] rounded">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#f5f2eb]">
                      {faq.q}
                    </span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-[#9c978b] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#f5f2eb]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#9c978b] leading-relaxed border-t border-[#f5f2eb]/10 animate-fade-in">
                    <p className="max-w-3xl">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
