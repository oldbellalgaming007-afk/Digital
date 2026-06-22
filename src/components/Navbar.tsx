import { Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, LogIn, Search, Hexagon } from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
  const { user, cart, loginAs, logout } = useAppStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
            <Hexagon className="w-6 h-6 text-white fill-white/20" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Deveefaj<span className="text-cyan-400">.site</span>
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search premium digital assets..." 
            className="w-full bg-slate-900/50 border border-slate-700/50 text-slate-200 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Marketplace
          </Link>
          
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-cyan-400 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-slate-900 text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                {cartItemsCount}
              </span>
            )}
          </Link>

          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 glass-button px-4 py-2 text-sm font-medium hover:text-cyan-400"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:block">Dashboard</span>
              </Link>
              <button 
                onClick={logout}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => loginAs('user')}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => loginAs('admin')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2"
              >
                <span>Admin Demo</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
