import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [
    {
      id: 'bts-buds-pro',
      name: 'BTS Buds Pro (Special Edition)',
      category: 'earbuds',
      price: 5999,
      originalPrice: 9999,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=85',
      quantity: 1,
      selectedColor: 'Metallic Bora Purple'
    }
  ],
  isCartOpen: false,
  quickViewProduct: null,
  appliedPromo: null, // { code: 'ACCESS2026', discountPercent: 15 }
  toasts: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1, color } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      let updatedItems;

      if (existing) {
        updatedItems = state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        updatedItems = [
          ...state.items,
          {
            ...product,
            quantity,
            selectedColor: color || (product.colors ? product.colors[0] : 'Default')
          }
        ];
      }

      // Add a toast notification
      const newToast = {
        id: Date.now() + Math.random(),
        message: `Secured to Vault: ${product.name}`,
        meta: {
          image: product.image,
          price: product.price
        }
      };

      return {
        ...state,
        items: updatedItems,
        toasts: [...state.toasts.slice(-4), newToast]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload)
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== id)
        };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i))
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        appliedPromo: null
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen
      };

    case 'SET_QUICK_VIEW':
      return {
        ...state,
        quickViewProduct: action.payload
      };

    case 'APPLY_PROMO':
      return {
        ...state,
        appliedPromo: action.payload
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload)
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Auto-expire toasts after 3.5s
  useEffect(() => {
    if (state.toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: state.toasts[0].id });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toasts]);

  const addToCart = (product, quantity = 1, color) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, color } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const openCart = () => dispatch({ type: 'TOGGLE_CART', payload: true });
  const closeCart = () => dispatch({ type: 'TOGGLE_CART', payload: false });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  const setQuickView = (product) => dispatch({ type: 'SET_QUICK_VIEW', payload: product });

  const applyVoucher = (code) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'ACCESS2026' || cleaned === 'FLAGSHIP15' || cleaned === 'BTS2026') {
      dispatch({ type: 'APPLY_PROMO', payload: { code: cleaned, discountPercent: 15 } });
      return { success: true, message: `Voucher ${cleaned} applied! 15% Vault Discount unlocked.` };
    }
    if (cleaned === 'PRODIGY10' || cleaned === 'VIP10') {
      dispatch({ type: 'APPLY_PROMO', payload: { code: cleaned, discountPercent: 10 } });
      return { success: true, message: `Voucher ${cleaned} applied! 10% Discount unlocked.` };
    }
    return { success: false, message: 'Invalid or expired allocation code.' };
  };

  const removeToast = (id) => dispatch({ type: 'REMOVE_TOAST', payload: id });

  // Calculations
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const discountSavings = state.items.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + (orig - item.price) * item.quantity;
  }, 0);

  const promoDiscount = state.appliedPromo
    ? Math.round((subtotal * state.appliedPromo.discountPercent) / 100)
    : 0;

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - promoDiscount + shipping);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isCartOpen: state.isCartOpen,
        quickViewProduct: state.quickViewProduct,
        appliedPromo: state.appliedPromo,
        toasts: state.toasts,
        totalItems,
        subtotal,
        discountSavings,
        promoDiscount,
        shipping,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        setQuickView,
        applyVoucher,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
