import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Banknote, Lock, ArrowLeft, Loader2, Wand2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    placeOrder,
    setIsCartOpen,
  } = useStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');

  // Form states
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '888',
  });

  if (!isCheckoutOpen) return null;

  const handleFillDemo = () => {
    setAddress({
      fullName: 'Alex Vance',
      email: 'alex.vance@example.com',
      address: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States',
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.address || !address.city || !address.postalCode) {
      alert('Please fill out the required shipping fields');
      return;
    }
    setStep(2);
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    try {
      await placeOrder(address, paymentMethod);
      setStep(1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="font-bold text-base text-stone-900">
              {step === 1 ? 'Fast Checkout — Shipping Details' : 'Fast Checkout — Payment'}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-5 py-2.5 bg-stone-100 border-b border-stone-200/70 flex items-center justify-between text-xs font-medium text-stone-600">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 1 ? 'bg-stone-900 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              1
            </span>
            <span className={step === 1 ? 'font-bold text-stone-900' : 'text-stone-600'}>
              Shipping
            </span>
          </div>

          <div className="h-px w-12 bg-stone-300" />

          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 2 ? 'bg-stone-900 text-white' : 'bg-stone-300 text-stone-700'
              }`}
            >
              2
            </span>
            <span className={step === 2 ? 'font-bold text-stone-900' : 'text-stone-400'}>
              Payment
            </span>
          </div>

          <div className="h-px w-12 bg-stone-300" />

          <span className="text-stone-400 text-xs">Total: <strong className="font-mono text-stone-900">${total}</strong></span>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">Contact & Delivery</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded transition-colors"
                >
                  <Wand2 className="w-3 h-3 text-amber-600" /> Auto-fill Demo Info
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address or P.O. Box"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Portland"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="OR"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="97201"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Order mini review */}
              <div className="pt-3 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Items ({cart.length})</span>
                  <span className="font-mono">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1 text-sm">
                  <span>Total</span>
                  <span className="font-mono">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
                </button>
                <button
                  type="submit"
                  className="bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Payment Methods */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-800">Select Payment Method</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left flex flex-col items-start justify-between gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-stone-800" />
                    <span className="text-xs font-semibold text-stone-900">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-lg border text-left flex flex-col items-start justify-between gap-2 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-stone-800" />
                    <span className="text-xs font-semibold text-stone-900">Apple / Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-lg border text-left flex flex-col items-start justify-between gap-2 transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-stone-800" />
                    <span className="text-xs font-semibold text-stone-900">Pay on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs if card is selected */}
              {paymentMethod === 'card' && (
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">CVC Code</label>
                      <input
                        type="text"
                        value={cardInfo.cvc}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Destination Review */}
              <div className="bg-stone-100/60 p-3 rounded-lg border border-stone-200/80 text-xs text-stone-600 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-stone-900">Shipping to:</div>
                  <div>{address.fullName} · {address.address}, {address.city}, {address.state}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-stone-900 underline text-[11px] font-medium"
                >
                  Edit
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="bg-stone-950 hover:bg-stone-800 disabled:bg-stone-600 text-stone-50 text-xs font-semibold px-6 py-3 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Pay ${total.toLocaleString()} & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
