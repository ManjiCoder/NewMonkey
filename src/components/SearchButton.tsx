import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import {useColorScheme} from 'nativewind';

//     {
//       name: 'Search',
//       url: `https://newsapi.org/v2/everything?q=undefined&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
//       icon: <FontAwesome name="search" color={iconColor} size={iconSize} />,
//       badgeColor: 'bg-purple-600',
//     },

const SearchButton = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View className="rounded-full">
      <FontAwesome name="search" color={isDark ? 'white' : 'black'} size={25} />
    </View>
  );
};

export default SearchButton;
