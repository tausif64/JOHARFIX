// screens/BookingsScreen.tsx
import React, { useMemo, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import tw from '../utils/tw';

import BookingHeader from '../components/BookingHeader';
import BookingCard, { BookingStatus } from '../components/BookingCard';
import Tabs, { TabsList, TabsTrigger } from '../components/ui/Tabs';

export interface BookingItem {
  id: string;
  title: string;
  provider: string;
  date: string;
  time?: string;
  address?: string;
  amount?: string;
  status: BookingStatus; // 'upcoming' | 'completed' | 'cancelled'
}

export const SAMPLE: BookingItem[] = [
  {
    id: '1',
    title: 'Deep House Cleaning',
    provider: 'CleanPro Services',
    date: 'Jan 12, 2026',
    time: '10:00 AM',
    address: '12 Sunshine Apartments',
    amount: 'Rs 749',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Sofa Cleaning',
    provider: 'SparkleHome',
    date: 'Jan 14, 2026',
    time: '02:00 PM',
    address: '45 Green Valley',
    amount: 'Rs 499',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Carpet Shampooing',
    provider: 'HomeCare Experts',
    date: 'Jan 18, 2026',
    time: '11:30 AM',
    address: '23 Maple Street',
    amount: 'Rs 899',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Kitchen Deep Clean',
    provider: 'CleanPro Services',
    date: 'Jan 19, 2026',
    time: '09:00 AM',
    address: '66 Lakeview Residency',
    amount: 'Rs 599',
    status: 'upcoming',
  },
  {
    id: '5',
    title: 'AC General Service',
    provider: 'CoolFix Experts',
    date: 'Jan 20, 2026',
    time: '03:00 PM',
    address: 'Green Park Society',
    amount: 'Rs 799',
    status: 'upcoming',
  },
  {
    id: '6',
    title: 'Water Purifier Service',
    provider: 'PureFlow Technicians',
    date: 'Dec 28, 2025',
    time: '01:00 PM',
    address: '7 Lakeview Tower',
    amount: 'Rs 399',
    status: 'completed',
  },
  {
    id: '7',
    title: 'Full Home Cleaning',
    provider: 'CleanPro Services',
    date: 'Dec 22, 2025',
    time: '10:00 AM',
    address: 'Skyline Residency',
    amount: 'Rs 1299',
    status: 'completed',
  },
  {
    id: '8',
    title: 'Electrical Repair',
    provider: 'FixRight Electricians',
    date: 'Dec 19, 2025',
    time: '04:30 PM',
    address: 'Baker Apartments',
    amount: 'Rs 349',
    status: 'completed',
  },
  {
    id: '9',
    title: 'Bathroom Deep Cleaning',
    provider: 'SparkleHome',
    date: 'Dec 15, 2025',
    time: '11:30 AM',
    address: 'Harmony Row',
    amount: 'Rs 699',
    status: 'completed',
  },
  {
    id: '10',
    title: 'Lighting Installation',
    provider: 'FixRight Electricians',
    date: 'Dec 10, 2025',
    time: '09:45 AM',
    address: '27 Oak Street',
    amount: 'Rs 499',
    status: 'completed',
  },
  {
    id: '11',
    title: 'AC Gas Refill',
    provider: 'CoolFix Experts',
    date: 'Dec 7, 2025',
    time: '12:00 PM',
    address: 'Green Park Colony',
    amount: 'Rs 1599',
    status: 'cancelled',
  },
  {
    id: '12',
    title: 'Furniture Polishing',
    provider: 'Carpentry Masters',
    date: 'Dec 5, 2025',
    time: '03:00 PM',
    address: 'Elegance Heights',
    amount: 'Rs 799',
    status: 'cancelled',
  },
  {
    id: '13',
    title: 'Pipe Leakage Fix',
    provider: 'Rapid Plumbers',
    date: 'Dec 2, 2025',
    time: '10:30 AM',
    address: 'Woodland Residency',
    amount: 'Rs 499',
    status: 'cancelled',
  },

  // MORE UPCOMING
  {
    id: '14',
    title: 'Fan Installation',
    provider: 'FixRight Electricians',
    date: 'Jan 22, 2026',
    time: '12:00 PM',
    address: 'Royal Homes',
    amount: 'Rs 249',
    status: 'upcoming',
  },
  {
    id: '15',
    title: 'Geyser Repair',
    provider: 'HeatFix Tech',
    date: 'Jan 23, 2026',
    time: '09:15 AM',
    address: 'Silverline Apartments',
    amount: 'Rs 699',
    status: 'upcoming',
  },

  // MORE COMPLETED
  {
    id: '16',
    title: 'Painting Service',
    provider: 'ColorPro Painters',
    date: 'Nov 28, 2025',
    time: '11:00 AM',
    address: 'Palm Residency',
    amount: 'Rs 2499',
    status: 'completed',
  },
  {
    id: '17',
    title: 'Window Cleaning',
    provider: 'ShineNow Cleaners',
    date: 'Nov 20, 2025',
    time: '02:15 PM',
    address: 'Sunset Boulevard',
    amount: 'Rs 349',
    status: 'completed',
  },

  // MORE CANCELLED
  {
    id: '18',
    title: 'Washing Machine Repair',
    provider: 'ApplianceFix',
    date: 'Nov 18, 2025',
    time: '01:45 PM',
    address: 'Rosewood Avenue',
    amount: 'Rs 599',
    status: 'cancelled',
  },

  // LEFTOVERS
  {
    id: '19',
    title: 'Car Wash at Home',
    provider: 'AutoShine',
    date: 'Jan 25, 2026',
    time: '08:00 AM',
    address: 'Pearl Residency',
    amount: 'Rs 299',
    status: 'upcoming',
  },
  {
    id: '20',
    title: 'Full Kitchen Cleaning',
    provider: 'CleanPro Services',
    date: 'Jan 27, 2026',
    time: '04:00 PM',
    address: 'Lakeview Greens',
    amount: 'Rs 649',
    status: 'upcoming',
  },
];

function EmptyBooking({ title }: { title: string }) {
  return (
    <View style={tw`items-center mt-10`}>
      <Text style={tw`text-gray-500`}>{title}</Text>
    </View>
  );
}

function ListSeparator() {
  return <View style={tw`h-4`} />;
}

function BookingsListHeader({
  tab,
  setTab,
}: {
  tab: 'upcoming' | 'completed' | 'cancelled';
  setTab: (v: 'upcoming' | 'completed' | 'cancelled') => void;
}) {
  return (
    <View>
      <BookingHeader />

      <View style={tw`px-4 mt-4`}>
        <Tabs value={tab} onValueChange={v => setTab(v as any)}>
          <TabsList className="rounded-full bg-indigo-100 p-1.5">
            <TabsTrigger
              value="upcoming"
              className="flex-1 py-3 rounded-full justify-center items-center"
            >
              Upcoming
            </TabsTrigger>

            <TabsTrigger
              value="completed"
              className="flex-1 py-3 rounded-full justify-center items-center"
            >
              Completed
            </TabsTrigger>

            <TabsTrigger
              value="cancelled"
              className="flex-1 py-3 rounded-full justify-center items-center"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </View>
    </View>
  );
}

export default function BookingsScreen({ navigation }: { navigation: any }) {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>(
    'upcoming',
  );

  const data = useMemo<BookingItem[]>(() => {
    if (tab === 'completed')
      return SAMPLE.filter(s => s.status === 'completed');
    if (tab === 'cancelled')
      return SAMPLE.filter(s => s.status === 'cancelled');
    // upcoming
    return SAMPLE.filter(s => s.status === 'upcoming');
  }, [tab]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList<BookingItem>
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookingCard
            title={item.title}
            provider={item.provider}
            date={item.date}
            time={item.time}
            address={item.address}
            amount={item.amount}
            status={item.status}
            onPress={() =>
              navigation.navigate('BookingDetail' as any, { id: item.id })
            }
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={<BookingsListHeader tab={tab} setTab={setTab} />}
        ListFooterComponent={<View style={tw`h-6`} />}
        contentContainerStyle={tw`pb-2`}
        ListEmptyComponent={
          <EmptyBooking
            title={
              tab === 'upcoming'
                ? 'No upcoming bookings'
                : tab === 'completed'
                ? 'No completed bookings'
                : 'No cancelled bookings'
            }
          />
        }
      />
    </View>
  );
}
