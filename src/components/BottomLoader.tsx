import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';

const BottomLoader = ({bottom}) => {
  const {darkStatusBar, lightStatusBar} = useContext(NewsContext);
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <ActivityIndicator
      color={isDark ? lightStatusBar : darkStatusBar}
      size={'small'}
      className={`bottom-${bottom} -z-10`}
    />
  );
};

export default BottomLoader;
