import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import ShowData from '../components/ShowData';

const {height, width} = Dimensions.get('screen');
const HomeScreen = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<{
    url: string;
    title: string;
    thumbnail: string;
    size: string;
    upload_date: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const req = await fetch(`https://terabox-app.vercel.app/api?url=${url}`);
    setLoading(false);
    if (!req.ok)
      return ToastAndroid.show('Download Failed.', ToastAndroid.BOTTOM);
    const data = await req.json();
    setData(
      data as {
        url: string;
        title: string;
        thumbnail: string;
        size: string;
        upload_date: string;
      },
    );
  };

  return (
    <SafeAreaView>
      <View className="h-full">
        <Image
          // className="relative"
          source={{
            uri: data
              ? data.thumbnail
              : 'https://picsum.photos/seed/picsum/200/300',
          }}
          height={height}
          width={width}
        />
        <View className="flex-1 absolute top-0 left-0 right-0 ">
          <View className="space-x-3">
            <View className="h-10 bg-zinc-800/20 border-b border-zinc-500">
              <Text
                className="flex-1 text-lg text-center items-center justify-center mt-1 text-gray-100"
                onPress={() => {
                  Linking.openURL(
                    'https://github.com/r0ld3x/terabox-app-native',
                  );
                }}>
                TeraBox Downloader
              </Text>
            </View>
            <View className="items-center justify-center mt-3 pr-2">
              <TextInput
                placeholder="Enter your link"
                placeholderTextColor={'black'}
                onChangeText={setUrl}
                value={url}
                className="border-2 min-w-full border-zinc-700/80 text-lg pl-2 rounded-lg text-black bg-zinc-300 px-3 whitespace-nowrap "
              />
              <View className="self-end mr-2 mt-1">
                <Pressable
                  onPress={async () => await handleClick()}
                  style={{elevation: 3}}>
                  {loading ? (
                    <View className="self-center text-center items-center justify-center">
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <Text className="text-white rounded-lg p-2 bg-[#289934] text-base">
                      Submit
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
            <ShowData data={data} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
