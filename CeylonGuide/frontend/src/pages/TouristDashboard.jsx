import React from 'react';
import { Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TouristDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold text-emerald-950 mb-2">Welcome Back, Alex!</h1>
      <p className="text-slate-600 text-sm mb-8">Manage your Sri Lanka trips, payments, and messaging.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-400">Upcoming Trips</span>
          <div className="text-3xl font-bold text-emerald-900 mt-2">1</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-400">Saved Guides</span>
          <div className="text-3xl font-bold text-emerald-900 mt-2">4</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-400">Completed Tours</span>
          <div className="text-3xl font-bold text-emerald-900 mt-2">2</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h3 className="font-serif font-bold text-lg text-emerald-950 mb-4">Current Bookings</h3>
        <div className="border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold">AWAITING 30% DEPOSIT</span>
            <h4 className="font-bold text-slate-900 mt-1">3-Day Sigiriya & Kandy Cultural Tour</h4>
            <p className="text-xs text-slate-500">Guide: Kasun Perera (Verified ✓)</p>
          </div>
          <Link to="/booking/demo123/chat" className="bg-emerald-900 text-white text-xs px-4 py-2.5 rounded-lg font-bold hover:bg-emerald-800">
            Unlock Chat & Confirm
          </Link>
        </div>
      </div>
    </div>
  );
}