/* eslint-disable prettier/prettier */
import {View, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NewsItem from './NewsItem';
import NewsHeading from './NewsHeading';
import Loader from './Loader';
import ShowErrorSnackBar from './ShowErrorSnackBar';
import SnackBar from './SnackBar';
import ServerButton from './ServerButton';
import {useScrollToTop} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotFound from './NotFound';
import BottomLoader from './BottomLoader';

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  // console.log({query});
  const ref = useRef(null);
  useScrollToTop(ref);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  let pageSize = 18;
  const [isConnect, setIsConnect] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  const getNews = async () => {
    setIsLoading(true);
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    // console.log({isConnected, isInternetReachable});
    if (isConnected && isInternetReachable) {
      setIsConnect(true);
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
    setIsConnect(false);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log('Iam fetching', query);
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
    if (NewArticals.length >= 100 && NewArticals.length <= totalResults) {
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
        <ShowErrorSnackBar
          msg={"OOPS! It's seems that your internet is not available"}
          getNews={getNews}
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
          onEndReached={fetchMore}
          onEndReachedThreshold={1}
          className="mb-64"
        />
      )}
      {isFetching && <BottomLoader />}
    </View>
  );
};

export default SearchNews;
