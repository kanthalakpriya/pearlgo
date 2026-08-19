import React from 'react';
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
              <h3 className="font-serif text-2xl font-bold text-amber-400 mb-2">PearlGo</h3>
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
            © 2026 PearlGo Marketplace platform. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
