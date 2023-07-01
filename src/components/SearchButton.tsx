import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SearchButton = () => {
  const {lightStatusBar, darkStatusBar} = useContext(NewsContext);
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();
  return (
    <View className="absolute top-1.5 overflow-hidden right-11 z-10 rounded-full">
      <View>
        <Pressable
          android_ripple={{
            color: isDark ? lightStatusBar : darkStatusBar,
          }}
          className="p-1"
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Ionicons
            name="md-search"
            color={isDark ? 'white' : 'rgb(51 65 85)'}
            size={25}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchButton;
