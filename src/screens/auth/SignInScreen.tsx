import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '../../utils/tw';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type NavigationProp = any;

// --- Replace these with your real implementations ---
async function sendOtpToPhone(phone: string) {
  console.log('sendOtpToPhone:', phone);
  return new Promise(res => setTimeout(() => res({ ok: true }), 600));
}

async function signInWithGoogle() {
  console.log('signInWithGoogle');
  return new Promise(res => setTimeout(() => res({ ok: true }), 800));
}
// ----------------------------------------------------

export default function SignInScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!/^\+?[0-9]{7,15}$/.test(phone)) {
      Alert.alert(
        'Invalid phone',
        'Please enter a valid phone number (digits only, optional leading +).',
      );
      return;
    }

    try {
      setLoading(true);
      const res: any = await sendOtpToPhone(phone);
      if (res?.ok) {
        navigation.navigate('verify' as any, { phone });
      } else {
        Alert.alert('Error', 'Failed to send verification code. Try again.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setGoogleLoading(true);
      const res: any = await signInWithGoogle();
      if (res?.ok) {
        navigation.reset({ index: 0, routes: [{ name: 'Home' as any }] });
      } else {
        Alert.alert('Error', 'Google sign-in failed.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Google sign-in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={tw`flex-1 bg-white`}
    >
      <View style={tw`flex-1 items-center justify-center py-8`}>
        <View
          style={tw`w-22 h-22 rounded-[20px] border-2 justify-center items-center mb-4`}
        >
          <Text style={tw`text-sm text-gray-500`}>Logo</Text>
        </View>
        {/* Card (main) */}
        <Card className="w-full border-0 gap-0">
          <CardHeader>
            <View style={tw`items-center`}>
              <CardTitle className="font-inter text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="font-open-sans">
                Login to continue
              </CardDescription>
            </View>
          </CardHeader>

          <CardContent>
            <View style={tw`space-y-4`}>
              {/* Phone Input */}
              <View style={tw`mb-3`}>
                <Text style={tw`text-sm text-gray-700 mb-2 font-open-sans`}>
                  Phone Number
                </Text>

                {/* Input accepts className/style; keep consistent spacing with design */}
                <Input
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+91 12345 67890"
                  keyboardType="phone-pad"
                  className="rounded-lg border border-gray-200 px-4 py-3 bg-white"
                />
              </View>

              {/* Primary Button */}
              <Button
                onPress={handleSendOtp}
                disabled={loading}
                className="w-full"
                variant="default"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>

              {/* Separator */}
              <View style={tw`flex-row items-center my-2`}>
                <View style={tw`flex-1 h-px bg-gray-200`} />
                <Text style={tw`px-3 text-sm text-gray-500`}>or</Text>
                <View style={tw`flex-1 h-px bg-gray-200`} />
              </View>

              {/* Google Button (outline) */}
              <Button
                onPress={handleGoogle}
                variant="outline"
                disabled={googleLoading}
                className="w-full flex-row items-center justify-center"
                textClassName="text-black font-semibold"
              >
                {googleLoading ? 'Continuing...' : 'Continue with Google'}
              </Button>
            </View>
          </CardContent>

          <CardFooter>
            <View style={tw`flex-row justify-center items-center w-full`}>
              <Text style={tw`text-sm text-gray-600 mr-1 font-open-sans`}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('signup' as any)}
              >
                <Text style={tw`text-sm font-inter text-primary`}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          </CardFooter>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
