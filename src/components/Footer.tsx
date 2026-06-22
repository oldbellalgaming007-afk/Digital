import { Hexagon, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#020617]/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <Hexagon className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Deveefaj<span className="text-cyan-400">.site</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premium digital assets and UI kits for the modern web. Built by creators, for creators to accelerate your workflow.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-cyan-500 hover:text-slate-900 text-slate-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-cyan-500 hover:text-slate-900 text-slate-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-cyan-500 hover:text-slate-900 text-slate-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">UI Kits</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">Templates</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">Wireframes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Licensing</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 Deveefaj Site. All rights reserved.
          </p>
          <div className="flex gap-2">
            <span className="w-8 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400 cursor-default">SSL</span>
            <span className="w-12 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400 cursor-default">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
