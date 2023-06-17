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
import BottomLoader from './BottomLoader';

function News(): JSX.Element {
  const route = useRoute();
  const {name} = route;
  const {url, badgeColor} = route.params;

  // Scroll to top
  const ref = useRef(null);
  useScrollToTop(ref);

  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const totalResults = useRef(null);

  let pageSize = 18;
  const [isConnect, setIsConnect] = useState(null);

  const getNews = async () => {
    setIsLoading(true);
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    if (isConnected && isInternetReachable) {
      setIsConnect(true);
      const API = await AsyncStorage.getItem('API');
      console.log({API});
      let res = await fetch(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      console.log(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      let data = await res.json();
      if (res.ok) {
        setNewArticals(data.articles);
        console.log(data.articles.length, data.totalResults);
        setIsLoading(false);
        totalResults.current = data.totalResults;
        return true;
      }
      setIsError(data.message);
    } else if ((isConnect || isInternetReachable) === false) {
      setIsConnect(false);
    }
    setIsLoading(false);
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
      getNews();
    }, 500);
    // console.log('useCallback');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMore = async () => {
    setIsFetching(true);
    console.log(NewArticals.length, totalResults.current);
    if (
      NewArticals.length >= 100 ||
      NewArticals.length === totalResults.current
    ) {
      setIsFetching(false);
      return;
    }
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    if (isConnected && isInternetReachable) {
      setPage(page + 1);
      setIsConnect(true);
      const API = await AsyncStorage.getItem('API');
      let res = await fetch(
        `${url}${API}&page=${page + 1}&pagesize=${pageSize}`,
      );
      let data = await res.json();
      console.log(
        `&page=${page + 1}&pagesize=${pageSize}`,
        data.totalResults,
        NewArticals.length,
      );
      if (res.ok) {
        setNewArticals(NewArticals.concat(data.articles));
        setIsFetching(false);
        return true;
      }
      setIsError(data.message);
    } else if ((isConnect || isInternetReachable) === false) {
      setIsConnect(false);
    }
    setIsFetching(false);
  };
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
          getNews={getNews}
        />
      )}

      {!isError && (
        <FlatList
          data={NewArticals}
          renderItem={({item}) => <NewsItem item={item} color={badgeColor} />}
          keyExtractor={item => item.url}
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={0}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 170}}
        />
      )}

      {isFetching && <BottomLoader />}
    </View>
  );
}

export default News;
