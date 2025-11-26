// src/navigation/navigatores/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../../screens/OnboardingScreen';
import SignInScreen from '../../screens/auth/SignInScreen';
import VerifyScreen from '../../screens/auth/VerifyScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import { AuthStackParamList } from '../types';
import { storage } from '../../lib/mmkv-store';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const onboarded = storage.getBoolean('onboarded');
  return (
    <Stack.Navigator initialRouteName={onboarded ? 'signin' : 'onboarding'}>
      <Stack.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signin"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verify"
        component={VerifyScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
