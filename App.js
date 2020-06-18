import React from 'react'

import Home from './screen/Home'
import ChooseProfile from './screen/ChooseProfile';
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraScreen from './screen/CameraScreen';

import {Tabs} from './routes/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {GetLocation} from './services/MovieFilter';

GetLocation();


const Stack = createStackNavigator();

const App = () => {
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
