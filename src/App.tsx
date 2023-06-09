/* eslint-disable prettier/prettier */
import React from 'react';
import {StatusBar, StyleSheet, Vibration, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import News from './components/News';
import Search from './components/Search';

const Tab = createMaterialBottomTabNavigator();

let todayDate = new Date()
  .toLocaleDateString()
  .split('/')
  .reverse()
  .map(value => value.padStart(2, '0'));

todayDate[1] = (todayDate[1] - 1).toString().padStart(2, '0');
todayDate = todayDate.join('-');
console.log(todayDate);

let country = 'in';
// let pagesize = 16;
let API_KEY = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b'; // Other API_KEY
API_KEY = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // Other API_KEY
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b9'; // Wrong API_KEY

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';
const iconSize = 27;

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#3b82f6' : '#1d4ed8';
  const screens = [
    {
      name: 'General',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=${API_KEY}`,
      icon: <FontAwesome name="home" color={iconColor} size={iconSize} />,
      badgeColor: 'bg-blue-600',
    },
    {
      name: 'Entertainment',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apikey=${API_KEY}`,
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
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apikey=${API_KEY}`,
      icon: (
        <MaterialIcons name="attach-money" color={iconColor} size={iconSize} />
      ),
      badgeColor: 'bg-lime-600',
    },
    {
      name: 'Health',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apikey=${API_KEY}`,
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
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=science&apikey=${API_KEY}`,
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
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apikey=${API_KEY}`,
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
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apikey=${API_KEY}`,
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
      url: `https://newsapi.org/v2/everything?q=undefined&from=${todayDate}&sortBy=publishedAt&apikey=${API_KEY}`,
      icon: <FontAwesome name="search" color={iconColor} size={iconSize} />,
      badgeColor: 'bg-purple-600',
    },
  ];

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? darkStatusBar : lightStatusBar}
      />
      <Tab.Navigator
        initialRouteName="General"
        labeled={false}
        shifting={true}
        screenListeners={() => {
          Vibration.vibrate(27);
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
              // tabBarBadge: true, // like notification in whatsapp
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
