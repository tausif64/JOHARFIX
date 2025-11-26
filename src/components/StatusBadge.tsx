// components/StatusBadge.tsx
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';

export default function StatusBadge({
  status = 'confirmed',
}: {
  status?: 'confirmed' | 'upcoming' | 'cancelled';
}) {
  const map: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    upcoming: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  const s = map[status] ?? map.confirmed;

  return (
    <View style={[tw`px-3 py-1 rounded-full`, tw`${s.bg}`]}>
      <Text style={tw`${s.text} text-xs font-medium`}>{status}</Text>
    </View>
  );
}
