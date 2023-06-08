/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import News from './components/News';

const Tab = createMaterialBottomTabNavigator();

let country = 'in';
// let pagesize = 16;
// const title = 'NewsMonkey';
// let API_KEY = process.env.REACT_APP_NEWS_API_KEY; //  Custom Local Environment Variables - API_Key is stored inside .env.local File
let API_KEY = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b'; // Other API_KEY
// API_KEY = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // Other API_KEY
// // API_KEY = "e93da7be7e134c76afa08f33b2b2b9"; // Wrong API_KEY

const screens = [
  {
    name: 'General',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=${API_KEY}`,
    icon: <FontAwesome name="random" color={'navy'} size={20} />,
  },
  {
    name: 'Entertainment',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apikey=${API_KEY}`,
    icon: (
      <MaterialCommunityIcons
        name="movie-open-check"
        color={'navy'}
        size={26}
      />
    ),
  },
  {
    name: 'Health',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apikey=${API_KEY}`,
    icon: <MaterialCommunityIcons name="heart-plus" color={'navy'} size={26} />,
  },
  {
    name: 'Science',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=science&apikey=${API_KEY}`,
    icon: <MaterialCommunityIcons name="heart-plus" color={'navy'} size={26} />,
  },
  {
    name: 'Sports',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apikey=${API_KEY}`,
    icon: <MaterialIcons name="sports-esports" color={'navy'} size={26} />,
  },
  {
    name: 'Technology',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apikey=${API_KEY}`,
    icon: (
      <MaterialCommunityIcons name="robot-happy" color={'navy'} size={26} />
    ),
  },
];

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  console.log({isDark});

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="General"
        barStyle={[
          styles.bottomNavBar,
          isDark ? styles.bgDark : styles.bgLight,
        ]}>
        {screens.map(item => (
          <Tab.Screen
            key={item.url}
            name={item.name}
            component={News}
            initialParams={{url: item.url, badgeColor: 'blue'}}
            options={{
              tabBarIcon: () => item.icon,
              tabBarLabel: false,
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
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
  },
  bgDark: {backgroundColor: '#0f172a'},
  bgLight: {backgroundColor: '#cbd5e1'},
});
