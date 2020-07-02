import React, { useEffect } from 'react'
import { Alert } from 'react-native';
import Home from './screen/Home'
import ChooseProfile from './screen/ChooseProfile';
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraScreen from './screen/CameraScreen';

import {Tabs} from './routes/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status:', authStatus);

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status: Permitido ', authStatus);
  }
}

const requestPemission = requestUserPermission();

const Stack = createStackNavigator();

const App = () => {
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
		  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});
	
		return unsubscribe;
	  }, []);

	return (
		<NavigationContainer>
      		<Stack.Navigator>
        		<Stack.Screen 
					name="Tabs"
					component={Tabs}
					options={{headerShown: false}} />
				{/* <Stack.Screen 
					name="ChooseProfile"
					component={ChooseProfile}
					options={{headerShown: false}} /> */}
				<Stack.Screen 
					name="ProfileToEdit"
					component={ProfileToEdit}
					options={{headerShown: false}} />
				<Stack.Screen 
					name="ChooseIcon"
					component={ChooseIcon}
					options={{headerShown: false}} />
				<Stack.Screen 
					name="CameraScreen"
					component={CameraScreen}
					options={{headerShown: false}} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
