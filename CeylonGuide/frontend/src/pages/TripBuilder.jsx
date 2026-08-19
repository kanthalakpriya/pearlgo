import React, { useState } from 'react';
import { MapPin, Calculator, Calendar, Users, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TripBuilder() {
  const [selectedDestinations, setSelectedDestinations] = useState(['Sigiriya', 'Ella']);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState('Standard');

  const baseRates = { Budget: 8000, Standard: 15000, Premium: 30000 };
  const dailyGuideFee = 12000;
  const transportEstimate = days * 10000;
  const guideTotal = days * dailyGuideFee;
  const accommodationTotal = days * baseRates[tier] * Math.ceil(travelers / 2);
  const estimatedTotal = guideTotal + transportEstimate + accommodationTotal;
  const initialDeposit = estimatedTotal * 0.30;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-emerald-950">Sri Lanka Custom Trip Builder</h1>
        <p className="text-slate-600 mt-2">Design your ideal tour and calculate real-time estimated costs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-amber-500" /> Select Destinations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Sigiriya', 'Ella', 'Kandy', 'Galle', 'Yala National Park', 'Nuwara Eliya', 'Mirissa', 'Anuradhapura'].map((loc) => {
                const active = selectedDestinations.includes(loc);
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      if (active) setSelectedDestinations(selectedDestinations.filter(d => d !== loc));
                      else setSelectedDestinations([...selectedDestinations, loc]);
                    }}
                    className={`p-3 rounded-xl border text-sm font-semibold transition text-left flex justify-between items-center ${
                      active ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                    }`}
                  >
                    {loc} {active && <CheckCircle2 size={16} className="text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Duration (Days)</label>
              <input type="number" min="1" max="30" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full border border-slate-300 p-3 rounded-xl font-bold text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Travelers</label>
              <input type="number" min="1" max="15" value={travelers} onChange={e => setTravelers(Number(e.target.value))} className="w-full border border-slate-300 p-3 rounded-xl font-bold text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Travel Style</label>
              <select value={tier} onChange={e => setTier(e.target.value)} className="w-full border border-slate-300 p-3 rounded-xl font-bold text-slate-800">
                <option value="Budget">Budget</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="bg-emerald-950 text-white p-8 rounded-2xl border border-emerald-800 shadow-xl h-fit">
          <h3 className="text-xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-2">
            <Calculator size={20} /> Cost Estimate
          </h3>
          <div className="space-y-4 text-sm border-b border-emerald-800 pb-6 text-emerald-100">
            <div className="flex justify-between"><span>Guide Fee ({days} days):</span><span className="font-bold">LKR {guideTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Transport:</span><span className="font-bold">LKR {transportEstimate.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Accommodation:</span><span className="font-bold">LKR {accommodationTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs text-emerald-300"><span>Platform Fee:</span><span>Included</span></div>
          </div>

          <div className="pt-6">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">Total Estimated Trip</span>
              <span className="text-2xl font-extrabold text-amber-400">LKR {estimatedTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-amber-300/80 mb-6">
              <span>Required Initial Deposit (30%):</span>
              <span className="font-bold">LKR {initialDeposit.toLocaleString()}</span>
            </div>

            <a href="/booking/demo123/chat" className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 py-3.5 rounded-xl font-bold text-center block transition shadow-lg">
              Match Guides & Pay 30% Deposit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
