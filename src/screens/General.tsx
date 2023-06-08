/* eslint-disable prettier/prettier */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import News from '../components/News';

const General = () => {
  const navigate = useNavigation();
  const {params} = navigate.getState('General').routes[0];
  console.log(params);
  return <News url={params} />;
};

export default General;
