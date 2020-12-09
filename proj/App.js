import React ,{useEffect} from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import { Provider as PaperProvider ,
         DarkTheme as PaperDarkTheme,
         DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
//react-navigation imports
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,
       DarkTheme as NavigationDarkTheme,
       DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//icon import 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//custom function imports
import {navigationRef,navigate } from './components/RootNavigation';
import WebsocketContextProvider from  './components/contexts/websocketcontext';
//screens
import Login from './components/screen/login'
import UserList from './components/screen/userlist'
import RegisterPage from './components/screen/register'
import ChatRoom from './components/screen/Chatroom'
import AppBar from './components/component/AppBar'
import Thing from './components/component/thing';


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};
 




const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainApp=()=>{
  
  return (
    
    <View style={{flex:1}}>
     
    <AppBar/>
    
    <Tab.Navigator>
      <Tab.Screen 
              options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="chat" color={color} size={26} />
                ),
              }}
      name="UserList"  
      component={UserList} />

      <Tab.Screen 
      options={{
        tabBarLabel: 'Profile',
      
      }}
      name="Thing" 
      component={Thing}/>
    </Tab.Navigator>
    </View>
    
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
    
    <WebsocketContextProvider>
    <PaperProvider  theme={CombinedDefaultTheme}>
    <NavigationContainer ref={navigationRef} >
     
      <Stack.Navigator headerMode={"float"} > 
      
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="ChatRoom"   options={{headerShown: false}}  component={ChatRoom}/>
      <Stack.Screen name="MainApp" options={{headerShown: false}}  component={MainApp}/>
      
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </WebsocketContextProvider>
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
