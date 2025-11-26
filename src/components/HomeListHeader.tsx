import React from 'react';
import { View, Text } from 'react-native';
import tw from '../utils/tw';
import HomeHeader from './HomeHeader';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
  'Home Cleaning',
  'Electrician',
  'Plumbing',
  'Carpenter',
  'AC Repair',
  'Painting',
];

export default function HomeListHeader({
  onCategoryPress,
}: {
  onCategoryPress?: (c: string) => void;
}) {
  return (
    <View>
      <HomeHeader
        onPressLocation={() => {
          /* open map */
        }}
      />

      <View style={tw`mx-4 mt-4`}>
        <Text style={tw`text-base font-semibold text-gray-800`}>
          Categories
        </Text>
      </View>

      {/* categories grid */}
      <View style={tw`flex-row flex-wrap justify-center px-3`}>
        {CATEGORIES.map(c => (
          <CategoryCard
            key={c}
            title={c}
            onPress={() => onCategoryPress?.(c)}
          />
        ))}
      </View>

      <View style={tw`mt-6 mx-4 flex-row justify-between items-center px-3`}>
        <Text style={tw`text-base font-semibold text-gray-800`}>
          Popular services
        </Text>
        <Text style={tw`text-secondary`}>See All</Text>
      </View>
    </View>
  );
}
