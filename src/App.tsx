/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {useColorScheme} from 'nativewind';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {trigger} from 'react-native-haptic-feedback';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import News from './components/News';
import Search from './components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialBottomTabNavigator();

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};
let toDate = new Date().toISOString().split('T')[0];
let fromDate = toDate.split('-');
fromDate[1] = (fromDate[1] - 1).toString().padStart(2, '0');
fromDate = fromDate.join('-');
// console.log(fromDate, toDate);

let country = 'in';
// let lang = 'ar';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';
const iconSize = 27;

function App(): JSX.Element {
  const {colorScheme, setColorScheme, toggleColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  // const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#3b82f6' : '#1d4ed8';
  const screens = [
    {
      name: 'General',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=`,
      // url: `https://newsapi.org/v2/top-headlines?country=${country}`,
      icon: <FontAwesome name="home" color={iconColor} size={iconSize} />,
      badgeColor: 'bg-blue-600',
    },
    {
      name: 'Entertainment',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apikey=`,
      icon: (
        <MaterialCommunityIcons
          name="movie-open-check"
          color={iconColor}
          size={iconSize}
        />
      ),
      badgeColor: 'bg-pink-600',
    },
    {
      name: 'Bussiness',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apikey=`,
      icon: (
        <MaterialIcons name="attach-money" color={iconColor} size={iconSize} />
      ),
      badgeColor: 'bg-lime-600',
    },
    {
      name: 'Health',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apikey=`,
      icon: (
        <MaterialCommunityIcons
          name="heart-plus"
          color={iconColor}
          size={iconSize}
        />
      ),
      badgeColor: 'bg-rose-500',
    },
    {
      name: 'Science',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=science&apikey=`,
      icon: (
        <MaterialCommunityIcons
          name="electron-framework"
          color={iconColor}
          size={iconSize}
        />
      ),
      badgeColor: 'bg-indigo-600',
    },
    {
      name: 'Sports',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apikey=`,
      icon: (
        <MaterialIcons
          name="sports-esports"
          color={iconColor}
          size={iconSize}
        />
      ),
      badgeColor: 'bg-green-600',
    },
    {
      name: 'Technology',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apikey=`,
      icon: (
        <MaterialCommunityIcons
          name="robot-happy"
          color={iconColor}
          size={iconSize}
        />
      ),
      badgeColor: 'bg-orange-600',
    },
    {
      name: 'Search',
      url: `https://newsapi.org/v2/everything?q=undefined&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
      icon: <FontAwesome name="search" color={iconColor} size={iconSize} />,
      badgeColor: 'bg-purple-600',
    },
  ];

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

  const handleTheme = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? darkStatusBar : lightStatusBar}
      />
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
      <Tab.Navigator
        initialRouteName="General"
        labeled={false}
        shifting={true}
        screenListeners={() => {
          trigger('soft', options);
        }}
        barStyle={[
          styles.bottomNavBar,
          isDark ? styles.bgDark : styles.bgLight,
        ]}>
        {screens.map(item => (
          <Tab.Screen
            key={item.url}
            name={item.name}
            component={item.name === 'Search' ? Search : News}
            initialParams={{url: item.url, badgeColor: item.badgeColor}}
            options={{
              tabBarIcon: () => item.icon,
              tabBarColor: 'red',
              tabBarAccessibilityLabel: item.name,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  bottomNavBar: {
    // height: 60,
    paddingHorizontal: 10,
  },
  bgDark: {backgroundColor: '#0f172a'},
  bgLight: {backgroundColor: '#cbd5e1'},
});
