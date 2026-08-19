import React from 'react';
import { Link } from 'react-router-dom';
import { User, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginSelectionPage() {
  const roles = [
    {
      title: "Tourist Portal",
      description: "Book tours, message guides, and manage your trip itinerary.",
      icon: <User className="text-emerald-600" size={32} />,
      link: "/tourist/login",
      badge: "Traveler"
    },
    {
      title: "Local Guide Portal",
      description: "Manage tour requests, update calendar availability, and check earnings.",
      icon: <Compass className="text-emerald-600" size={32} />,
      link: "/guide/login",
      badge: "Tour Guide"
    },
    {
      title: "Admin Console",
      description: "Verify guide licenses, monitor platform payments, and handle disputes.",
      icon: <ShieldCheck className="text-emerald-600" size={32} />,
      link: "/admin/login",
      badge: "Administrator"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center max-w-xl mb-10">
        <h1 className="text-3xl font-serif font-bold text-emerald-950 mb-3">Welcome Back</h1>
        <p className="text-slate-600 text-sm">Please select your account type to proceed to the login portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role, index) => (
          <Link
            key={index}
            to={role.link}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl">{role.icon}</div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">{role.badge}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
              <p className="text-sm text-slate-500 mb-6">{role.description}</p>
            </div>
            <div className="flex items-center text-emerald-800 font-bold text-sm group-hover:translate-x-1 transition-transform">
              Continue to Login <ArrowRight size={16} className="ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}