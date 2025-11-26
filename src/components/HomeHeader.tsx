import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../utils/tw';
import SearchBar from './SearchBar';
import PromoCard from './PromoCard';

export default function HomeHeader({
  onPressLocation,
  placeholder = 'Search for services..',
}: {
  onPressLocation?: () => void;
  placeholder?: string;
}) {
  return (
    <View>
      {/* Gradient-ish header */}
      <View style={tw`rounded-2xl mt-4 p-5`}>
        {/* We'll simulate a vertical gradient using a background color for now.
            If you want a real gradient, replace this container with LinearGradient */}
        <View style={tw`rounded-2xl px-4 py-5 bg-[#6b46ff]`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-sm`}>Good Morning</Text>
              <Text style={tw`text-white text-xl font-bold mt-1`}>
                Welcome Back!
              </Text>
            </View>

            <TouchableOpacity onPress={onPressLocation} style={tw`ml-4`}>
              {/* placeholder for location icon */}
              <View
                style={tw`w-10 h-10 rounded-full bg-white/15 items-center justify-center`}
              >
                <Text style={tw`text-white`}>📍</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`mt-4`}>
            {/* SearchBar inside header with white background */}
            <SearchBar placeholder={placeholder} />
          </View>
        </View>
      </View>
      <PromoCard />
    </View>
  );
}
