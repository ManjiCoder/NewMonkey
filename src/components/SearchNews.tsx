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

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  // console.log({query});
  const ref = useRef(null);
  useScrollToTop(ref);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalResults, setTotalResults] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnect, setIsConnect] = useState(null);

  const getNews = async () => {
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    // console.log({isConnected, isInternetReachable});
    if (isConnected && isInternetReachable) {
      setIsConnect(true);
      const API = await AsyncStorage.getItem('API');
      let res = await fetch(url + API);
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
    return false;
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
      getNews(API);
    }, 500);
    // console.log('useCallback');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          className="mb-32"
        />
      )}
    </View>
  );
};

export default SearchNews;
