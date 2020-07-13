import React, { useEffect, useState } from 'react';
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraScreen from './screen/CameraScreen';
import {ProfileContext} from './context/ProfileContext';

import {Tabs} from './routes/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { AsyncStorage } from '@react-native-community/async-storage';

async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const requestPemission = requestUserPermission();

const Stack = createStackNavigator();

const App = () => {
	const [user, setUser] = useState(null);
	const value = {user, setUser};
	const [requestResult, setRequestResult] = useState([]);
	const [initialRoute, setInitialRoute] = useState('Home');

	getData = async () => {
		try {
			return value = await AsyncStorage.getItem('profile')
		} catch(e) {
			return null;
		}
	}
		
	useEffect(() => {
			const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('Nova Mensagem para Você!!!', JSON.stringify(remoteMessage));
			const {data} = remoteMessage;
			setRequestResult(data);
		});
		const {PGTOPENDENTE} = requestResult;
		setInitialRoute(PGTOPENDENTE ? "More":"Home");
		return unsubscribe;
	}, []);

	useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
			const {data} = remoteMessage;
			setRequestResult(data);
			const {PGTOPENDENTE} = requestResult;
			setInitialRoute(PGTOPENDENTE ? "More":"Home");
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
					const {data} = remoteMessage;
					setRequestResult(data);
					const {PGTOPENDENTE} = requestResult;
					setInitialRoute(PGTOPENDENTE ? "More":"Home");
        }
      });
  }, []);

	return (
		<ProfileContext.Provider value={value}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen 
						name="Tabs"
						component={Tabs}
						options={{headerShown: false}} />
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
		</ProfileContext.Provider>
	)
}

export default App
