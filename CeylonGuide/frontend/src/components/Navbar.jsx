import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, MessageSquare, LogIn } from 'lucide-react';
import logoImg from '../assets/logo.png'; // Direct import from assets

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* PearlGo Logo Image */}
        <Link to="/" className="flex items-center group">
          <img 
            src={logoImg} 
            alt="PearlGo Logo" 
            className="h-[150px] w-auto object-contain rounded-xl hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <Link to="/" className="hover:text-[#05abc4] transition">Home</Link>
          <Link to="/build-trip" className="hover:text-[#05abc4] transition flex items-center gap-1.5">
            <Compass size={16} className="text-[#05abc4]" />
            Trip Builder
          </Link>
          <Link to="/booking/demo123/chat" className="hover:text-[#05abc4] transition flex items-center gap-1.5 font-bold text-[#05abc4]">
            <MessageSquare size={16} />
            Secure Chat
          </Link>
          <Link to="/become-guide" className="hover:text-[#05abc4] transition">Become a Guide</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard/tourist" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs px-3.5 py-2 rounded-lg font-bold text-slate-100 transition hidden sm:inline-block">
            Tourist App
          </Link>

          <Link to="/dashboard/guide" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs px-3.5 py-2 rounded-lg font-bold text-slate-100 transition hidden sm:inline-block">
            Guide Portal
          </Link>

          {/* New Login Button */}
          <Link 
              to="/login" 
              className="bg-[#05abc4] hover:bg-[#0496ad] text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <LogIn size={15} />
              Login
            </Link>

            <Link to="/admin" className="p-2 text-slate-400 hover:text-white transition" title="Admin Portal">
              <Shield size={18} />
            </Link>
        </div>

      </div>
    </header>
  );
}