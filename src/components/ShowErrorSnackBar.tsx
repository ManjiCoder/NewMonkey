/* eslint-disable prettier/prettier */
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Snackbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShowErrorSnackBar = ({msg}) => {
  const [visible, setVisible] = useState(true);
  return (
    <Snackbar
      className="text-xs bg-slate-700 mx-5"
      visible={visible}
      duration={1000 * 60 * 10}
      wrapperStyle={styles.SnackbarWrapper}>
      <View className="flex flex-row space-x-1 justify-between items-center mb-3">
        <View className="flex flex-row space-x-1 justify-between items-center">
          <MaterialIcons name="error" size={40} color="rgb(248 ,113 ,113)" />
          <Text className="font-semibold text-xl  text-red-400">Error</Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <FontAwesome name="close" size={30} />
        </TouchableOpacity>
      </View>
      <Text className="font-normal text-base text-white">{msg}</Text>
      {/* <TouchableOpacity
        className="py-1 px-4 w-full self-center bg-green-700 shadow-md rounded-full text-3xl"
        onPress={() => {
          // getNews(API_KEY);
          setVisible(false);
        }}>
        <Text className="text-white text-base font-light">Retry</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity className="py-1 px-4 w-full self-center bg-green-700 shadow-md rounded-full text-3xl">
        <Text className="text-white text-base font-light">Retry</Text>
      </TouchableOpacity> */}
    </Snackbar>
  );
};

export default ShowErrorSnackBar;

const styles = StyleSheet.create({
  SnackbarWrapper: {
    justifyContent: 'center',
    height: '100%',
    margin: 0,
    padding: 0,
    zIndex: 10,
  },
});
