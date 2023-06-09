/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  FlatList,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import {ActivityIndicator, Snackbar} from 'react-native-paper';

const darkStatusBar = '#1e293b';
const lightStatusBar = '#cbd5e1';

// APIs
let API_KEY_1 = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
let API_KEY_2 = 'e93da7be7e134c76afa08f33b2b2b96b'; // Other API_KEY
let API_KEY_3 = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // Other API_KEY
let API_KEY = 'e93da7be7e134c76afa08f33b2b2b9'; // Wrong API_KEY

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  console.log(query);
  const isDark = useColorScheme() === 'dark';
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [totalResults, setTotalResults] = useState(null);

  const getNews = async newUrl => {
    // API Call
    let res = await fetch(newUrl);
    let data = await res.json();
    if (res.ok) {
      setNewArticals(data.articles);
      setIsLoading(false);
    }
    setIsError(data.message);
    setTotalResults(data.totalResults);
    setIsLoading(false);
    console.log(data.totalResults);
    // console.log(url);
    // console.log({data});
  };
  useEffect(() => {
    console.log('Iam fetching');
    // getNews(url + API_KEY);
    getNews(url + API_KEY_1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <Text className="text-base capitalize font-normal text-center my-2 text-black dark:text-white">
        <Text className="font-semibold">NewsMoney</Text> - Top {query} Headlines
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
          className="text-xs bg-slate-700 mx-5"
          visible={visible}
          duration={300000}
          wrapperStyle={styles.SnackbarWrapper}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Close',
          }}>
          <Text className="font-normal text-base  text-red-400">
            Error:{' '}
            <Text className="text-sm text-justify text-slate-100">
              {isError}
            </Text>
          </Text>
          {isError && (
            <View className="gap-y-2">
              <Text className="text-xs">
                You can use other server, If error occurs
              </Text>
              <View className="flex-row flex-wrap gap-3">
                <TouchableOpacity
                  className="bg-blue-700 py-2 px-3 w-28 shadow-md rounded-full "
                  onPress={() => getNews(url + API_KEY_2)}>
                  <Text className="text-center text-white font-thin">
                    Server - 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-700 py-2 px-3 w-28 shadow-md rounded-full "
                  onPress={() => getNews(url + API_KEY_3)}>
                  <Text className="text-center text-white font-thin">
                    Server - 2
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Snackbar>
      )}

      {totalResults === 0 && (
        <Snackbar
          className="text-xs bg-slate-700 mx-5"
          visible={true}
          duration={1000 * 60 * 10}
          // eslint-disable-next-line react-native/no-inline-styles
          wrapperStyle={{
            bottom: 150,
          }}>
          <Text className="font-normal text-base text-center">
            Sorry, We found nothing for {query}
          </Text>
        </Snackbar>
      )}

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

export default SearchNews;

const styles = StyleSheet.create({
  SnackbarWrapper: {
    bottom: 150,
  },
});
