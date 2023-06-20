/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {trigger} from 'react-native-haptic-feedback';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import Search from '../components/Search';
import News from '../components/News';

const Tab = createBottomTabNavigator();

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

const iconSize = 22;

const Tabs = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#3b82f6' : '#1d4ed8';

  // All the Tabs are available below
  const screens = [
    {
      name: 'General',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=`,
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

  return (
    <Tab.Navigator
      initialRouteName="General"
      shifting={true}
      screenListeners={() => {
        trigger('soft', options);
      }}
      barStyle={[isDark ? styles.bgDark : styles.bgLight]}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? 'rgb(30 41 59)' : 'rgb(203 213 225)',
          paddingHorizontal: 0,
        },
        tabBarShowLabel: false,

        tabBarActiveBackgroundColor: isDark
          ? 'rgb(15 23 42)'
          : 'rgb(226 232 240)',
      }}>
      {screens.map(item => {
        return (
          <Tab.Screen
            key={item.url}
            name={item.name}
            component={item.name === 'Search' ? Search : News}
            initialParams={{url: item.url, badgeColor: item.badgeColor}}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <View
                  className={`${
                    true && 'bg-pink-50'
                  } p-1.5 rounded-full shadow-lg`}>
                  {item.icon}
                </View>
              ),
              tabBarAccessibilityLabel: item.name,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  bgDark: {backgroundColor: '#0f172a'},
  bgLight: {backgroundColor: '#cbd5e1'},
});
