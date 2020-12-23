import React ,{useEffect,useState} from 'react';
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
import  StoreMessageContextProvider from './components/contexts/storemessage'
import {axiosInstance} from './components/axios_inst';
//screens
import Login from './components/screen/login'
import UserList from './components/screen/userlist'
import RegisterPage from './components/screen/register'
import ChatRoom from './components/screen/Chatroom'
import AppBar from './components/component/AppBar'
import ProfilePage from './components/component/ProfilePage';
import QrPage from './components/screen/QRPage';
import CameraPage from './components/component/camera';

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






export default function App() {
  const [userDetail,setUserDetail]=useState() //change this to useFocusEffect

  useEffect(()=>{

    if(AsyncStorage.getItem('access_token')){
    axiosInstance.get("userlist/get_user_details/")
    .then(res=>{
      setUserDetail(res.data)
      console.log(res.data)
      navigate('MainApp', { screen: 'UserList' });
    })
    .catch(err=>{
      console.log(err)
    })
    
    console.log("pass")
    }
  },[])

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
        name="ProfilePage" 
        component={ProfilePage}
        initialParams={{detail:userDetail}}
        />
      </Tab.Navigator>
      </View>
      
    );
  } 
  

  return (
    <StoreMessageContextProvider>
    <WebsocketContextProvider>
      
    <PaperProvider  theme={CombinedDefaultTheme}>
    <NavigationContainer ref={navigationRef} >
     
      <Stack.Navigator headerMode={"float"} > 
      
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="ChatRoom"   options={{headerShown: false}}  component={ChatRoom}/>
      <Stack.Screen name="MainApp" options={{headerShown: false}}  component={MainApp}/>
      <Stack.Screen name="ShowQR"  options={{ headerShown:false}} component={QrPage} />
      <Stack.Screen name="Camera"  options={{ headerShown:false}} component={CameraPage}/>
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </WebsocketContextProvider>
    </StoreMessageContextProvider>
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
