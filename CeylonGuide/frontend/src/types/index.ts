export type UserRole = 'tourist' | 'guide' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  createdAt: string;
}

export interface GuideProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  languages: string[];
  specializations: string[];
  experienceYears: number;
  dailyRateUSD: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';
  location: string;
  licenseNumber: string;
  licenseDocumentUrl?: string;
  payoutBank?: string;
  payoutAccount?: string;
  availabilityDates: string[]; // ISO YYYY-MM-DD
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: 'Heritage' | 'Beach' | 'Wildlife' | 'Hill Country' | 'Adventure' | 'Wellness';
  description: string;
  mainImage: string;
  gallery: string[];
  rating: number;
  bestSeason: string;
  duration: string;
  entranceFeeUSD: number;
  openingHours: string;
  activities: string[];
  nearbyAttractions: string[];
  isHiddenGem: boolean;
  tags: string[];
}

export interface DayPlan {
  day: number;
  destinationId: string;
  destinationName: string;
  attractions: string[];
  notes: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  travelStyle: 'Budget' | 'Comfort' | 'Luxury';
  accommodation: 'Standard Hotel' | 'Boutique' | 'Resort' | 'Homestay';
  selectedDestinationIds: string[];
  dayPlans: DayPlan[];
  estimatedCost: BudgetBreakdown;
  guideId?: string;
  createdAt: string;
}

export type BookingStatus = 
  | 'PENDING' 
  | 'AWAITING_GUIDE_ACCEPTANCE' 
  | 'AWAITING_PAYMENT' 
  | 'CONFIRMED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'REFUND_REQUESTED' 
  | 'REFUNDED' 
  | 'DISPUTED';

export interface Booking {
  id: string;
  tripId: string;
  tripTitle: string;
  touristId: string;
  touristName: string;
  guideId: string;
  guideName: string;
  guideAvatar: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  totalPriceUSD: number;
  initialDepositUSD: number; // 30%
  paidDepositUSD: number;
  status: BookingStatus;
  createdAt: string;
  cancellationReason?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Review {
  id: string;
  bookingId: string;
  guideId: string;
  touristId: string;
  touristName: string;
  touristAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BudgetBreakdown {
  guideFee: number;
  transport: number;
  accommodation: number;
  food: number;
  entranceFees: number;
  activities: number;
  platformFee: number;
  totalUSD: number;
}

export interface PlatformSettings {
  initialPaymentPercentage: number; // e.g. 30%
  platformCommissionPercentage: number; // e.g. 10%
}