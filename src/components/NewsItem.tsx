/* eslint-disable prettier/prettier */
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const NewsItem = ({item}) => {
  const handleReadMore = (url: string) => {
    console.log(url);
  };
  return (
    <View style={styles.elevation}>
      <Image source={{uri: item.urlToImage}} style={styles.NewsImg} />
      <Text>{item.title}</Text>
      <Text numberOfLines={4}>{item.description}</Text>
      <Text numberOfLines={4}>{item.content}</Text>
      <Text>
        <Text>By {item.author}</Text> on
        {` ${new Date(item.publishedAt).toDateString()}, ${new Date(
          item.publishedAt,
        ).toLocaleTimeString()}`}
      </Text>
      <TouchableOpacity onPress={() => handleReadMore(item.url)}>
        <Text>Read More</Text>
      </TouchableOpacity>
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
    backgroundColor: 'navy',
    flex: 1,
    alignItems: 'center',
  },
});
