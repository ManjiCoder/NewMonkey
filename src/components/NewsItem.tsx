import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';

const NewsItem = ({item, color}) => {
  // To Open NewUrl in Browser
  const handleReadMore = async (url: string) => {
    // console.log(url);
    await Linking.openURL(url);
  };

  return (
    <View
      className="mx-7 mb-7 bg-slate-50 dark:bg-slate-900 rounded-md flex"
      style={styles.elevation}>
      <Text
        className={`absolute top-0 z-10 right-0 ${color} py-1 px-2 text-[9px] font-semibold rounded-md text-white`}>
        {item.source.name}
      </Text>
      <Image
        className="rounded-t-md"
        source={{
          uri:
            item.urlToImage ||
            'https://static.theprint.in/wp-content/uploads/2023/06/Greenhouse-gases.jpg',
        }}
        style={styles.NewsImg}
      />

      <View className="p-3 gap-y-3">
        {item.title && (
          <Text
            className="text-base leading-relaxed font-light text-slate-900 dark:text-slate-400"
            numberOfLines={3}>
            <Text className="font-bold dark:text-white">Title :</Text>{' '}
            {item.title}
          </Text>
        )}

        {item.description && (
          <Text
            className="text-base leading-relaxed font-light text-slate-900 dark:text-slate-400"
            numberOfLines={3}>
            <Text className="font-bold dark:text-white">Description :</Text>{' '}
            {item.description}
          </Text>
        )}

        {item.content && (
          <Text
            className="text-base leading-relaxed font-light text-slate-900 dark:text-slate-400"
            numberOfLines={4}>
            <Text className="font-bold dark:text-white">Content :</Text>{' '}
            {item.content}
          </Text>
        )}

        {item.author && item.publishedAt && (
          <Text className="font-light text-slate-600 dark:text-slate-400 text-xs">
            <Text className="font-semibold text-slate-700 dark:text-slate-300">
              By {item.author}
            </Text>{' '}
            on
            {` ${new Date(item.publishedAt).toDateString()}, ${new Date(
              item.publishedAt,
            ).toLocaleTimeString()}`}
          </Text>
        )}

        {item.url && (
          <TouchableOpacity
            className="bg-red-50 rounded-md"
            onPress={() => handleReadMore(item.url)}>
            <Text className="p-3 text-center justify-center  font-bold bg-blue-700 rounded-md text-white">
              Read More
              <Feather name="arrow-up-right" size={18} color="white" />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  NewsImg: {
    height: 250,
    width: '100%',
  },
  elevation: {
    elevation: 5,
  },
});
