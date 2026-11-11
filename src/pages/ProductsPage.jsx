import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Archival Priority' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Evaluation Score' },
  { value: 'discount', label: 'Allocation Discount' },
  { value: 'name', label: 'Model Designation' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'featured';
  const searchQuery = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const [priceMax, setPriceMax] = useState(400000);

  const updateParam = (key, val) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (val && val !== 'all') {
        p.set(key, val);
      } else {
        p.delete(key);
      }
      return p;
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', localSearch.trim());
  };

  const resetFilters = () => {
    setSearchParams({});
    setLocalSearch('');
    setPriceMax(400000);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (currentCategory && currentCategory !== 'all') {
      result = result.filter((p) => p.category === currentCategory);
    }

    // Filter by Search Query
    const effectiveSearch = (searchQuery || localSearch).trim().toLowerCase();
    if (effectiveSearch) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(effectiveSearch) ||
          p.category.toLowerCase().includes(effectiveSearch) ||
          p.description?.toLowerCase().includes(effectiveSearch)
      );
    }

    // Filter by Price Range
    result = result.filter((p) => p.price <= priceMax);

    // Sort
    switch (currentSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
    }

    return result;
  }, [currentCategory, searchQuery, localSearch, priceMax, currentSort]);

  const activeCategoryName = categories.find((c) => c.id === currentCategory)?.name || 'All Hardware';
  const hasActiveFilters = currentCategory !== 'all' || searchQuery || priceMax < 400000 || currentSort !== 'featured';

  return (
    <div className="min-h-screen text-[#f5f2eb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#f5f2eb]/15 pb-6 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c978b] block">
              HARDWARE VAULT CATALOG • 2026 ARCHIVE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#f5f2eb] tracking-tight">
              {activeCategoryName} <span className="text-sm font-normal text-[#9c978b] font-mono">({filteredProducts.length} models)</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#9c978b]">
              Factory-sealed flagship electronics engineered with cryptographic authenticity.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#f5f2eb]/20 hover:border-[#f5f2eb] text-xs font-mono text-[#f5f2eb] transition-all rounded"
            >
              <RotateCcw size={12} />
              <span>Reset Archive</span>
            </button>
          )}
        </div>

        {/* Controls: Search, Sort, Drawer */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Live Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c978b] pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Filter by keyword, chip, or model..."
              className="w-full pl-9 pr-9 py-2 bg-[#121214] text-xs font-mono text-[#f5f2eb] placeholder-[#636058] rounded border border-[#f5f2eb]/15 focus:outline-none focus:border-[#f5f2eb]"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  updateParam('search', '');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c978b] hover:text-[#f5f2eb]"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Sort & Filter Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="w-full sm:w-auto appearance-none pl-3.5 pr-8 py-2 bg-[#121214] text-xs font-mono text-[#f5f2eb] rounded border border-[#f5f2eb]/15 focus:outline-none focus:border-[#f5f2eb] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0c0c0e] text-[#f5f2eb]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c978b] pointer-events-none" />
            </div>

            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#121214] border border-[#f5f2eb]/15 rounded text-xs font-mono text-[#9c978b]"
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-[#0c0c0e] border border-[#f5f2eb]/15 rounded-xl p-5 text-left sticky top-28">
            
            {/* Division Categories */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9c978b]">
                Hardware Division
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateParam('category', cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all ${
                      currentCategory === cat.id
                        ? 'bg-[#f5f2eb] text-[#080808] font-bold'
                        : 'text-[#9c978b] hover:text-[#f5f2eb] hover:bg-[#141416]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    {currentCategory === cat.id && (
                      <span className="text-[10px] font-mono">SELECTED</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-4 border-t border-[#f5f2eb]/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase tracking-wider text-[#9c978b] font-bold">
                  Max Settlement
                </span>
                <span className="font-bold text-[#f5f2eb]">
                  ₹{priceMax.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min={5000}
                max={400000}
                step={5000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#636058]">
                <span>₹5,000</span>
                <span>₹400,000</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-4 border-t border-[#f5f2eb]/10 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9c978b] block">
                Quick Ceiling
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: '< ₹10k', val: 10000 },
                  { label: '< ₹50k', val: 50000 },
                  { label: '< ₹1L', val: 100000 },
                  { label: 'All', val: 400000 },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPriceMax(p.val)}
                    className={`px-2.5 py-1 text-[11px] font-mono border rounded ${
                      priceMax === p.val
                        ? 'bg-[#f5f2eb] text-[#080808] border-[#f5f2eb] font-bold'
                        : 'bg-[#121214] text-[#9c978b] border-[#f5f2eb]/15 hover:text-[#f5f2eb]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid (9 Cols) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl bg-[#0c0c0e] border border-[#f5f2eb]/15 p-12 text-center space-y-4">
                <div className="text-3xl font-mono text-[#9c978b]">∅</div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#f5f2eb]">
                  No Matching Models Found
                </h3>
                <p className="text-xs text-[#9c978b] max-w-sm mx-auto">
                  Adjust your search parameters, ceiling budget, or select another hardware division.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-widest rounded"
                >
                  Clear Archive Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}
