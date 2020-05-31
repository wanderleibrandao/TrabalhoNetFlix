import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Home from '../screen/Home';
import Downloads from '../screen/Downloads';
import Search from '../screen/Search';
import ComingSoon from '../screen/ComingSoon';
import More from '../screen/More';

import { Feather, AntDesign, EvilIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                style: {
                    backgroundColor: '#1a1718',
                    borderTopColor: 'transparent',
                },
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Feather name="home" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarLabel: 'Buscar',
                tabBarIcon: ({color, size}) => (
                    <EvilIcons name="search" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="ComingSoon" component={ComingSoon} options={{
                tabBarLabel: 'Em breve',
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="stepforward" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="Downloads" component={Downloads} options={{
                tabBarLabel: 'Downloads',
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="download" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="More" component={More} options={{
                tabBarLabel: 'Mais',
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="plus" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    )
};