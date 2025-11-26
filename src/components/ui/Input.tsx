import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import tw from 'twrnc';

type Variant = 'default' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const sizeClass: Record<Size, string> = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2 px-3',
  lg: 'text-lg py-3 px-4',
};

export default function Input({
  value,
  onChangeText,
  placeholder,
  variant = 'default',
  size = 'md',
  secureTextEntry = false,
  keyboardType = 'default',
  className = '',
  style,
  ...rest
}: TextInputProps & {
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: StyleProp<TextStyle | ViewStyle>;
}) {
  const base = 'rounded-lg border';
  const variantClass =
    variant === 'outline'
      ? 'bg-transparent border-gray-300'
      : variant === 'ghost'
      ? 'bg-transparent border-transparent'
      : 'bg-white border-gray-200';

  const twStyles = tw`${base} ${variantClass} ${sizeClass[size]} text-gray-900`;

  return (
    <TextInput
      value={value as any}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType as any}
      style={[twStyles, className ? tw`${className}` : null, style]}
      underlineColorAndroid="transparent"
      {...rest}
    />
  );
}
