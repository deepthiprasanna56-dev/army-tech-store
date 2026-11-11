import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import BTSLogo from './BTSLogo';

export default function ProductCard({ product }) {
  const { addToCart, setQuickView } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(product);
  };

  const formattedReviews = product.reviewCount >= 1000 
    ? `${(product.reviewCount / 1000).toFixed(0)}k+` 
    : product.reviewCount;

  return (
    <div className="group relative rounded-xl bg-[#0d0d0f] hover:bg-[#141417] border border-[#f5f2eb]/15 hover:border-[#f5f2eb]/40 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] hover:-translate-y-1 text-left text-[#f5f2eb]">
      
      {/* Top Bar: Badge & Action Buttons */}
      <div className="flex items-center justify-between mb-2 z-10">
        <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1c1c20] text-[#9c978b] border border-[#f5f2eb]/10 rounded">
          {product.badge || `-${product.discount}%`}
        </span>

        <div className="flex items-center gap-1.5">
          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            aria-label="Quick View"
            title="Inspect Hardware Specs"
            className="w-7 h-7 rounded flex items-center justify-center text-[#9c978b] hover:text-[#f5f2eb] bg-[#161619] hover:bg-[#202024] border border-[#f5f2eb]/10 transition-colors"
          >
            <Eye size={13} />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label="Add to Wishlist"
            className="w-7 h-7 rounded flex items-center justify-center text-[#9c978b] hover:text-pink-400 bg-[#161619] hover:bg-[#202024] border border-[#f5f2eb]/10 transition-colors"
          >
            <Heart
              size={13}
              className={isWishlisted ? 'fill-pink-500 text-pink-500' : ''}
            />
          </button>
        </div>
      </div>

      {/* Product Image Clickable to Detail */}
      <Link
        to={`/product/${product.id}`}
        className="block relative w-full h-40 sm:h-44 overflow-hidden rounded-lg bg-[#121214] my-1 flex items-center justify-center border border-[#f5f2eb]/10"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Micro Tag on Image */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#080808]/90 px-1.5 py-0.5 rounded border border-[#f5f2eb]/20 opacity-80 group-hover:opacity-100 transition-opacity">
          <BTSLogo size={10} />
          <span className="text-[8px] font-mono font-bold text-[#f5f2eb]">OEM CERTIFIED</span>
        </div>
      </Link>

      {/* Info Section */}
      <div className="mt-2 text-left space-y-1">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#9c978b] block truncate">
          {product.category} • {product.edition || '2026 ARCHIVE'}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="block text-[#f5f2eb] text-sm font-bold truncate hover:text-white transition-colors"
        >
          {product.name}
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 text-xs">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-yellow-400 text-[11px]">{product.rating}</span>
          <span className="text-[#636058] text-[10px] font-mono">({formattedReviews})</span>
        </div>

        {/* Pricing Row matching access-self */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-[#f5f2eb] text-base font-bold font-mono tracking-tight">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[#636058] text-xs font-mono line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: Add To Cart & Quick View */}
      <div className="mt-3 pt-1 flex gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-2 px-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-[#f5f2eb] hover:bg-white text-[#080808]'
          }`}
        >
          {added ? (
            <>✓ Staged</>
          ) : (
            <>
              <ShoppingCart size={13} />
              <span>Add to Vault</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleQuickView}
          className="px-2.5 py-2 rounded bg-[#161619] hover:bg-[#202024] border border-[#f5f2eb]/20 text-[#9c978b] hover:text-[#f5f2eb] transition-colors"
          title="Quick Inspect"
        >
          <Eye size={13} />
        </button>
      </div>

    </div>
  );
}
