// components/PromoCard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';

export default function PromoCard({
  title = 'Get 30% OFF',
  subtitle = 'On Your First booking',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={tw`mx-10 -mt-5 rounded-lg bg-indigo-50 p-4`}>
      <Text style={tw`text-gray-800 font-semibold text-base`}>{title}</Text>
      <Text style={tw`text-gray-500 mt-2`}>{subtitle}</Text>
    </View>
  );
}
