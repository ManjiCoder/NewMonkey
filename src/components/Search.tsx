import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Searchbar} from 'react-native-paper';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Alert from './Alert';
import {useColorScheme} from 'nativewind';

let toDate = new Date().toISOString().split('T')[0];
let fromDate = toDate.split('-');
fromDate[1] = (fromDate[1] - 1).toString().padStart(2, '0');
fromDate = fromDate.join('-');

const Search = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(params.query);
  const [isConnect, setIsConnect] = useState(null);

  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(
      StackActions.push('SearchNews', {
        url: `https://newsapi.org/v2/everything?q=${searchQuery
          .trim()
          .toLowerCase()}&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
        query: searchQuery,
      }),
    );
  };
  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder={'Search - NewsMoney'}
        placeholderTextColor={'rgb(203 213 225)'}
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
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
        autoFocus={true}
        className="mx-7 mr-12 mt-1 h-10 mb-2.5 bg-slate-50 dark:bg-slate-600"
        onIconPress={handleBackPress}
        onSubmitEditing={onSubmitEditing}
      />
      {isConnect === false && <Alert msg={'Your are offline'} />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    fontWeight: '600',
    alignSelf: 'center',
  },
  textDark: {color: 'white'},
  textLight: {color: '#1e293b'},
});
