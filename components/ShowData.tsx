import {Pressable, Text, ToastAndroid, View} from 'react-native';
import RNFetchBlob, {RNFetchBlobConfig} from 'rn-fetch-blob';
const ShowData = ({
  data,
}: {
  data: {
    url: string;
    title: string;
    thumbnail: string;
    size: string;
    upload_date: string;
  } | null;
}) => {
  if (!data) return null;
  const date = new Date(Number(data.upload_date));

  const handleDownload = () => {
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let options: RNFetchBlobConfig = {
      fileCache: true,
      followRedirect: true,
      overwrite: true,
      indicator: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: DownloadDir + '/' + data.title,
        // mime: 'image/jpeg',
        title: data.title,
      },
    };
    ToastAndroid.show('Download Started.', ToastAndroid.BOTTOM);
    config(options)
      .fetch('GET', data.url)
      .then(res => {
        console.log(res.info());
        ToastAndroid.show('Download Finished.', ToastAndroid.BOTTOM);
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show('Download Failed.', ToastAndroid.BOTTOM);
      });
  };
  return (
    <View className="flex-1 h-screen mt-16 ">
      <View className="flex flex-row justify-start items-start ">
        <Text className="text-xl text-center text-white pl-4">Title: </Text>
        <Text className="text-xl font-bold text-center text-white">
          {data.title}
        </Text>
      </View>
      <View className="flex flex-row justify-start items-start ">
        <Text className="text-xl text-center text-white pl-4">Size: </Text>
        <Text className="text-xl font-bold text-center text-white">
          {data.size}
        </Text>
      </View>
      <View className="flex flex-row justify-start items-start ">
        <Text className="text-xl text-center text-white pl-4">
          Upload Date:{' '}
        </Text>
        <Text className="text-xl font-bold text-center text-white">
          {date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()}
        </Text>
      </View>
      <View className=" mt-6  rounded-xljustify-center items-center">
        <Pressable
          onPress={handleDownload}
          className="bg-blue-500 rounded-lg p-2 border border-black">
          <Text className="text-xl font-bold text-center text-white">
            Download
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ShowData;
