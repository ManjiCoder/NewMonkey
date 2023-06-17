/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

const Loader = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <ActivityIndicator
      color={isDark ? lightStatusBar : darkStatusBar}
      size={'large'}
      className="h-4/5"
    />
  );
};

export default Loader;
