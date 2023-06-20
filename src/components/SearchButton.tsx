import React, {useContext, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Pressable, View} from 'react-native';
import {useColorScheme} from 'nativewind';
import NewsContext from '../context/News/NewsContext';
import Search from './Search';

//     {
//       name: 'Search',
//       url: `https://newsapi.org/v2/everything?q=undefined&from=${fromDate}to=${toDate}&sortBy=publishedAt&apikey=`,
//       icon: <FontAwesome name="search" color={iconColor} size={iconSize} />,
//       badgeColor: 'bg-purple-600',
//     },

const SearchButton = () => {
  const {lightStatusBar, darkStatusBar} = useContext(NewsContext);
  const {colorScheme} = useColorScheme();
  const [open, setOpen] = useState(false);
  const isDark = colorScheme === 'dark';
  return (
    <View className="absolute top-0.5 overflow-hidden right-12  z-10 rounded-full bg-white dark:bg-slate-900 mb-1">
      <View>
        <Pressable
          android_ripple={{
            color: isDark ? lightStatusBar : darkStatusBar,
          }}
          className="p-1.5"
          onPress={() => setOpen(!open)}>
          <FontAwesome
            name="search"
            color={isDark ? 'white' : 'black'}
            size={21}
          />
        </Pressable>
      </View>
      {open && <Search />}
    </View>
  );
};

export default SearchButton;
