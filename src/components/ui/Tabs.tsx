// components/Tabs.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  View,
  Text,
  ViewProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import tw from 'twrnc';

type TabsContextType = {
  value: string;
  onChange: (v: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps extends ViewProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function Tabs({
  defaultValue = '',
  value,
  onValueChange,
  children,
  className = '',
  style,
  ...rest
}: TabsProps) {
  const [internal, setInternal] = useState<string>(defaultValue);
  const activeValue = value ?? internal;

  const ctx = useMemo(
    () => ({
      value: activeValue,
      onChange: (v: string) => {
        if (onValueChange) onValueChange(v);
        else setInternal(v);
      },
    }),
    [activeValue, onValueChange],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <View style={[className ? tw`${className}` : null, style]} {...rest}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function TabsList({
  children,
  className = '',
  style,
  ...rest
}: TabsListProps) {
  return (
    <View
      style={[
        tw`flex-row gap-2`,
        className ? tw`${className}` : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export function TabsTrigger({
  value,
  children,
  className = '',
  style,
}: TabsTriggerProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within a Tabs');

  const active = ctx.value === value;

  return (
    <Pressable
      onPress={() => ctx.onChange(value)}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[
        tw`px-4 rounded-full`,
        active ? tw`bg-white` : tw`bg-transparent`,
        className ? tw`${className}` : null,
        style,
      ]}
    >
      <Text style={active ? tw`text-black font-semibold text-center` : tw`text-gray-800 font-semibold`}>
        {children}
      </Text>
    </Pressable>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function TabsContent({
  value,
  children,
  className = '',
  style,
}: TabsContentProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  if (ctx.value !== value) return null;

  return (
    <View style={[className ? tw`${className}` : null, style]}>{children}</View>
  );
}

export default Tabs;
