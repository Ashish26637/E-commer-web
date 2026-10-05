import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  const { setCategory } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded bg-white text-stone-950 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Ashish Essentials</span>
            </div>
            <p className="text-stone-400 text-xs max-w-sm leading-relaxed">
              Modern everyday tools, tactile desktop accessories, and crafted personal goods. Sourced sustainably and packaged in recyclable materials.
            </p>
            <div className="text-stone-500 text-[11px] pt-2">
              © {new Date().getFullYear()} Ashish Essentials, Inc. All rights reserved.
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold tracking-wider text-[11px] uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantees / Service */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold tracking-wider text-[11px] uppercase">
              Assurance
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Free Shipping on Orders $75+</li>
              <li>30-Day Effortless Returns</li>
              <li>2-Year Limited Object Warranty</li>
              <li>100% Carbon-Offset Delivery</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold tracking-wider text-[11px] uppercase">
              Join Dispatch
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Early access to seasonal releases and archive sales. Zero spam.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium bg-stone-800/80 p-2.5 rounded-lg border border-stone-700">
                <Check className="w-4 h-4" />
                <span>You're on the early dispatch list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-800/90 text-white placeholder:text-stone-500 rounded-lg px-3 py-2 text-xs border border-stone-700 focus:outline-none focus:border-stone-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white hover:bg-stone-200 text-stone-950 p-1 rounded-md transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
