const fs = require('fs');
const path = require('path');

const files = {
  // 1. App.jsx - Main Router with All Pages
  'frontend/src/App.jsx': `import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TripBuilder from './pages/TripBuilder';
import GuideWizard from './pages/GuideWizard';
import BookingChat from './pages/BookingChat';
import TouristDashboard from './pages/TouristDashboard';
import GuideDashboard from './pages/GuideDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/build-trip" element={<TripBuilder />} />
            <Route path="/become-guide" element={<GuideWizard />} />
            <Route path="/booking/:id/chat" element={<BookingChat />} />
            <Route path="/dashboard/tourist" element={<TouristDashboard />} />
            <Route path="/dashboard/guide" element={<GuideDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <footer className="bg-emerald-950 text-white py-12 px-6 mt-12 border-t border-emerald-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-400 mb-2">CeylonGuide</h3>
              <p className="text-emerald-200/80 text-sm">Explore Sri Lanka. Travel with Trust. Connecting tourists with verified local experts.</p>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-emerald-100/70">
                <li><Link to="/build-trip" className="hover:text-amber-300">Trip Builder</Link></li>
                <li><Link to="/" className="hover:text-amber-300">Popular Destinations</Link></li>
                <li><Link to="/" className="hover:text-amber-300">Experiences</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-3">Guides</h4>
              <ul className="space-y-2 text-sm text-emerald-100/70">
                <li><Link to="/become-guide" className="hover:text-amber-300">Become a Guide</Link></li>
                <li><Link to="/dashboard/guide" className="hover:text-amber-300">Guide Portal</Link></li>
                <li><Link to="/" className="hover:text-amber-300">Verification Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-3">Legal & Trust</h4>
              <p className="text-xs text-emerald-200/60 leading-relaxed">Verified Badges • Secure 30% Escrow Payments • 24/7 Platform Dispute Protection</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-emerald-900 mt-8 pt-6 text-center text-xs text-emerald-300/50">
            © 2026 CeylonGuide Marketplace platform. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}`,

  // 2. Navbar Component
  'frontend/src/components/Navbar.jsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, User, Shield, MapPin, MessageSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-emerald-950/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-emerald-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-amber-400 text-emerald-950 p-2 rounded-xl font-black">
              <Compass size={26} />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Ceylon<span className="text-amber-400">Guide</span></span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">Verified Tourism</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <Link to="/build-trip" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold">
              <MapPin size={16} /> Trip Builder
            </Link>
            <Link to="/booking/demo123/chat" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <MessageSquare size={16} /> Secure Chat
            </Link>
            <Link to="/become-guide" className="hover:text-amber-300 transition-colors">Become a Guide</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/tourist" className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs px-3.5 py-2 rounded-lg font-semibold border border-emerald-700 transition">
              Tourist App
            </Link>
            <Link to="/dashboard/guide" className="bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs px-3.5 py-2 rounded-lg font-bold transition shadow-sm">
              Guide Portal
            </Link>
            <Link to="/admin" className="p-2 text-emerald-300 hover:text-white transition" title="Admin Portal">
              <Shield size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}`,

  // 3. Landing Page
  'frontend/src/pages/LandingPage.jsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Users, MapPin, Award, CheckCircle, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  const destinations = [
    { name: 'Sigiriya', category: 'Historical & Fortress', img: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
    { name: 'Ella', category: 'Mountains & Waterfalls', img: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80', rating: 4.8 },
    { name: 'Galle Fort', category: 'Colonial & Beaches', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
    { name: 'Kandy', category: 'Cultural & Religious', img: 'https://images.unsplash.com/photo-1588598056927-ac1533bf4284?auto=format&fit=crop&w=600&q=80', rating: 4.7 }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[580px] flex items-center justify-center bg-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=1920&q=80" alt="Sri Lanka Heritage" className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 backdrop-blur-md">
            <ShieldCheck size={16} /> 100% Government License Verified Local Guides
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight leading-tight">
            Explore Sri Lanka. <br/><span className="text-amber-400">Travel with Trust.</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100/90 font-light max-w-2xl mx-auto">
            Discover breathtaking destinations, calculate custom itineraries, and connect with background-checked local guides with zero hassle.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link to="/build-trip" className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-8 py-4 rounded-xl font-bold transition shadow-xl hover:scale-105 flex items-center gap-2">
              Plan Custom Trip <ArrowRight size={18} />
            </Link>
            <Link to="/become-guide" className="bg-emerald-900/80 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-semibold border border-emerald-600 transition backdrop-blur-md">
              Become a Tour Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">Iconic Locations</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mt-1">Popular Sri Lankan Destinations</h2>
          </div>
          <Link to="/build-trip" className="text-emerald-800 font-bold hover:text-amber-600 flex items-center gap-1 mt-4 md:mt-0 text-sm">
            View All Destinations <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-slate-200">
              <div className="relative h-64 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 text-emerald-900">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> {d.rating}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-emerald-700">{d.category}</span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-1">{d.name}</h3>
                <Link to="/build-trip" className="mt-4 w-full bg-slate-100 hover:bg-emerald-800 hover:text-white text-emerald-900 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center transition">
                  Build Trip To {d.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-emerald-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">How CeylonGuide Protects Your Trip</h2>
          <p className="text-emerald-200/80 mt-2">A transparent PickMe-style marketplace built specifically for tour guides.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-emerald-950/60 border border-emerald-800 p-8 rounded-2xl text-left">
            <div className="w-12 h-12 bg-amber-400 text-emerald-950 rounded-xl flex items-center justify-center font-bold text-xl mb-6">1</div>
            <h3 className="text-xl font-bold mb-2">Build Itinerary & Select Guide</h3>
            <p className="text-emerald-200/70 text-sm leading-relaxed">Pick destinations, duration, and preferences. Filter verified guides by ratings, daily rates, and language.</p>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800 p-8 rounded-2xl text-left relative">
            <div className="w-12 h-12 bg-amber-400 text-emerald-950 rounded-xl flex items-center justify-center font-bold text-xl mb-6">2</div>
            <h3 className="text-xl font-bold mb-2">Pay 30% Deposit to Unlock Chat</h3>
            <p className="text-emerald-200/70 text-sm leading-relaxed">To prevent spam, chat unlocks only after backend payment confirmation of 30% initial deposit.</p>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800 p-8 rounded-2xl text-left">
            <div className="w-12 h-12 bg-amber-400 text-emerald-950 rounded-xl flex items-center justify-center font-bold text-xl mb-6">3</div>
            <h3 className="text-xl font-bold mb-2">Travel Safely & Review</h3>
            <p className="text-emerald-200/70 text-sm leading-relaxed">Your guide handles your tour. Pay the balance on arrival and leave authentic verified reviews.</p>
          </div>
        </div>
      </section>
    </div>
  );
}`,

  // 4. Trip Builder & Budget Calculator
  'frontend/src/frontend/src/pages/TripBuilder.jsx': `// Updated below`,
  'frontend/src/pages/TripBuilder.jsx': `import React, { useState } from 'react';
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
                    className={\`p-3 rounded-xl border text-sm font-semibold transition text-left flex justify-between items-center \${
                      active ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                    }\`}
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
}`,

  // 5. Guide Multi-Step Registration Wizard
  'frontend/src/pages/GuideWizard.jsx': `import React, { useState } from 'react';
import { ShieldCheck, User, Award, FileText, CheckCircle } from 'lucide-react';

export default function GuideWizard() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-emerald-950">Become a CeylonGuide Partner</h1>
        <p className="text-slate-600 mt-1">Complete your application to get verified by Sri Lanka Tourism Admin.</p>
      </div>

      {/* Steps Progress */}
      <div className="flex justify-between border-b border-slate-200 pb-4 mb-8">
        {['Personal', 'Professional', 'Verification', 'Agreement'].map((title, i) => (
          <div key={i} className={\`text-xs font-bold uppercase tracking-wider \${step === i+1 ? 'text-amber-600 border-b-2 border-amber-500 pb-1' : 'text-slate-400'}\`}>
            {i+1}. {title}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Personal Details</h3>
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-xl" />
            <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-xl" />
            <input type="tel" placeholder="Phone Number (+94)" className="w-full border p-3 rounded-xl" />
            <button onClick={() => setStep(2)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Professional Details</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Professional Details</h3>
            <input type="number" placeholder="Years of Experience" className="w-full border p-3 rounded-xl" />
            <input type="number" placeholder="Daily Rate (LKR)" className="w-full border p-3 rounded-xl" />
            <textarea placeholder="Biography & Languages Spoken" className="w-full border p-3 rounded-xl h-24"></textarea>
            <button onClick={() => setStep(3)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Document Upload</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Government Verification</h3>
            <p className="text-xs text-slate-500">Your documents remain 100% confidential and will never be shown publicly.</p>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Guide License Registration No.</label>
              <input type="text" placeholder="SLTDA-2026-XXXX" className="w-full border p-3 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Upload License / NIC Photo</label>
              <input type="file" className="w-full border p-2 rounded-xl text-xs" />
            </div>
            <button onClick={() => setStep(4)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Agreement</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-emerald-900">Partner Agreement</h3>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed border max-h-40 overflow-y-auto">
              By registering as a guide on CeylonGuide, you agree to uphold national safety standard regulations, provide honest tour services, and accept 10% platform commission deductions upon booking completions.
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 text-emerald-900" />
              I have read and agree to the CeylonGuide Tour Guide Partner Agreement.
            </label>
            <button disabled={!agreed} onClick={() => alert("Application submitted! Your status is now PENDING_VERIFICATION.")} className="w-full bg-amber-500 disabled:opacity-50 text-emerald-950 py-3.5 rounded-xl font-bold">
              Submit Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`,

  // 6. Tourist Dashboard
  'frontend/src/pages/TouristDashboard.jsx': `import React from 'react';
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
}`,

  // 7. Guide Dashboard
  'frontend/src/pages/GuideDashboard.jsx': `import React from 'react';
import { Shield, DollarSign, Calendar, Star } from 'lucide-react';

export default function GuideDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-emerald-950">Guide Partner Portal</h1>
          <p className="text-slate-600 text-sm">Status: <span className="text-emerald-700 font-bold">VERIFIED ✓</span></p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">Available for Hire</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-slate-400">Total Earnings</span>
          <div className="text-2xl font-bold text-emerald-900 mt-1">LKR 145,000</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-slate-400">10% Platform Fee Paid</span>
          <div className="text-2xl font-bold text-slate-700 mt-1">LKR 14,500</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-slate-400">Completed Tours</span>
          <div className="text-2xl font-bold text-emerald-900 mt-1">8</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-slate-400">Rating</span>
          <div className="text-2xl font-bold text-amber-500 mt-1">4.9 ★</div>
        </div>
      </div>
    </div>
  );
}`,

  // 8. Admin Dashboard
  'frontend/src/pages/AdminDashboard.jsx': `import React from 'react';
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
}`
};

console.log("Updating full application pages...");

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dirName = path.dirname(fullPath);
  
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
});

console.log("\n✅ Application updated successfully!");