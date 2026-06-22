import { useState, useMemo } from 'react';
import { useAppStore } from '@/store';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIES } from '@/data';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { motion } from 'framer-motion';

export function Catalog() {
  const products = useAppStore((state) => state.products);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
    }

    return result.sort((a, b) => {
      if (sortKey === 'price-low') return (a.salePrice || a.price) - (b.salePrice || b.price);
      if (sortKey === 'price-high') return (b.salePrice || b.price) - (a.salePrice || a.price);
      if (sortKey === 'rating') return b.rating - a.rating;
      // newest (mocked by date string comparison)
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
  }, [products, activeCategory, searchQuery, sortKey]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Digital <span className="text-gradient">Marketplace</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Browse our collection of premium themes, templates, UI kits, and plugins built by world-class developers.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <GlassPanel className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" /> Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category 
                        ? 'bg-cyan-500/20 text-cyan-400 font-medium' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Sort By
            </h3>
            <div className="space-y-3 font-medium text-sm">
              <label className="flex items-center gap-3 text-slate-300 cursor-pointer group">
                <input type="radio" name="sort" checked={sortKey === 'newest'} onChange={() => setSortKey('newest')} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                <span className="group-hover:text-white transition-colors">Newest Arrivals</span>
              </label>
              <label className="flex items-center gap-3 text-slate-300 cursor-pointer group">
                <input type="radio" name="sort" checked={sortKey === 'price-low'} onChange={() => setSortKey('price-low')} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                <span className="group-hover:text-white transition-colors">Price: Low to High</span>
              </label>
              <label className="flex items-center gap-3 text-slate-300 cursor-pointer group">
                <input type="radio" name="sort" checked={sortKey === 'price-high'} onChange={() => setSortKey('price-high')} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                <span className="group-hover:text-white transition-colors">Price: High to Low</span>
              </label>
              <label className="flex items-center gap-3 text-slate-300 cursor-pointer group">
                <input type="radio" name="sort" checked={sortKey === 'rating'} onChange={() => setSortKey('rating')} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                <span className="group-hover:text-white transition-colors">Highest Rated</span>
              </label>
            </div>
          </GlassPanel>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          {/* Search bar inside content area mobile-first view */}
          <div className="mb-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search UI kits, templates, wireframes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 backdrop-blur-md transition-all placeholder:text-slate-500 shadow-xl"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <GlassPanel className="p-12 text-center">
              <p className="text-slate-400 mb-2">No products found matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                Clear all filters
              </button>
            </GlassPanel>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
