import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';

export default function TouristLoginPage({ roleName = "Tourist" }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Login Logic (e.g., Auth API call)
    alert(`Logged in as ${roleName}!`);
    navigate('/tourist/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border rounded-2xl shadow-sm p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-emerald-950">{roleName} Login</h2>
          <p className="text-slate-500 text-sm mt-1">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 mt-2"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          <Link to="/login" className="text-emerald-700 font-bold hover:underline">
            ← Switch Account Type
          </Link>
        </div>
      </div>
    </div>
  );
}
