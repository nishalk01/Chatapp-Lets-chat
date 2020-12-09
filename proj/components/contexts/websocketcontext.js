import React,{ useEffect,createContext,useState } from 'react'
import { AsyncStorage } from 'react-native';
import { axiosInstance } from '../axios_inst'
const socketurl="192.168.0.108:8000"
export const WebsocketContext=createContext();

const WebsocketContextProvider=(props)=>{
    const [message,setMessage]=useState([]);
    const websocketConnection=()=>{
        console.log("henloooooo")
        
        const chatSocket=new WebSocket(
            'ws://'
            + socketurl
            + '/ws/chat/'
            + "ssss" //change this user room id
            + '/'
       );
        chatSocket.onmessage=(e)=>{
         const data=JSON.parse(e.data)//write to database
         setMessage(message=>[data.message,...message])

       }

       chatSocket.onclose=(e)=>{
         console.error("chat socket closed")
       }
        return  chatSocket

    }
 
    

    
    return(
        <WebsocketContext.Provider value={{ message,websocketConnection }}>
            {props.children}
        </WebsocketContext.Provider>
    )
}

export default WebsocketContextProvider