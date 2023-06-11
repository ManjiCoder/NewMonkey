/* eslint-disable prettier/prettier */
import {View, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NewsItem from './NewsItem';
import {useRoute, useScrollToTop} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsHeading from './NewsHeading';
import Loader from './Loader';
import SnackBar from './SnackBar';
import ServerButton from './ServerButton';
import NetInfo from '@react-native-community/netinfo';
import ShowErrorSnackBar from './ShowErrorSnackBar';

function News(): JSX.Element {
  const route = useRoute();
  const {name} = route;
  const {url, badgeColor} = route.params;

  // Scroll to top
  const ref = useRef(null);
  useScrollToTop(ref);

  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [isConnect, setIsConnect] = useState(null);

  const getNews = async () => {
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    // console.log('getNews called', { isConnected, isInternetReachable});
    if (isConnected && isInternetReachable) {
      setIsConnect(true);
      const API = await AsyncStorage.getItem('API');
      console.log({API});
      let res = await fetch(url + API);
      // console.log({API, api});
      let data = await res.json();
      if (res.ok) {
        setNewArticals(data.articles);
        setIsLoading(false);
      }
      setIsError(data.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsConnect(false);
    // console.log(data.totalResults);
  };
  useEffect(() => {
    getNews();
    // console.log('useEffect');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getNews(API);
    }, 500);
    // console.log('useCallback');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <NewsHeading query={name} />

      {isLoading && <Loader />}

      {isError && (
        <SnackBar msg={isError}>
          <ServerButton getNews={getNews} />
        </SnackBar>
      )}
      {isConnect === false && (
        <ShowErrorSnackBar
          msg={"OOPS! It's seems that your internet is not available"}
        />
      )}

      {!isLoading && !isError && (
        <FlatList
          data={NewArticals}
          renderItem={({item}) => <NewsItem item={item} color={badgeColor} />}
          keyExtractor={item => item.url}
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="mb-32"
        />
      )}
    </View>
  );
}

export default News;
