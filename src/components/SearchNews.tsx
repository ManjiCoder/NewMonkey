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

// APIs
let API_KEY = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b';
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b9'; // Wrong API_KEY

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  // console.log({query});
  const ref = useRef(null);
  useScrollToTop(ref);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalResults, setTotalResults] = useState(null);
  const [API, setAPI] = useState(API_KEY);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnect, setIsConnect] = useState(null);

  const getNews = async () => {
    // API Call
    const {isConnected, isInternetReachable} = await NetInfo.fetch();
    // console.log({isConnected, isInternetReachable});
    if (isConnected && isInternetReachable) {
      setIsConnect(true);
      let res = await fetch(url + API);
      let data = await res.json();
      if (res.ok) {
        setNewArticals(data.articles);
        setIsLoading(false);
      }
      setIsError(data.message);
      setTotalResults(data.totalResults);
      setIsLoading(false);
      return;
    }
    setIsConnect(false);
  };

  useEffect(() => {
    // console.log('Iam fetching', query);
    getNews(API);
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
          <ServerButton getNews={getNews} setAPI={setAPI} />
        </SnackBar>
      )}

      {totalResults === 0 && (
        <ShowErrorSnackBar msg={`Sorry, we found nothing for ${query}`} />
      )}

      {!isConnect && (
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
};

export default SearchNews;
