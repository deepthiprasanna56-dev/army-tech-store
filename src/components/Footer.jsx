import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BTSLogo from './BTSLogo';
import { categories } from '../data/products';

export default function Footer() {
  const departments = categories.filter((category) => category.id !== 'all');

  return (
    <footer className="mt-14 border-t border-[#292825] bg-[#080808] px-4 pb-6 pt-10 text-[#aaa79f] sm:px-6 sm:pt-14 lg:px-10">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-10 border-b border-[#292825] pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="BTS Electronics home">
              <BTSLogo size={34} />
              <span className="text-left">
                <span className="block text-lg font-bold tracking-[0.16em] text-[#f5f2eb]">BTS</span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#817e76]">Tech beyond limits</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-[#817e76]">
              Explore the BTS signature electronics collection, from personal audio to connected devices and accessories.
            </p>
            <Link to="/products" className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#dedbd3] hover:text-white">
              Browse the collection <ArrowUpRight size={13} />
            </Link>
          </div>

          <nav aria-label="Shop departments">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0eee8]">Departments</h2>
            <ul className="space-y-3">
              {departments.map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Customer support">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0eee8]">Help & support</h2>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">Product catalog</Link></li>
              <li><Link to="/products?sort=discount" className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">Offers</Link></li>
              <li><Link to="/#faq" className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">Frequently asked questions</Link></li>
              <li><Link to="/#about" className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">About BTS Electronics</Link></li>
              <li><Link to="/cart" className="text-sm text-[#817e76] transition-colors hover:text-[#f5f2eb]">Your cart</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0eee8]">The archive</h2>
            <p className="text-sm leading-6 text-[#817e76]">A considered edit of everyday technology, selected for design, sound, and performance.</p>
            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#aaa79f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8c4ba]" />
              Secure checkout · Fast delivery
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-[10px] tracking-wide text-[#68665f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BTS Electronics. All rights reserved.</p>
          <p>Designed for the BTS signature collection.</p>
        </div>
      </div>
    </footer>
  );
}
