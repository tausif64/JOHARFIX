
import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import tw from '../../utils/tw';


const TABS = [
  {
    label: 'Home',
    route: 'home',
    icon: require('../../../assets/icons/home.png'),
    iconActive: require('../../../assets/icons/home-active.png'),
  },
  {
    label: 'Services',
    route: 'services-stack',
    icon: require('../../../assets/icons/services.png'),
    iconActive: require('../../../assets/icons/services-active.png'),
  },
  {
    label: 'Bookings',
    route: 'booking',
    icon: require('../../../assets/icons/bookings.png'),
    iconActive: require('../../../assets/icons/bookings-active.png'),
  },
  {
    label: 'Profile',
    route: 'profile',
    icon: require('../../../assets/icons/profile.png'),
    iconActive: require('../../../assets/icons/profile-active.png'),
  },
];

export default function BottomTabs({ state, navigation }: BottomTabBarProps) {
  return (
    <View
      style={tw`bg-white border-t border-gray-200 py-2 px-4 flex-row justify-between`}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const tab = TABS.find(t => t.route === route.name);
        if (!tab) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={tw`flex-1 items-center`}
          >
            <Image
              source={isFocused ? tab.iconActive : tab.icon}
              style={tw`h-[26px] w-[26px]`}
              resizeMode="contain"
            />

            <Text
              style={tw`${
                isFocused ? 'text-secondary' : 'text-gray-500'
              } text-xs mt-1`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
