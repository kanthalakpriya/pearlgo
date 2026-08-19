import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Compass, Calendar, MessageSquare, Heart, 
  CreditCard, Star, User, LogOut, ShieldCheck, FileText, Settings, Users, AlertTriangle 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinks = () => {
    if (user?.role === 'tourist') {
      return [
        { to: '/tourist/dashboard', label: 'Overview', icon: LayoutDashboard },
        { to: '/tourist/trips', label: 'My Trips', icon: Compass },
        { to: '/tourist/bookings', label: 'Bookings', icon: Calendar },
        { to: '/tourist/messages', label: 'Messages', icon: MessageSquare },
        { to: '/tourist/saved', label: 'Saved Items', icon: Heart },
        { to: '/tourist/payments', label: 'Payments', icon: CreditCard },
        { to: '/tourist/profile', label: 'My Profile', icon: User },
      ];
    } else if (user?.role === 'guide') {
      return [
        { to: '/guide/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/guide/requests', label: 'Booking Requests', icon: Calendar },
        { to: '/guide/tours', label: 'My Tours', icon: Compass },
        { to: '/guide/availability', label: 'Availability', icon: Calendar },
        { to: '/guide/messages', label: 'Messages', icon: MessageSquare },
        { to: '/guide/earnings', label: 'Earnings', icon: CreditCard },
        { to: '/guide/profile', label: 'Edit Profile', icon: User },
      ];
    } else if (user?.role === 'admin') {
      return [
        { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { to: '/admin/users', label: 'Users & Guides', icon: Users },
        { to: '/admin/guide-verification', label: 'Guide Verification', icon: ShieldCheck },
        { to: '/admin/destinations', label: 'Destinations', icon: Compass },
        { to: '/admin/bookings', label: 'Bookings & Refunds', icon: FileText },
        { to: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
        { to: '/admin/commission-settings', label: 'Platform Settings', icon: Settings },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0B3D2E] text-white p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#087EA4] flex items-center justify-center font-bold text-lg text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-bold text-sm text-amber-300 leading-tight">{user?.name}</p>
              <p className="text-xs text-emerald-200 capitalize">{user?.role} Account</p>
            </div>
          </div>

          <nav className="space-y-1">
            {getNavLinks().map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive ? 'bg-[#146B4A] text-amber-300 font-bold' : 'text-slate-200 hover:bg-white/10'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
          <div className="bg-emerald-950/60 border border-emerald-500/30 p-3 rounded-lg text-xs text-emerald-300">
            <p className="font-semibold text-amber-400">Demo Environment Active</p>
            <p className="text-[11px] text-emerald-200/80 mt-0.5">Session state persists in localStorage.</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-900/30 transition cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#17211D]">{title}</h1>
            <p className="text-xs text-slate-500 mt-1">CeylonGuide Verified Experience Management</p>
          </div>
          <Link to="/" className="text-sm font-semibold text-[#087EA4] hover:underline flex items-center gap-1">
            Back to Public Portal &rarr;
          </Link>
        </header>

        {children}
      </main>
    </div>
  );
};