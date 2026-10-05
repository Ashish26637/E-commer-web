export type Category = 'All' | 'Workspace' | 'Apparel' | 'Audio & Tech' | 'Home Objects';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Workspace' | 'Apparel' | 'Audio & Tech' | 'Home Objects';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  specs: { label: string; value: string }[];
  optionsName?: string; // e.g. "Color" or "Size"
  options?: string[]; // e.g. ["Charcoal", "Sand", "Sage"] or ["S", "M", "L", "XL"]
  inStock: boolean;
  stockCount: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Limited Run' | 'Sale' | 'Staff Pick';
  featured?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + option)
  product: Product;
  selectedOption: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: 'card' | 'apple_pay' | 'cash';
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning';
}
