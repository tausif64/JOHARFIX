import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export default function BookingCard({
  title,
  provider,
  date,
  time,
  address,
  amount,
  status = 'upcoming',
  onPress,
}: {
  title: string;
  provider?: string;
  date: string;
  time?: string;
  address?: string;
  amount?: string;
  status?: BookingStatus;
  onPress?: () => void;
}) {
  // small badge UI based on status
  const badge = (() => {
    switch (status) {
      case 'completed':
        return {
          text: 'Completed',
          bg: tw`bg-emerald-100`,
          textClass: tw`text-emerald-800`,
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          bg: tw`bg-red-100`,
          textClass: tw`text-red-800`,
        };
      case 'upcoming':
      default:
        return {
          text: 'Upcoming',
          bg: tw`bg-yellow-100`,
          textClass: tw`text-yellow-800`,
        };
    }
  })();

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={tw`mx-4 mt-4`}
    >
      <View style={tw`bg-white border border-gray-200 rounded-xl p-4`}>
        <View style={tw`flex-row justify-between items-start`}>
          <View style={tw`flex-1 pr-4`}>
            <Text style={tw`text-lg font-semibold text-gray-800`}>{title}</Text>
            {provider ? (
              <Text style={tw`text-sm text-gray-500 mt-1`}>{provider}</Text>
            ) : null}
          </View>

          <View style={[tw`px-3 py-1 rounded-full`, badge.bg]}>
            <Text style={[tw`text-xs font-medium`, badge.textClass]}>
              {badge.text}
            </Text>
          </View>
        </View>

        <View style={tw`mt-4 flex-row items-center`}>
          <Text style={tw`text-gray-600 mr-3`}>📅</Text>
          <Text style={tw`text-gray-700`}>{date}</Text>
          {time ? <Text style={tw`mx-3 text-gray-400`}>•</Text> : null}
          {time ? <Text style={tw`text-gray-700`}>{time}</Text> : null}
        </View>

        {address ? (
          <Text style={tw`text-sm text-gray-600 mt-3`}>{address}</Text>
        ) : null}

        <View
          style={tw`border-t border-gray-100 mt-4 pt-3 flex-row items-center justify-between`}
        >
          <Text style={tw`text-sm text-gray-600`}>Total Amount</Text>
          <Text style={tw`text-primary font-semibold`}>{amount ?? 'Rs 0'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
