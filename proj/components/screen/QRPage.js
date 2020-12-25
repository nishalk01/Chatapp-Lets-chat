import React,{ useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView,StatusBar,StyleSheet, Text, View } from 'react-native';
import { Card,Avatar, TextInput } from 'react-native-paper';
import * as Brightness from 'expo-brightness';

var prev_value=""
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const QrPage =({route,navigation})=>{
  console.log(route.params.details)
   const {username,avatar,email}=route.params.details;
  
    useEffect(() => {
        (async () => {
          const { status } = await Brightness.requestPermissionsAsync();
          if (status === 'granted') {
              const prev=await Brightness.getSystemBrightnessAsync()
              prev_value=prev
            Brightness.setSystemBrightnessAsync(1);
          }
        })();
        return ()=>Brightness.setSystemBrightnessAsync(prev_value)
      }, []);
  return(
   
      <SafeAreaView style={styles.container}>
        <Avatar.Image  source={{ uri: avatar}} size={100} />
          <QRCode
          style={styles.qr}
          size={200}
          value={email}
        />
        <Text>{username}</Text>
          </SafeAreaView>

  )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
        alignItems:"center",
        top:"28%"
    },
    // qr:{
     
    // }
})


export default QrPage;