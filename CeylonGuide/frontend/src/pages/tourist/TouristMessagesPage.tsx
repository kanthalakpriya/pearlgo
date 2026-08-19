import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sanitizeMessageText } from '../../utils/contactSanitizer';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Lock, Send, AlertCircle, ShieldAlert } from 'lucide-react';

export default function TouristMessagesPage() {
  const { bookings, messages, sendMessage } = useApp();
  const { user } = useAuth();

  const [activeBookingId, setActiveBookingId] = useState<string>(bookings[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [warning, setWarning] = useState('');

  const activeBooking = bookings.find(b => b.id === activeBookingId);
  const activeMessages = messages.filter(m => m.bookingId === activeBookingId);

  const isPaymentConfirmed = activeBooking?.status === 'CONFIRMED' || activeBooking?.status === 'IN_PROGRESS';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setWarning('');

    if (!inputText.trim()) return;

    // Run Contact Sanitizer Engine
    const result = sanitizeMessageText(inputText);

    if (!result.isClean) {
      setWarning(`Contact detail sharing is blocked prior to or outside official terms. Detected: ${result.violations.join(', ')}`);
    }

    sendMessage(
      activeBookingId,
      result.cleanText,
      user?.id || 'tourist-1',
      user?.name || 'Tourist',
      user?.role || 'tourist'
    );

    setInputText('');
  };

  return (
    <DashboardLayout title="Secure Escrow Messaging">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
        
        {/* Booking Selection Sidebar */}
        <div className="border-r border-slate-200 p-4 bg-slate-50 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirmed Bookings</h2>
          {bookings.map(b => (
            <div
              key={b.id}
              onClick={() => setActiveBookingId(b.id)}
              className={`p-3 rounded-xl cursor-pointer transition ${
                activeBookingId === b.id ? 'bg-white border-2 border-[#087EA4] shadow-sm' : 'border border-slate-200 hover:bg-white'
              }`}
            >
              <p className="font-bold text-xs text-slate-900 truncate">{b.tripTitle}</p>
              <p className="text-[11px] text-slate-500">Guide: {b.guideName}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Thread */}
        <div className="md:col-span-2 flex flex-col justify-between p-6">
          {activeBooking ? (
            <>
              {/* Chat Header */}
              <div className="pb-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">{activeBooking.guideName}</h2>
                  <p className="text-xs text-slate-500">Trip Ref: {activeBooking.id}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Escrow Protected
                </span>
              </div>

              {/* Message Lock Banner if not confirmed */}
              {!isPaymentConfirmed ? (
                <div className="my-auto p-8 text-center bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                  <Lock size={36} className="mx-auto text-amber-600" />
                  <h3 className="font-bold text-amber-900 text-sm">Messaging Locked</h3>
                  <p className="text-xs text-amber-800 max-w-md mx-auto">
                    Complete the required 30% initial deposit ($ {activeBooking.initialDepositUSD} USD) to confirm your booking and unlock direct messaging with your guide.
                  </p>
                </div>
              ) : (
                /* Active Message Stream */
                <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
                  {activeMessages.map(msg => {
                    const isMe = msg.senderRole === user?.role;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isMe ? 'bg-[#0B3D2E] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
                        }`}>
                          <p className="font-bold text-[10px] opacity-75 mb-1">{msg.senderName}</p>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Contact Sanitizer Warning */}
              {warning && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
                  <ShieldAlert size={16} className="text-amber-600 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t">
                <input
                  type="text"
                  disabled={!isPaymentConfirmed}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder={isPaymentConfirmed ? "Type your message..." : "Unlock chat by confirming deposit..."}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#087EA4] disabled:bg-slate-100"
                />
                <button
                  type="submit"
                  disabled={!isPaymentConfirmed}
                  className="px-5 py-2.5 bg-[#0B3D2E] text-amber-300 rounded-xl text-xs font-bold hover:bg-[#146B4A] transition disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                >
                  <Send size={14} /> Send
                </button>
              </form>
            </>
          ) : (
            <div className="m-auto text-center text-slate-400 text-xs">Select a booking to view conversation</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}