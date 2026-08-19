import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { calculateTripBudget } from '../utils/budgetCalculator';
import { Compass, Calendar, Users, DollarSign, ArrowRight, ShieldCheck, Plus, Trash2 } from 'lucide-react';

export default function TripBuilderPage() {
  const { destinations, guides, saveTrip } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedDests, setSelectedDests] = useState<string[]>(['dest-1', 'dest-2']);
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState<'Budget' | 'Comfort' | 'Luxury'>('Comfort');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('guide-1');

  const budget = calculateTripBudget({
    days,
    travelers,
    travelStyle,
    includeGuide: true,
    guideDailyRateUSD: 60,
  });

  const handleToggleDest = (id: string) => {
    setSelectedDests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSaveAndProceed = () => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || 'guest-tourist',
      title: `${days}-Day Sri Lanka Highlights`,
      startDate: '2026-09-10',
      endDate: '2026-09-15',
      travelersCount: travelers,
      travelStyle,
      accommodation: travelStyle === 'Luxury' ? 'Resort' : 'Boutique' as any,
      selectedDestinationIds: selectedDests,
      dayPlans: selectedDests.map((id, idx) => ({
        day: idx + 1,
        destinationId: id,
        destinationName: destinations.find(d => d.id === id)?.name || 'Destination',
        attractions: ['Sightseeing', 'Cultural Excursion'],
        notes: 'Morning guided tour followed by local cuisine tasting.'
      })),
      estimatedCost: budget,
      guideId: selectedGuideId,
      createdAt: new Date().toISOString(),
    };

    saveTrip(newTrip);
    navigate('/tourist/trips');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#17211D]">Custom Trip Builder</h1>
          <p className="text-slate-600 text-sm mt-1">Design your bespoke itinerary across Sri Lanka</p>
        </div>

        {/* Builder Step Bar */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${step === 1 ? 'bg-[#0B3D2E] text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
            1. Select Destinations
          </span>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${step === 2 ? 'bg-[#0B3D2E] text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
            2. Trip Parameters
          </span>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${step === 3 ? 'bg-[#0B3D2E] text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
            3. Select Guide & Cost
          </span>
        </div>

        {/* Step 1: Destinations Picker */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Destinations to Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {destinations.map(dest => {
                const isSelected = selectedDests.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    onClick={() => handleToggleDest(dest.id)}
                    className={`p-4 rounded-xl border cursor-pointer flex gap-4 transition ${
                      isSelected ? 'border-[#087EA4] bg-sky-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={dest.mainImage} alt={dest.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{dest.name}</h3>
                      <p className="text-xs text-slate-500">{dest.category} • {dest.location}</p>
                      <span className={`inline-block mt-2 text-[11px] font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-[#087EA4] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isSelected ? 'Selected' : 'Add to Trip'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedDests.length === 0}
              className="w-full py-3 bg-[#0B3D2E] text-amber-300 font-bold rounded-xl hover:bg-[#146B4A] transition disabled:opacity-50"
            >
              Next: Trip Details &rarr;
            </button>
          </div>
        )}

        {/* Step 2: Trip Parameters */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Configure Trip Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold mb-1">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={e => setDays(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Travelers Count</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={travelers}
                  onChange={e => setTravelers(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Travel Style</label>
                <select
                  value={travelStyle}
                  onChange={e => setTravelStyle(e.target.value as any)}
                  className="w-full p-3 rounded-xl border text-sm"
                >
                  <option value="Budget">Budget ($)</option>
                  <option value="Comfort">Comfort ($$)</option>
                  <option value="Luxury">Luxury ($$$)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 border rounded-xl font-bold text-sm">Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-[#0B3D2E] text-amber-300 font-bold rounded-xl">Next: Select Guide & Review &rarr;</button>
            </div>
          </div>
        )}

        {/* Step 3: Guide & Budget Calculation */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Select Guide & Estimated Cost</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold mb-2">Choose Verified Guide</label>
                <div className="space-y-3">
                  {guides.map(g => (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGuideId(g.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 ${
                        selectedGuideId === g.id ? 'border-[#087EA4] bg-sky-50' : 'border-slate-200'
                      }`}
                    >
                      <img src={g.avatar} alt={g.fullName} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-sm text-slate-900">{g.fullName}</p>
                        <p className="text-xs text-slate-500">${g.dailyRateUSD}/day • ★ {g.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Budget Display */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 border-b pb-2 mb-4">Estimated Cost Breakdown</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between"><span>Guide Fee ({days} days):</span><span>${budget.guideFee}</span></div>
                  <div className="flex justify-between"><span>Private Transport:</span><span>${budget.transport}</span></div>
                  <div className="flex justify-between"><span>Accommodation:</span><span>${budget.accommodation}</span></div>
                  <div className="flex justify-between"><span>Entrance & Activities:</span><span>${budget.entranceFees + budget.activities}</span></div>
                  <div className="flex justify-between"><span>Platform Fee (5%):</span><span>${budget.platformFee}</span></div>
                  <div className="flex justify-between pt-3 border-t font-bold text-base text-[#0B3D2E]">
                    <span>Total Estimated Cost:</span>
                    <span className="text-[#087EA4]">${budget.totalUSD} USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 border rounded-xl font-bold text-sm">Back</button>
              <button
                onClick={handleSaveAndProceed}
                className="px-8 py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 shadow-lg"
              >
                Save Trip to My Account &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}