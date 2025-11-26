import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from '../../utils/tw';

import Button from '../../components/ui/Button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../../components/ui/InputOTP';

type NavigationProp = any;

export default function VerifyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route: any = useRoute();
  const phone = route?.params?.phone ?? route?.params?.phoneNumber ?? '';

  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 4) {
      // adapt to your otp length (you used 6 in the InputOTP default)
      Alert.alert('Invalid code', 'Please enter the verification code.');
      return;
    }

    try {
      setVerifying(true);
      // TODO: call verification API
      console.log('verify otp', otp);
      // simulate success
      setTimeout(() => {
        setVerifying(false);
        navigation.reset({ index: 0, routes: [{ name: 'Home' as any }] });
      }, 700);
    } catch (err) {
      console.error(err);
      setVerifying(false);
      Alert.alert('Error', 'Failed to verify code.');
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      console.log('resend OTP to', phone);
      // TODO: call resend API
      setTimeout(() => {
        setResending(false);
        Alert.alert('OTP sent', 'A new code has been sent.');
      }, 800);
    } catch (err) {
      console.error(err);
      setResending(false);
      Alert.alert('Error', 'Failed to resend OTP.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={tw`flex-1 bg-white`}
    >
      <View style={tw`flex-1 px-6 justify-center items-center -mt-12`}>
        {/* Title */}
        <View style={tw`items-center mb-2`}>
          <Text style={tw`text-2xl font-inter text-gray-900 mb-2`}>
            Verification Code
          </Text>
          <Text style={tw`text-base text-gray-500 font-open-sans`}>
            {phone ? `We’ve sent a code to ${phone}` : `We’ve sent a code`}
          </Text>
        </View>

        {/* OTP input */}
        <View style={tw`items-center`}>
          <InputOTP value={otp} onChange={setOtp} maxLength={6}>
            <InputOTPGroup className="w-full py-6">
              {/* Using 6 slots */}
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </View>

        {/* Verify button */}
        <View style={tw`w-full px-0 mt-2`}>
          <Button
            onPress={handleVerify}
            disabled={verifying}
            className="w-full bg-primary"
          >
            {verifying ? 'Verifying...' : 'Verify'}
          </Button>
        </View>

        {/* Resend link */}
        <View style={tw`items-center mt-4`}>
          <Text style={tw`text-sm text-gray-600`}>
            Didn’t receive the code?{' '}
            <Text onPress={handleResend} style={tw`text-sm text-primary`}>
              {resending ? 'Resending...' : 'Resend OTP'}
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
