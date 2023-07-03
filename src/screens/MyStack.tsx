import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tabs from './Tabs';
import Search from '../components/Search';
import SearchNews from '../components/SearchNews';

export type RootStackParamsList = {
  Home: undefined;
  Search: {
    query: string;
  };
  SearchNews: {
    url: string;
    badgeColor: string;
    query: string;
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
        initialParams={{query: 'telsa'}}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="SearchNews"
        initialParams={{
          badgeColor: 'bg-purple-600',
        }}
        component={SearchNews}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
