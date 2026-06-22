import { useAppStore } from '@/store';
import { Navigate } from 'react-router-dom';
import { Users, DollarSign, ShoppingBag, TrendingUp, Plus, Search } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function AdminDashboard() {
  const { user, products } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products'>('overview');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const statCards = [
    { title: 'Total Revenue', value: '$12,450.00', icon: DollarSign, change: '+14%' },
    { title: 'Total Users', value: '1,248', icon: Users, change: '+5.2%' },
    { title: 'Products', value: products.length.toString(), icon: ShoppingBag, change: '+2' },
    { title: 'Active Licenses', value: '892', icon: TrendingUp, change: '+8%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Control Panel</h1>
          <p className="text-slate-400">Manage your marketplace, users, and products.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
        >
          Product Management
        </button>
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, i) => (
              <GlassPanel key={i} delay={i * 0.1} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-cyan-400">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel className="p-6 min-h-[300px] flex items-center justify-center border border-dashed border-white/20">
            <p className="text-slate-500 font-medium">Sales Analytics Chart (Placeholder)</p>
          </GlassPanel>
        </motion.div>
      )}

      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <GlassPanel className="p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-lg font-bold text-white">All Products</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-slate-900/50 border border-slate-700 text-sm rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-white/5">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Sales</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.thumbnail} alt="" className="w-10 h-10 rounded object-cover" />
                          <div className="font-medium text-slate-200">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{product.category}</td>
                      <td className="px-6 py-4 text-slate-200">
                        {product.salePrice ? (
                          <span>${product.salePrice.toFixed(2)} <span className="text-xs line-through text-slate-500">${product.price.toFixed(2)}</span></span>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-200">124</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-cyan-400 hover:text-white font-medium mr-3 transition-colors">Edit</button>
                        <button className="text-red-400 hover:text-white font-medium transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </motion.div>
      )}

    </div>
  );
}
