import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';

export default function LogoutButton({ onPress }: { onPress?: () => void }) {
  return (
    <View style={tw`mx-4 mt-4`}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={tw`items-center py-3`}
      >
        <Text style={tw`text-red-500 font-semibold text-lg`}>↪ Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
