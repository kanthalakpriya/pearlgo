import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => boolean;
  logout: () => void;
  registerTourist: (name: string, email: string) => void;
  registerGuide: (guideData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ceylon_guide_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ceylon_guide_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ceylon_guide_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole): boolean => {
    // Demo authentication handling
    let name = email.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    if (role === 'admin') name = 'System Admin';
    if (role === 'guide') name = 'Kusal Perera (Guide)';
    if (role === 'tourist' && !user) name = 'Alex Morgan (Tourist)';

    const newUser: User = {
      id: `u-${role}-${Date.now().toString().slice(-4)}`,
      name,
      email,
      role,
      avatar: role === 'guide' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const registerTourist = (name: string, email: string) => {
    const newUser: User = {
      id: `u-tourist-${Date.now()}`,
      name,
      email,
      role: 'tourist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const registerGuide = (guideData: any) => {
    const newUser: User = {
      id: `u-guide-${Date.now()}`,
      name: guideData.fullName,
      email: guideData.email,
      role: 'guide',
      avatar: guideData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerTourist, registerGuide }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};