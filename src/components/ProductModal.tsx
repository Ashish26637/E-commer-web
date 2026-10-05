import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Check, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      setActiveTab('overview');
      if (selectedProduct.options && selectedProduct.options.length > 0) {
        setSelectedOption(selectedProduct.options[0]);
      } else {
        setSelectedOption('');
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const gallery = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-sm border border-stone-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Gallery */}
          <div className="md:col-span-6 bg-stone-50 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/80">
            <div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-200 shadow-2xs">
                <img
                  src={gallery[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-900 text-stone-100">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 mt-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-stone-900 ring-2 ring-stone-900/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick reassurance points */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-3 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-800" />
                <span>Ships in 24 hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="md:col-span-6 p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category, Rating & Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">{selectedProduct.category}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-stone-800 font-mono tabular-nums">
                      {selectedProduct.rating}
                    </span>
                    <span className="text-stone-400">({selectedProduct.reviewsCount})</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors"
                    title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {selectedProduct.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold font-mono text-stone-950 tabular-nums">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through tabular-nums">
                    ${selectedProduct.originalPrice}
                  </span>
                )}
                {selectedProduct.originalPrice && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Save ${selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                )}
              </div>

              {/* Options Selector (e.g. Size / Colorway) */}
              {selectedProduct.options && selectedProduct.options.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-stone-700">
                      {selectedProduct.optionsName || 'Option'}: <strong className="text-stone-950">{selectedOption}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.options.map((opt) => {
                      const isSelected = selectedOption === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={`text-xs px-3 py-1.5 rounded-md border font-medium transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-2xs'
                              : 'border-stone-300 text-stone-700 bg-stone-50 hover:bg-stone-100 hover:border-stone-400'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tabs for Details / Specs / Reviews */}
              <div className="pt-3">
                <div className="flex items-center gap-4 border-b border-stone-200 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 transition-colors border-b-2 -mb-px ${
                      activeTab === 'overview'
                        ? 'border-stone-950 text-stone-950 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 transition-colors border-b-2 -mb-px ${
                      activeTab === 'specs'
                        ? 'border-stone-950 text-stone-950 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors border-b-2 -mb-px ${
                      activeTab === 'reviews'
                        ? 'border-stone-950 text-stone-950 font-semibold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Reviews ({selectedProduct.reviews.length})
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 leading-relaxed min-h-[90px]">
                  {activeTab === 'overview' && (
                    <p>{selectedProduct.description}</p>
                  )}
                  {activeTab === 'specs' && (
                    <div className="space-y-1.5">
                      {selectedProduct.specs.map((s, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-stone-100">
                          <span className="text-stone-500">{s.label}</span>
                          <span className="font-medium text-stone-900">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-2.5">
                      {selectedProduct.reviews.map((rev) => (
                        <div key={rev.id} className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-stone-900">{rev.author}</span>
                            <span className="text-stone-400 text-[10px]">{rev.date}</span>
                          </div>
                          <p className="text-stone-600 italic">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Form */}
            <div className="pt-4 border-t border-stone-200 space-y-3 mt-4">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => {
                    addToCart(selectedProduct, selectedOption, quantity);
                    setSelectedProduct(null);
                  }}
                  disabled={!selectedProduct.inStock}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-stone-50 py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ${(selectedProduct.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Instant Buy Now button */}
              {selectedProduct.inStock && (
                <button
                  onClick={() => buyNow(selectedProduct, selectedOption)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Instant Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
