import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tabs from './Tabs';
import Search from '../components/Search';

export type RootStackParamsList = {
  Home: undefined;
  Search: {
    url: string;
    badgeColor: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen
        name="Search"
        initialParams={{
          url: 'https://newsapi.org/v2/everything?q=undefined&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=',
          badgeColor: 'bg-purple-600',
        }}
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
