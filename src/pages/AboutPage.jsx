import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Music, 
  Award, 
  ArrowRight, 
  Globe2, 
  Heart,
  Headphones,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import BTSLogo from '../components/BTSLogo';

export default function AboutPage() {
  const pillars = [
    {
      num: '01',
      title: 'Vapor-Deposited Bora Metallurgy',
      icon: <Sparkles className="text-purple-400" size={22} />,
      desc: 'Each chassis undergoes multi-stage Physical Vapor Deposition (PVD) to achieve our signature metallic violet sheen, bonded directly to Grade 5 Aerospace Titanium.',
      detail: 'Scratch-resistant • Vacuum-bonded • Hazy Velvet finish'
    },
    {
      num: '02',
      title: 'Seoul Master Acoustic Tuning',
      icon: <Music className="text-pink-400" size={22} />,
      desc: 'Tuned inside Seoul acoustic research chambers in direct alignment with BTS master studio recordings to reproduce stadium-grade dynamics and 360° Dolby Atmos immersion.',
      detail: '24-bit/192kHz Lossless • Coaxial Dual Drivers • AI ANC'
    },
    {
      num: '03',
      title: 'Unified Ecosystem Continuity',
      icon: <Cpu className="text-cyan-400" size={22} />,
      desc: 'One touch seamlessly links your smartphone, studio headphones, smartwatch, and ultra laptop with zero latency and automatic audio switching.',
      detail: 'Galaxy AI integration • Instant S-Pen sync • Multi-screen flow'
    },
    {
      num: '04',
      title: 'Cryptographic Authenticity',
      icon: <ShieldCheck className="text-emerald-400" size={22} />,
      desc: 'Every genuine hardware unit carries an embedded cryptographic NFC chip that verifies serial authenticity with a tap against any smartphone.',
      detail: 'Immutable verification • Tamper-evident seals • OEM Warranty'
    }
  ];

  const milestones = [
    {
      year: '2020',
      tag: 'ORIGIN RELEASE',
      title: 'The First Purple Era',
      desc: 'The original Galaxy S20+ and Buds+ Bora Purple edition debut worldwide, selling out internationally within 30 minutes.'
    },
    {
      year: '2022',
      tag: 'ACOUSTIC LAB',
      title: 'Hi-Res Stadium Audio Lab',
      desc: 'Establishment of the dedicated BTS Audio Research division to calibrate 24-bit master audio profiles directly from live stadium tour consoles.'
    },
    {
      year: '2024',
      tag: 'TITANIUM BREAKTHROUGH',
      title: 'Fold6 Ultra & Watch X Pro',
      desc: 'Breakthrough integration of folding AMOLED displays and 3nm sapphire smartwatches with custom BTS One UI experiences.'
    },
    {
      year: '2026',
      tag: 'SOVEREIGN ARCHIVE',
      title: '24K Gold & 3D Physical Rail',
      desc: 'Launch of the ACCESS 2026 Hardware Archive, featuring 24K Gold Sovereign editions and our interactive physical clothing rail collection.'
    }
  ];

  const stats = [
    { value: '100%', label: 'Certified OEM Authenticity', sub: 'Cryptographically Verified' },
    { value: '24-Bit', label: 'Lossless Master Audio', sub: '192 kHz Pure Acoustic Sampling' },
    { value: '777', label: 'Numbered 24K Gold Units', sub: 'Ultra-Exclusive Global Allocation' },
    { value: '24 Mo', label: 'Worldwide Priority Warranty', sub: 'OEM Certified Concierge Replacement' },
  ];

  return (
    <div className="min-h-screen text-[#f5f2eb] bg-[#080808] selection:bg-[#f5f2eb] selection:text-[#080808]">
      
      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#f5f2eb]/10">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161619] border border-[#f5f2eb]/15 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9c978b]">
            <BTSLogo size={14} />
            <span>ACCESS • 2026 ARCHIVAL MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#f5f2eb]">
            Crafted for the Soul. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
              Engineered Beyond Limits.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9c978b] font-mono leading-relaxed">
            BTS Electronics & ACCESS Archive represent the convergence of groundbreaking industrial engineering,
            Seoul master acoustic tuning, and the iconic cultural legacy of BTS. We don&apos;t just manufacture hardware—we craft emotional artifacts.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/collections"
              className="px-6 py-3 rounded-full bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-wider hover:bg-white transition-transform hover:-translate-y-0.5 shadow-xl flex items-center gap-2"
            >
              <span>Explore Curated Collections</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-[#141416] border border-[#f5f2eb]/20 text-[#f5f2eb] text-xs font-bold uppercase tracking-wider hover:bg-[#1a1a1e] transition-colors"
            >
              Browse Full Catalog
            </Link>
          </div>

        </div>
      </section>

      {/* ── 2. KEY STATS BANNER ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 border-b border-[#f5f2eb]/10 bg-[#0d0d0f]/60">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#121214] border border-[#f5f2eb]/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black font-mono text-[#f5f2eb] tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider font-mono">
                {s.label}
              </div>
              <div className="text-[10px] text-[#9c978b] font-mono">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. THE BRAND MANIFESTO ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
              <Heart size={14} className="fill-purple-400 text-purple-400" />
              <span>The Borahae Philosophy in Silicon</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#f5f2eb] leading-tight">
              Technology Infused with Purpose, Heart, and Timeless Design.
            </h2>

            <p className="text-xs sm:text-sm text-[#9c978b] font-mono leading-relaxed">
              In Korean culture and BTS history, purple represents the final color of the rainbow—signifying trust, 
              longevity, and boundless love (&quot;Borahae&quot;). We took this symbolic truth and translated it into our engineering standards.
            </p>

            <p className="text-xs sm:text-sm text-[#9c978b] font-mono leading-relaxed">
              Every curve of our folding hinges, every micro-decibel of our acoustic noise cancellation, and every gram of aerospace titanium 
              is calibrated to provide an intimate, elevated sensory experience that stays with you through every stage of life.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#f5f2eb]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-purple-400 flex-shrink-0" />
                <span>Zero-Carbon Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-purple-400 flex-shrink-0" />
                <span>24K Pure Gold Vapor Plating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-purple-400 flex-shrink-0" />
                <span>Seoul Acoustic Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-purple-400 flex-shrink-0" />
                <span>7-Year Firmware Lifespan</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#f5f2eb]/15 shadow-2xl bg-[#121214] group">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=85"
                alt="BTS Sovereign Hardware Craftsmanship"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#080808]/85 backdrop-blur-md border border-[#f5f2eb]/15 text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 font-bold">
                  PRECISION ATELIER
                </div>
                <div className="text-sm font-bold text-[#f5f2eb] mt-0.5">
                  Hand-Polished 24K Sovereign Metallurgy & Matte Obsidian
                </div>
                <div className="text-[11px] text-[#9c978b] font-mono mt-1">
                  Seoul Lab Prototype // Verified Zero-Defect Tolerance
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. FOUR CORE ENGINEERING PILLARS ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-20 bg-[#0d0d0f] border-y border-[#f5f2eb]/10 text-left">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
              <Compass size={14} />
              <span>ARCHITECTURAL INTEGRITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f5f2eb]">
              The Four Engineering Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#9c978b] font-mono">
              How our design ateliers maintain unparalleled standards across acoustics, silicon, and tactile metallurgy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#121214] border border-[#f5f2eb]/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-[#9c978b]/40 group-hover:text-purple-400 transition-colors">
                      {p.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#18181c] border border-[#f5f2eb]/10">
                      {p.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#f5f2eb] leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#9c978b] font-mono leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#f5f2eb]/10 mt-6 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                  {p.detail}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. INTERACTIVE TIMELINE & MILESTONES ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-20 max-w-6xl mx-auto text-left">
        <div className="space-y-12">
          
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
              <Clock size={14} />
              <span>CHRONOLOGICAL ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f5f2eb]">
              Milestones of Innovation
            </h2>
            <p className="text-xs sm:text-sm text-[#9c978b] font-mono">
              Tracking our path from early limited drops to a global sovereign electronics ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#0e0e11] border border-[#f5f2eb]/15 relative overflow-hidden"
              >
                <div className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/20 inline-block mb-3">
                  {m.tag}
                </div>
                <div className="text-3xl font-black font-mono text-[#f5f2eb] mb-1">
                  {m.year}
                </div>
                <h3 className="text-sm font-bold text-[#f5f2eb] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-[#9c978b] font-mono leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. SOUND MASTERS & LEADERSHIP QUOTE ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-t border-[#f5f2eb]/10 bg-gradient-to-b from-[#080808] to-[#100e16]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <BTSLogo size={36} className="mx-auto" />
          <blockquote className="text-xl sm:text-2xl font-serif italic text-[#f5f2eb] leading-relaxed">
            &ldquo;Technology should never be cold, sterile silicon. When you hold our titanium devices or listen through our acoustic drivers, you should feel the immense pulse of the stadium and the deep intimacy of the recording booth.&rdquo;
          </blockquote>
          <div className="space-y-0.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300">
              Seoul Audio & Industrial Design Collective
            </div>
            <div className="text-[11px] font-mono text-[#9c978b]">
              ACCESS 2026 Hardware Archive
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CALL TO ACTION ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-t border-[#f5f2eb]/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-[#f5f2eb]">
            Ready to Experience the Archive?
          </h2>
          <p className="text-xs sm:text-sm text-[#9c978b] font-mono max-w-xl mx-auto">
            Discover our curated series, test the interactive 3D physical garment rail, or consult with our hardware concierge.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/collections"
              className="px-6 py-3 rounded-full bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl"
            >
              Explore Collections
            </Link>
            <Link
              to="/rail-gallery"
              className="px-6 py-3 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-wider hover:bg-purple-800/50 transition-colors"
            >
              3D Physical Rail Gallery
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
