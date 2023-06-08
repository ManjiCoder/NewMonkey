/* eslint-disable prettier/prettier */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import News from '../components/News';

const Technology = () => {
  const navigate = useNavigation();
  const {params} = navigate.getState('Technology').routes[0];
  console.log(params);
  return <News url={params} />;
};

export default Technology;
