/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import SearchNews from './SearchNews';

const Search = () => {
  const route = useRoute();
  const {url, badgeColor} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    console.log('Iam loading');
  }, [isSearch]);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder={'Search "Ratan Tata"'}
        placeholderTextColor={'gray'}
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        inputStyle={styles.input}
        iconColor="#1e293b"
        className="mx-5 mt-2 h-11"
        onIconPress={() => {
          if (searchQuery.trim().length !== 0) {
            setIsSearch(searchQuery);
          }
          setSearchQuery('');
        }}
        onSubmitEditing={() => {
          if (searchQuery.trim().length !== 0) {
            setIsSearch(searchQuery);
          }
          setSearchQuery('');
        }}
      />
      {isSearch && (
        <SearchNews
          url={url.replace(
            'undefined',
            encodeURIComponent(isSearch.trim().toLowerCase()),
          )}
          badgeColor={badgeColor}
          query={isSearch}
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