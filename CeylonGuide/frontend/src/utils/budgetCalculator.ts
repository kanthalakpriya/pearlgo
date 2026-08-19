import { BudgetBreakdown } from '../types';

export interface CalculationInput {
  days: number;
  travelers: number;
  travelStyle: 'Budget' | 'Comfort' | 'Luxury';
  guideDailyRateUSD?: number;
  includeGuide?: boolean;
  totalEntranceFeesUSD?: number;
}

export function calculateTripBudget(input: CalculationInput): BudgetBreakdown {
  const days = Math.max(1, input.days || 1);
  const travelers = Math.max(1, input.travelers || 1);
  const includeGuide = input.includeGuide ?? true;
  const guideRate = input.guideDailyRateUSD || 60;

  // Style Multipliers
  let accomPerNight = 40;
  let foodPerDay = 25;
  let transportPerDay = 35;
  let activityPerDay = 20;

  if (input.travelStyle === 'Comfort') {
    accomPerNight = 90;
    foodPerDay = 45;
    transportPerDay = 65;
    activityPerDay = 35;
  } else if (input.travelStyle === 'Luxury') {
    accomPerNight = 220;
    foodPerDay = 90;
    transportPerDay = 120;
    activityPerDay = 75;
  }

  const guideFee = includeGuide ? days * guideRate : 0;
  const transport = days * transportPerDay;
  const accommodation = days * accomPerNight * Math.ceil(travelers / 2);
  const food = days * travelers * foodPerDay;
  const entranceFees = (input.totalEntranceFeesUSD || 45) * travelers;
  const activities = days * travelers * activityPerDay;

  const subtotal = guideFee + transport + accommodation + food + entranceFees + activities;
  const platformFee = Math.round(subtotal * 0.05); // 5% service fee
  const totalUSD = subtotal + platformFee;

  return {
    guideFee,
    transport,
    accommodation,
    food,
    entranceFees,
    activities,
    platformFee,
    totalUSD,
  };
}