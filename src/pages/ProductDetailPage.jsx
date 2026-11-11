import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Heart, ArrowLeft, Shield, Truck, RotateCcw, Zap, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const product = products.find((p) => p.id === id || p.id === Number(id)) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const color = product.colors ? product.colors[selectedColor] : 'Default';
    addToCart(product, quantity, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleInstantBuy = () => {
    const color = product.colors ? product.colors[selectedColor] : 'Default';
    addToCart(product, quantity, color);
    openCart();
  };

  const formattedReviews = product.reviewCount >= 1000 
    ? `${(product.reviewCount / 1000).toFixed(0)}k+` 
    : product.reviewCount;

  return (
    <div className="min-h-screen text-[#f5f2eb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#9c978b] text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 hover:text-[#f5f2eb] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return</span>
          </button>
          <span>/</span>
          <Link to="/products" className="hover:text-[#f5f2eb] transition-colors">Catalog</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-[#f5f2eb] capitalize transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#f5f2eb] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Details Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Product Imagery (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-xl bg-[#0d0d0f] border border-[#f5f2eb]/15 p-6 flex items-center justify-center overflow-hidden">
              
              {/* Badges on top */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                {product.discount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-bold font-mono bg-[#f5f2eb] text-[#080808] rounded">
                    -{product.discount}% VAULT
                  </span>
                )}
                {product.badge && (
                  <span className="px-2.5 py-1 text-xs font-mono font-bold text-[#9c978b] bg-[#161619] border border-[#f5f2eb]/15 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded bg-[#161619] border border-[#f5f2eb]/15 flex items-center justify-center text-[#9c978b] hover:text-pink-400 transition-colors"
              >
                <Heart size={15} className={wishlisted ? 'fill-pink-500 text-pink-500' : ''} />
              </button>

              {/* Product Image */}
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

            </div>

            {/* Hardware Guarantees */}
            <div className="grid grid-cols-3 gap-3 text-left">
              {[
                { icon: Shield, title: '2-Year OEM Care', sub: 'Zero-deductible exchange' },
                { icon: Truck, title: 'Priority Air', sub: 'Tamper-evident transit' },
                { icon: RotateCcw, title: 'Evaluation Period', sub: '30 days zero restock' },
              ].map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="p-3.5 rounded bg-[#0d0d0f] border border-[#f5f2eb]/15 space-y-1"
                >
                  <Icon size={16} className="text-[#f5f2eb]" />
                  <div className="text-xs font-bold font-mono uppercase text-[#f5f2eb]">{title}</div>
                  <div className="text-[10px] text-[#9c978b] leading-tight font-mono">{sub}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Specs & Purchasing (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
                {product.category} • {product.edition || '2026 ARCHIVE HARDWARE'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#f5f2eb] tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-yellow-400">
                  <Star size={15} className="fill-yellow-400" />
                  <span className="font-bold text-xs ml-1 font-mono">{product.rating}</span>
                </div>
                <span className="text-[#636058] text-xs font-mono">({formattedReviews} verified cryptographic reviews)</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded bg-[#121214] border border-[#f5f2eb]/15 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#f5f2eb] font-mono tracking-tight">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm font-semibold text-[#636058] font-mono line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 ml-auto">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-[#9c978b] leading-relaxed">
              {product.description}
            </p>

            {/* Finish Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#9c978b]">
                  Selected Finish: <span className="text-[#f5f2eb] font-bold">{product.colors[selectedColor]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(idx)}
                      className={`px-3.5 py-1.5 rounded text-xs font-mono border transition-all ${
                        selectedColor === idx
                          ? 'bg-[#f5f2eb] text-[#080808] border-[#f5f2eb] font-bold'
                          : 'bg-[#121214] text-[#9c978b] border-[#f5f2eb]/15 hover:text-[#f5f2eb]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9c978b]">
                  Staged Quantity:
                </span>
                <div className="flex items-center border border-[#f5f2eb]/20 rounded bg-[#121214]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm text-[#9c978b] hover:text-[#f5f2eb]"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs font-bold text-[#f5f2eb]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-sm text-[#9c978b] hover:text-[#f5f2eb]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#f5f2eb] hover:bg-white text-[#080808]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Staged in Vault</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      <span>Add to Vault</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="flex-1 py-3.5 px-6 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 bg-[#121214] hover:bg-[#18181c] text-[#f5f2eb] border border-[#f5f2eb]/20 transition-all"
                >
                  <Zap size={15} />
                  <span>Instant Authorization</span>
                </button>
              </div>

            </div>

            {/* Technical Specifications */}
            {product.specs && (
              <div className="pt-6 border-t border-[#f5f2eb]/15 space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#f5f2eb] uppercase tracking-wider">
                  Technical Specifications Manifest
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div
                      key={label}
                      className="p-2.5 rounded bg-[#0d0d0f] border border-[#f5f2eb]/10 flex flex-col justify-center"
                    >
                      <span className="text-[10px] font-mono text-[#9c978b]">{label}</span>
                      <span className="text-[#f5f2eb] font-medium mt-0.5">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Models */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-[#f5f2eb]/15 space-y-6 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#f5f2eb] tracking-tight">
              Related Hardware Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
