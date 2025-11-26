import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';

export default function CategoryCard({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-36 h-44 bg-white rounded-md border border-gray-200 mx-2 my-3 items-center justify-start p-3`}
    >
      <View style={tw`w-full h-28 bg-gray-200 rounded-md mb-3`} />
      <Text style={tw`text-sm text-gray-800`}>{title}</Text>
    </TouchableOpacity>
  );
}
