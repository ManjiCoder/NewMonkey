import {Text} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {useRoute} from '@react-navigation/native';

const NewsHeading = ({query, duration}) => {
  const {name} = useRoute();
  return (
    <Animatable.View
      animation="bounceInLeft"
      duration={duration || 1100}
      className={`flex flex-row items-center px-6  ${
        name === 'SearchNews' ? '' : 'pr-14'
      }`}>
      <Text
        className={`text-[18px] flex-1 flex-wrap capitalize font-normal my-2  mx-2 mr-5 text-black dark:text-white ${'text-center'}`}
        numberOfLines={1}>
        <Text className="font-semibold normal-case">NewsMonkey</Text> - Top{' '}
        {query === 'General' ? '' : query + ' '}
        Headlines
      </Text>
    </Animatable.View>
  );
};

export default NewsHeading;
