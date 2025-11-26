import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';

export default function PopularServiceItem({
  title,
  subtitle,
  price,
  onPress,
}: {
  title: string;
  subtitle?: string;
  price?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={tw`mx-4 my-2`}>
      <View
        style={tw`flex-row items-center bg-white border border-gray-200 rounded-md p-3`}
      >
        <View style={tw`w-16 h-16 bg-gray-200 rounded-md mr-4`} />
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold text-gray-800`}>{title}</Text>
          <Text style={tw`text-sm text-gray-500 mt-1`}>{subtitle}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <Text style={tw`text-sm`}>⭐</Text>
            <Text style={tw`text-sm text-gray-700 ml-1`}>4.8</Text>
          </View>
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`text-secondary`}>{price ?? 'Rs 499'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
