// screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import tw from '../utils/tw';

import HomeListHeader from '../components/HomeListHeader';
import PopularServiceItem from '../components/PopularServiceItem';

const POPULAR = [
  {
    id: '1',
    title: 'Deep House Cleaning',
    subtitle: 'Clean Pro Service',
    price: 'Rs 499',
  },
  {
    id: '2',
    title: 'Sofa Cleaning',
    subtitle: 'Clean Pro Service',
    price: 'Rs 699',
  },
  { id: '3', title: 'AC Service', subtitle: 'CoolFix', price: 'Rs 799' },
  {
    id: '4',
    title: 'Full Home Cleaning',
    subtitle: 'Sparkle',
    price: 'Rs 1299',
  },
];

export default function HomeScreen({ navigation }: { navigation?: any }) {
  // stable callback to avoid re-creating functions passed to header
  const handleCategoryPress = useCallback(
    (category: string) => {
      // navigate to category screen or filter
      console.log('category pressed', category);
      navigation.navigate('services-stack', {
        screen: 'services-list',
        params: { category },
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof POPULAR)[0] }) => {
      return (
        <PopularServiceItem
          title={item.title}
          subtitle={item.subtitle}
          price={item.price}
          onPress={() => {
            navigation.navigate('services-stack', {
              screen: 'service-details',
              params: {
                id: item.id,
              },
            });
          }}
        />
      );
    },
    [navigation],
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={POPULAR}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <HomeListHeader onCategoryPress={handleCategoryPress} />
        }
        contentContainerStyle={tw`pb-32`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
