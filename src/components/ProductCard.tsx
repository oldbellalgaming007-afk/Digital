import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Download, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useAppStore } from '@/store';
import { GlassPanel } from './GlassPanel';
import { cn } from '@/lib/utils';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useAppStore();

  return (
    <GlassPanel delay={index * 0.1} className="group flex flex-col h-full rounded-2xl group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(34,211,238,0.3)]">
      {/* Image Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img 
          src={product.thumbnail} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md shadow-lg backdrop-blur-md">
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white backdrop-blur-md rounded-md border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-2 group/title">
          <h3 className="text-lg font-semibold text-slate-100 group-hover/title:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">
          {product.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-5 pb-5 border-b border-white/10">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-slate-300 font-medium">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>4.2k</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Verified</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-xs text-slate-500 line-through">${product.price.toFixed(2)}</span>
                <span className="text-xl font-bold text-cyan-400">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-slate-100">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-900 border border-white/10 transition-colors shadow-lg group-hover:border-cyan-500/50"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
