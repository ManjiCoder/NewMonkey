import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Searchbar} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

import SearchNews from './SearchNews';
import Alert from './Alert';

const Search = () => {
  const route = useRoute();
  const {url, badgeColor} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isConnect, setIsConnect] = useState(null);

  const isOffline = () => {
    NetInfo.addEventListener(state => {
      const {isConnected, isInternetReachable} = state;
      setIsConnect(isConnected && isInternetReachable);
      // console.log('unsubscribe', isConnected && isInternetReachable);
    });
  };

  useEffect(() => {
    // console.log('Iam loading');
    isOffline();
  }, [isSearch, isConnect]);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder={'Search "Ratan Tata" - NewsMoney'}
        placeholderTextColor={'gray'}
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        inputStyle={styles.input}
        iconColor="#1e293b"
        className="mx-5 mt-1 h-10 mr-14 mb-2.5"
        onIconPress={() => {
          if (searchQuery.trim() === '') {
            setSearchQuery('');
            return;
          }
          setIsSearch(searchQuery);
        }}
        onSubmitEditing={() => {
          if (searchQuery.trim() === '') {
            setSearchQuery('');
            return;
          }
          setIsSearch(searchQuery);
        }}
      />
      {isConnect === false && <Alert msg={'Your are offline'} />}
      {isSearch && (
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
      )}
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
