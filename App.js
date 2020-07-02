import React, { useEffect } from 'react';
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraScreen from './screen/CameraScreen';

import {Tabs} from './routes/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import Snackbar from 'react-native-snackbar';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
}

const requestPemission = requestUserPermission();

const Stack = createStackNavigator();

const App = () => {
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			const message = remoteMessage.notification.body ? remoteMessage.notification.body : "Ops...Alarme falso";
			Snackbar.dismiss();
			Snackbar.show({text: message, duration: Snackbar.LENGTH_INDEFINITE, action: {text: 'Ok', textColor: 'green', onPress: () => { /** nao quero fazer nada */}}});
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
