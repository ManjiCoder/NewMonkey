import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// let API_KEY_1 = 'ec7735c4db74410f90ffeffaaa8bd570';
// let API_KEY_2 = 'e93da7be7e134c76afa08f33b2b2b96b'; // Other API_KEY
// let API_KEY_3 = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // Other API_KEY

// TODO: Stored api string in .env.local file
export const APIs = {
  API_KEY_1: 'ec7735c4db74410f90ffeffaaa8bd570',
  API_KEY_2: 'e93da7be7e134c76afa08f33b2b2b96b',
  API_KEY_3: '0c8d38e5a8ff4712a05ef4d14e5d80b0',
};

function ServerButton({getNews}) {
  const handleAPI = api => {
    // console.log(api);
    AsyncStorage.setItem('API', api)
      .then(() => {
        getNews();
        // console.log('calling');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      });
  };
  return (
    <View className="gap-y-2">
      <Text className="text-xs text-slate-700 dark:text-white">
        You can use other server, If error occurs
      </Text>
      <View className="flex-row flex-wrap gap-3">
        <TouchableOpacity
          className="bg-blue-600 py-2 px-3 w-28 shadow-md rounded-full "
          onPress={() => handleAPI('API_KEY_2')}>
          <Text className="text-center text-white font-normal">Server - 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 py-2 px-3 w-28 shadow-md rounded-full "
          onPress={() => handleAPI('API_KEY_3')}>
          <Text className="text-center text-white font-normal">Server - 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ServerButton;
