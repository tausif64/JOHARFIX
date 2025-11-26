import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import tw from '../utils/tw';
import Button from '../components/ui/Button';
import { storage } from '../lib/mmkv-store';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 's1',
    title: 'Find Services Near You',
    subtitle: 'Discover trusted professionals for all your\nhome service needs',
    image: null,
  },
  {
    key: 's2',
    title: 'Book with Confidence',
    subtitle: 'Read reviews, compare prices, and book\nin just a few taps',
    image: null,
  },
  {
    key: 's3',
    title: 'Get Started',
    subtitle: 'Login to continue and find services near you',
    image: null,
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState(0);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      storage.set("onboarded", true);
      navigation.replace('signin');
    }
  };

  const skip = () => {
    scrollRef.current?.scrollTo({
      x: width * (slides.length - 1),
      animated: true,
    });
    setIndex(slides.length - 1);
    storage.set('onboarded', true);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Skip Button */}
      {index !== slides.length - 1 && (
        <TouchableOpacity
          onPress={skip}
          style={tw`absolute top-6 right-6 z-50`}
        >
          <Text style={tw`text-gray-500 text-base`}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Scrollable Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {slides.map(slide => (
          <View
            key={slide.key}
            style={[tw`items-center pt-16 mt-30`, { width }]}
          >
            {/* Image placeholder Circle */}
            <View
              style={[
                tw`bg-gray-300 `,
                {
                  width: width * 0.4,
                  height: width * 0.4,
                  borderRadius: width * 0.35,
                },
              ]}
            />

            {/* Title */}
            <Text style={tw`text-2xl font-bold text-center text-black mt-10`}>
              {slide.title}
            </Text>

            {/* Subtitle */}
            <Text
              style={tw`text-base text-center text-gray-500 mt-3 leading-6 px-10`}
            >
              {slide.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Next / Get Started Button */}
      <View style={tw`absolute bottom-8 w-full px-5`}>
        {/* Dots */}
        <View style={tw`flex-row justify-center mb-5`}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                i === index
                  ? [
                      tw`bg-secondary rounded-full mx-1`,
                      { width: 30, height: 8, borderRadius: 4 },
                    ]
                  : [
                      tw`bg-gray-500 mx-1`,
                      { width: 8, height: 8, borderRadius: 4 },
                    ],
              ]}
            />
          ))}
        </View>
        <Button onPress={() => goNext()}>
          {index === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
}
