import React,{useState} from 'react';
import image from '../screen/default.png'
import {Avatar,Title,List,Divider,Caption,Paragraph,Button,TouchableRipple,Dialog,Portal} from 'react-native-paper'
import {View,StyleSheet,Text,TouchableOpacity, Alert } from 'react-native'

const Thing=()=>{

    return(
      <View style={styles.container}>

      <Avatar.Image style={styles.avatar} source={image} size={150} />
      <Divider  />
      <TouchableRipple
      onPress={()=>{Alert.alert("hello man")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
      <List.Item 
    title={<Text>Name</Text>}
    description={<Text><Title>Mr.unknown02<Text>{'\n'}</Text></Title><Caption>This is your username</Caption></Text>}
    left={props=><List.Icon  icon="account"  size={30} />}
    right={props=><List.Icon  icon="pen" />}
  />
     
     </TouchableRipple>
     <Divider/>
     <TouchableRipple
      onPress={() => console.log('Pressed')}
      rippleColor="rgba(0, 0, 0, .32)"
     >
     <List.Item 
    title={<Text>Name</Text>}
    description={<Text><Title>Mr.unknown02<Text>{'\n'}</Text></Title><Caption>This is your username</Caption></Text>}
    left={props=><List.Icon  icon="account"  size={30} />}
    right={props=><List.Icon  icon="pen" />}
  />
     </TouchableRipple>
      </View>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,  
  },
  avatar:{
    marginTop:30,
    alignSelf:"center",
    marginBottom:30,
  }
})
export default Thing;