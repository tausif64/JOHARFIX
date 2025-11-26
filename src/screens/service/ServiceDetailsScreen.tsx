// screens/ServiceDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from '../../utils/tw';
import Button from '../../components/ui/Button';

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

type Props = {
  navigation: any;
  route: any;
};

// simple info chip (2–3 Hours, Insured)
function FeatureChip({ label }: { label: string }) {
  return (
    <View
      style={tw`flex-1 h-24 border border-gray-300 rounded-2xl items-center justify-center mx-1`}
    >
      <Text style={tw`text-gray-700 text-base`}>{label}</Text>
    </View>
  );
}

// selectable time-slot chip
function TimeSlotChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        tw`w-[30%] h-16 mb-3 rounded-2xl border items-center justify-center`,
        selected ? tw`border-primary` : tw`border-gray-300`,
      ]}
    >
      <Text
        style={selected ? tw`text-primary font-semibold` : tw`text-gray-700`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ServiceDetailsScreen({ navigation, route }: Props) {
  // you can pull these from route.params later
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`pb-8`}>
        {/* Hero image */}
        {/* <Image
          source={require('../assets/images/bathroom-placeholder.jpg')} 
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: '100%', height: 220, resizeMode: 'cover' }}
          resizeMode="cover"
        /> */}
        <View style={tw`h-[220px] w-full rounded-md bg-gray-300`} />

        {/* Main content */}
        <View style={tw`px-4 mt-5`}>
          {/* Title + price row */}
          <View style={tw`flex-row justify-between items-start`}>
            <View style={tw`flex-1 pr-4`}>
              <Text style={tw`text-xl font-semibold text-gray-900`}>
                Bathroom Cleaning
              </Text>
              <Text style={tw`mt-1 text-base text-gray-500`}>Cleaning</Text>

              <View style={tw`mt-2 flex-row items-center`}>
                <Text style={tw`text-yellow-500 mr-1`}>★</Text>
                <Text style={tw`text-gray-700`}>4.8</Text>
              </View>
            </View>

            <View style={tw`items-end`}>
              <Text style={tw`text-sm text-gray-500 mb-1`}>Starting from</Text>
              <Text style={tw`text-base font-semibold text-secondary`}>
                Rs 299
              </Text>
            </View>
          </View>

          {/* Feature chips */}
          <View style={tw`mt-6 flex-row`}>
            <FeatureChip label="2-3 Hours" />
            <FeatureChip label="Insured" />
          </View>

          {/* Description */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>
              Description
            </Text>
            <Text style={tw`mt-2 text-base text-gray-600`}>
              Professional plumbing and bathroom cleaning services for leaks,
              installations and repairs. Our experts ensure a hygienic and
              sparkling clean bathroom.
            </Text>
          </View>

          {/* Time slots */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>
              Select Time Slot
            </Text>

            <View style={tw`mt-4 flex-row flex-wrap justify-between`}>
              {TIME_SLOTS.map(slot => (
                <TimeSlotChip
                  key={slot}
                  label={slot}
                  selected={selectedSlot === slot}
                  onPress={() => setSelectedSlot(slot)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom call-to-action */}
      <View style={tw`px-4 pb-4`}>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-secondary"
          textClassName="font-semibold"
          disabled={!selectedSlot}
          onPress={() => {
            // later: navigate to confirm/booking screen and pass selectedSlot
            navigation.navigate('booking-details', { timeSlot: selectedSlot });
          }}
        >
          Book Now
        </Button>
      </View>
    </View>
  );
}
