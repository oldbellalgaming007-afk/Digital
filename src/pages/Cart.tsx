import { useAppStore } from '@/store';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassPanel } from '@/components/GlassPanel';
import { motion } from 'framer-motion';

export function Cart() {
  const { cart, removeFromCart, checkout, user } = useAppStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Please login first to checkout!");
      return;
    }
    checkout();
    navigate('/dashboard');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-24 text-center">
        <GlassPanel className="p-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-slate-400 mb-8 max-w-sm">Looks like you haven't added any digital assets to your cart yet.</p>
          <Link 
            to="/products"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:scale-105 transition-transform"
          >
            Browse Marketplace
          </Link>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-24">
      <h1 className="text-3xl font-bold text-white mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <GlassPanel key={item.product.id} delay={i * 0.1} className="p-4 flex gap-6 items-center">
              <img 
                src={item.product.thumbnail} 
                alt={item.product.name} 
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                  <Link to={`/product/${item.product.id}`} className="hover:text-cyan-400 transition-colors">
                    {item.product.name}
                  </Link>
                </h3>
                <span className="text-cyan-400 font-medium">
                  License: Standard
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white mb-2">
                  ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-slate-500 hover:text-red-400 p-2 transition-colors flex items-center gap-1 ml-auto text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <GlassPanel className="p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span className="font-medium">-$0.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tax</span>
                <span className="font-medium text-white">Calculated at checkout</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-slate-300 font-medium">Total</span>
                <span className="text-3xl font-bold text-gradient">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Pay with Wallet <ArrowRight className="w-5 h-5" />
            </button>
            
            {user && (
              <p className="text-center text-sm text-slate-400 mt-4">
                Current Wallet Balance: <span className="text-white font-medium">${user.walletBalance.toFixed(2)}</span>
              </p>
            )}
            
            <div className="mt-6 flex flex-col items-center gap-2 justify-center opacity-50">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center mb-1">Encrypted SSL Checkout</p>
            </div>
          </GlassPanel>
        </div>

      </div>
    </div>
  );
}
