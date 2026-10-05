import React, { useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Package, Search, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    cartCount,
    subtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    orders,
    setIsOrdersOpen,
  } = useStore();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to jump into search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wide font-normal flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 font-medium text-stone-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Use code <span className="font-mono bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded text-[11px]">ASHISH10</span> for 10% off
        </span>
        <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
        <span className="hidden sm:inline text-stone-300">Free shipping on orders over $75</span>
        <span className="text-stone-500 hidden md:inline" aria-hidden="true">·</span>
        <span className="hidden md:inline text-stone-400">Carbon neutral delivery</span>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCategory('All');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-stone-950 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-50 flex items-center justify-center font-bold text-base tracking-tighter shadow-sm group-hover:bg-stone-800 transition-colors">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-stone-900 leading-none">Ashish Essentials</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium leading-tight">Curated Goods</span>
              </div>
            </a>

            {/* Desktop Category Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-stone-200/80 text-stone-900 font-semibold'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md mx-auto hidden md:block">
            <div className="relative group">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-stone-900 transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs rounded-lg pl-9 pr-8 py-2 border border-stone-200 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Orders History Trigger */}
            <button
              onClick={() => setIsOrdersOpen(true)}
              className="relative p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="View Orders"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Orders</span>
              {orders.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-2 right-2"></span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-50 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shadow-xs group cursor-pointer"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-stone-100 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                ${subtotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs rounded-lg pl-9 pr-8 py-2 border border-stone-200 focus:border-stone-900 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
