import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import ToastContainer from './components/ToastContainer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Auto scroll-to-top on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeen = sessionStorage.getItem('access_intro_seen');
    return !hasSeen;
  });

  const handleFinishIntro = () => {
    sessionStorage.setItem('access_intro_seen', 'true');
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        {/* Cinematic Intro Screen */}
        {showIntro && <IntroScreen onFinish={handleFinishIntro} />}

        <div className="min-h-screen flex flex-col bg-[#080808] text-[#f5f2eb] relative font-outfit selection:bg-[#f5f2eb] selection:text-[#080808]">
          <ScrollToTop />
          
          {/* Main Top Navigation */}
          <Navbar />
          
          {/* Global Modals & Drawers matching access-self */}
          <CartDrawer />
          <QuickViewModal />
          <ToastContainer />
          <BackToTop />

          {/* Main Route View */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
                    <div className="text-6xl font-black font-mono text-[#9c978b]/40">404</div>
                    <h1 className="text-2xl font-bold text-[#f5f2eb]">Hardware Record Not Found</h1>
                    <p className="text-xs text-[#9c978b] max-w-sm font-mono">
                      The requested cryptographic archive address does not exist.
                    </p>
                    <a
                      href="/"
                      className="px-6 py-2.5 bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-widest rounded"
                    >
                      Return to Archive
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
