import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Zap, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalSavings, clearCart, totalItems } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'V7VIP' || code === 'VIOLET7' || code === 'TECH50') {
      const discountVal = Math.round(totalPrice * 0.1); // 10% extra promo discount
      setCouponDiscount(discountVal);
      setCouponMsg({ type: 'success', text: `Coupon ${code} applied: Extra ₹${discountVal.toLocaleString()} Saved!` });
    } else {
      setCouponDiscount(0);
      setCouponMsg({ type: 'error', text: 'Invalid promo code. Try "V7VIP"' });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center text-purple-100">
        <div className="max-w-md w-full space-y-6 bg-[#0f0720]/80 border border-purple-800/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-950/60 border border-purple-700/50 flex items-center justify-center text-purple-400">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
            <p className="text-sm text-purple-300/60">
              Looks like you haven't added any VIOLET7 devices yet. Explore our latest flagship arrivals!
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white glow-btn"
          >
            <span>Start Shopping</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 999;
  const shippingFee = totalPrice >= freeShippingThreshold ? 0 : 99;
  const grandTotal = Math.max(0, totalPrice - couponDiscount + shippingFee);

  return (
    <div className="min-h-screen text-purple-100 py-8 sm:py-10 px-3 sm:px-4 lg:px-5">
      <div className="w-full space-y-6 sm:space-y-8">
        
        {/* Cart Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-6 text-left">
          <div className="space-y-1">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.2em] block">
              CHECKOUT PIPELINE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Your Cart <span className="text-purple-400 font-light">({totalItems} items)</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Continue Shopping</span>
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-red-400/80 hover:text-red-300 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Layout: Items (7 cols) + Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0f0720]/80 border border-purple-800/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md transition-all hover:border-purple-600/50"
              >
                {/* Product Thumbnail */}
                <Link
                  to={`/product/${item.id}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#140628] shrink-0 border border-purple-800/40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 text-left space-y-1.5 w-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-white text-base font-bold hover:text-purple-300 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-purple-400/60 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold text-sm sm:text-base">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-purple-400/60 text-xs line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Quantity Modifier & Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-full bg-[#140628] border border-purple-800/50 p-0.5">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-purple-400/60 block">Item Total</span>
                      <span className="text-white font-mono font-bold text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Coupon (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Coupon Code Box matching Reference screenshot */}
            <div className="rounded-2xl bg-[#0f0720]/80 border border-purple-800/30 p-5 space-y-3 text-left">
              <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag size={14} className="text-purple-400" />
                Have a Promo Code?
              </label>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code (e.g. V7VIP)"
                  className="flex-1 px-4 py-2 bg-[#140628] text-xs text-purple-100 placeholder-purple-400/50 rounded-full border border-purple-800/50 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold text-white bg-purple-900 hover:bg-purple-700 border border-purple-500/50 transition-all"
                >
                  Apply
                </button>
              </form>

              {couponMsg && (
                <p className={`text-xs font-semibold ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="rounded-3xl bg-[#0f0720]/80 border border-purple-800/30 p-6 space-y-6 text-left shadow-2xl">
              <h2 className="text-lg font-black text-white tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-purple-200/80">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-white">₹{totalPrice.toLocaleString()}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Catalog Discount</span>
                    <span className="font-mono font-bold">-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-pink-400 font-semibold">
                    <span>Promo Code (V7VIP)</span>
                    <span className="font-mono font-bold">-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-purple-200/80">
                  <span>Shipping Fee</span>
                  <span className="font-mono font-bold text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 uppercase font-sans text-xs">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-purple-900/40 flex justify-between items-baseline">
                  <span className="text-base font-bold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white font-mono tracking-tight block">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-purple-400/60">Inclusive of all applicable taxes</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => window.alert(`Checkout is a demo in this storefront. Your cart total is ₹${grandTotal.toLocaleString()}. No payment has been taken.`)}
                className="w-full py-3.5 rounded-full font-bold text-sm tracking-wide text-white glow-btn flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              {/* Secure Trust Guarantee */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-purple-400/60 font-medium">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>256-Bit Encrypted Quantum Payment Gateway</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
