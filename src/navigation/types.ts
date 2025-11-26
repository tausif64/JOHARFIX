// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type ServicesStackParamList = {
  services: undefined;
  'service-details': { id: string };
  'booking-details': { id: string };
  payment: { bookingId?: string } | undefined;
  'services-list': { category: string };
};

export type MainTabParamList = {
  home: undefined;
  'services-stack': NavigatorScreenParams<ServicesStackParamList>;
  booking: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  auth: undefined;
  main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  onboarding: undefined;
  signin: undefined;
  signup: undefined;
  verify: { phone: string }; 
};
