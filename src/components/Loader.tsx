import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';
import {SafeAreaView} from 'react-native';

const Loader = () => {
  const {darkStatusBar, lightStatusBar} = useContext(NewsContext);
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView className="absolute z-30 justify-center items-center h-screen w-full">
      <ActivityIndicator
        color={isDark ? lightStatusBar : darkStatusBar}
        size={'large'}
        className=""
      />
    </SafeAreaView>
  );
};

export default Loader;
