/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
// import type {PropsWithChildren} from 'react';

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
const urls = {
  General: `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=${API_KEY}`,
  Entertainment: `https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apikey=${API_KEY}`,
  Business: `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apikey=${API_KEY}`,
  Health: `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apikey=${API_KEY}`,
  Science: `https://newsapi.org/v2/top-headlines?country=${country}&category=science&apikey=${API_KEY}`,
  Sports: `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apikey=${API_KEY}`,
  Technology: `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apikey=${API_KEY}`,
};
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="General"
          component={News}
          initialParams={{url: urls.General}}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="random" color={'navy'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Entertainment"
          component={News}
          initialParams={{url: urls.Entertainment}}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="movie-open-check"
                color={'navy'}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Business"
          component={News}
          initialParams={{url: urls.Business}}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="attach-money" color={'navy'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Health"
          component={News}
          initialParams={{url: urls.Health}}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="heart-plus"
                color={'navy'}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Science"
          component={News}
          initialParams={{url: urls.Science}}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="heart-plus"
                color={'navy'}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Sports"
          component={News}
          initialParams={{url: urls.Sports}}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="sports-esports" color={'navy'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Technology"
          component={News}
          initialParams={{url: urls.Technology}}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="robot-happy"
                color={'navy'}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
