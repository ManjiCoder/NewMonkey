/* eslint-disable prettier/prettier */
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';

const News = ({url}): JSX.Element => {
  const [NewArticals, setNewArticals] = useState([]);
  const getNews = async () => {
    let res = await fetch(url);
    let data = await res.json();
    setNewArticals(data.articles);
    console.log(url);
    // console.log({data});
  };
  useEffect(() => {
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (NewArticals.length === 0) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <Text>Top Headline - General Category</Text>
      <FlatList
        data={NewArticals}
        renderItem={({item}) => <NewsItem item={item} />}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

export default News;
