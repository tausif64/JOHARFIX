// screens/PaymentScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from '../../utils/tw';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

type PaymentMethod = 'upi' | 'card';

const SERVICE_AMOUNT = 499;
const GST_AMOUNT = 59;
const TOTAL_AMOUNT = SERVICE_AMOUNT + GST_AMOUNT;

// ---------- Reusable subcomponents (outside render) ----------

function OrderSummaryCard() {
  return (
    <Card className="mx-4 mt-4 rounded-2xl">
      <Text style={tw`text-base font-semibold text-gray-900 mb-4`}>
        Order Summary
      </Text>

      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`text-base text-gray-700`}>Service Charge</Text>
        <Text style={tw`text-base text-gray-800`}>Rs {SERVICE_AMOUNT}</Text>
      </View>

      <View style={tw`flex-row justify-between mb-3`}>
        <Text style={tw`text-base text-gray-700`}>Gst</Text>
        <Text style={tw`text-base text-gray-800`}>Rs {GST_AMOUNT}</Text>
      </View>

      <View
        style={tw`mt-3 pt-3 border-t border-gray-200 flex-row justify-between items-center`}
      >
        <Text style={tw`text-base font-semibold text-gray-900`}>
          Total Amount
        </Text>
        <Text style={tw`text-base font-semibold text-gray-900`}>
          Rs {TOTAL_AMOUNT}
        </Text>
      </View>
    </Card>
  );
}

function PaymentMethodButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        tw`mx-4 mt-3 h-14 rounded-2xl border items-center justify-center`,
        active
          ? tw`border-secondary bg-secondary/5`
          : tw`border-gray-300 bg-white`,
      ]}
    >
      <Text
        style={
          active
            ? tw`text-secondary text-base font-semibold`
            : tw`text-secondary text-base`
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function PaymentDoneCard() {
  return (
    <Card className="mx-4 mt-4 rounded-2xl border-green-500">
      <View
        style={tw`border-2 border-green-500 rounded-2xl h-52 items-center justify-center`}
      >
        <View
          style={tw`w-20 h-20 rounded-full border-4 border-green-500 items-center justify-center mb-3`}
        >
          <Text style={tw`text-3xl text-green-500`}>✓</Text>
        </View>
        <Text style={tw`text-lg font-bold text-green-500`}>PAYMENT</Text>
        <Text style={tw`text-lg font-bold text-green-500`}>DONE</Text>
      </View>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PaymentScreen({ navigation }: { navigation: any }) {
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('yourname@upi');
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = () => {
    if (isPaid) return;
    setIsPaid(true);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`pb-8 pt-2`}>
        <OrderSummaryCard />

        {!isPaid && (
          <>
            {/* Payment methods */}
            <View style={tw`mt-6`}>
              <Text style={tw`px-4 text-base font-semibold text-gray-900 mb-2`}>
                Select Payment Method
              </Text>

              <PaymentMethodButton
                label="UPI Payment"
                active={method === 'upi'}
                onPress={() => setMethod('upi')}
              />
              <PaymentMethodButton
                label="Credit Card/Debit Card"
                active={method === 'card'}
                onPress={() => setMethod('card')}
              />
            </View>

            {/* UPI field block */}
            <View style={tw`mt-6 mx-4 rounded-2xl border border-gray-300 p-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
                Any UPI ID
              </Text>
              <Input
                value={upiId}
                onChangeText={setUpiId}
                placeholder="yourname@upi"
                className="bg-white"
              />
            </View>
          </>
        )}

        {isPaid && (
          <>
            {/* Payment done big green card */}
            <PaymentDoneCard />

            {/* UPI ID field below (disabled look) */}
            <View
              style={tw`mt-4 mx-4 rounded-2xl border border-gray-300 p-4 bg-gray-50`}
            >
              <Input
                value={upiId}
                editable={false}
                className="bg-gray-100 text-gray-500"
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom button */}
      <View style={tw`px-4 pb-4`}>
        <Button
          variant={isPaid ? 'secondary' : 'default'}
          size="lg"
          className={`w-full ${
            isPaid ? 'bg-gray-400 border-gray-400' : 'bg-secondary'
          }`}
          textClassName="font-semibold"
          disabled={isPaid || !upiId}
          onPress={handlePay}
        >
          {isPaid ? `Pay Rs ${TOTAL_AMOUNT}` : `Pay Rs ${TOTAL_AMOUNT}`}
        </Button>
      </View>
    </View>
  );
}
