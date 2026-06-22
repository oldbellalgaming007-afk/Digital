import { useAppStore } from '@/store';
import { Navigate, Link } from 'react-router-dom';
import { Wallet, Package, Clock, Download, Settings, Heart } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { motion } from 'framer-motion';

export function UserDashboard() {
  const { user, products } = useAppStore();

  if (!user || user.role !== 'user') {
    return <Navigate to="/" />;
  }

  const purchasedProducts = products.filter(p => user.purchases.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, {user.name}</h1>
          <p className="text-slate-400">Manage your digital assets, wallet, and settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-4">
          <GlassPanel className="p-4 flex flex-col gap-1">
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl font-medium text-left transition-colors">
              <Package className="w-5 h-5" /> My Downloads
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-left transition-colors font-medium">
              <Wallet className="w-5 h-5" /> Wallet & Billing
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-left transition-colors font-medium">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-left transition-colors font-medium">
              <Settings className="w-5 h-5" /> Account Settings
            </button>
          </GlassPanel>

          {/* Wallet Mini-Widget */}
          <GlassPanel className="p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Wallet Balance</h3>
            <div className="text-3xl font-bold text-white mb-4">${user.walletBalance.toFixed(2)}</div>
            <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/5">
              Add Funds
            </button>
          </GlassPanel>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold text-white mb-6">Purchased Assets</h2>
          
          {purchasedProducts.length === 0 ? (
            <GlassPanel className="p-12 text-center border border-dashed border-white/20">
              <Package className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-300 font-medium mb-2">No purchases yet</p>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">Explore our marketplace to find premium themes, templates, and UI kits.</p>
              <Link to="/products" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm">
                Browse Marketplace
              </Link>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasedProducts.map((product, i) => (
                <GlassPanel key={product.id} delay={i * 0.1} className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img 
                      src={product.thumbnail} 
                      alt={product.name} 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold line-clamp-1 mb-1">{product.name}</h3>
                      <p className="text-xs text-slate-400 mb-2">Standard License</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium px-2 py-0.5 bg-emerald-500/10 rounded w-fit">
                        <Check className="w-3 h-3" /> Active
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Updated {product.lastUpdated}
                    </span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white text-xs font-semibold shadow-lg hover:opacity-90 transition-opacity">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Inline missing icon component
function Check(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
