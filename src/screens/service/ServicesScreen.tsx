import React from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from '../../utils/tw';
import ServiceListItem from '../../components/ServiceListItem';
import { useNavigation } from '@react-navigation/native';

const DATA = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: 'Deep House Cleaning',
  subtitle: 'Clean Pro Service',
  rating: '4.8',
  price: 'Rs 499',
}));

export default function ServicesScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 px-0`}>
        {/* Top header */}
        <View style={tw`py-4 px-4 border-b border-gray-100`}>
          <Text style={tw`text-lg text-center font-semibold text-gray-800`}>
            All Services
          </Text>
        </View>

        {/* List */}
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ServiceListItem
              title={item.title}
              subtitle={item.subtitle}
              rating={item.rating}
              price={item.price}
              onPressBook={() => {
                // Navigate to verify/booking flow — pass phone or service as needed
                navigation.navigate('service-details' as any, {});
              }}
            />
          )}
          contentContainerStyle={tw`pb-10`}
        />
      </View>
    </View>
  );
}
