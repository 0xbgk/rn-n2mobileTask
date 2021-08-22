import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenName } from './app/constants/Enums';
import SignInScreen from './app/components/screens/SignInScreen';
import SignUpScreen from './app/components/screens/SignUpScreen';
import PinsScreen from './app/components/screens/PinsScreen';
import MapScreen from './app/components/screens/MapScreen';
import ProfileScreen from './app/components/screens/ProfileScreen';
import { CustomTabBar } from './app/components/utils/CustomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'mobx-react';
import store from './app/store/index';
// import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
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
  );
}

export default function App() {

  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // const [initialRoute, setInitialRoute] = useState(ScreenName.LOGIN);

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  // if (user) {
  //   setInitialRoute(ScreenName.HOME);
  // }

  // console.log(initialRoute)

  return (
    <Provider {...store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={ScreenName.SIGNIN}
        >
          <Stack.Screen
            name={ScreenName.SIGNIN}
            component={SignInScreen}
          />
          <Stack.Screen
            name={ScreenName.SIGNUP}
            component={SignUpScreen}
          />
          <Stack.Screen
            name={ScreenName.HOME}
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}