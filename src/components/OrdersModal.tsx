import React from 'react';
import { X, Package, Calendar, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersModal: React.FC = () => {
  const {
    isOrdersOpen,
    setIsOrdersOpen,
    orders,
    addToCart,
    setIsCartOpen,
  } = useStore();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-stone-900" />
            <h2 className="font-bold text-base text-stone-950">Your Order History</h2>
            <span className="text-xs font-mono font-medium text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded-full">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Package className="w-7 h-7 stroke-1" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">No orders yet</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Once you place an order, you can track fulfillment status, delivery estimates, and receipts here.
              </p>
              <button
                onClick={() => setIsOrdersOpen(false)}
                className="mt-2 text-xs font-semibold bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 sm:p-5 space-y-3"
              >
                {/* Order Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/70 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-stone-950">{ord.id}</span>
                      <span className="text-emerald-700 bg-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" /> {ord.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" /> Delivery by {ord.estimatedDelivery}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Total</span>
                    <span className="font-mono font-bold text-sm text-stone-950">
                      ${ord.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {ord.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-md object-cover border border-stone-200"
                        />
                        <div>
                          <span className="font-semibold text-stone-900 line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Qty: {item.quantity} · {item.selectedOption}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-stone-800">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => {
                            addToCart(item.product, item.selectedOption, 1);
                            setIsOrdersOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="text-[11px] font-medium text-stone-700 hover:text-stone-950 bg-white border border-stone-200 px-2 py-1 rounded hover:bg-stone-50 transition-colors flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping summary */}
                <div className="pt-2 border-t border-stone-200/60 text-[11px] text-stone-500 flex justify-between">
                  <span>Shipping Address: {ord.address.address}, {ord.address.city}</span>
                  <span className="capitalize">Paid via {ord.paymentMethod.replace('_', ' ')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
