import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { categories, products } from '../data/products';
import BTSLogo from './BTSLogo';

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // Live search lookup
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const hits = products
        .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
        .slice(0, 5);
      setSearchResults(hits);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setSearchQuery('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080808]/90 border-b border-[#f5f2eb]/15">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: ACCESS • BTS TECH */}
          <Link to="/" className="flex items-center gap-3 group text-left">
            <BTSLogo size={32} />
            <div className="flex flex-col">
              <span className="text-[#f5f2eb] text-xl font-black tracking-widest leading-none font-mono">
                ACCESS
              </span>
              <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#9c978b] leading-tight mt-1 font-mono">
                2026 HARDWARE ARCHIVE
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            
            {/* Home Button */}
            <Link
              to="/#home"
              className={`px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive('/')
                  ? 'bg-[#f5f2eb] text-[#080808]'
                  : 'text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416]'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={() => setProductsDropdownOpen(false)}>
              <div className="flex items-center">
                <Link
                  to="/products"
                  className={`px-3 py-2 rounded-l text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive('/products')
                      ? 'text-[#f5f2eb] bg-[#1a1a1c]'
                      : 'text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416]'
                  }`}
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  aria-label="Toggle products menu"
                  className={`px-1.5 py-2 rounded-r text-xs transition-colors ${
                    isActive('/products')
                      ? 'text-[#f5f2eb] bg-[#1a1a1c]'
                      : 'text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416]'
                  }`}
                >
                  <ChevronDown size={13} className={`opacity-60 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0d0d0f] border border-[#f5f2eb]/20 rounded p-2.5 shadow-2xl backdrop-blur-2xl z-50 text-left">
                  <div className="text-[10px] font-bold text-[#9c978b] px-3 py-1.5 uppercase tracking-wider font-mono flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={11} /> Hardware Divisions
                    </span>
                    <Link
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-[9px] text-[#f5f2eb] hover:underline"
                    >
                      All (16)
                    </Link>
                  </div>
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded text-xs font-medium text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#161619] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#636058]">Inspect →</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Offers Button */}
            <Link
              to="/products?sort=discount"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416] transition-colors"
            >
              <span>Offers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            </Link>

            {/* Support Button */}
            <Link
              to="/#faq"
              className="px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416] transition-colors"
            >
              Support
            </Link>

            {/* About Button */}
            <Link
              to="/#about"
              className="px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416] transition-colors"
            >
              About
            </Link>

          </nav>

          {/* Right Header: Search + Vault Button */}
          <div className="flex items-center gap-3">
            
            {/* Search Input */}
            <div ref={searchRef} className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c978b] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search hardware models..."
                  className="w-52 md:w-64 pl-9 pr-4 py-2 bg-[#121214] text-xs font-mono text-[#f5f2eb] placeholder-[#636058] rounded border border-[#f5f2eb]/15 focus:outline-none focus:border-[#f5f2eb] transition-all"
                />
              </form>

              {/* Instant Search Suggestions */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#0d0d0f] border border-[#f5f2eb]/20 rounded p-2.5 shadow-2xl backdrop-blur-2xl z-50 text-left">
                  <div className="text-[10px] font-bold text-[#9c978b] px-3 py-1.5 uppercase tracking-wider font-mono">
                    Matching Hardware Units
                  </div>
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => {
                        setSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-2 rounded hover:bg-[#161619] transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded border border-[#f5f2eb]/10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f2eb] text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[#9c978b] text-[11px] font-mono">₹{p.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="w-9 h-9 rounded flex items-center justify-center text-[#9c978b] hover:text-pink-400 border border-[#f5f2eb]/15 bg-[#121214] hover:bg-[#1a1a1c] transition-colors"
            >
              <Heart size={15} />
            </button>

            {/* Slide-out Vault / Cart Trigger Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Open Hardware Vault"
              className="relative px-3.5 py-2 rounded flex items-center gap-2 border border-[#f5f2eb]/20 bg-[#121214] hover:bg-[#18181c] text-[#f5f2eb] transition-all"
            >
              <ShoppingBag size={15} />
              <span className="text-xs font-bold font-mono uppercase tracking-wider hidden sm:inline">
                Vault
              </span>
              <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-[#f5f2eb] text-[#080808]">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded flex items-center justify-center text-[#9c978b] hover:text-white border border-[#f5f2eb]/15 bg-[#121214]"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#f5f2eb]/15 space-y-3 bg-[#080808] pb-6 text-left">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models..."
                className="w-full px-3 py-2 bg-[#121214] text-xs text-[#f5f2eb] border border-[#f5f2eb]/15 rounded"
              />
            </form>

            <Link
              to="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#f5f2eb] text-xs font-bold uppercase tracking-wider hover:bg-[#121214] rounded"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#9c978b] text-xs font-bold uppercase tracking-wider hover:bg-[#121214] rounded"
            >
              Products
            </Link>
            <Link
              to="/products?sort=discount"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#9c978b] text-xs font-bold uppercase tracking-wider hover:bg-[#121214] rounded"
            >
              Offers
            </Link>
            <Link
              to="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#9c978b] text-xs font-bold uppercase tracking-wider hover:bg-[#121214] rounded"
            >
              Support
            </Link>
            <Link
              to="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#9c978b] text-xs font-bold uppercase tracking-wider hover:bg-[#121214] rounded"
            >
              About
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}
