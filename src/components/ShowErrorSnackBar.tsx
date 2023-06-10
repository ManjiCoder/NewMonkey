/* eslint-disable prettier/prettier */
import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';

const ShowErrorSnackBar = ({query}) => {
  return (
    <Snackbar
      className="text-xs bg-slate-700 mx-5"
      visible={true}
      duration={1000 * 60 * 10}
      // eslint-disable-next-line react-native/no-inline-styles
      wrapperStyle={{
        bottom: 150,
      }}>
      <Text className="font-normal text-base text-center text-white">
        Sorry, we found nothing for {query}
      </Text>
    </Snackbar>
  );
};

export default ShowErrorSnackBar;

const styles = StyleSheet.create({
  SnackbarWrapper: {
    bottom: 150,
  },
});
