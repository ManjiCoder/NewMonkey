import {Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ShowErrorSnackBar = ({msg}) => {
  return (
    <View className="flex shadow-lg mx-7 rounded-md shadow-red-600 flex-row bg-white dark:bg-slate-950 justify-center items-center mb-2.5 -mt-1 space-x-2 flex-wrap">
      <MaterialIcons name="wifi-off" size={20} color={'rgb(248 113 113)'} />
      <Text className="text-red-400 font-semibold text-xs py-1">{msg}</Text>
    </View>
  );
};

export default ShowErrorSnackBar;
