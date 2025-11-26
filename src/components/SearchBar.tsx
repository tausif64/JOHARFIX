// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import tw from '../utils/tw';

export default function SearchBar({
  placeholder = 'Search for services..',
  value,
  onChangeText,
  style,
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (v: string) => void;
  style?: any;
}) {
  return (
    <View style={[tw`rounded-lg bg-white`, style]}>
      <View style={tw`flex-row items-center px-3 py-2`}>
        <View style={tw`mr-2`}>
          <Text style={tw`text-gray-400`}>🔍</Text>
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          style={tw`flex-1 text-gray-800`}
        />
      </View>
    </View>
  );
}
