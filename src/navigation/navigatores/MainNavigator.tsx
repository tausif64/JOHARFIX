// src/navigation/navigatores/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import ServicesScreen from '../../screens/service/ServicesScreen';
import BookingsScreen from '../../screens/BookingScreen';
import BottomTabs from './BottomTabs';
import ServiceDetailsScreen from '../../screens/service/ServiceDetailsScreen';
import BookingDetailsScreen from '../../screens/service/BookingDetailsScreen';
import PaymentScreen from '../../screens/service/PaymentScreen';
import ServicesListScreen from '../../screens/service/ServicesListScreen';
import { MainTabParamList, ServicesStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ServicesStackNavigator = createStackNavigator<ServicesStackParamList>();

const ServicesStack = () => {
  return (
    <ServicesStackNavigator.Navigator initialRouteName="services">
      <ServicesStackNavigator.Screen
        name="services"
        component={ServicesScreen}
        options={{ headerShown: false }}
      />

      <ServicesStackNavigator.Screen
        name="service-details"
        component={ServiceDetailsScreen}
        options={{ title: 'Service Details' }}
      />

      <ServicesStackNavigator.Screen
        name="booking-details"
        component={BookingDetailsScreen}
        options={{ title: 'Booking Details' }}
      />

      <ServicesStackNavigator.Screen
        name="payment"
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />

      <ServicesStackNavigator.Screen
        name="services-list"
        component={ServicesListScreen}
        options={({
          route,
        }: {
          route: RouteProp<ServicesStackParamList, 'services-list'>;
        }) => ({
          title: route.params.category || 'Services',
        })}
      />
    </ServicesStackNavigator.Navigator>
  );
};

const renderTabBar = (props: any) => <BottomTabs {...props} />;

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen name="home" component={HomeScreen} />

      <Tab.Screen
        name="services-stack"
        component={ServicesStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('services-stack', {
              screen: 'services',
            });
          },
        })}
      />

      <Tab.Screen name="booking" component={BookingsScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
