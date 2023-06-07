/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import News from './components/News';

let country = 'in';
let pagesize = 16;
const title = 'NewsMonkey';
// let API_KEY = process.env.REACT_APP_NEWS_API_KEY; //  Custom Local Environment Variables - API_Key is stored inside .env.local File
let API_KEY = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b'; // Other API_KEY
API_KEY = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // Other API_KEY
// API_KEY = "e93da7be7e134c76afa08f33b2b2b9"; // Wrong API_KEY
const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=${API_KEY}`;

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDark ? 'dark-content' : 'light-content'}
        backgroundColor={isDark ? 'gray' : 'white'}
      />
      <Text className="mx-4 mt-2 text-2xl font-bold">{title}</Text>
      <News url={url} />
    </SafeAreaView>
  );
}

export default App;
