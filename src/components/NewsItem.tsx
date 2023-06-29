import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NewsItem = ({item, color}) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const ref = useRef();

  // To Open NewUrl in Browser
  const handleReadMore = async (url: string) => {
    await Linking.openURL(url);
  };

  // Bookmark News
  const handleSaveNews = async news => {
    setIsBookmark(!isBookmark);
    console.log(news.url);
  };

  // Sharing Screenshot of News
  const handleShareWithSS = async news => {
    try {
      const fileName = await ref.current.capture();
      // console.log(fileName);
      const options = {
        title: 'NewsMonkey',
        message: news.title,
        url: fileName,
      };
      await Share.open(options);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <ViewShot
      ref={ref}
      options={{fileName: 'NewsMonkey', format: 'jpg', quality: 0.9}}>
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
              numberOfLines={5}>
              <Text className="font-bold dark:text-white">Description :</Text>{' '}
              {item.description}
            </Text>
          )}

          {item.content && (
            <Text
              className="text-base leading-relaxed font-light text-slate-900 dark:text-slate-400"
              numberOfLines={5}>
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

          <View className="gap-2 flex-row flex-wrap justify-between">
            {item.url && (
              <TouchableOpacity
                className="p-3 justify-center rounded-md flex-row items-center bg-blue-700"
                onPress={() => handleReadMore(item.url)}>
                <Text className="text-center font-semibold  text-white mr-2">
                  Read More
                </Text>
                <Feather name="arrow-up-right" size={20} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="p-3 flex-grow justify-center rounded-md flex-row items-center bg-blue-700"
              onPress={() => handleSaveNews(item)}>
              <Text className="text-center font-semibold  text-white mr-2">
                Save
              </Text>
              <FontAwesome
                name={isBookmark ? 'bookmark' : 'bookmark-o'}
                size={18}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-1 flex-grow justify-center rounded-md flex-row items-center bg-red-700"
              onPress={() => handleShareWithSS(item)}>
              <Text className="text-center font-semibold  text-white mr-2">
                Share
              </Text>
              <FontAwesome name="share" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ViewShot>
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
