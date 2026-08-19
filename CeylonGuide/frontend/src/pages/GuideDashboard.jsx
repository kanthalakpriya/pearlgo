import React from 'react';
import { Shield, DollarSign, Calendar, Star } from 'lucide-react';

export default function GuideDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold text-emerald-950 mb-2">Local Guide Console</h1>
      <p className="text-slate-600 text-sm mb-8">Manage tour requests, availability, and view earnings.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Earnings</p>
            <p className="text-xl font-bold text-slate-900">$1,250</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 p-3 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Active Bookings</p>
            <p className="text-xl font-bold text-slate-900">4 Tours</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 text-amber-800 p-3 rounded-xl">
            <Star size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Rating</p>
            <p className="text-xl font-bold text-slate-900">4.9 / 5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}