import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  useNavigation,
  StackActions,
  useRoute,
  useScrollToTop,
} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsItem from './NewsItem';
import ServerButton, {APIs} from './ServerButton';
import NewsHeading from './NewsHeading';
import Loader from './Loader';
import SnackBar from './SnackBar';
import NotFound from './NotFound';
import BottomLoader from './BottomLoader';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorScheme} from 'nativewind';

let toDate = new Date().toISOString().split('T')[0];
let fromDate = toDate.split('-');
fromDate[1] = (fromDate[1] - 1).toString().padStart(2, '0');
fromDate = fromDate.join('-');

const SearchNews = (): JSX.Element => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {url, badgeColor, query} = params;
  const ref = useRef(null);
  useScrollToTop(ref);
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      const API = APIs[await AsyncStorage.getItem('API')];
      console.log(API);
      let res = await fetch(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      // console.log(`${url}${API}&page=${page}&pagesize=${pageSize}`);
      let data = await res.json();
      if (res.ok) {
        setNewArticals(Array.from(new Set(data.articles)));
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
    // console.log({length: NewArticals.length, totalResults});
    if (
      (NewArticals.length >= 80 && NewArticals.length <= totalResults) ||
      NewArticals.length === 0
    ) {
      setIsFetching(false);
      return;
    }
    // API Call
    if (true && isConnect) {
      setPage(page + 1);
      const API = APIs[await AsyncStorage.getItem('API')];
      console.log(API);
      let res = await fetch(
        `${url}${API}&page=${page + 1}&pagesize=${pageSize}`,
      );
      let data = await res.json();
      // console.log(
      //   `&page=${page + 1}&pagesize=${pageSize}`,
      //   data.totalResults,
      //   NewArticals.length,
      // );
      if (res.ok) {
        setNewArticals(NewArticals.concat(Array.from(new Set(data.articles))));
        setIsFetching(false);
        return true;
      }
      setIsError(data.message);
      setIsFetching(false);
    }
  };

  const handleBackPress = () => {
    // navigation.setOptions({query: query});
    // console.log('setback', query);
    navigation.goBack();
  };
  const onSubmitEditing = () => {
    if (searchQuery.trim() === '' && searchQuery === query) {
      setSearchQuery('');
      return;
    }
    // navigation.dispatch(StackActions.pop());
    navigation.setOptions({query: query});
    navigation.dispatch(
      StackActions.push('SearchNews', {
        url: `https://newsapi.org/v2/everything?q=${searchQuery
          .trim()
          .toLowerCase()}&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
        query: searchQuery.trim(),
      }),
    );
  };
  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder={'Search - NewsMoney'}
        placeholderTextColor={'rgb(203 213 225)'}
        onChangeText={text => setSearchQuery(text)}
        value={query}
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => (
          <Ionicons
            name="arrow-back"
            color={isDark ? 'rgb(203 213 225)' : '#1e293b'}
            size={27}
          />
        )}
        iconColor={isDark ? 'rgb(203 213 225)' : '#1e293b'}
        inputStyle={[styles.input, isDark ? styles.textDark : styles.textLight]}
        className="mx-7 mr-12 mt-1 h-10 mb-2.5 bg-slate-50 dark:bg-slate-600"
        onIconPress={handleBackPress}
        onSubmitEditing={onSubmitEditing}
      />
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
          contentContainerStyle={{paddingBottom: 170}}
        />
      )}

      {isFetching && <BottomLoader bottom={'bottom-40'} />}
    </View>
  );
};

export default SearchNews;

const styles = StyleSheet.create({
  input: {
    fontWeight: '600',
    alignSelf: 'center',
  },
  textDark: {color: 'white'},
  textLight: {color: '#1e293b'},
});
