/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';

const NewsItem = ({item}) => {
  // To Open NewUrl in Browser
  const handleReadMore = async (url: string) => {
    console.log(url);
    await Linking.openURL(url);
  };

  return (
    <View className="mx-3 mb-7 bg-slate-900" style={styles.elevation}>
      <Image source={{uri: item.urlToImage}} style={styles.NewsImg} />
      <View className="p-3 gap-y-3">
        <Text
          className="text-base leading-relaxed font-light"
          numberOfLines={3}>
          <Text className="font-bold">Title :</Text> {item.title}
        </Text>

        <Text
          className="text-base leading-relaxed font-light"
          numberOfLines={3}>
          <Text className="font-bold">Description :</Text> {item.description}
        </Text>

        <Text
          className="text-base leading-relaxed font-light"
          numberOfLines={3}>
          <Text className="font-bold">Content :</Text> {item.content}
        </Text>

        <Text className="font-light">
          <Text className="font-semibold">By {item.author}</Text> on
          {` ${new Date(item.publishedAt).toDateString()}, ${new Date(
            item.publishedAt,
          ).toLocaleTimeString()}`}
        </Text>
        <TouchableOpacity
          className="bg-red-50 inline-flex rounded-md"
          // style={styles.elevation}
          onPress={() => handleReadMore(item.url)}>
          <Text className="p-3 font-bold bg-blue-700 rounded-md">
            Read More
          </Text>
        </TouchableOpacity>
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
