import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const getPushData = async message => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      message: message.notification.body,
      title: message.notification.title,
    });
    console.log('message', message);
  };

  messaging().onMessage(getPushData);

  //application closed
  messaging().setBackgroundMessageHandler(getPushData);

  const getToken = async () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    const token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.block}>
      <Button title="Send" onPress={() => console.log('test')} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
