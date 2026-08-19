import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, GuideProfile, Trip, Booking, ChatMessage, Review, PlatformSettings, BookingStatus } from '../types';
import { INITIAL_DESTINATIONS, INITIAL_GUIDES } from '../mockData/sriLankaData';

interface AppContextType {
  destinations: Destination[];
  guides: GuideProfile[];
  trips: Trip[];
  bookings: Booking[];
  messages: ChatMessage[];
  reviews: Review[];
  savedDestinationIds: string[];
  savedGuideIds: string[];
  settings: PlatformSettings;
  // Actions
  toggleSaveDestination: (id: string) => void;
  toggleSaveGuide: (id: string) => void;
  saveTrip: (trip: Trip) => void;
  createBookingRequest: (trip: Trip, guideId: string) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  processDemoPayment: (bookingId: string) => void;
  sendMessage: (bookingId: string, text: string, senderId: string, senderName: string, senderRole: any) => boolean;
  addGuideReview: (bookingId: string, guideId: string, rating: number, comment: string, touristName: string) => void;
  approveGuide: (guideId: string) => void;
  rejectGuide: (guideId: string) => void;
  addDestination: (dest: Destination) => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('cg_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [guides, setGuides] = useState<GuideProfile[]>(() => {
    const saved = localStorage.getItem('cg_guides');
    return saved ? JSON.parse(saved) : INITIAL_GUIDES;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('cg_trips');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('cg_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bk-101',
        tripId: 'trip-demo-1',
        tripTitle: 'Cultural Triangle & Hill Country Explorer',
        touristId: 'u-tourist-1',
        touristName: 'Alex Morgan',
        guideId: 'guide-1',
        guideName: 'Kusal Perera',
        guideAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        startDate: '2026-09-01',
        endDate: '2026-09-05',
        travelersCount: 2,
        totalPriceUSD: 540,
        initialDepositUSD: 162,
        paidDepositUSD: 162,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('cg_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-1',
        bookingId: 'bk-101',
        senderId: 'guide-1',
        senderName: 'Kusal Perera',
        senderRole: 'guide',
        text: 'Ayubowan Alex! Looking forward to guiding your tour in September. Let me know if you have any special preferences.',
        timestamp: new Date().toISOString()
      }
    ];
  });

  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cg_saved_dest');
    return saved ? JSON.parse(saved) : ['dest-1'];
  });

  const [savedGuideIds, setSavedGuideIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cg_saved_guides');
    return saved ? JSON.parse(saved) : ['guide-1'];
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>({
    initialPaymentPercentage: 30,
    platformCommissionPercentage: 10,
  });

  // Sync to local storage
  useEffect(() => { localStorage.setItem('cg_destinations', JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem('cg_guides', JSON.stringify(guides)); }, [guides]);
  useEffect(() => { localStorage.setItem('cg_trips', JSON.stringify(trips)); }, [trips]);
  useEffect(() => { localStorage.setItem('cg_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('cg_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('cg_saved_dest', JSON.stringify(savedDestinationIds)); }, [savedDestinationIds]);
  useEffect(() => { localStorage.setItem('cg_saved_guides', JSON.stringify(savedGuideIds)); }, [savedGuideIds]);

  const toggleSaveDestination = (id: string) => {
    setSavedDestinationIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSaveGuide = (id: string) => {
    setSavedGuideIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const saveTrip = (trip: Trip) => {
    setTrips(prev => [trip, ...prev.filter(t => t.id !== trip.id)]);
  };

  const createBookingRequest = (trip: Trip, guideId: string): Booking => {
    const guide = guides.find(g => g.id === guideId);
    const initialDeposit = Math.round(trip.estimatedCost.totalUSD * (settings.initialPaymentPercentage / 100));

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-5)}`,
      tripId: trip.id,
      tripTitle: trip.title,
      touristId: trip.userId,
      touristName: 'Current Tourist',
      guideId,
      guideName: guide ? guide.fullName : 'Local Guide',
      guideAvatar: guide ? guide.avatar : '',
      startDate: trip.startDate,
      endDate: trip.endDate,
      travelersCount: trip.travelersCount,
      totalPriceUSD: trip.estimatedCost.totalUSD,
      initialDepositUSD: initialDeposit,
      paidDepositUSD: 0,
      status: 'AWAITING_GUIDE_ACCEPTANCE',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const processDemoPayment = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          paidDepositUSD: b.initialDepositUSD,
          status: 'CONFIRMED'
        };
      }
      return b;
    }));
  };

  const sendMessage = (bookingId: string, text: string, senderId: string, senderName: string, senderRole: any): boolean => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      bookingId,
      senderId,
      senderName,
      senderRole,
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
    return true;
  };

  const addGuideReview = (bookingId: string, guideId: string, rating: number, comment: string, touristName: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      bookingId,
      guideId,
      touristId: 'tourist-id',
      touristName,
      touristAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    updateBookingStatus(bookingId, 'COMPLETED');
  };

  const approveGuide = (guideId: string) => {
    setGuides(prev => prev.map(g => g.id === guideId ? { ...g, isVerified: true, status: 'APPROVED' } : g));
  };

  const rejectGuide = (guideId: string) => {
    setGuides(prev => prev.map(g => g.id === guideId ? { ...g, isVerified: false, status: 'REJECTED' } : g));
  };

  const addDestination = (dest: Destination) => {
    setDestinations(prev => [dest, ...prev]);
  };

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider value={{
      destinations,
      guides,
      trips,
      bookings,
      messages,
      reviews,
      savedDestinationIds,
      savedGuideIds,
      settings,
      toggleSaveDestination,
      toggleSaveGuide,
      saveTrip,
      createBookingRequest,
      updateBookingStatus,
      processDemoPayment,
      sendMessage,
      addGuideReview,
      approveGuide,
      rejectGuide,
      addDestination,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};