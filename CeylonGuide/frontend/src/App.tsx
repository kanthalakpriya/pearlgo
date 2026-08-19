import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// 1. ඔබගේ Folder structure එකේ දැනට ඇති Pages (Existing Pages)
import LandingPage from './pages/LandingPage';
import TouristDashboard from './pages/TouristDashboard';
import GuideDashboard from './pages/GuideDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TripBuilderPage from './pages/TripBuilderPage';

// 2. තවම නිර්මාණය කර නැති Pages සඳහා Temporary Placeholders
const Placeholder = ({ name }: { name: string }) => (
  <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h2>{name}</h2>
    <p>This page is under development.</p>
  </div>
);

// Public Pages Fallbacks
const HomePage = LandingPage;
const ExplorePage = () => <Placeholder name="Explore Page" />;
const DestinationsPage = () => <Placeholder name="Destinations Page" />;
const DestinationDetailsPage = () => <Placeholder name="Destination Details Page" />;
const GuidesPage = () => <Placeholder name="Guides Page" />;
const GuideProfilePage = () => <Placeholder name="Guide Profile Page" />;
const BudgetCalculatorPage = () => <Placeholder name="Budget Calculator Page" />;
const HowItWorksPage = () => <Placeholder name="How It Works Page" />;
const AboutPage = () => <Placeholder name="About Page" />;
const NotFoundPage = () => <Placeholder name="404 - Page Not Found" />;

// Auth Pages Fallbacks
const LoginSelectionPage = () => <Placeholder name="Login Selection Page" />;
const TouristLoginPage = () => <Placeholder name="Tourist Login Page" />;
const GuideLoginPage = () => <Placeholder name="Guide Login Page" />;
const AdminLoginPage = () => <Placeholder name="Admin Login Page" />;
const TouristRegisterPage = () => <Placeholder name="Tourist Register Page" />;
const GuideRegisterPage = () => <Placeholder name="Guide Register Page" />;

// Tourist Dashboard Sub-Pages Fallbacks
const TouristTripsPage = () => <Placeholder name="Tourist Trips Page" />;
const TouristBookingsPage = () => <Placeholder name="Tourist Bookings Page" />;
const TouristMessagesPage = () => <Placeholder name="Tourist Messages Page" />;
const TouristSavedPage = () => <Placeholder name="Tourist Saved Page" />;
const TouristPaymentsPage = () => <Placeholder name="Tourist Payments Page" />;
const TouristProfilePage = () => <Placeholder name="Tourist Profile Page" />;

// Guide Dashboard Sub-Pages Fallbacks
const GuideRequestsPage = () => <Placeholder name="Guide Requests Page" />;
const GuideToursPage = () => <Placeholder name="Guide Tours Page" />;
const GuideAvailabilityPage = () => <Placeholder name="Guide Availability Page" />;
const GuideMessagesPage = () => <Placeholder name="Guide Messages Page" />;
const GuideEarningsPage = () => <Placeholder name="Guide Earnings Page" />;
const GuideProfileEditPage = () => <Placeholder name="Guide Profile Edit Page" />;

// Admin Dashboard Sub-Pages Fallbacks
const AdminGuidesPage = () => <Placeholder name="Admin Guides Page" />;
const AdminDestinationsPage = () => <Placeholder name="Admin Destinations Page" />;
const AdminBookingsPage = () => <Placeholder name="Admin Bookings Page" />;
const AdminSettingsPage = () => <Placeholder name="Admin Settings Page" />;
const AdminDisputesPage = () => <Placeholder name="Admin Disputes Page" />;

// Legal Pages Fallbacks
const PrivacyPage = () => <Placeholder name="Privacy Policy Page" />;
const TermsPage = () => <Placeholder name="Terms of Service Page" />;

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailsPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:id" element={<GuideProfilePage />} />
            <Route path="/trip-builder" element={<TripBuilderPage />} />
            <Route path="/budget-calculator" element={<BudgetCalculatorPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginSelectionPage />} />
            <Route path="/tourist/login" element={<TouristLoginPage />} />
            <Route path="/tourist/register" element={<TouristRegisterPage />} />
            <Route path="/guide/login" element={<GuideLoginPage />} />
            <Route path="/guide/register" element={<GuideRegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Tourist Protected Routes */}
            <Route path="/tourist/dashboard" element={<ProtectedRoute allowedRole="tourist"><TouristDashboard /></ProtectedRoute>} />
            <Route path="/tourist/trips" element={<ProtectedRoute allowedRole="tourist"><TouristTripsPage /></ProtectedRoute>} />
            <Route path="/tourist/bookings" element={<ProtectedRoute allowedRole="tourist"><TouristBookingsPage /></ProtectedRoute>} />
            <Route path="/tourist/messages" element={<ProtectedRoute allowedRole="tourist"><TouristMessagesPage /></ProtectedRoute>} />
            <Route path="/tourist/saved" element={<ProtectedRoute allowedRole="tourist"><TouristSavedPage /></ProtectedRoute>} />
            <Route path="/tourist/payments" element={<ProtectedRoute allowedRole="tourist"><TouristPaymentsPage /></ProtectedRoute>} />
            <Route path="/tourist/profile" element={<ProtectedRoute allowedRole="tourist"><TouristProfilePage /></ProtectedRoute>} />

            {/* Guide Protected Routes */}
            <Route path="/guide/dashboard" element={<ProtectedRoute allowedRole="guide"><GuideDashboard /></ProtectedRoute>} />
            <Route path="/guide/requests" element={<ProtectedRoute allowedRole="guide"><GuideRequestsPage /></ProtectedRoute>} />
            <Route path="/guide/tours" element={<ProtectedRoute allowedRole="guide"><GuideToursPage /></ProtectedRoute>} />
            <Route path="/guide/availability" element={<ProtectedRoute allowedRole="guide"><GuideAvailabilityPage /></ProtectedRoute>} />
            <Route path="/guide/messages" element={<ProtectedRoute allowedRole="guide"><GuideMessagesPage /></ProtectedRoute>} />
            <Route path="/guide/earnings" element={<ProtectedRoute allowedRole="guide"><GuideEarningsPage /></ProtectedRoute>} />
            <Route path="/guide/profile" element={<ProtectedRoute allowedRole="guide"><GuideProfileEditPage /></ProtectedRoute>} />

            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/guide-verification" element={<ProtectedRoute allowedRole="admin"><AdminGuidesPage /></ProtectedRoute>} />
            <Route path="/admin/destinations" element={<ProtectedRoute allowedRole="admin"><AdminDestinationsPage /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute allowedRole="admin"><AdminBookingsPage /></ProtectedRoute>} />
            <Route path="/admin/commission-settings" element={<ProtectedRoute allowedRole="admin"><AdminSettingsPage /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute allowedRole="admin"><AdminDisputesPage /></ProtectedRoute>} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}