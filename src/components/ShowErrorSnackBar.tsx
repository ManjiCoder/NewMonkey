import {Text} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const ShowErrorSnackBar = ({msg}) => {
  return (
    <Animatable.View
      animation="bounce"
      delay={300}
      duration={2000}
      className="flex shadow-lg mx-7 rounded-md shadow-red-600 flex-row bg-white dark:bg-slate-950 justify-center items-center mb-2.5 -mt-1 space-x-2 flex-wrap">
      <MaterialIcons name="wifi-off" size={20} color={'rgb(248 113 113)'} />
      <Text className="text-red-400 font-semibold text-xs py-1">{msg}</Text>
    </Animatable.View>
  );
};

export default ShowErrorSnackBar;
