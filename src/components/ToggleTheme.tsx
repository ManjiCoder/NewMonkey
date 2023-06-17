import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import {useColorScheme} from 'nativewind';

import Feather from 'react-native-vector-icons/Feather';
import NewsContext from '../context/News/NewsContext';

const ToggleTheme = () => {
  const {darkStatusBar, lightStatusBar} = useContext(NewsContext);
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  const handleTheme = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <View className="absolute z-10 right-3 overflow-hidden top-1.5 rounded-full bg-white dark:bg-slate-900 ">
      <Pressable
        android_ripple={{
          color: isDark ? lightStatusBar : darkStatusBar,
        }}
        className="p-1"
        onPress={handleTheme}>
        <Feather
          name={isDark ? 'moon' : 'sun'}
          size={25}
          color={isDark ? 'white' : 'black'}
        />
      </Pressable>
    </View>
  );
};

export default ToggleTheme;
