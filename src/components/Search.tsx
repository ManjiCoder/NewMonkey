import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Searchbar} from 'react-native-paper';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Alert from './Alert';

let toDate = new Date().toISOString().split('T')[0];
let fromDate = toDate.split('-');
fromDate[1] = (fromDate[1] - 1).toString().padStart(2, '0');
fromDate = fromDate.join('-');

const Search = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(params.query);
  const [isConnect, setIsConnect] = useState(null);

  const isOffline = () => {
    NetInfo.addEventListener(state => {
      const {isConnected, isInternetReachable} = state;
      setIsConnect(isConnected && isInternetReachable);
      // console.log('unsubscribe', isConnected && isInternetReachable);
    });
  };

  useEffect(() => {
    // console.log(navigation.getState());
    // console.log('Iam loading');
    isOffline();
  }, [isConnect]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const onSubmitEditing = () => {
    if (searchQuery.trim() === '') {
      setSearchQuery('');
      return;
    }
    navigation.dispatch(StackActions.pop(1));
    navigation.dispatch(
      StackActions.push('SearchNews', {
        url: `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
        query: searchQuery,
      }),
    );
  };
  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder={'Search - NewsMoney'}
        placeholderTextColor={'gray'}
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => <Ionicons name="arrow-back" color={'#1e293b'} size={30} />}
        inputStyle={styles.input}
        mode="bar"
        className="mx-5 mt-1 h-10 mr-20 mb-2.5"
        onIconPress={handleBackPress}
        onSubmitEditing={onSubmitEditing}
      />
      {isConnect === false && <Alert msg={'Your are offline'} />}
      {/* {isSearch && (
        <SearchNews
          url={url.replace(
            'undefined',
            encodeURIComponent(isSearch.trim().toLowerCase()),
          )}
          badgeColor={badgeColor}
          query={
            isSearch.trim() === ''
              ? setIsSearch('')
              : isSearch.trim().toLowerCase()
          }
        />
      )} */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    fontWeight: '600',
    alignSelf: 'center',
    color: '#1e293b',
  },
});
