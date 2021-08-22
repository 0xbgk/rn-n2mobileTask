import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenName } from './app/constants/Enums';
import PinsScreen from './app/components/screens/PinsScreen';
import MapScreen from './app/components/screens/MapScreen';
import ProfileScreen from './app/components/screens/ProfileScreen';
import { CustomTabBar } from './app/components/utils/CustomTabBar';
import Permissions from 'react-native-permissions';
import { Provider } from 'mobx-react';
import store from './app/store/index';

const Tab = createBottomTabNavigator();


export default function App() {

  useEffect(() => {
    Permissions.request('android.permission.ACCESS_FINE_LOCATION').then(response => {
      // allow permissions please
      // TODO check if permissions allowed or not

    })
  });

  return (
    <Provider {...store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={ScreenName.MAP}
          tabBar={props => <CustomTabBar {...props} />}>
          <Tab.Screen name={ScreenName.PINS}
            component={PinsScreen} />
          <Tab.Screen name={ScreenName.MAP}
            component={MapScreen} />
          <Tab.Screen name={ScreenName.PROFILE}
            component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}