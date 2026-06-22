import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '@/store';
import { ArrowLeft, ShoppingCart, Star, Share2, Check, Clock, Code, FileText, DownloadCloud } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { motion } from 'framer-motion';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = useAppStore(state => state.products.find(p => p.id === id));
  const { addToCart, cart } = useAppStore();

  if (!product) {
    return <div className="pt-32 text-center text-slate-400">Product not found.</div>;
  }

  const inCart = cart.some(item => item.product.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Gallery / Left Side */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-2">
            <img 
              src={product.thumbnail} 
              alt={product.name} 
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
          </GlassPanel>
          
          <GlassPanel className="p-8">
            <h2 className="text-xl font-bold text-white mb-6">Product Description</h2>
            <div className="prose prose-invert prose-blue max-w-none">
              <p className="text-slate-300 leading-relaxed text-lg mb-6">{product.shortDescription}</p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Build beautiful apps faster with this curated collection of high-quality interface elements. Meticulously crafted for modern web applications using the latest standards in design and development.
              </p>
              
              <h3 className="text-white font-semibold text-lg mt-8 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </div>

        {/* Info / Right Side */}
        <div className="lg:col-span-2 space-y-6">
          <GlassPanel className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-white/10 text-slate-300 text-xs font-semibold rounded-md border border-white/10 uppercase tracking-wider">
                {product.category}
              </span>
              <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-8">
              <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-4 h-4" />
                Latest Version
              </div>
            </div>

            <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
              {product.salePrice ? (
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-bold text-gradient">${product.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-slate-500 line-through mb-1">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <div className="text-4xl font-bold text-gradient mb-1">${product.price.toFixed(2)}</div>
              )}
              <p className="text-xs text-slate-500">One-time payment. Free lifetime updates.</p>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
                inCart 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </>
              )}
            </button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="text-slate-200 font-semibold mb-4">File Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" /> Last Updated
                </span>
                <span className="text-slate-200 font-medium">{product.lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <Code className="w-4 h-4" /> Version
                </span>
                <span className="text-slate-200 font-medium">{product.version}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <FileText className="w-4 h-4" /> License
                </span>
                <span className="text-slate-200 font-medium">Standard</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-400">
                  <DownloadCloud className="w-4 h-4" /> File Size
                </span>
                <span className="text-slate-200 font-medium">{product.fileSize}</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
