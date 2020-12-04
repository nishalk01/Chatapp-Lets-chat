import React ,{useEffect} from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
//react-navigation imports
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//icon import 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//custom function imports
import {navigationRef,navigate } from './components/RootNavigation';

import Login from './components/screen/login'
import UserList from './components/screen/userlist'
import RegisterPage from './components/screen/register'
import Example from './components/screen/Chatroom_message'

import Thing from './components/screen/thing';





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp=()=>{
  return (
    <Tab.Navigator>
      <Tab.Screen 
              options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="chat" color={color} size={26} />
                ),
                tabBarOptions:{
                  activeTintColor:"red",
                  activeBackgroundColor:"black"
                }
              }}
      name="UserList"  
      component={UserList} />
      <Tab.Screen 

      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="facebook" color={color} size={26} />
        ),
      }}
      name="Thing" 
      component={Thing}/>
    </Tab.Navigator>
  );
} 


export default function App() {
  useEffect(()=>{
    if(AsyncStorage.getItem('access_token')){
    navigate('MainApp', { screen: 'UserList' });
    console.log("pass")
    }
  },[])
  return (
    
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode={"float"} >
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="ChatRoom"   options={{headerShown: false}}  component={Example}/>
      <Stack.Screen name="MainApp" options={{headerShown: false}}  component={MainApp}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });