import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Category, ToastMessage, ShippingAddress } from '../types';
import { PRODUCTS, PROMO_CODES } from '../data/products';

interface StoreContextType {
  // Products & Filtering
  products: Product[];
  filteredProducts: Product[];
  category: Category;
  setCategory: (c: Category) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOption: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortOption: (s: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  clearFilters: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  appliedPromo: { code: string; discountPercent?: number; freeShipping?: boolean; description: string } | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  addToCart: (product: Product, option?: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  buyNow: (product: Product, option?: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  lastConfirmedOrder: Order | null;
  setLastConfirmedOrder: (order: Order | null) => void;

  // Orders
  orders: Order[];
  placeOrder: (address: ShippingAddress, paymentMethod: 'card' | 'apple_pay' | 'cash') => Promise<Order>;

  // Toast
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Catalog Filter State
  const [category, setCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kura_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kura_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state persisted to localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kura_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<Order | null>(null);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent?: number;
    freeShipping?: boolean;
    description: string;
  } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kura_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kura_wishlist_v1', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('kura_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast(`Removed "${prod?.name || 'Item'}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast(`Saved "${prod?.name || 'Item'}" to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart actions
  const addToCart = (product: Product, option?: string, quantity: number = 1) => {
    if (!product.inStock) {
      addToast('Sorry, this item is currently out of stock', 'warning');
      return;
    }

    const selectedOption = option || (product.options && product.options.length > 0 ? product.options[0] : 'Default');
    const cartItemId = `${product.id}-${selectedOption}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedOption,
          quantity,
        },
      ];
    });

    addToast(`Added "${product.name}" to cart`, 'success');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast(`Removed "${item.product.name}"`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const buyNow = (product: Product, option?: string) => {
    addToCart(product, option, 1);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Promo Code
  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a promo code');
      return false;
    }
    const found = PROMO_CODES[clean];
    if (found) {
      setAppliedPromo({
        code: clean,
        ...found,
      });
      setPromoError(null);
      addToast(`Promo code "${clean}" applied!`, 'success');
      return true;
    } else {
      setPromoError('Invalid promo code. Try "ASHISH10", "FAST10" or "FREESHIP"');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
    addToast('Promo code removed', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free shipping threshold: $75 or promo
  const isFreeShipping = subtotal >= 75 || appliedPromo?.freeShipping;
  const shipping = subtotal > 0 ? (isFreeShipping ? 0 : 9) : 0;

  // Discount
  const discount = appliedPromo?.discountPercent
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount > 0 ? Math.round(taxableAmount * 0.08) : 0;
  const total = taxableAmount + shipping + tax;

  // Checkout / Place Order
  const placeOrder = async (
    address: ShippingAddress,
    paymentMethod: 'card' | 'apple_pay' | 'cash'
  ): Promise<Order> => {
    // Artificial slight delay for realistic processing feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ASHISH-${randomSuffix}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateFormatted = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      discount,
      discountCode: appliedPromo?.code,
      shipping,
      tax,
      total,
      address,
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery: dateFormatted,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastConfirmedOrder(newOrder);
    setCart([]);
    setAppliedPromo(null);
    setIsCheckoutOpen(false);

    return newOrder;
  };

  // Filter and Sort Products
  const clearFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setInStockOnly(false);
    setMaxPrice(300);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (category !== 'All' && p.category !== category) return false;
    if (inStockOnly && !p.inStock) return false;
    if (p.price > maxPrice) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchTag || matchCat || matchDesc;
    }
    return true;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    // Featured first
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        filteredProducts,
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        inStockOnly,
        setInStockOnly,
        maxPrice,
        setMaxPrice,
        clearFilters,
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        appliedPromo,
        promoError,
        applyPromo,
        removePromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        buyNow,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
