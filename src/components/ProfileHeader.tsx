// components/ProfileHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';

export default function ProfileHeader() {
  return (
    <View style={tw`mt-4`}>
      <View style={tw`rounded-2xl p-5 bg-transparent overflow-hidden`}>
        {/* If you want a real gradient, replace this container with LinearGradient */}
        <View style={tw`rounded-2xl p-5 bg-[#6b46ff]`}>
          <Text style={tw`text-white text-lg`}>Good Morning</Text>
          <Text style={tw`text-white text-2xl font-bold mt-1`}>Profile</Text>
        </View>
      </View>
    </View>
  );
}
