import React,{ useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView,StatusBar,StyleSheet } from 'react-native';
import * as Brightness from 'expo-brightness';
var prev_value=""

const QrPage =()=>{
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
          <QRCode
          size={300}
          value="h"
    />
          </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    },
})


export default QrPage;