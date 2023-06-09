/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import SearchNews from './SearchNews';

const Search = () => {
  const route = useRoute();
  const {url, badgeColor} = route.params;
  //   console.log({url, badgeColor});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    console.log('Iam loading');
  }, [isSearch]);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Searchbar
        placeholder="Tesla"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        inputStyle={styles.input}
        iconColor="#1e293b"
        className="mx-5 mt-2 h-11"
        onIconPress={() => {
          setIsSearch(true);
          // navigation.navigate('General');
        }}
        onSubmitEditing={() => {
          setIsSearch(true);
        }}
      />
      {isSearch && (
        <SearchNews
          url={url.replace(
            'undefined',
            encodeURIComponent(searchQuery.toLowerCase()),
          )}
          badgeColor={badgeColor}
          query={searchQuery}
        />
      )}
      {isSearch && <Text>{searchQuery}</Text>}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
