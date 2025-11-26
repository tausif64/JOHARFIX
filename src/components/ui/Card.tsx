import React from 'react';
import {
  View,
  Text,
  ViewProps,
  StyleProp,
  ViewStyle,
  TextProps,
  TextStyle,
} from 'react-native';
import tw from '../../utils/tw';

export interface CardBaseProps extends ViewProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card components recreated to use twrnc.
 * Usage remains:
 * <Card><CardHeader>...</CardHeader>...
 */

export function Card({ className = '', style, ...props }: CardBaseProps) {
  return (
    <View
      data-slot="card"
      style={[
        tw`bg-white text-gray-900 rounded-xl border border-gray-200 shadow-none p-6 flex flex-col gap-6`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...props}
    />
  );
}

export function CardHeader({ className = '', style, ...props }: CardBaseProps) {
  return (
    <View
      data-slot="card-header"
      style={[
        tw`flex flex-col gap-2 pb-4`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...props}
    />
  );
}

export function CardTitle({
  className = '',
  style,
  ...props
}: TextProps & { className?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text
      data-slot="card-title"
      style={[
        tw`font-semibold text-lg text-gray-900`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...(props as any)}
    />
  );
}

export function CardDescription({
  className = '',
  style,
  ...props
}: TextProps & { className?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text
      data-slot="card-description"
      style={[
        tw`text-gray-500 text-sm`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...(props as any)}
    />
  );
}

export function CardAction({ className = '', style, ...props }: CardBaseProps) {
  return (
    <View
      data-slot="card-action"
      style={[tw`self-end`, className ? tw`${className}` : null, style]}
      {...props}
    />
  );
}

export function CardContent({
  className = '',
  style,
  ...props
}: CardBaseProps) {
  return (
    <View
      data-slot="card-content"
      style={[tw`pt-4`, className ? tw`${className}` : null, style]}
      {...props}
    />
  );
}

export function CardFooter({ className = '', style, ...props }: CardBaseProps) {
  return (
    <View
      data-slot="card-footer"
      style={[
        tw`flex items-center pt-4`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...props}
    />
  );
}

export default {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
