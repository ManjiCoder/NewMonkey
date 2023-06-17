import {Text} from 'react-native';
import React from 'react';

const NewsHeading = ({query}) => {
  return (
    <Text className="text-base flex-wrap capitalize font-normal pr-5 text-center m-2 text-black dark:text-white">
      <Text className="font-semibold normal-case">NewsMoney</Text> - Top{' '}
      {query === 'General' ? '' : query + ' '}
      Headlines
    </Text>
  );
};

export default NewsHeading;
