// components/ProfileMenuItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';

export default function ProfileMenuItem({
  title,
  subtitle,
  onPress,
  icon,
  className,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={tw`mx-4 mt-4`}
    >
      <View
        style={tw`bg-white rounded-lg border border-gray-200 p-3 flex-row items-center ${
          className ?? ''
        }`}
      >
        <View
          style={tw`w-12 h-12 rounded-md items-center justify-center bg-gray-100 mr-3`}
        >
          {icon ?? <Text style={tw`text-xl`}>📍</Text>}
        </View>

        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold text-gray-800`}>{title}</Text>
          {subtitle ? (
            <Text style={tw`text-sm text-gray-500 mt-1`}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
