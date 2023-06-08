/* eslint-disable prettier/prettier */
import {View, Text, FlatList, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const News = (): JSX.Element => {
  const route = useRoute();
  const {name} = route;
  const {url, badgeColor} = route.params;
  // console.log(url,badgeColor);
  const isDark = useColorScheme() === 'dark';
  const [NewArticals, setNewArticals] = useState([]);

  const getNews = async () => {
    let res = await fetch(url);
    let data = await res.json();
    setNewArticals(data.articles);
    // console.log(url);
    // console.log({data});
  };
  useEffect(() => {
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (NewArticals.length === 0) {
    return (
      <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
        <ActivityIndicator
          color={isDark ? 'white' : 'gray'}
          size={'large'}
          className="my-3"
        />
      </View>
    );
  }
  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Text className="text-base font-normal text-center my-2 text-black dark:text-white">
        <Text className="font-semibold">NewsMoney</Text> - Top {name} Headlines
      </Text>
      {/* <View className="flex flex-row flex-wrap justify-evenly"> */}
      {/* {NewArticals.map(item => (
          <NewsItem item={item} />
        ))} */}
      <FlatList
        data={NewArticals}
        renderItem={({item}) => <NewsItem item={item} color={badgeColor} />}
        keyExtractor={item => item.url}
      />
      {/* </View> */}
    </View>
  );
};

export default News;
