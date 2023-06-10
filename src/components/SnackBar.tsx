/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {Snackbar} from 'react-native-paper';

const SnackBar = ({msg, children}) => {
  const [visible, setVisible] = useState(true);
  return (
    <Snackbar
      className="text-xs bg-slate-700 mx-5"
      visible={visible}
      duration={300000}
      onDismiss={() => setVisible(false)}
      wrapperStyle={styles.SnackbarWrapper}
      action={{
        label: 'Close',
      }}>
      <Text className="font-normal text-base  text-red-400">
        Error:{' '}
        <Text className="text-sm text-justify text-slate-100">{msg}</Text>
      </Text>
      {children}
    </Snackbar>
  );
};

export default SnackBar;

const styles = StyleSheet.create({
  SnackbarWrapper: {
    bottom: 110,
  },
});
