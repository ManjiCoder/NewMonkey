import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';

const Loader = () => {
  const {darkStatusBar, lightStatusBar} = useContext(NewsContext);
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
