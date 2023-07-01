import {Text} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const NewsHeading = ({query, duration, style}) => {
  return (
    <Animatable.View
      animation="bounceInLeft"
      duration={duration || 1100}
      className={`flex flex-row items-center px-6 pr-14 ${style}`}>
      <Text
        className={`text-[18px] flex-1 flex-wrap capitalize font-normal my-2  mx-2 mr-5 text-black dark:text-white ${
          query.length < 10 ? 'text-center' : 'text-left'
        }`}
        numberOfLines={1}>
        <Text className="font-semibold normal-case">NewsMonkey</Text> - Top{' '}
        {query === 'General' ? '' : query + ' '}
        Headline
      </Text>
    </Animatable.View>
  );
};

export default NewsHeading;
