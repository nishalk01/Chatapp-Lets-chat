import React from 'react';
import { Avatar,Card,Divider } from 'react-native-paper'
import { View,ScrollView,TouchableOpacity,Pressable, AsyncStorage } from 'react-native';
import AppBar from './AppBar';

const LeftContent = props => <Avatar.Icon {...props} icon="folder"/> //set icon here
const UserList=({ navigation })=>{
    return(
        <View>
          <AppBar/>
            <ScrollView>
            <Divider/>
<TouchableOpacity 
  activeOpacity={0.8} 
  onPress={()=>{navigation.navigate("ChatRoom")}}
  onLongPress={()=>{console.log("im long pressed")}}>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
  </Card>
</TouchableOpacity>
  <Divider/>
  </ScrollView>
</View>
    )
}


export default UserList;