import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Dimensions, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const WebViewScreen = ({ navigation }) => {
  const webViewRef = useRef(null);
  const [screenDimensions, setScreenDimensions] = useState({ width, height });

  useEffect(() => {
    requestNotificationPermission();
    
    // Handle screen orientation changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please enable notifications to use this feature.');
      }
    } catch (error) {
      console.log('perm req failed');
    }
  };

  const scheduleNotification = async (title, body, delay = 3) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { screen: 'VideoPlayer' },
        },
        trigger: { seconds: delay },
      });
    } catch (error) {
      console.log('notif sched failed');
      Alert.alert('Error', 'Could not schedule notification');
    }
  };

  const handleQuickNotification = () => {
    scheduleNotification('Quick Alert', 'This is a quick notification!', 2);
  };

  const handleDelayedNotification = () => {
    scheduleNotification('Delayed Alert', 'This notification was delayed!', 5);
  };

  const handleWebViewLoad = () => {
    scheduleNotification('WebView Loaded', 'Tap to open Video Player!', 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://houseofedtech.in/' }}
        style={[styles.webview, { height: screenDimensions.height * 0.7 }]}
        onLoad={handleWebViewLoad}
      />
      <View style={[styles.buttonContainer, { height: screenDimensions.height * 0.3 }]}>
        <CustomButton
          title="Quick Notification (2s)"
          onPress={handleQuickNotification}
        />
        <CustomButton
          title="Delayed Notification (5s)"
          onPress={handleDelayedNotification}
        />
        <CustomButton
          title="Open Video Player Notification"
          onPress={() => scheduleNotification('Video Player', 'Tap to open video player!', 2)}
          style={{ backgroundColor: '#FF9500' }}
        />
        {/* <CustomButton
          title="Go to Video Player"
          onPress={() => navigation.navigate('VideoHome')}
          style={{ backgroundColor: '#34C759' }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040811',
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#e4e5f3',
    borderTopWidth: 2,
    borderTopColor: '#76d99c',
    justifyContent: 'space-around',
  },
});

export default WebViewScreen;
