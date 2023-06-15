/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';
const Loader = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <ActivityIndicator
      color={isDark ? lightStatusBar : darkStatusBar}
      size={'large'}
      className="my-3"
    />
  );
};

export default Loader;
