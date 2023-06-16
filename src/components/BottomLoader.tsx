/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';
import {View} from 'react-native';

const darkStatusBar = '#ffffff';
const lightStatusBar = '#cbd5e1';

const BottomLoader = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View className="h-11 flex-row justify-center items-center mb-20">
      <ActivityIndicator
        color={isDark ? lightStatusBar : darkStatusBar}
        size={'small'}
        className="absolute z-50 bottom-44"
      />
    </View>
  );
};

export default BottomLoader;
