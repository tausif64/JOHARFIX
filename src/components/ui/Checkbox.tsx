import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import tw from 'twrnc';

export interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  className?: string; // tailwind string
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Checkbox({
  checked,
  onChange,
  label = '',
  className = '',
  style,
  labelStyle,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onChange(!checked)}
      style={[
        tw`flex-row items-center space-x-3`,
        className ? tw`${className}` : null,
        style,
      ]}
    >
      <View
        style={[
          tw`w-5 h-5 rounded-md items-center justify-center`,
          checked ? tw`bg-indigo-600` : tw`bg-white border border-gray-300`,
        ]}
      >
        {checked ? (
          <Text style={tw`text-white text-xs font-bold`}>✓</Text>
        ) : null}
      </View>

      {label ? (
        <Text style={[tw`text-gray-800 text-base`, labelStyle]}>{label}</Text>
      ) : null}
    </TouchableOpacity>
  );
}
