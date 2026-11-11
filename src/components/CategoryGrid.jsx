import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoryGrid() {
  const hardwareCategories = categories.filter((c) => c.id !== 'all');

  return (
    <section id="catalog" className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="w-full">
        <div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">EXPLORE THE COLLECTION</p><h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#f1efe8]">Shop by category</h2></div><Link to="/products" className="text-[10px] uppercase tracking-[0.15em] text-[#aaa69b] hover:text-white">View all →</Link></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {hardwareCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="category-card group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Hardware Thumbnail with Purple Ambient Backlight */}
              <div className="category-image w-full h-16 sm:h-20 rounded-lg overflow-hidden flex items-center justify-center p-1 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Title label */}
              <div className="mt-2.5 text-center">
                <span className="text-[#eeeae1] text-xs sm:text-sm font-medium tracking-wide group-hover:text-white transition-colors block">
                  {cat.name}
                </span>
                <span className="text-[10px] text-purple-400/60 font-medium hidden sm:block truncate">
                  {cat.tagline}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
