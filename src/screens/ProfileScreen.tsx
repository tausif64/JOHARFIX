import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from '../utils/tw';
import ProfileHeader from '../components/ProfileHeader';
import ProfileCard from '../components/ProfileCard';
import ProfileMenuItem from '../components/ProfileMenuItem';
import LogoutButton from '../components/LogoutButton';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const user = {
    name: 'Rakesh Kumar',
    phone: '+91-8797652498',
    email: 'rakeshk12@gmail.com',
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <ProfileHeader />

      <ProfileCard
        name={user.name}
        phone={user.phone}
        email={user.email}
        onEdit={() => navigation.navigate('EditProfile' as any)}
      />

      <ProfileMenuItem
        title="Saved Addresses"
        subtitle="Manage your addresses"
        onPress={() => navigation.navigate('Addresses' as any)}
        icon={<Text style={tw`text-xl`}>📍</Text>}
      />

      <ProfileMenuItem
        title="Payment Methods"
        subtitle="Manage cards & wallets"
        onPress={() => navigation.navigate('PaymentMethods' as any)}
        icon={<Text style={tw`text-xl`}>💳</Text>}
      />

      <ProfileMenuItem
        title="Notification"
        subtitle="Manage notification"
        onPress={() => navigation.navigate('Notifications' as any)}
        icon={<Text style={tw`text-xl`}>🔔</Text>}
      />

      <ProfileMenuItem
        title="Help & Support"
        subtitle="Get help or contact us"
        onPress={() => navigation.navigate('Help' as any)}
        icon={<Text style={tw`text-xl`}>❓</Text>}
      />

      <LogoutButton
        onPress={() => {
          // implement logout logic
          // e.g. auth.signOut(); navigation.replace('signin')
          console.log('logout');
          navigation.replace('signin' as any);
        }}
      />

      <View style={tw`items-center mt-1`}>
        <Text style={tw`text-gray-400`}>JoharFix v1.0.0</Text>
      </View>

      <View style={tw`flex-1 mt-2`} />

    </ScrollView>
  );
}
