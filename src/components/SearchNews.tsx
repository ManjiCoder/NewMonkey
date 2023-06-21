import {View, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsItem from './NewsItem';
import ServerButton from './ServerButton';
import NewsHeading from './NewsHeading';
import Loader from './Loader';
import SnackBar from './SnackBar';
import NotFound from './NotFound';
import BottomLoader from './BottomLoader';
import Alert from './Alert';

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  // console.log({query});
  const ref = useRef(null);
  useScrollToTop(ref);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  let pageSize = 16;
  const [isConnect, setIsConnect] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  const isOffline = () => {
    NetInfo.addEventListener(state => {
      const {isConnected, isInternetReachable} = state;
      setIsConnect(isConnected && isInternetReachable);
      // console.log('unsubscribe', isConnected && isInternetReachable);
    });
  };

  const getNews = async () => {
    setIsLoading(true);
    // API Call
    if (isConnect) {
      const API = await AsyncStorage.getItem('API');
      let res = await fetch(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      console.log(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      let data = await res.json();
      if (res.ok) {
        setNewArticals(data.articles);
        setIsLoading(false);
      }
      setIsError(data.message);
      setTotalResults(data.totalResults);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log('Iam fetching', query);
    isOffline();
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isConnect]);

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
    // if (
    //   NewArticals.length >= 96 ||
    //   NewArticals.length <= totalResults ||
    //   NewArticals.length === 0
    // ) {
    //   setIsFetching(false);
    //   return;
    // }
    // API Call
    if (isConnect) {
      setPage(page + 1);
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
    }
    setIsFetching(false);
  };

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <NewsHeading query={query} />
      {isLoading && <Loader />}

      {isError && (
        <SnackBar msg={isError}>
          <ServerButton getNews={getNews} />
        </SnackBar>
      )}
      {totalResults === 0 && (
        <NotFound msg={`Sorry, we found nothing for ${query}`} />
      )}
      {isConnect === false && (
        <Alert msg={"OOPs!  It's seems that your internet is not available"} />
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
          onEndReachedThreshold={0.5}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 305}}
        />
      )}

      {isFetching && <BottomLoader />}
      <BottomLoader />
    </View>
  );
};

export default SearchNews;
