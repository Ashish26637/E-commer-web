import React from 'react';
import { CheckCircle2, Package, Truck, Calendar, MapPin, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder, setIsOrdersOpen } = useStore();

  if (!lastConfirmedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-6">
        {/* Close Button */}
        <button
          onClick={() => setLastConfirmedOrder(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Banner */}
        <div className="bg-stone-900 text-stone-100 p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Order Confirmed!</h2>
          <p className="text-xs text-stone-300">
            Thank you for shopping with Ashish Essentials. We've sent a receipt to{' '}
            <strong className="text-white font-medium">{lastConfirmedOrder.address.email}</strong>.
          </p>
          <div className="pt-2">
            <span className="font-mono text-xs bg-stone-800 text-amber-300 px-3 py-1 rounded-md font-semibold tracking-wide">
              {lastConfirmedOrder.id}
            </span>
          </div>
        </div>

        {/* Delivery Status Timeline */}
        <div className="p-5 border-b border-stone-200/80 bg-stone-50">
          <div className="flex items-center justify-between text-xs text-stone-700 mb-3">
            <span className="font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-900" />
              Estimated Delivery: <strong>{lastConfirmedOrder.estimatedDelivery}</strong>
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
              On Schedule
            </span>
          </div>

          {/* Simple step tracker */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded bg-white border border-stone-200 shadow-2xs">
              <Package className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="font-semibold text-stone-900">Confirmed</div>
              <div className="text-[10px] text-stone-400">Just now</div>
            </div>
            <div className="p-2 rounded bg-white border border-stone-200/60 opacity-60">
              <Truck className="w-4 h-4 text-stone-500 mx-auto mb-1" />
              <div className="font-medium text-stone-600">Dispatched</div>
              <div className="text-[10px] text-stone-400">Within 24h</div>
            </div>
            <div className="p-2 rounded bg-white border border-stone-200/60 opacity-60">
              <MapPin className="w-4 h-4 text-stone-500 mx-auto mb-1" />
              <div className="font-medium text-stone-600">Delivered</div>
              <div className="text-[10px] text-stone-400">3-4 Days</div>
            </div>
          </div>
        </div>

        {/* Order Details List */}
        <div className="p-5 max-h-60 overflow-y-auto divide-y divide-stone-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Items in this order
          </h3>
          {lastConfirmedOrder.items.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-10 h-10 rounded object-cover border border-stone-200"
                />
                <div>
                  <div className="font-medium text-stone-900 line-clamp-1">{item.product.name}</div>
                  <div className="text-stone-500 text-[11px]">
                    Qty: {item.quantity} · {item.selectedOption}
                  </div>
                </div>
              </div>
              <span className="font-mono font-semibold text-stone-900">
                ${(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono">${lastConfirmedOrder.subtotal.toLocaleString()}</span>
          </div>
          {lastConfirmedOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Promo Discount ({lastConfirmedOrder.discountCode})</span>
              <span className="font-mono">-${lastConfirmedOrder.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{lastConfirmedOrder.shipping === 0 ? 'FREE' : `$${lastConfirmedOrder.shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-mono">${lastConfirmedOrder.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
            <span>Total Paid</span>
            <span className="font-mono">${lastConfirmedOrder.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex gap-2">
          <button
            onClick={() => {
              setLastConfirmedOrder(null);
              setIsOrdersOpen(true);
            }}
            className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2.5 rounded-lg transition-colors"
          >
            View All Orders
          </button>
          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="flex-1 bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
