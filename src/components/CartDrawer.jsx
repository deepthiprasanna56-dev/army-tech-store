import { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    promoDiscount,
    appliedPromo,
    shipping,
    grandTotal,
    applyVoucher,
    clearCart,
  } = useCart();

  const [code, setCode] = useState('');
  const [voucherMsg, setVoucherMsg] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('apple'); // 'apple' | 'card' | 'crypto'
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    zip: ''
  });

  if (!isCartOpen) return null;

  const handleVoucher = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const res = applyVoucher(code);
    setVoucherMsg(res);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-full max-w-lg bg-[#0c0c0e] border-l border-[#f5f2eb]/15 flex flex-col h-full text-[#f5f2eb] shadow-2xl overflow-hidden text-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#f5f2eb]/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-[#9c978b] font-mono">
              SECURE SESSION • 2026 ARCHIVE
            </span>
            <h2 className="text-lg font-bold text-[#f5f2eb] tracking-wide">
              Hardware Vault <span className="text-sm font-normal text-[#9c978b]">({totalItems})</span>
            </h2>
          </div>

          <button
            onClick={closeCart}
            className="p-2 text-[#9c978b] hover:text-[#f5f2eb] border border-[#f5f2eb]/10 hover:border-[#f5f2eb]/30 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#f5f2eb]">Allocation Authorized</h3>
            <p className="text-xs text-[#9c978b] max-w-xs leading-relaxed">
              Order #ACS-{Math.floor(100000 + Math.random() * 900000)} has been dispatched to Priority Air handling. A cryptographic manifest has been sent to your email.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                closeCart();
              }}
              className="px-6 py-2.5 bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Close Manifest
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="text-3xl text-[#9c978b]">∅</div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-[#9c978b]">
              Vault Empty
            </h3>
            <p className="text-xs text-[#636058] max-w-xs">
              No hardware units staged for authorization. Browse the archive to select models.
            </p>
            <button
              onClick={closeCart}
              className="px-5 py-2 border border-[#f5f2eb]/20 hover:border-[#f5f2eb] text-xs font-bold uppercase tracking-wider text-[#f5f2eb] transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Items List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#121214] border border-[#f5f2eb]/10 flex gap-3.5 items-start rounded"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover bg-[#080808] border border-[#f5f2eb]/15 shrink-0 rounded"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#f5f2eb] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#636058] hover:text-red-400 p-0.5"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="text-[10px] text-[#9c978b]">
                      Finish: <span className="text-[#f5f2eb]">{item.selectedColor || 'Default'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-[#f5f2eb]/20 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#1a1a1c]"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-[11px] font-bold text-[#f5f2eb]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#1a1a1c]"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-[#f5f2eb]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher Code Form */}
            <div className="p-3 bg-[#121214] border border-[#f5f2eb]/10 space-y-2 rounded">
              <label className="text-[10px] uppercase tracking-wider text-[#9c978b] font-semibold flex items-center gap-1.5">
                <Tag size={12} />
                <span>Vault Allocation Code</span>
              </label>

              <form onSubmit={handleVoucher} className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. ACCESS2026 or BTS2026"
                  className="flex-1 px-3 py-1.5 bg-[#080808] border border-[#f5f2eb]/20 text-xs font-mono text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#f5f2eb] hover:bg-white text-[#080808] text-xs font-bold uppercase tracking-wider transition-colors rounded"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-400 font-mono">
                  ✓ {appliedPromo.code} Applied (-{appliedPromo.discountPercent}% Vault Privilege)
                </div>
              )}
              {voucherMsg && !voucherMsg.success && (
                <div className="text-[11px] text-red-400">
                  {voucherMsg.message}
                </div>
              )}
            </div>

            {/* Payment Method Selector matching access-self */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#9c978b] font-semibold block">
                Settlement Rail
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'apple', label: ' Apple Pay' },
                  { id: 'card', label: 'Credit Card' },
                  { id: 'crypto', label: 'Crypto USDC' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`py-2 px-2 text-[11px] font-semibold border rounded transition-colors text-center ${
                      paymentMethod === m.id
                        ? 'border-[#f5f2eb] bg-[#f5f2eb] text-[#080808]'
                        : 'border-[#f5f2eb]/15 bg-[#121214] text-[#9c978b] hover:text-[#f5f2eb]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Dispatch Form */}
            <form id="vault-checkout-form" onSubmit={handleCheckout} className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#9c978b] font-semibold block">
                Delivery Destination
              </span>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/15 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/15 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none rounded"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="col-span-2 px-3 py-2 bg-[#080808] border border-[#f5f2eb]/15 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none rounded"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  required
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="px-3 py-2 bg-[#080808] border border-[#f5f2eb]/15 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none rounded"
                />
              </div>
            </form>

            {/* Summary Breakdown */}
            <div className="pt-3 border-t border-[#f5f2eb]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#9c978b]">
                <span>Vault Allocation Subtotal</span>
                <span className="font-mono text-[#f5f2eb]">₹{subtotal.toLocaleString()}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-mono">
                  <span>Vault Code (-{appliedPromo?.discountPercent}%)</span>
                  <span>-₹{promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[#9c978b]">
                <span>Priority Air Logistics</span>
                <span className="text-emerald-400 uppercase text-[10px] font-bold">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Drawer Footer with Authorize Action */}
        {!orderComplete && items.length > 0 && (
          <div className="p-5 border-t border-[#f5f2eb]/15 bg-[#09090b] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#9c978b] block font-mono">
                Total Settlement
              </span>
              <span className="text-xl font-bold font-mono text-[#f5f2eb]">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              form="vault-checkout-form"
              type="submit"
              disabled={isAuthorizing}
              className="flex-1 max-w-xs py-3.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isAuthorizing ? (
                <span>Authorizing...</span>
              ) : (
                <>
                  <span>Authorize Order</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
