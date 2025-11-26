// screens/service/ServicesListScreen.tsx
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import tw from '../../utils/tw';
import ServiceListItem from '../../components/ServiceListItem';

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  rating: string;
  category: string;
  image?: any;
}

export const SERVICES: ServiceItem[] = [
  // HOME CLEANING
  {
    id: '1',
    title: 'Deep Home Cleaning',
    price: 'Rs 899',
    rating: '4.8',
    category: 'Home Cleaning',
  },
  {
    id: '2',
    title: 'Kitchen Deep Cleaning',
    price: 'Rs 599',
    rating: '4.8',
    category: 'Home Cleaning',
  },
  {
    id: '3',
    title: 'Bathroom Cleaning',
    price: 'Rs 299',
    rating: '4.7',
    category: 'Home Cleaning',
  },

  // ELECTRICIAN
  {
    id: '4',
    title: 'Fan Installation / Repair',
    price: 'Rs 249',
    rating: '4.8',
    category: 'Electrician',
  },
  {
    id: '5',
    title: 'Switch / Socket Repair',
    price: 'Rs 199',
    rating: '4.7',
    category: 'Electrician',
  },
  {
    id: '6',
    title: 'Lighting Installation',
    price: 'Rs 499',
    rating: '4.8',
    category: 'Electrician',
  },

  // PLUMBING
  {
    id: '7',
    title: 'Tap Repair / Replacement',
    price: 'Rs 249',
    rating: '4.7',
    category: 'Plumbing',
  },
  {
    id: '8',
    title: 'Drain Blockage Fix',
    price: 'Rs 399',
    rating: '4.8',
    category: 'Plumbing',
  },
  {
    id: '9',
    title: 'Leakage Repair',
    price: 'Rs 349',
    rating: '4.8',
    category: 'Plumbing',
  },

  // CARPENTER
  {
    id: '10',
    title: 'Door / Window Alignment',
    price: 'Rs 499',
    rating: '4.8',
    category: 'Carpenter',
  },
  {
    id: '11',
    title: 'Furniture Assembly',
    price: 'Rs 499',
    rating: '4.8',
    category: 'Carpenter',
  },
  {
    id: '12',
    title: 'Modular Kitchen Repair',
    price: 'Rs 499',
    rating: '4.8',
    category: 'Carpenter',
  },

  // AC REPAIR
  {
    id: '13',
    title: 'AC General Service',
    price: 'Rs 699',
    rating: '4.8',
    category: 'AC Repair',
  },
  {
    id: '14',
    title: 'AC Gas Refill',
    price: 'Rs 1499',
    rating: '4.7',
    category: 'AC Repair',
  },
  {
    id: '15',
    title: 'AC Water Leak Fix',
    price: 'Rs 499',
    rating: '4.8',
    category: 'AC Repair',
  },

  // PAINTING
  {
    id: '16',
    title: 'Interior Wall Painting',
    price: 'Rs 2499',
    rating: '4.8',
    category: 'Painting',
  },
  {
    id: '17',
    title: 'Exterior House Painting',
    price: 'Rs 4999',
    rating: '4.7',
    category: 'Painting',
  },
  {
    id: '18',
    title: 'Ceiling Painting',
    price: 'Rs 1999',
    rating: '4.8',
    category: 'Painting',
  },
];

export default function ServicesListScreen({ route, navigation }: any) {
  const category: string = route?.params?.category ?? '';

  const filtered = SERVICES.filter(s => s.category === category);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={tw`pb-4`}
        renderItem={({ item }) => (
          <ServiceListItem
            title={item.title}
            subtitle={`${item.category} Services`}
            rating={item.rating}
            price={item.price}
            onPressBook={() =>
              navigation.navigate('service-details', { id: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <View style={tw`mt-10 items-center`}>
            <Text style={tw`text-gray-500`}>
              No services found for {category || 'this category'}.
            </Text>
          </View>
        }
      />
    </View>
  );
}
