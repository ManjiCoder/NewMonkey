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
    <View className="justify-center items-center">
      <ActivityIndicator
        color={isDark ? lightStatusBar : darkStatusBar}
        size={'small'}
        className="fixed bottom-40"
      />
    </View>
  );
};

export default BottomLoader;
