import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Compass, MapPin, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section with #05abc4 Theme */}
      <section className="relative h-[85vh] min-h-[580px] flex items-center justify-center bg-[#021b24] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 scale-105"
          >
            <source src="https://www.pexels.com/download/video/32504480/" />
          </video>

          {/* #05abc4 Vivid Azure Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021b24] via-[#05abc4]/20 to-[#021b24]/90"></div>
          <div className="absolute inset-0 bg-[#05abc4]/10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#05abc4]/20 border border-[#05abc4]/40 text-[#05abc4] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
            <ShieldCheck size={16} />
            <span>100% Government License Verified Local Guides</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Explore Sri Lanka.<br />
            <span className="text-amber-400">Travel with Trust.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover breathtaking destinations, calculate custom itineraries, and connect with background-checked local guides with zero hassle.
          </p>

          {/* Action Buttons (Direct Transform මඟින් පහළට ගෙන ඇත) */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ transform: 'translateY(50px)' }}
          >
            <Link 
              to="/build-trip" 
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-3.5 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Plan Custom Trip <ArrowRight size={18} />
            </Link>
            <Link 
              to="/become-guide" 
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 border border-[#05abc4] text-white px-7 py-3.5 rounded-xl font-bold transition cursor-pointer"
            >
              Become a Tour Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#05abc4]/10 text-[#05abc4] rounded-xl flex items-center justify-center mb-5">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Smart Trip Builder</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Build tailored itineraries across Sri Lanka with real-time budget and distance calculations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#05abc4]/10 text-[#05abc4] rounded-xl flex items-center justify-center mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Verified Escrow Payments</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pay 30% advance deposit held securely in Escrow to unlock guide communication with peace of mind.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-[#05abc4]/10 text-[#05abc4] rounded-xl flex items-center justify-center mb-5">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Licensed Local Guides</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Connect directly with background-checked, SLTDA-licensed local experts for authentic travel experiences.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}