/* eslint-disable prettier/prettier */
import {View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NewsItem from './NewsItem';
import NewsHeading from './NewsHeading';
import Loader from './Loader';
import ShowErrorSnackBar from './ShowErrorSnackBar';
import SnackBar from './SnackBar';
import ServerButton from './ServerButton';
import {useScrollToTop} from '@react-navigation/native';

// APIs
let API_KEY = 'ec7735c4db74410f90ffeffaaa8bd570'; // My API_KEY
API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b';
// API_KEY = 'e93da7be7e134c76afa08f33b2b2b9'; // Wrong API_KEY

const SearchNews = ({url, badgeColor, query}): JSX.Element => {
  console.log({query});
  const ref = useRef(null);
  useScrollToTop(ref);
  const [NewArticals, setNewArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalResults, setTotalResults] = useState(null);
  const [API, setAPI] = useState(API_KEY);

  const getNews = async () => {
    // API Call
    let res = await fetch(url + API);
    let data = await res.json();
    if (res.ok) {
      setNewArticals(data.articles);
      setIsLoading(false);
    }
    setIsError(data.message);
    setTotalResults(data.totalResults);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('Iam fetching', query);
    getNews(API);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <View className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <NewsHeading query={query} />

      {isLoading && <Loader />}

      {isError && (
        <SnackBar msg={isError}>
          <ServerButton getNews={getNews} setAPI={setAPI} />
        </SnackBar>
      )}

      {totalResults === 0 && <ShowErrorSnackBar query={query} />}

      {!isLoading && !isError && (
        <FlatList
          data={NewArticals}
          renderItem={({item}) => <NewsItem item={item} color={badgeColor} />}
          keyExtractor={item => item.url}
          ref={ref}
        />
      )}
    </View>
  );
};

export default SearchNews;
