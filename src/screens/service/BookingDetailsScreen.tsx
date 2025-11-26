// screens/BookingDetailsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import tw from '../../utils/tw';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

type Props = {
  navigation: any;
  route: any;
};

// small type for price rows
type PriceRow = {
  label: string;
  value: string;
};

const PRICE_ROWS: PriceRow[] = [
  { label: 'Service Charge', value: 'Rs 499' },
  { label: 'Gst', value: 'Rs 59' },
];
const TOTAL_AMOUNT = 'Rs 558';

// ---------- Reusable sub-components (defined outside render) ----------

function ServiceSummaryCard({
  title,
  category,
  amount,
}: {
  title: string;
  category: string;
  amount: string;
}) {
  return (
    <Card className="mx-4 mt-4 rounded-2xl">
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`flex-1 pr-4`}>
          <Text style={tw`text-base font-semibold text-gray-900 mb-3`}>
            Service Summary
          </Text>

          <Text style={tw`text-lg font-semibold text-gray-900`}>{title}</Text>
          <Text style={tw`mt-1 text-base text-gray-500`}>{category}</Text>
        </View>

        <Text style={tw`text-base font-semibold text-secondary`}>{amount}</Text>
      </View>
    </Card>
  );
}

function AddressCard() {
  return (
    <View style={tw`mt-6`}>
      <Text style={tw`px-4 text-base font-semibold text-gray-900 mb-3`}>
        Service Address
      </Text>

      {/* Current selected address */}
      <Card className="mx-4 rounded-2xl">
        <Text style={tw`text-base font-semibold text-gray-900 mb-2`}>Home</Text>
        <Text style={tw`text-base text-gray-600`}>
          401, LIG-B4, Ganesh Enclave{'\n'}
          Khijri, Ranchi, Jharkhand
        </Text>
      </Card>

      {/* Add new address button styled as card */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          tw`mx-4 mt-3 h-14 rounded-2xl border border-gray-300 items-center justify-center`,
        ]}
        onPress={() => {
          // TODO: navigate to "AddAddress" screen
        }}
      >
        <Text style={tw`text-base font-semibold text-gray-700`}>
          + Add New Address
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function DateTimeRow({
  date,
  time,
  onPressDate,
  onPressTime,
}: {
  date: string;
  time: string;
  onPressDate?: () => void;
  onPressTime?: () => void;
}) {
  return (
    <View style={tw`mt-6 px-4`}>
      <View style={tw`flex-row justify-between mb-3`}>
        <Text style={tw`text-base font-semibold text-gray-900`}>Date</Text>
        <Text style={tw`text-base font-semibold text-gray-900`}>Time</Text>
      </View>

      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressDate}
          style={tw`flex-1 mr-3 h-14 bg-gray-100 rounded-2xl items-center justify-center`}
        >
          <Text style={tw`text-gray-700 text-base`}>{date}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressTime}
          style={tw`flex-1 ml-3 h-14 bg-gray-100 rounded-2xl items-center justify-center`}
        >
          <Text style={tw`text-gray-700 text-base`}>{time}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PriceDetailsCard({
  rows,
  total,
}: {
  rows: PriceRow[];
  total: string;
}) {
  return (
    <Card className="mx-4 mt-6 rounded-2xl">
      <Text style={tw`text-base font-semibold text-gray-900 mb-4`}>
        Price Details
      </Text>

      {rows.map(row => (
        <View
          key={row.label}
          style={tw`flex-row justify-between items-center mb-2`}
        >
          <Text style={tw`text-base text-gray-700`}>{row.label}</Text>
          <Text style={tw`text-base text-gray-800`}>{row.value}</Text>
        </View>
      ))}

      <View
        style={tw`mt-4 pt-3 border-t border-gray-200 flex-row justify-between items-center`}
      >
        <Text style={tw`text-base font-semibold text-gray-900`}>
          Total Amount
        </Text>
        <Text style={tw`text-base font-semibold text-gray-900`}>{total}</Text>
      </View>
    </Card>
  );
}

// ---------- Screen ----------

export default function BookingDetailsScreen({ navigation }: Props) {
  const [date] = useState('05-11-2026');
  const [time] = useState('10:00');
  const [notes, setNotes] = useState('');

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`pb-8 pt-2`}>
        {/* Summary */}
        <ServiceSummaryCard
          title="Bathroom Cleaning"
          category="Cleaning"
          amount="Rs 499"
        />

        {/* Address block */}
        <AddressCard />

        {/* Date & time */}
        <DateTimeRow
          date={date}
          time={time}
          onPressDate={() => {
            // TODO: open date picker
          }}
          onPressTime={() => {
            // TODO: open time picker
          }}
        />

        {/* Special instructions */}
        <View style={tw`mt-6 px-4`}>
          <Text style={tw`text-base font-semibold text-gray-900 mb-2`}>
            Special Instructions (Optional)
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="Any specific requirements or instructions for the service provider..."
            style={tw`min-h-28 bg-gray-100 rounded-2xl px-4 py-3 text-base text-gray-700`}
            textAlignVertical="top"
          />
        </View>

        {/* Price details */}
        <PriceDetailsCard rows={PRICE_ROWS} total={TOTAL_AMOUNT} />
      </ScrollView>

      {/* Bottom action */}
      <View style={tw`px-4 pb-4`}>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-secondary"
          textClassName="font-semibold"
          onPress={() => {
            // navigate to payment screen
            navigation.navigate('payment' as never);
          }}
        >
          Proceed to Payment
        </Button>
      </View>
    </View>
  );
}
