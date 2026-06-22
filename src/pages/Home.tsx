import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { ProductCard } from '@/components/ProductCard';

export function Home() {
  const products = useAppStore((state) => state.products);
  const featured = products.filter(p => p.isFeatured).slice(0, 3);
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Premium Digital Assets</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Elevate Your <span className="text-gradient">Digital Products</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover thousands of high-quality React templates, UI kits, backend APIs, and wireframes to accelerate your design and development workflow.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
            >
              Explore Catalog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-button text-white font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Zap strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Instant Delivery</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Secure downloads are generated instantly after payment confirmation.</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Shield strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-slate-400 leading-relaxed">256-bit encrypted checkout handling with reliable fraud protection.</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Star strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Verified Quality</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Every item goes through a rigorous quality control check by our staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 md:px-8 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                Featured Assets
              </h2>
              <p className="text-slate-400">Hand-picked premium items of the week.</p>
            </div>
            <Link to="/products" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors group hidden sm:flex">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-4 md:px-8 py-10 bg-[#020617]/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Currently Trending</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
