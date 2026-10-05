import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setIsCartOpen,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-bold text-base text-stone-950">Saved Wishlist</h2>
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded-full">
              {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto divide-y divide-stone-100">
          {savedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart className="w-7 h-7 stroke-1" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any product to save it for quick access later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-2 text-xs font-semibold bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
              >
                Explore Products
              </button>
            </div>
          ) : (
            savedProducts.map((prod) => (
              <div key={prod.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                      {prod.name}
                    </h4>
                    <div className="text-[11px] text-stone-500">{prod.category}</div>
                    <div className="font-mono text-xs font-bold text-stone-900 mt-0.5">
                      ${prod.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(prod);
                      toggleWishlist(prod.id);
                      setIsWishlistOpen(false);
                      setIsCartOpen(true);
                    }}
                    disabled={!prod.inStock}
                    className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-stone-50 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Move to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
