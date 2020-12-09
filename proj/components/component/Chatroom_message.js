import React, { useState, useCallback, useEffect,useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View } from 'react-native'
import AppBar from './AppBar'
import { WebsocketContext } from '../contexts/websocketcontext';

export default function Example() {
  const [messages, setMessages] = useState([]);
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    
      
    <GiftedChat
      isTyping={true}
      messages={[{
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },]}
      showUserAvatar
      renderUsernameOnMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    // </View>
  )
}