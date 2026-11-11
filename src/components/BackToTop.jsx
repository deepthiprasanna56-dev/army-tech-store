import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 bg-[#121214] hover:bg-[#f5f2eb] border border-[#f5f2eb]/20 hover:border-[#f5f2eb] text-[#f5f2eb] hover:text-[#080808] transition-all duration-300 shadow-2xl flex items-center gap-2 group rounded"
    >
      <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
      <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline font-mono">
        Top
      </span>
    </button>
  );
}
