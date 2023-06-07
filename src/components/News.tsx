/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';

const News = ({url}): JSX.Element => {
  const isDark = useColorScheme() === 'dark';
  const [NewArticals, setNewArticals] = useState([
    {
      source: {
        id: null,
        name: 'Hindustan Times',
      },
      author: 'PTI',
      title:
        'Days after Odisha train crash, Coromandel Express passes through accident site - Hindustan Times',
      description:
        'As the train passed through, a sizeable number of onlookers witnessed the locomotive chug through the distance. | Latest News India',
      url: 'https://www.hindustantimes.com/india-news/days-after-odisha-train-crash-coromandel-express-passes-through-accident-site-101686069398191.html',
      urlToImage:
        'https://www.hindustantimes.com/ht-img/img/2023/06/06/1600x900/coromandel_express_accident_1685716764691_1686073207749.jpeg',
      publishedAt: '2023-06-06T17:46:06Z',
      content:
        "Four days after the Shalimar-Chennai Coromandel Express was involved in a triple train accident near Bahanagar Bazar station in Odisha's Balasore district, the down train from Chennai crossed the acc… [+1077 chars]",
    },
    {
      source: {
        id: null,
        name: 'ATP Tour',
      },
      author: 'ATP Tour',
      title: 'Novak Djokovic The Tie-Break King - ATP Tour',
      description: 'Dominant Djokovic The Tie-Break King',
      url: 'https://www.atptour.com/en/news/djokovic-roland-garros-2023-tie-break-dominance',
      urlToImage:
        'https://www.atptour.com/-/media/images/news/2023/06/06/18/16/djokovic-roland-garros-2023-tie-break-king.jpg',
      publishedAt: '2023-06-06T17:25:17Z',
      content:
        'Novak Djokovic has become the tie-break king.\r\nThe Serbian won a critical second-set tie-break 7/0 in his Roland Garros quarter-final win on Tuesday against Karen Khachanov to avoid going down two se… [+2477 chars]',
    },
    {
      source: {
        id: null,
        name: 'YouTube',
      },
      author: null,
      title:
        'Apple unveils virtual reality headset Vision Pro #shorts - CBS Mornings',
      description: '#news #apple #virtualreality',
      url: 'https://www.youtube.com/watch?v=cb4Ydy_zCKc',
      urlToImage:
        'https://i.ytimg.com/vi/cb4Ydy_zCKc/maxresdefault.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYZSBWKEUwDw==&rs=AOn4CLD-SPBl4TuVNlvl-HqPi4ZmNdJLig',
      publishedAt: '2023-06-06T17:21:42Z',
      content: null,
    },
    {
      source: {
        id: null,
        name: 'India Today',
      },
      author: 'Dev Ankur Wadhawan',
      title:
        'Sachin Pilot not leaving party, formula decided to resolve tussle with Gehlot: Congress - India Today',
      description:
        'Addressing speculation about Sachin Pilot forming his own party, Congress in-charge of Rajasthan, Sukhjinder Singh Randhawa, said neither did Pilot want to form a separate party earlier nor does he want to do that now.',
      url: 'https://www.indiatoday.in/india/story/sachin-pilot-ashok-gehlot-congress-rajasthan-election-2389657-2023-06-06',
      urlToImage:
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202306/sachin_pilot-sixteen_nine.jpg?VersionId=k4rezWL2WGbOzCo1wl1WGpC4blLe5xr4',
      publishedAt: '2023-06-06T17:03:55Z',
      content:
        'By Dev Ankur Wadhawan: Sachin Pilot has no plans of breaking the Congress, the party said today, while sources said that Pilot will wait for the high command’s orders before deciding on his future co… [+1645 chars]',
    },
    {
      source: {
        id: null,
        name: 'NDTV News',
      },
      author: 'NDTV Sports Desk',
      title:
        '"Pitch Ready For WTC Final": Dinesh Karthik Shares Latest Photos From The Oval - See Pics - NDTV Sports',
      description:
        'India star cricketer Dinesh Karthik shared the latest photos of The Oval pitch where the WTC final will be played from Wednesday',
      url: 'https://sports.ndtv.com/cricket/pitch-ready-for-wtc-final-dinesh-karthik-shares-latest-photos-from-the-oval-see-pics-4100066',
      urlToImage:
        'https://c.ndtvimg.com/2023-06/cbsnrah8_karthik-pitch_625x300_06_June_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675',
      publishedAt: '2023-06-06T16:44:19Z',
      content:
        "The World Test Championship final is here as the Rohit Sharma-led Indian cricket team faces the Pat Cummins-led Australia. For India, it's a chance to end a decade-long drought for an ICC title. On t… [+1783 chars]",
    },
    {
      source: {
        id: null,
        name: 'Thehealthsite.com',
      },
      author: 'Editorial Team',
      title:
        'The Sleep-Debt Epidemic: Can We Catch Up On What We Lose? | TheHealthSite.com - TheHealthSite',
      description:
        'One third of Indian adults experience sleep debt. Not sleeping enough can increase your risk of hypertension diabetes and cardiovascular disease. TheHealthSite.com',
      url: 'https://www.thehealthsite.com/diseases-conditions/the-sleep-debt-epidemic-can-we-catch-up-on-what-we-lose-983076/',
      urlToImage:
        'https://st1.thehealthsite.com/wp-content/uploads/2023/06/The-sleep-debt-epidemic.jpg',
      publishedAt: '2023-06-06T16:32:00Z',
      content:
        'One third of Indian adults experience sleep debt. \r\nOne third of Indian adults experience sleep debt. Not sleeping enough can increase your risk of hypertension, diabetes and cardiovascular disease.\r… [+6484 chars]',
    },
    {
      source: {
        id: null,
        name: 'Hindustan Times',
      },
      author: 'Reuters',
      title:
        'In London court, Prince Harry says UK govt, media at ‘rock bottom’ - Hindustan Times',
      description:
        'Prince Harry gave evidence on Tuesday at the High Court in London in his lawsuit against the publisher of British tabloid the Daily Mirror. | World News',
      url: 'https://www.hindustantimes.com/world-news/in-london-court-prince-harry-says-uk-govt-media-at-rock-bottom-slams-piers-morgan-101686067922749.html',
      urlToImage:
        'https://www.hindustantimes.com/ht-img/img/2023/06/06/1600x900/Britain-Prince-Harry-Legal-Cases-0_1685970984091_1686068810985.jpg',
      publishedAt: '2023-06-06T16:31:35Z',
      content:
        'Prince Harry gave evidence on Tuesday at the High Court in London in his lawsuit against the publisher of British tabloid the Daily Mirror, which he accuses of phone-hacking and other unlawful acts.\r… [+4522 chars]',
    },
    {
      source: {
        id: 'the-times-of-india',
        name: 'The Times of India',
      },
      author: 'ET Online',
      title:
        'World Bank trims India growth forecast but lifts global outlook - The Economic Times',
      description:
        '​​​​Growth in India is expected to slow to 6.3 percent in FY2023/24 (April-March), a 0.3 percentagepoint downward revision from January, the World Bank said today.',
      url: 'https://economictimes.indiatimes.com/news/economy/indicators/world-bank-trims-india-growth-forecast-but-lifts-global-outlook/articleshow/100800788.cms',
      urlToImage:
        'https://img.etimg.com/thumb/msid-100801027,width-1070,height-580,imgsize-616667,overlay-economictimes/photo.jpg',
      publishedAt: '2023-06-06T16:31:00Z',
      content:
        "The World Bank on Tuesday raised its 2023 global growth forecast saying that the U.S. and other major economies have proven more resilient than forecast. But it lowered India's growth outlook to 6.3%… [+3317 chars]",
    },
    {
      source: {
        id: null,
        name: 'NDTV News',
      },
      author: null,
      title:
        'Israel Conducts First Test Of Autonomous Flying Taxi To Ease Traffic Congestion - NDTV',
      description:
        '11 drone operating and delivery companies were involved in tests and experimental flights throughout Israel last week.',
      url: 'https://www.ndtv.com/world-news/israel-conducts-first-test-of-autonomous-flying-taxi-to-ease-traffic-congestion-4099919',
      urlToImage:
        'https://c.ndtvimg.com/2023-06/39aj1ch_air-taxi_625x300_06_June_23.jpg',
      publishedAt: '2023-06-06T15:50:20Z',
      content:
        'The project has been launched under the Israel National Drone Initiative\r\nIsrael has begun conducting initial tests of autonomous drones capable of carrying passengers and cargo, in a bid to ease tra… [+2472 chars]',
    },
    {
      source: {
        id: null,
        name: 'NDTV News',
      },
      author: null,
      title:
        "Depression Over Arabian Sea Intensifies Into Cyclonic Storm 'Biparjoy': Weather Office - NDTV",
      description:
        'NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News',
      url: 'https://www.ndtv.com/news',
      urlToImage: 'https://cdn.ndtv.com/common/images/ogndtv.png',
      publishedAt: '2023-06-06T15:27:41Z',
      content:
        "If you are a climate change warrior or know someone who is doing incredible work in this space, send us your entries and we'll bring the most innovative stories to the world.",
    },
    {
      source: {
        id: null,
        name: 'NDTV News',
      },
      author: null,
      title:
        'Papaya Is Amazing For Our Health But Avoid Eating These Foods Along With Papaya - NDTV',
      description:
        'Consuming papaya with certain foods can lead to digestive issues, here are some of these that you must avoid.',
      url: 'https://www.ndtv.com/health/papaya-is-amazing-for-our-health-but-avoid-eating-these-foods-along-with-papaya-4099729',
      urlToImage:
        'https://c.ndtvimg.com/2023-04/a5c5aoeg_papaya_625x300_05_April_23.jpg',
      publishedAt: '2023-06-06T14:59:25Z',
      content:
        'Avoid consuming large amounts of papaya at once, as this can increase the risk of digestive discomfort\r\nPapaya is a tropical fruit that is native to Mexico and Central America. It is known for its ye… [+3250 chars]',
    },
    {
      source: {
        id: null,
        name: 'Hindustan Times',
      },
      author: 'MD Ijaj Khan',
      title:
        'James Webb Telescope looks back in time, finds oldest organic molecules ever seen - HT Tech',
      description:
        'These chemicals were found within a galaxy that originated when the universe was approximately 10% of its present age.',
      url: 'https://tech.hindustantimes.com/tech/news/james-webb-telescope-looks-back-in-time-finds-oldest-organic-molecules-ever-seen-71686062592623.html',
      urlToImage:
        'https://images.hindustantimes.com/tech/img/2023/06/06/1600x900/webb-space-telescope_1686063078472_1686063088349.jpg',
      publishedAt: '2023-06-06T14:54:03Z',
      content:
        "A groundbreaking study led by astronomers from Texas A&amp;M University using NASA's James Webb Space Telescope (JWST) has unveiled the existence of the oldest known complex organic molecules in the … [+2813 chars]",
    },
    {
      source: {
        id: null,
        name: 'Hot Hardware',
      },
      author: 'Tim Sweezy',
      title:
        'A Potentially Hazardous Asteroid At Least 1,200-Ft Is Racing Towards Earth - Hot Hardware',
      description:
        'The mammoth asteroid is not alone as it is a larger asteroid with a moonlet orbiting it.',
      url: 'https://hothardware.com/news/a-potentially-hazardous-asteroid-is-racing-towards-earth',
      urlToImage:
        'https://images.hothardware.com/contentimages/newsitem/61783/content/hero-asteroid-in-space.jpg',
      publishedAt: '2023-06-06T14:44:00Z',
      content:
        'A potentially hazardous asteroid the size of the Empire State Building is hurtling toward Earth and you can watch its near approach live. Asteroid 1994 XD is expected to pass by at a distance of just… [+1636 chars]',
    },
    {
      source: {
        id: 'the-times-of-india',
        name: 'The Times of India',
      },
      author: 'TIMESOFINDIA.COM',
      title: 'How do I know if I have dementia? - Indiatimes.com',
      description: 'Dementia symptoms that you should recognise on time.',
      url: 'https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/how-do-i-know-if-i-have-dementia/photostory/100794722.cms',
      urlToImage: 'https://static.toiimg.com/photo/100794789.cms',
      publishedAt: '2023-06-06T14:30:00Z',
      content:
        "Dementia is the loss of thinking, remembering, and reasoning to the point where it interferes with a person's daily activities. However, in order to determine if you have dementia, you must see a doc… [+318 chars]",
    },
    {
      source: {
        id: null,
        name: 'YouTube',
      },
      author: null,
      title:
        'Samsung Has Launched Samsung Galaxy F54 5G Smartphone | Business News | ET Now - ET NOW',
      description:
        'With an aim to further strong hold the smartphone segment, Samsung has launched Samsung Galaxy F54 5G smartphone in the affordable premium smartphone categor...',
      url: 'https://www.youtube.com/watch?v=JkgSQ3oNbS0',
      urlToImage: 'https://i.ytimg.com/vi/JkgSQ3oNbS0/maxresdefault.jpg',
      publishedAt: '2023-06-06T14:14:29Z',
      content: null,
    },
    {
      source: {
        id: null,
        name: 'The Moscow Times',
      },
      author: 'The Moscow Times',
      title:
        'Explainer: What the Kakhovka Dam Catastrophe Means For the Ukraine-Russia War - The Moscow Times',
      description:
        'A Russian-controlled dam near the frontline that supplies southern Ukraine and annexed Crimea with drinking water was significantly damaged early Tuesday, flooding the area and potentially threatening the nearby nuclear power plant.',
      url: 'https://www.themoscowtimes.com/2023/06/06/explainer-what-the-kakhovka-dam-catastrophe-means-for-the-ukraine-russia-war-a81415',
      urlToImage:
        'https://static.themoscowtimes.com/image/og/3c/81415__3c0f365057a1e78f08d1afd92eb784b8.jpg',
      publishedAt: '2023-06-06T14:06:00Z',
      content:
        'A Russian-controlled dam near the frontline that supplies southern Ukraine and annexed Crimea with drinking water was significantly damaged early Tuesday, flooding the area and potentially threatenin… [+5881 chars]',
    },
    {
      source: {
        id: null,
        name: 'Odishatv.in',
      },
      author: 'Mrunal Manmay Dash',
      title:
        'Balasore train mishap: Some passengers may have been electrocuted, reveals GRP FIR - OTV News',
      description:
        'As per the FIR, a lot of bodies did not have any injury marks on them, so death might have been caused by the snapped power cables on the railway tracks.',
      url: 'https://odishatv.in/news/odisha/balasore-train-mishap-some-passengers-may-have-been-electrocuted-reveals-grp-fir-206294',
      urlToImage:
        'https://images.odishatv.in/uploadimage/library/16_9/16_9_5/recent_photo_1686059939.webp',
      publishedAt: '2023-06-06T13:59:48Z',
      content:
        'Some victims out of the total 288 persons killed in the Balasore train mishap might have died due to electrocution, revealed the FIR registered at the Government Railway Police Station (GRPS) by a GR… [+1180 chars]',
    },
    {
      source: {
        id: null,
        name: 'The Indian Express',
      },
      author: 'Sreenivas Janyala',
      title:
        'After audience to Chandrababu Naidu by BJP, Modi govt’s largesse to Jagan govt - The Indian Express',
      description:
        'In poll-bound Andhra Pradesh, the party seems to be keeping all its options open; fresh tranche of funds will help Jagan govt complete crucial components of Polavaram project',
      url: 'https://indianexpress.com/article/political-pulse/bjp-andhra-pradesh-ysrcp-tdp-jagan-chandrababu-8649137/',
      urlToImage: 'https://images.indianexpress.com/2023/06/Jagan.jpg',
      publishedAt: '2023-06-06T13:43:28Z',
      content:
        'THE CENTRE Tuesday released Rs 12,911 crore more to Andhra Pradesh for the Polavaram project, which would enable the state to complete its first phase, including important components of the dam.This … [+2087 chars]',
    },
    {
      source: {
        id: 'the-times-of-india',
        name: 'The Times of India',
      },
      author: 'etimes.in',
      title:
        "Shahid Kapoor says marriage is about wife 'fixing' her husband; netizens call him 'manchild' - Indiatimes.com",
      description:
        'Shahid Kapoor receives a backlash from netizens after he says marriage is about wife fixing her husband.',
      url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/shahid-kapoor-says-marriage-is-about-wife-fixing-her-husband-netizens-call-him-manchild/articleshow/100798721.cms',
      urlToImage:
        'https://static.toiimg.com/thumb/msid-100798721,width-1070,height-580,imgsize-61490,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
      publishedAt: '2023-06-06T13:36:00Z',
      content:
        'Shahid Kapoor reveals when Mira Rajput moved into his house after wedding, he only had two spoons and one plateShahid Kapoor who got married to Mira Rajput in 2015 has shared that when Mira moved int… [+69 chars]',
    },
    {
      source: {
        id: null,
        name: 'DNA India',
      },
      author: 'DNA Web Team',
      title:
        'Nakuul Mehta wins the internet with his sweet reply to Instagram user criticising Bade Achhe Lagte Hain 3 - DNA India',
      description:
        'Bade Acche Lagte Hain 3 began on May 25 with the completely fresh story and the same character names of Nakuul Mehta and Disha Parmar as Ram Kapoor and Priya Sood respectively',
      url: 'https://www.dnaindia.com/television/report-nakuul-mehta-wins-the-internet-with-his-sweet-reply-to-instagram-user-criticising-bade-achhe-lagte-hain-3-3046356',
      urlToImage:
        'https://cdn.dnaindia.com/sites/default/files/styles/half/public/2023/06/06/2593602-nakuul-final.jpg',
      publishedAt: '2023-06-06T13:28:19Z',
      content:
        'Reported By:| Edited By: DNA Web Team |Source: DNA Web Desk |Updated: Jun 06, 2023, 06:58 PM ISTAfter quitting Bade Achhe Lagte Hain 2 in December 2022, Nakuul Mehta and Disha Parmar are back with',
    },
  ]);

  // const getNews = async () => {
  //   let res = await fetch(url);
  //   let data = await res.json();
  //   setNewArticals(data.articles);
  //   console.log(url);
  //   // console.log({data});
  // };
  // useEffect(() => {
  //   getNews();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (NewArticals.length === 0) {
    return (
      <ActivityIndicator color={isDark ? 'white' : 'gray'} size={'large'} />
    );
  }
  return (
    <View>
      <Text className="text-xl font-medium text-center my-3">
        Top Headline - General Category
      </Text>
      <FlatList
        data={NewArticals}
        renderItem={({item}) => <NewsItem item={item} />}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

export default News;
