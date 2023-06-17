/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

const BottomLoader = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <ActivityIndicator
      color={isDark ? lightStatusBar : darkStatusBar}
      size={'small'}
      className="bottom-48"
    />
  );
};

export default BottomLoader;
