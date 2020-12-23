import React, { useState, useCallback, useEffect,useContext } from 'react'
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat'
import { useIsFocused,useFocusEffect  } from '@react-navigation/native'
import {View,StyleSheet} from 'react-native'
import { IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';


//custom imports
import { socketurl, axiosInstance } from '../axios_inst'
import {WebsocketContext} from '../contexts/websocketcontext';
import {StoreMessageContext} from '../contexts/storemessage';
import {navigate} from '../RootNavigation';


export default function Example({other_user_room_id}) {
  const { userDetail }=useContext(WebsocketContext);
  const { newMessage } =useContext(StoreMessageContext);
  const {avatar,user_room_id,id,username}=userDetail
  const [ chatRoomConn,setChatRoomConn ] = useState();
  const [messages, setMessages] = useState([]);
  const activeScreen=useIsFocused() 



useFocusEffect(
    useCallback(()=>{//setup websocket connection
    
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
 console.log("chat socket closed inside room")
}
  },[]))
  
//second useeffect
useEffect(()=>{
   if(activeScreen===false){
     try {
      chatRoomConn.close()
     } catch (error) {
       console.log(error)
     }
    
   }
   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  // setMessages(previousMessages=>[...previousMessages,newMessage])
   console.log(newMessage)

  },[activeScreen,newMessage])

  
const onSend = useCallback((messages = []) => {
    //send to user in that chatroom
       console.log("sending")
      // console.log(messages)
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) 
      //make if delivered or not in this by verifying if the message is recieved in websocket onmessage through message id
      chatRoomConn.send(JSON.stringify({
        'command':"message",
        'message': messages[0]
    }));
  }, [chatRoomConn])



//document button
const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
}
  

//gifted chat customize
const renderBubble=props=> {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }
 
  
  const  renderSend=props=> {
    if (!props.text.trim()) { // text box empty
      return (
      <View style={{flexDirection:"row"}}>
       <IconButton icon='attachment' size={32} onPress={_pickDocument} color='#0052cc' />
       <IconButton icon='camera' size={32}  onPress={()=>{navigate("Camera")}} color='#0052cc' />
      </View>
      )
    }
    return (
      <Send {...props}>
        <View  >
        <IconButton icon='send-circle' size={52} color='#0052cc' />
        </View>
      </Send>
    );
  }

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      inverted={false}
      // isTyping={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      user={{
        _id: id, //need user  id
        name: username,
        avatar: avatar,
        room_id:other_user_room_id
      }}
    />
  )
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});