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

// placeholder — replace with your real API call
async function sendOtpToPhone(phone: string) {
  console.log('sendOtpToPhone (signup):', phone);
  return new Promise(res => setTimeout(() => res({ ok: true }), 600));
}

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Invalid name', 'Please enter your full name.');
      return;
    }
    if (!/^\+?[0-9]{7,15}$/.test(phone)) {
      Alert.alert('Invalid phone', 'Please enter a valid phone number.');
      return;
    }

    try {
      setLoading(true);
      const res: any = await sendOtpToPhone(phone);
      if (res?.ok) {
        // Pass the name as well so Verify screen (or next step) can use it
        navigation.navigate('verify' as any, { phone, name });
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={tw`flex-1 bg-white`}
    >
      <View style={tw`flex-1 items-center justify-center py-8 px-6`}>
        <View
          style={tw`w-22 h-22 rounded-[20px] border-2 justify-center items-center`}
        >
          <Text style={tw`text-sm text-gray-500`}>Logo</Text>
        </View>

        <Card className="w-full border-0 gap-0">
          <CardHeader>
            <View style={tw`items-center`}>
              <CardTitle className="font-inter text-gray-900">
                Create Account
              </CardTitle>
              <CardDescription className="font-open-sans">
                Sign up to get started
              </CardDescription>
            </View>
          </CardHeader>

          <CardContent>
            <View style={tw`space-y-4`}>
              {/* Full Name */}
              <View>
                <Text style={tw`text-sm text-gray-700 mb-2 font-open-sans`}>
                  Full name
                </Text>
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  className="rounded-lg border border-gray-200 px-4 py-3 bg-white"
                />
              </View>

              {/* Phone Input */}
              <View style={tw`mt-4`}>
                <Text style={tw`text-sm text-gray-700 mb-2 font-open-sans`}>
                  Phone Number
                </Text>
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
                className="w-full mt-4"
                variant="default"
                textClassName="text-white font-open-sans"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>

              {/* Separator */}
              <View style={tw`flex-row items-center my-2`}>
                <View style={tw`flex-1 h-px bg-gray-200`} />
                <Text style={tw`px-3 text-sm text-gray-500`}>or</Text>
                <View style={tw`flex-1 h-px bg-gray-200`} />
              </View>

              {/* Alternate: Continue with Google (optional) */}
              <Button
                onPress={() => Alert.alert('Google signup', 'Not implemented')}
                variant="outline"
                className="w-full flex-row items-center justify-center"
                textClassName="font-open-sans text-black font-semibold"
              >
                Continue with Google
              </Button>
            </View>
          </CardContent>

          <CardFooter>
            <View style={tw`flex-row justify-center items-center w-full`}>
              <Text style={tw`text-sm text-gray-600 mr-1 font-open-sans`}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('signin' as any)}
              >
                <Text style={tw`text-sm font-inter text-primary`}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </CardFooter>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
