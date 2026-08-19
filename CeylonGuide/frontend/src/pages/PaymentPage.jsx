import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, Building2, Smartphone } from 'lucide-react';

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const totalCost = 30000;
  const depositAmount = totalCost * 0.30;
  const remainingAmount = totalCost - depositAmount;

  const handlePayment = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaidSuccess(true);

      setTimeout(() => {
        // Redirect back to chat with paid=true flag
        navigate(`/booking/${bookingId || 'demo123'}/chat?paid=true`);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
          <ShieldCheck size={16} className="text-emerald-700" /> 256-Bit SSL Encrypted Escrow Payment
        </div>
        <h1 className="text-3xl font-serif font-bold text-emerald-950">PearlGo Secure Checkout</h1>
        <p className="text-slate-600 text-sm mt-1">Pay 30% deposit to confirm your booking and unlock guide chat.</p>
      </div>

      {paidSuccess ? (
        <div className="bg-white border border-emerald-200 rounded-2xl p-10 text-center shadow-lg max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-emerald-950 mb-2">Payment Successful!</h2>
          <p className="text-sm text-slate-600 mb-4">
            Your 30% advance deposit of <strong>LKR {depositAmount.toLocaleString()}</strong> has been securely locked in Escrow.
          </p>
          <p className="text-xs text-emerald-700 font-semibold animate-pulse">Redirecting to Private Guide Chat...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase text-slate-500 mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-4 rounded-xl border text-left flex flex-col items-center justify-center gap-2 font-semibold text-xs transition ${
                    method === 'card' ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-800' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard size={22} className={method === 'card' ? 'text-emerald-800' : 'text-slate-400'} />
                  Visa / Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('wallet')}
                  className={`p-4 rounded-xl border text-left flex flex-col items-center justify-center gap-2 font-semibold text-xs transition ${
                    method === 'wallet' ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-800' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Smartphone size={22} className={method === 'wallet' ? 'text-emerald-800' : 'text-slate-400'} />
                  Mobile Wallet
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('bank')}
                  className={`p-4 rounded-xl border text-left flex flex-col items-center justify-center gap-2 font-semibold text-xs transition ${
                    method === 'bank' ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-800' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Building2 size={22} className={method === 'bank' ? 'text-emerald-800' : 'text-slate-400'} />
                  Bank Transfer
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              {method === 'card' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cardholder Name</label>
                    <input type="text" required defaultValue="Alex Perera" placeholder="e.g. Alex Perera" className="w-full border border-slate-300 p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Card Number</label>
                    <input type="text" required defaultValue="4111 2222 3333 4444" maxLength="19" placeholder="4111 2222 3333 4444" className="w-full border border-slate-300 p-3 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Expiry Date</label>
                      <input type="text" required defaultValue="12/28" placeholder="MM/YY" maxLength="5" className="w-full border border-slate-300 p-3 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">CVC / CVV</label>
                      <input type="password" required defaultValue="123" maxLength="4" placeholder="123" className="w-full border border-slate-300 p-3 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-800" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-4 rounded-xl mt-4 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={18} />
                    {isProcessing ? 'Processing Payment...' : `Pay LKR ${depositAmount.toLocaleString()} Escrow Deposit`}
                  </button>
                </form>
              )}

              {method === 'wallet' && (
                <div className="space-y-4 text-center py-4">
                  <p className="text-sm text-slate-600">Scan QR code using PayHere / Genie / eZ Cash.</p>
                  <div className="bg-slate-100 p-6 rounded-xl border border-dashed border-slate-300 w-48 h-48 mx-auto flex items-center justify-center font-bold text-slate-400">
                    [ PAYHERE QR CODE ]
                  </div>
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition cursor-pointer"
                  >
                    {isProcessing ? 'Confirming Wallet Payment...' : 'Confirm Mobile Wallet Payment'}
                  </button>
                </div>
              )}

              {method === 'bank' && (
                <div className="space-y-3 text-xs text-slate-700 py-2">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-bold block text-emerald-950 text-sm mb-1">Bank Account Details</span>
                    <p>Account Name: PearlGo Escrow (Pvt) Ltd</p>
                    <p>Bank: Commercial Bank PLC</p>
                    <p>Account Number: 800912345678</p>
                    <p>Branch: Colombo Main Branch</p>
                    <p className="mt-2 text-amber-800 font-semibold">Reference: BK-{bookingId || 'demo123'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition text-sm cursor-pointer"
                  >
                    {isProcessing ? 'Verifying Transfer...' : 'I Have Transferred Deposit'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 h-fit space-y-6 shadow-xl">
            <h3 className="font-serif font-bold text-amber-400 text-lg border-b border-emerald-800 pb-3">Booking Summary</h3>

            <div className="space-y-2 text-xs text-emerald-100">
              <div className="flex justify-between">
                <span className="text-slate-300">Tour Name:</span>
                <span className="font-bold">Sigiriya & Kandy 3-Day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Assigned Guide:</span>
                <span className="font-bold text-amber-300">Kasun Perera (Verified ✓)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Booking Reference:</span>
                <span className="font-mono">#{bookingId || 'demo123'}</span>
              </div>
            </div>

            <div className="border-t border-emerald-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Tour Package:</span>
                <span>LKR {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold text-sm bg-emerald-900/60 p-2.5 rounded-lg border border-emerald-800">
                <span>Due Now (30% Deposit):</span>
                <span>LKR {depositAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                <span>Remaining Balance (70%):</span>
                <span>LKR {remainingAmount.toLocaleString()} (On Arrival)</span>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-800 text-[11px] text-emerald-200/80 leading-relaxed">
              🔒 <strong>PearlGo Escrow Protection:</strong> Your 30% advance deposit is held securely by the platform until your tour officially begins.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}