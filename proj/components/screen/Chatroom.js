import React,{ useContext } from 'react';
import { View,Text } from 'react-native';
import AppBar from '../component/AppBar';//make a new appbar for Chatroom 
import Example from '../component/Chatroom_message';



const ChatRoom=({ route,navigation})=>{   
   return(
<View style={{ flex: 1 }}>
   {/* <AppBar/> */}
    <Example  other_user_room_id={ route.params.user_room_id }/>

</View>
   )
}


export default ChatRoom