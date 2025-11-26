import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import tw from 'twrnc';

// =============================
// twrnc version of InputOTP
// API preserved from original
// =============================

type OTPContextType = {
  value: string;
  setValue: (v: string) => void;
  maxLength: number;
  inputsRef: React.MutableRefObject<Array<TextInput | null>>;
};

const OTPContext = createContext<OTPContextType | null>(null);

export interface InputOTPProps {
  value?: string;
  onChange?: (v: string) => void;
  maxLength?: number;
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function InputOTP({
  value: externalValue = '',
  onChange,
  maxLength = 6,
  children,
  className = '',
  style,
}: InputOTPProps) {
  const [value, setValue] = useState<string>(externalValue);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => setValue(externalValue), [externalValue]);

  const update = (newVal: string) => {
    setValue(newVal);
    onChange?.(newVal);
  };

  return (
    <OTPContext.Provider
      value={{ value, setValue: update, maxLength, inputsRef }}
    >
      <View
        style={[
          tw`flex-row items-center`,
          className ? tw`${className}` : null,
          style,
        ]}
      >
        {children}
      </View>
    </OTPContext.Provider>
  );
}

export function InputOTPGroup({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        tw`flex-row gap-2`,
        className ? tw`${className}` : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function InputOTPSeparator({
  className = '',
  style,
}: {
  className?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        tw`mx-2 text-xl font-bold text-gray-400`,
        className ? tw`${className}` : null,
        style,
      ]}
    >
      -
    </Text>
  );
}

export interface InputOTPSlotProps {
  index: number;
  className?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export function InputOTPSlot({
  index,
  className = '',
  style,
}: InputOTPSlotProps) {
  const ctx = useContext(OTPContext);
  if (!ctx) throw new Error('InputOTPSlot must be used within <InputOTP>');

  const { value, setValue, maxLength, inputsRef } = ctx;

  const handleChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    const chars = value.split('');

    while (chars.length < maxLength) chars.push('');

    // If user cleared this slot (backspace), move focus to previous
    if (filtered === '') {
      chars[index] = '';
      const joined = chars.join('').slice(0, maxLength);
      setValue(joined);

      // move focus to previous input (if any)
      if (index > 0) {
        // slight delay helps on some Android keyboards
        setTimeout(() => inputsRef.current[index - 1]?.focus(), 0);
      }
      return;
    }

    // Normal input (entering a digit or pasted text)
    chars[index] = filtered.slice(-1);
    const joined = chars.join('').slice(0, maxLength);
    setValue(joined);

    // move to next input if we entered something
    if (filtered && index < maxLength - 1) {
      setTimeout(() => inputsRef.current[index + 1]?.focus(), 0);
    }
  };

  const handleKeyPress = (e: any) => {
    // keep existing keypress handler for hardware keyboards / iOS
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <TextInput
      ref={r => {
        inputsRef.current[index] = r;
      }}
      value={value[index] ?? ''}
      onChangeText={handleChange}
      keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
      maxLength={1}
      onKeyPress={handleKeyPress}
      style={[
        tw`w-12 h-14 text-center text-xl rounded-lg border border-gray-500 bg-white mx-1`,
        className ? tw`${className}` : null,
        style,
      ]}
    />
  );
}


export default {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
};
