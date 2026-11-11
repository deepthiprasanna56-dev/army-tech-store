import { X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#121214] border border-[#f5f2eb]/20 p-3.5 shadow-2xl flex items-center gap-3 text-xs text-[#f5f2eb] rounded-lg animate-fade-in"
        >
          <div className="p-1 border border-[#f5f2eb]/30 text-emerald-400 bg-emerald-950/40 rounded">
            <Check size={13} />
          </div>

          {toast.meta?.image && (
            <img
              src={toast.meta.image}
              alt="Hardware Thumbnail"
              className="w-9 h-9 object-cover bg-[#080808] p-0.5 border border-[#f5f2eb]/15 shrink-0 rounded"
            />
          )}

          <div className="flex-1 min-w-0 font-medium truncate text-left">
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9c978b] hover:text-[#f5f2eb] p-1 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
