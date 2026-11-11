import { useState } from 'react';
import { X, Star, ShoppingCart, Shield, Truck, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickView, addToCart, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    const color = quickViewProduct.colors ? quickViewProduct.colors[selectedColor] : 'Default';
    addToCart(quickViewProduct, qty, color);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickView(null);
    }, 900);
  };

  const handleInstantBuy = () => {
    const color = quickViewProduct.colors ? quickViewProduct.colors[selectedColor] : 'Default';
    addToCart(quickViewProduct, qty, color);
    setQuickView(null);
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickView(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl bg-[#0c0c0e] border border-[#f5f2eb]/20 rounded-2xl shadow-2xl overflow-hidden text-left my-auto animate-fade-in text-[#f5f2eb]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#161619] border border-[#f5f2eb]/20 flex items-center justify-center text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#202024] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#121214] border border-[#f5f2eb]/15 flex items-center justify-center p-4">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {quickViewProduct.discount > 0 && (
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#f5f2eb] text-[#080808] text-[10px] font-bold font-mono uppercase tracking-wider rounded">
                  -{quickViewProduct.discount}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#9c978b]">
              <div className="p-2 border border-[#f5f2eb]/10 bg-[#121214] flex items-center gap-2 rounded">
                <Shield size={14} className="text-[#f5f2eb]" />
                <span>2-Year Warranty</span>
              </div>
              <div className="p-2 border border-[#f5f2eb]/10 bg-[#121214] flex items-center gap-2 rounded">
                <Truck size={14} className="text-[#f5f2eb]" />
                <span>Priority Air</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Specs */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
                {quickViewProduct.category} • 2026 ARCHIVE
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-[#f5f2eb] leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <div className="flex items-center text-yellow-400">
                  <Star size={13} className="fill-yellow-400" />
                  <span className="ml-1 font-bold">{quickViewProduct.rating}</span>
                </div>
                <span className="text-[#636058] font-mono">
                  ({quickViewProduct.reviewCount?.toLocaleString()} verified evaluations)
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-bold font-mono text-[#f5f2eb]">
                  ₹{quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-xs text-[#636058] font-mono line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#9c978b] leading-relaxed pt-1">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Colors */}
            {quickViewProduct.colors && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9c978b] font-semibold block">
                  Select Finish
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.colors.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(i)}
                      className={`px-2.5 py-1 text-xs border rounded transition-colors ${
                        selectedColor === i
                          ? 'border-[#f5f2eb] bg-[#f5f2eb] text-[#080808] font-bold'
                          : 'border-[#f5f2eb]/20 text-[#9c978b] hover:text-[#f5f2eb]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#9c978b]">Qty:</span>
                <div className="flex items-center border border-[#f5f2eb]/20 rounded">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-xs hover:bg-[#1a1a1c]"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs font-bold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#1a1a1c]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded transition-all"
                >
                  {added ? (
                    <>
                      <Check size={14} />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} />
                      <span>Stage in Vault</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="px-4 py-3 border border-[#f5f2eb]/30 hover:border-[#f5f2eb] text-[#f5f2eb] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded transition-all"
                >
                  <Zap size={14} />
                  <span>Instant</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
