// components/ServiceListItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';
import Button from './ui/Button';

export default function ServiceListItem({
  title,
  subtitle,
  rating,
  price,
  onPressBook,
}: {
  title: string;
  subtitle?: string;
  rating?: string | number;
  price?: string;
  onPressBook?: () => void;
}) {
  return (
    <View style={tw`mx-4 mt-3 mb-1`}>
      <View
        style={tw`bg-white border border-gray-200 rounded-lg p-3 flex-row items-center`}
      >
        {/* Left image */}
        <View style={tw`w-32 h-32 bg-gray-200 rounded-md`} />

        {/* Center details */}
        <View style={tw`flex-1 px-3`}>
          <View style={tw`mb-2`}>
            <Text style={tw`text-base font-semibold text-gray-800`}>
              {title}
            </Text>
            <Text style={tw`text-sm text-gray-500 mt-1`}>{subtitle}</Text>

            <View style={tw`flex-row items-center mt-1`}>
              <Text style={tw`text-sm mr-2`}>⭐</Text>
              <Text style={tw`text-sm text-gray-700 mr-3`}>
                {rating ?? '4.8'}
              </Text>
              <Text style={tw`text-sm text-secondary font-medium`}>
                {price ?? 'Rs 499'}
              </Text>
            </View>
          </View>
          {/* Book Now button */}
          <Button onPress={onPressBook}>Book Now</Button>
        </View>
      </View>
    </View>
  );
}
