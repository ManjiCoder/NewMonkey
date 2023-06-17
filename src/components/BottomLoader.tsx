import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';

const BottomLoader = () => {
  const {darkStatusBar, lightStatusBar} = useContext(NewsContext);
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
