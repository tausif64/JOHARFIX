// components/BookingHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';

export default function BookingHeader({
  title = 'My Bookings',
  subtitle = 'Track your service booking',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={tw`px-4 mt-4`}>
      <View style={tw`rounded-2xl p-5 bg-[#6b46ff]`}>
        <Text style={tw`text-white text-lg`}>Good Morning</Text>
        <Text style={tw`text-white text-2xl font-bold mt-1`}>{title}</Text>
        {subtitle ? (
          <Text style={tw`text-white/80 mt-2`}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}
