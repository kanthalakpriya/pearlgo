import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Lock, Send, ShieldCheck, AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';

export default function BookingChat() {
  const { id } = useParams();
  const location = useLocation();

  // Auto-detect if redirected after payment
  const isPaidQuery = location.search.includes('paid=true');
  const [isPaid, setIsPaid] = useState(isPaidQuery);
  const [isViolationLocked, setIsViolationLocked] = useState(false);

  const [messages, setMessages] = useState([
    { sender: 'System', content: '30% Deposit payment verified! Secure private chat is now UNLOCKED.' },
    { sender: 'Guide (Kasun)', content: 'Ayubowan! I am your verified guide Kasun. Excited to show you around Sigiriya & Kandy!' }
  ]);

  const [input, setInput] = useState('');

  const totalCost = 30000;
  const initialDeposit = totalCost * 0.30;

  useEffect(() => {
    if (location.search.includes('paid=true')) {
      setIsPaid(true);
    }
  }, [location]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isViolationLocked) return;

    // Contact Detection: Phone numbers, Emails, Social links, URLs
    const contactRegex = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(\b07\d{8}\b)|(\+?\d{1,3}[-.\s]?\d{8,10})|(\b\d[\d\s-]{8,14}\d\b)|(http|https|www|wa\.me|t\.me|viber|telegram|whatsapp|\.com|\.lk|\.net|\.org)/gi;

    if (contactRegex.test(input)) {
      setMessages([]); // Wipes chat history immediately
      setIsViolationLocked(true); // Locks chat session
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { sender: 'You', content: input }]);
    setInput('');
  };

  const handleResetDemo = () => {
    setIsViolationLocked(false);
    setIsPaid(true);
    setMessages([
      { sender: 'System', content: '30% Deposit payment verified! Secure private chat is now UNLOCKED.' },
      { sender: 'Guide (Kasun)', content: 'Ayubowan! I am your verified guide Kasun. Excited to show you around Sigiriya & Kandy!' }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden h-[650px] flex flex-col">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex justify-between items-center border-b border-emerald-800">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Booking #{id || 'demo123'}</span>
            <h2 className="text-xl font-serif font-bold">Sigiriya & Kandy Tour Chat</h2>
          </div>
          <div className="flex items-center gap-2 text-xs bg-emerald-900 border border-emerald-700 px-3 py-1.5 rounded-full text-emerald-200">
            <ShieldCheck size={16} className="text-amber-400" />
            <span>Guide: Kasun (Verified ✓)</span>
          </div>
        </div>

        {/* SCREEN 1: Security Violation Lock & Auto-Clear Alert */}
        {isViolationLocked ? (
          <div className="flex-1 bg-red-950 text-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-red-900/80 text-red-200 rounded-3xl flex items-center justify-center mb-5 border-2 border-red-500/50 shadow-2xl">
              <ShieldAlert size={44} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-red-100 mb-2">Chat Terminated & Cleared</h3>
            <div className="bg-red-900/40 p-4 rounded-xl border border-red-800 text-red-200/90 text-sm max-w-lg mb-6 leading-relaxed">
              <strong>Security Violation Detected:</strong> Sharing personal phone numbers, email addresses, WhatsApp/Telegram links, or external websites is strictly prohibited on PearlGo.
            </div>
            <p className="text-xs text-red-300 mb-6">All message history was permanently deleted to enforce platform policy.</p>
            <button
              onClick={handleResetDemo}
              className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition border border-red-600 shadow-lg cursor-pointer"
            >
              <RefreshCw size={14} /> Reset Chat (Testing Mode)
            </button>
          </div>
        ) : !isPaid ? (
          /* SCREEN 2: Deposit Lock Screen */
          <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-4 border border-amber-200">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-2">Secure Chat is Locked</h3>
            <p className="text-slate-600 text-sm max-w-md mb-6 leading-relaxed">
              To prevent spam and protect local guides, messaging unlocks automatically after your 30% advance booking deposit is verified.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full max-w-sm text-left">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Total Booking Cost:</span>
                <span className="font-bold text-slate-800">LKR {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-emerald-950 border-t border-slate-100 pt-3 mb-6">
                <span>Initial Deposit (30%):</span>
                <span className="text-amber-600">LKR {initialDeposit.toLocaleString()}</span>
              </div>
              <Link
                to={`/payment/${id || 'demo123'}`}
                className="block text-center w-full bg-emerald-900 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-bold transition shadow-md"
              >
                Pay 30% Deposit & Unlock Chat
              </Link>
              
              {/* Quick Testing Bypass */}
              <button
                type="button"
                onClick={() => setIsPaid(true)}
                className="w-full text-center text-xs text-slate-400 hover:text-emerald-700 mt-3 block underline cursor-pointer"
              >
                [Bypass for Testing: Unlock Chat Directly]
              </button>
            </div>
          </div>
        ) : (
          /* SCREEN 3: Unlocked Active Chat */
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-[12px] text-amber-900 flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0" />
              <span><strong>Security Warning:</strong> Sending phone numbers, emails, or links will instantly wipe all chat history & lock the session.</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => {
                const isSystem = msg.sender === 'System';
                const isMe = msg.sender === 'You';
                return (
                  <div key={index} className={`flex flex-col ${isSystem ? 'items-center' : isMe ? 'items-end' : 'items-start'}`}>
                    {isSystem ? (
                      <div className="bg-amber-100 border border-amber-300 text-amber-950 text-xs px-4 py-2 rounded-full font-semibold shadow-sm">
                        {msg.content}
                      </div>
                    ) : (
                      <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${isMe ? 'bg-emerald-900 text-white rounded-br-none shadow-md' : 'bg-white border text-slate-800 rounded-bl-none shadow-sm'}`}>
                        <span className="block text-[10px] font-bold opacity-75 mb-1">{msg.sender}</span>
                        {msg.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message (Do not share phone/email)..."
                className="flex-1 border border-slate-300 rounded-xl px-4 text-sm focus:outline-none focus:border-emerald-800"
              />
              <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-emerald-950 p-3 rounded-xl font-bold transition cursor-pointer">
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}