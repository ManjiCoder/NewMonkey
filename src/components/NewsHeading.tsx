import {Text, View} from 'react-native';
import React from 'react';
// import SearchButton from './SearchButton';

const NewsHeading = ({query}) => {
  return (
    <View className="flex flex-row items-center px-7">
      <Text
        className="text-[16px] flex-1 flex-wrap capitalize font-normal text-center my-2  mx-2 text-black dark:text-white"
        numberOfLines={1}>
        <Text className="font-semibold normal-case">NewsMoney</Text> - Top{' '}
        {query === 'General' ? '' : query + ' '}
        Headlines
      </Text>
      {/* For Search & Toggle */}
      {/* <View className="flex flex-row justify-between items-center mx-5"> */}
      {/* <SearchButton /> */}
    </View>
  );
};

export default NewsHeading;
