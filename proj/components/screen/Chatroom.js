import React from 'react'
import { View,Text } from 'react-native'
import AppBar from '../component/AppBar'
import Example from '../component/Chatroom_message'

const ChatRoom=({ route,navigation})=>{
   
   return(
<View style={{ flex: 1 }}>
   <AppBar/>
   <Text>{route.params.user_room_id}</Text>
    <Example/>

</View>
   )
}


export default ChatRoom