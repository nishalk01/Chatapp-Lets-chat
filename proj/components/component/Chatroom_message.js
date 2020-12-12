import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useIsFocused  } from '@react-navigation/native'

//custom imports
import { socketurl } from '../axios_inst'

export default function Example({user_room_id}) {

  const [ chatRoomConn,setChatRoomConn ] = useState();
  const [messages, setMessages] = useState([]);
  const activeScreen=useIsFocused() 

  useEffect(()=>{//setup websocket connection
    const ChatroomSocket=new WebSocket(
      'ws://'
      + socketurl
      + '/ws/chat/'
      + user_room_id
      + '/'
 );
 console.log(ChatroomSocket)

 ChatroomSocket.onopen=(e)=>{
  setChatRoomConn(ChatroomSocket);
  console.log("passed on connection") //tell if the user is online or not 
}
ChatroomSocket.onmessage=(e)=>{
 
 const data=JSON.parse(e.data)//write to database
 console.log(data)
 setMessages(previousMessages => GiftedChat.append(previousMessages, data.message))

}

ChatroomSocket.onclose=(e)=>{
 console.error("chat socket closed inside room")
}
  },[])
  

  useEffect(()=>{
   if(activeScreen===false){
     chatRoomConn.close()
   }
  },[activeScreen])


  const onSend = useCallback((messages = []) => {
    //send to user in that chatroom
    
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) 
    //make if delivered or not in this by verifying if the message is recieved in websocket onmessage through message id
    chatRoomConn.send(JSON.stringify({
      'message': messages[0]
  }));


  

    
  }, [chatRoomConn])


  // const send_mssg=(messages)=>{
  //   console.log(messages)
  //   chatRoomConn.send(JSON.stringify({
  //     'message': messages[0]
  // }));
  // }
  return (
    
      
    <GiftedChat
      isTyping={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 2, //need user  id
      }}
    />
    // </View>
  )
}