import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers, Star, Shield, ArrowUpRight } from 'lucide-react';
import { collections, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import BTSLogo from '../components/BTSLogo';

export default function CollectionsPage() {
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');

  const activeCollection = collections.find((c) => c.id === selectedCollectionId);

  // Products belonging to the selected collection
  const displayedProducts = selectedCollectionId === 'all'
    ? products
    : products.filter((p) => activeCollection?.productIds?.includes(p.id));

  return (
    <div className="min-h-screen text-[#f5f2eb] bg-[#080808] selection:bg-[#f5f2eb] selection:text-[#080808]">
      
      {/* ── 1. HEADER ── */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-12 border-b border-[#f5f2eb]/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161619] border border-[#f5f2eb]/15 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9c978b]">
            <Sparkles size={13} className="text-purple-400" />
            <span>CURATED HARDWARE SERIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#f5f2eb]">
            Archival Collections
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#9c978b] font-mono leading-relaxed">
            Explore bespoke hardware anthologies, from the iconic Bora Purple edition and 24K Gold Sovereign capsule 
            to Seoul acoustic laboratory audio gear.
          </p>

          {/* Quick Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCollectionId('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                selectedCollectionId === 'all'
                  ? 'bg-[#f5f2eb] text-[#080808] shadow-lg'
                  : 'bg-[#121214] text-[#9c978b] border border-[#f5f2eb]/15 hover:text-[#f5f2eb]'
              }`}
            >
              All Series ({collections.length})
            </button>
            {collections.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCollectionId(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                  selectedCollectionId === c.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'bg-[#121214] text-[#9c978b] border border-[#f5f2eb]/15 hover:text-[#f5f2eb]'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[10px] opacity-70">({c.itemCount})</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. FEATURED COLLECTIONS GRID (WHEN ALL IS SELECTED) ── */}
      {selectedCollectionId === 'all' && (
        <section className="px-4 sm:px-6 lg:px-12 py-16 max-w-7xl mx-auto text-left space-y-12">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#f5f2eb] tracking-tight">
              Featured Series & Editions
            </h2>
            <p className="text-xs text-[#9c978b] font-mono">
              Select any collection to view complete specs and member allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                onClick={() => setSelectedCollectionId(col.id)}
                className="group cursor-pointer rounded-2xl bg-[#0e0e11] border border-[#f5f2eb]/15 overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl relative"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#161619]">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#080808]/80 backdrop-blur-md border border-[#f5f2eb]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#f5f2eb]">
                      {col.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-purple-950/80 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
                      {col.itemCount}
                    </span>
                  </div>
                </div>

                {/* Text Description */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                      {col.highlightBadge}
                    </div>
                    <h3 className="text-xl font-bold text-[#f5f2eb] leading-snug group-hover:text-purple-300 transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-[#9c978b] font-mono leading-relaxed line-clamp-3">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f5f2eb]/10 flex items-center justify-between text-xs font-mono font-bold text-[#f5f2eb]">
                    <span>Inspect Series</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. DETAILED PRODUCTS VIEW FOR ACTIVE OR FILTERED COLLECTION ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto text-left">
        <div className="space-y-8">
          
          {selectedCollectionId !== 'all' && activeCollection && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f13] border border-purple-500/30 relative overflow-hidden space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-widest">
                  {activeCollection.badge}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCollectionId('all')}
                  className="text-xs font-mono text-[#9c978b] hover:text-[#f5f2eb] underline"
                >
                  ← Show All Collections
                </button>
              </div>
              <h2 className="text-3xl font-black text-[#f5f2eb]">
                {activeCollection.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#9c978b] font-mono max-w-2xl">
                {activeCollection.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-[#f5f2eb]/10 pb-4">
            <h3 className="text-lg font-bold font-mono uppercase tracking-wider text-[#f5f2eb]">
              Hardware Units ({displayedProducts.length})
            </h3>
            <span className="text-xs font-mono text-[#9c978b]">
              All items in stock with priority air dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. APPAREL & MERCH RAIL JUMP ── */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 border-t border-[#f5f2eb]/10 bg-[#0a0a0d] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-pink-950/40 border border-pink-500/30 text-[11px] font-mono uppercase tracking-widest text-pink-300">
            <Layers size={13} />
            <span>Interactive 3D Stage Wear</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f5f2eb]">
            Looking for the Stage & Apparel Rail?
          </h2>
          <p className="text-xs sm:text-sm text-[#9c978b] font-mono max-w-xl mx-auto">
            Experience our physics-simulated clothing rail gallery where you can slide hangers, rotate garments, and inspect tour merchandise in 3D.
          </p>
          <div>
            <Link
              to="/rail-gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider font-mono transition-transform hover:-translate-y-0.5 shadow-xl"
            >
              <span>Launch 3D Rail Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
