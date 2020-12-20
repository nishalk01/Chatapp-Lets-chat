import React, { useState, useCallback, useEffect,useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useIsFocused  } from '@react-navigation/native'


//custom imports
import { socketurl, axiosInstance } from '../axios_inst'
import {WebsocketContext} from '../contexts/websocketcontext';
import {StoreMessageContext} from '../contexts/storemessage';

export default function Example({other_user_room_id}) {
  const { userDetail }=useContext(WebsocketContext);
  const { newMessage } =useContext(StoreMessageContext);
  const {avatar,user_room_id,id,username}=userDetail
  const [ chatRoomConn,setChatRoomConn ] = useState();
  const [messages, setMessages] = useState([]);
  const activeScreen=useIsFocused() 

  useEffect(()=>{//setup websocket connection
    
    const ChatroomSocket=new WebSocket(
      'ws://'
      + socketurl
      + '/ws/chat/'
      + other_user_room_id
      + '/'
 );
//  console.log(ChatroomSocket)

 ChatroomSocket.onopen=(e)=>{
  setChatRoomConn(ChatroomSocket);
  console.log("passed on connection") //tell if the user is online or not 
}
ChatroomSocket.onmessage=(e)=>{
 
 const data=JSON.parse(e.data)//write to database
 setMessages(previousMessages => [...previousMessages,data.message])

}

ChatroomSocket.onclose=(e)=>{
 console.error("chat socket closed inside room")
}
  },[])
  

  useEffect(()=>{
   if(activeScreen===false){
     chatRoomConn.close()
   }
   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  // setMessages(previousMessages=>[...previousMessages,newMessage])
   console.log(newMessage)

  },[activeScreen,newMessage])

  
  const onSend = useCallback((messages = []) => {
    //send to user in that chatroom
   
      // console.log(messages)
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) 
      //make if delivered or not in this by verifying if the message is recieved in websocket onmessage through message id
      chatRoomConn.send(JSON.stringify({
        'command':"message",
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
      showAvatarForEveryMessage={true}
      inverted={false}
      // isTyping={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: id, //need user  id
        name: username,
        avatar: avatar,
        room_id:other_user_room_id
      }}
    />
    // </View>
  )
}