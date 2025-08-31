import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import WebViewScreen from './screens/WebViewScreen';
import VideoHomeScreen from './screens/VideoHomeScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (error) {
  console.log('notif setup faild');
}

export default function App() {
  const navigationRef = useRef();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    try {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log('got notif:', notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        const screen = response.notification.request.content.data?.screen;
        if (screen === 'VideoPlayer' && navigationRef.current) {
          navigationRef.current.navigate('VideoHome');
        }
      });
    } catch (error) {
      console.log('cant setup notif listeners');
    }

    return () => {
      try {
        if (notificationListener.current) {
          notificationListener.current.remove();
        }
        if (responseListener.current) {
          responseListener.current.remove();
        }
      } catch (error) {
        console.log('error cleanup listeners');
      }
    };
  }, []);

  
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'WebView') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'VideoHome') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#76d99c',
        tabBarActiveBackgroundColor: '#c6b5a6',
        tabBarAllowFontScaling: true,
        tabBarInactiveTintColor: '#e4e5f3',
        tabBarStyle: {
          backgroundColor: '#c6b5a6',
          borderTopWidth: 1,
          borderTopColor: '#040811',
          paddingBottom: 20,
          paddingTop: 5,
          height: 70,
        },
        headerStyle: {
          backgroundColor: '#c6b5a6',
        },
        headerTintColor: '#040811',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="WebView" 
        component={WebViewScreen} 
        options={{ title: 'Web Browser' }}
      />
      <Tab.Screen 
        name="VideoHome" 
        component={VideoHomeScreen} 
        options={{ title: 'Video Player' }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
        />
        <Stack.Screen 
          name="VideoPlayer" 
          component={VideoPlayerScreen} 
          options={{ 
            title: 'Video Player',
            headerStyle: {
              backgroundColor: '#c6b5a6',
            },
            headerTintColor: '#040811',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

