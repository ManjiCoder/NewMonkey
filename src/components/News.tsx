import {View, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NewsItem from './NewsItem';
import {useRoute, useScrollToTop} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

import Loader from './Loader';
import SnackBar from './SnackBar';
import ServerButton from './ServerButton';
import BottomLoader from './BottomLoader';
import NewsHeading from './NewsHeading';
import Alert from './Alert';

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

  const indexVisible = useRef(0);

  const onViewCallBack = useCallback(viewableItems => {
    // console.log(viewableItems.changed[0].index);
    indexVisible.current = viewableItems.changed[0].index;
    console.log(indexVisible.current);
    // Use viewable items in state or as intended
  }, []); // any dependencies that require the function to be "redeclared"

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  let pageSize = 16;
  const [isConnect, setIsConnect] = useState(null);

  const isOffline = () => {
    NetInfo.addEventListener(state => {
      const {isConnected, isInternetReachable} = state;
      setIsConnect(isConnected && isInternetReachable);
      console.log('unsubscribe', isConnected && isInternetReachable);
    });
  };

  const getNews = async () => {
    console.log('getNews', {isConnect: isConnect});
    setIsLoading(true);
    // API Call
    if (isConnect) {
      const API = await AsyncStorage.getItem('API');
      // console.log({API});
      let res = await fetch(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      // console.log(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      let data = await res.json();
      if (res.ok) {
        setNewArticals(data.articles);
        // console.log(data.articles.length, data.totalResults);
        setIsLoading(false);
        totalResults.current = data.totalResults;
        return true;
      }
      setIsError(data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isOffline();
    getNews();
    // console.log('useEffect');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnect]);

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
      NewArticals.length >= 96 ||
      NewArticals.length === totalResults.current ||
      NewArticals.length === 0
    ) {
      setIsFetching(false);
      return;
    }
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
      <NewsHeading query={name} />
      {isLoading && <Loader />}

      {isError && (
        <SnackBar msg={isError}>
          <ServerButton getNews={getNews} />
        </SnackBar>
      )}

      {isConnect === false && <Alert msg={'Your are offline'} />}

      {!isError && (
        <FlatList
          data={NewArticals}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 170}}
          onViewableItemsChanged={onViewCallBack}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item, index}) => {
            if (index === indexVisible.current) {
              return (
                <Animatable.View animation={'zoomIn'}>
                  <NewsItem item={item} color={badgeColor} />
                </Animatable.View>
              );
            }
            return <NewsItem item={item} color={badgeColor} />;
          }}
          keyExtractor={item => item.url}
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={pageSize}
        />
      )}

      {isFetching && <BottomLoader />}
    </View>
  );
}

export default News;
