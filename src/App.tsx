import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrdersModal } from './components/OrdersModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/products';
import { SlidersHorizontal, RotateCcw, ShoppingBag, ArrowUpDown, Check } from 'lucide-react';

const CatalogContent: React.FC = () => {
  const {
    filteredProducts,
    category,
    setCategory,
    searchQuery,
    sortOption,
    setSortOption,
    inStockOnly,
    setInStockOnly,
    maxPrice,
    setMaxPrice,
    clearFilters,
    cartCount,
    subtotal,
    setIsCartOpen,
  } = useStore();

  const isFiltered = category !== 'All' || searchQuery !== '' || inStockOnly || maxPrice < 300;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Catalog & Filter Section */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
              Curated Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight mt-1">
              {category === 'All' ? 'All Daily Essentials' : category}
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Showing <strong className="font-semibold text-stone-900">{filteredProducts.length}</strong> crafted objects
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </p>
          </div>

          {/* Interactive Category Segmented Controls (buttons allowed per zero-pill constitution) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter & Sorting Bar */}
        <div className="mt-4 p-3.5 sm:p-4 bg-white border border-stone-200 rounded-xl shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-stone-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-medium"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* In-Stock Filter Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">In-Stock Only</span>
            </label>

            {/* Price Max Slider */}
            <div className="flex items-center gap-2 text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-medium hidden sm:inline">Max Price:</span>
              <span className="font-mono font-semibold text-stone-900">${maxPrice}</span>
              <input
                type="range"
                min="35"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 sm:w-28 accent-stone-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 font-medium transition-colors text-xs ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-stone-100/50 rounded-2xl border border-dashed border-stone-300 p-8">
              <div className="w-12 h-12 rounded-full bg-stone-200/70 text-stone-500 flex items-center justify-center mx-auto mb-3">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-900">No matching products found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 leading-relaxed">
                Try widening your price filter, unchecking "In-Stock Only", or clearing your search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Mobile Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-stone-950 text-stone-50 p-3.5 rounded-xl shadow-xl flex items-center justify-between font-semibold text-xs border border-stone-800"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-950 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold font-mono">
                  {cartCount}
                </span>
              </div>
              <span>View Cart ({cartCount})</span>
            </div>
            <span className="font-mono text-sm">${subtotal.toLocaleString()}</span>
          </button>
        </div>
      )}

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrdersModal />
      <WishlistModal />
      <Toast />
    </main>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <CatalogContent />
        </div>
        <Footer />
      </div>
    </StoreProvider>
  );
}
