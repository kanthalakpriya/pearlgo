import React from 'react';
import { ShieldCheck, Check, X, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold text-emerald-950 mb-2">Platform Admin Console</h1>
      <p className="text-slate-600 text-sm mb-8">Verify guide licenses, monitor 30% payments, and resolve dispute reports.</p>

      <div className="bg-white rounded-2xl border p-6 shadow-sm mb-8">
        <h3 className="font-bold text-lg text-emerald-950 mb-4">Pending Guide License Approvals</h3>
        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-900">Sunil Wickramasinghe</h4>
            <p className="text-xs text-slate-500">License: SLTDA-2026-8841 • 6 Years Exp</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => alert("Approved guide Sunil!")} className="bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
              <Check size={14} /> Approve
            </button>
            <button className="bg-red-100 text-red-700 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
              <X size={14} /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}