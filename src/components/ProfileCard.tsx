// components/ProfileCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from '../utils/tw';

export default function ProfileCard({
  name,
  phone,
  email,
  onEdit,
  initials,
  avatar,
}: {
  name: string;
  phone?: string;
  email?: string;
  onEdit?: () => void;
  initials?: string;
  avatar?: any; // ImageSourcePropType
}) {
  return (
    <View style={tw`mx-4`}>
      <View
        style={tw`bg-white rounded-lg border border-gray-200 p-4 flex-row items-center`}
      >
        {/* Avatar */}
        {avatar ? (
          <Image source={avatar} style={tw`w-16 h-16 rounded-full mr-4`} />
        ) : (
          <View
            style={tw`w-16 h-16 rounded-full mr-4 items-center justify-center bg-primary`}
          >
            <Text style={tw`text-white text-lg font-semibold`}>
              {initials ??
                name
                  ?.split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2) ??
                'U'}
            </Text>
          </View>
        )}

        {/* Details */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold text-gray-800`}>{name}</Text>
          {phone ? (
            <Text style={tw`text-sm text-gray-500 mt-1`}>{phone}</Text>
          ) : null}
          {email ? (
            <Text style={tw`text-sm text-gray-500 mt-1`}>{email}</Text>
          ) : null}
        </View>

        {/* Edit */}
        <TouchableOpacity onPress={onEdit}>
          <Text style={tw`text-primary font-medium`}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
