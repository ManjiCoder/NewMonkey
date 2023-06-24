import {Text} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const NewsHeading = ({query}) => {
  return (
    <Animatable.View
      animation="bounceInLeft"
      duration={1100}
      className="flex flex-row items-center px-7">
      <Text
        className="text-[18px] flex-1 flex-wrap capitalize font-normal text-center my-2  mx-2 mr-5 text-black dark:text-white"
        numberOfLines={1}>
        <Text className="font-semibold normal-case">NewsMonkey</Text> - Top{' '}
        {query === 'General' ? '' : query + ' '}
        Headlines
      </Text>
    </Animatable.View>
  );
};

export default NewsHeading;
