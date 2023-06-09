/* eslint-disable prettier/prettier */
import {View, Text, FlatList, useColorScheme, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator, Snackbar} from 'react-native-paper';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

const News = (): JSX.Element => {
  const route = useRoute();
  const {name} = route;
  const {url, badgeColor} = route.params;
  // console.log(url,badgeColor);
  const isDark = useColorScheme() === 'dark';
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(true);

  const getNews = async () => {
    let res = await fetch(url);
    let data = await res.json();
    if (res.ok) {
      setNewArticals(data.articles);
      setIsLoading(false);
    }
    setIsError(data.message);
    setIsLoading(false);
    // console.log(url);
    console.log({res, data});
  };
  useEffect(() => {
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Text className="text-base font-normal text-center my-2 text-black dark:text-white">
        <Text className="font-semibold">NewsMoney</Text> - Top {name} Headlines
      </Text>

      {isLoading && (
        <ActivityIndicator
          color={isDark ? lightStatusBar : darkStatusBar}
          size={'large'}
          className="my-3"
        />
      )}

      {isError && (
        <Snackbar
          className="text-xs bg-slate-700"
          visible={visible}
          duration={300000}
          wrapperStyle={styles.SnackbarWrapper}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Close',
            onPress: () => {
              //
            },
            // labelStyle: {backgroundColor: 'red'},
          }}>
          <Text className="font-normal text-base  text-red-400">
            Error:{' '}
            <Text className="text-sm text-justify text-slate-100">
              {isError}
            </Text>
          </Text>
        </Snackbar>
      )}

      {/* {NewArticals.map(item => (
          <NewsItem item={item} />
        ))} */}

      {!isLoading && !isError && (
        <FlatList
          data={NewArticals}
          renderItem={({item}) => <NewsItem item={item} color={badgeColor} />}
          keyExtractor={item => item.url}
        />
      )}
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  SnackbarWrapper: {
    position: 'absolute',
    bottom: 100,
  },
});
