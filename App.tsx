import React from 'react';
// import type {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <Text>Jai Shree Ram</Text>
    </SafeAreaView>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
  },
});

export default App;
