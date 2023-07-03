import React, {useEffect} from 'react';
import {Pressable, StatusBar, View} from 'react-native';
import {useColorScheme} from 'nativewind';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsState from './context/News/NewsState';

import Feather from 'react-native-vector-icons/Feather';
import MyStack from './screens/MyStack';
import SearchButton from './components/SearchButton';

// This is not working in context API
const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

function App(): JSX.Element {
  const {colorScheme, setColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  const setApi = async () => {
    await AsyncStorage.clear();
    const api = await AsyncStorage.getItem('API');
    console.log('app', {api});
    if (!api) {
      await AsyncStorage.setItem('API', 'API_KEY_1');
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
        <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={isDark ? darkStatusBar : lightStatusBar}
          />
          <ToggleThemeButton isDark={isDark} />
          <SearchButton />
          {/* <Tabs /> */}
          <MyStack />
        </View>
      </NewsState>
    </NavigationContainer>
  );
}

export default App;

const ToggleThemeButton = ({isDark}) => {
  const {toggleColorScheme} = useColorScheme();

  const handleTheme = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  return (
    <View className="absolute top-[7px] shadow-sm shadow-black dark:shadow-white overflow-hidden right-2 z-10 rounded-full bg-white dark:bg-slate-900 mb-1">
      <Pressable
        android_ripple={{
          color: isDark ? lightStatusBar : darkStatusBar,
        }}
        className="p-1.5"
        onPress={handleTheme}>
        <Feather
          name={!isDark ? 'moon' : 'sun'}
          size={21}
          color={!isDark ? 'rgb(29 78 216)' : 'white'}
        />
      </Pressable>
    </View>
  );
};

export {ToggleThemeButton};
