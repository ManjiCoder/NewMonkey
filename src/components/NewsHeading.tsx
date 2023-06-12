import {Text} from 'react-native';
import React from 'react';

const NewsHeading = ({query}) => {
  return (
    <Text className="text-base capitalize font-normal text-center my-2 text-black dark:text-white">
      <Text className="font-semibold normal-case">NewsMoney</Text> - Top{' '}
      {query === 'General' ? '' : query + ' '}
      Headlines
    </Text>
  );
};

export default NewsHeading;
