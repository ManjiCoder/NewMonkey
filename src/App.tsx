import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'nativewind';

import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from './components/screens/Tabs';
import ToggleTheme from './components/ToggleTheme';
import NewsState from './context/News/NewsState';

// This is not working in context API
const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

function App(): JSX.Element {
  const {colorScheme, setColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  const setApi = async () => {
    const api = await AsyncStorage.getItem('API');
    if (!api) {
      await AsyncStorage.setItem('API', 'ec7735c4db74410f90ffeffaaa8bd570');
    } else {
      await AsyncStorage.setItem('API', 'ec7735c4db74410f90ffeffaaa8bd570');
    }
  };

  const setTheme = async () => {
    const mode = await AsyncStorage.getItem('theme');
    if (mode) {
      setColorScheme(mode);
    }
  };

  useEffect(() => {
    setTheme();
    setApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <NewsState>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? darkStatusBar : lightStatusBar}
        />
        <ToggleTheme />
        <Tabs />
      </NewsState>
    </NavigationContainer>
  );
}

export default App;
