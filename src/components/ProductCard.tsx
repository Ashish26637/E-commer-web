import React from 'react';
import { Star, Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    cart,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const hasInCart = !!cartItem;

  return (
    <div className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-900/90 text-stone-100 backdrop-blur-xs">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-800 text-white">
              Back Soon
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-stone-950/85 text-white text-xs font-medium px-3 py-1.5 rounded-md backdrop-blur-xs shadow-sm">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Rating (Zero-pill text format) */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-700 font-mono text-[11px] tabular-nums">
                {product.rating}
              </span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-semibold text-sm sm:text-base text-stone-900 group-hover:text-stone-950 hover:underline cursor-pointer line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Short Tagline */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-stone-950 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              !product.inStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : hasInCart
                ? 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                : 'bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-2xs'
            }`}
          >
            {hasInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>In Cart ({cartItem?.quantity})</span>
              </>
            ) : product.inStock ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            ) : (
              <span>Out of stock</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
