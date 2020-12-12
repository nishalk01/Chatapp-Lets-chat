import React,{ useEffect,createContext,useState } from 'react'
import { AsyncStorage } from 'react-native';
import { axiosInstance,socketurl } from '../axios_inst'


export const WebsocketContext=createContext();
const WebsocketContextProvider=(props)=>{
    const [message,setMessage]=useState([]);
    const [roomId,setRoomId ]=useState("");
    var  [inoke,setInoke]=useState();

    const websocketConnection=()=>{
    AsyncStorage.getItem("acess_token").then(access_token=>{
       axiosInstance.get("userlist/get_room_id/")
        .then(res=>{
            console.log(res.data)
            setRoomId(res.data.roomid)
             const chatSocket=new WebSocket(
                'ws://'
                + socketurl
                + '/ws/chat/'
                + res.data.roomid
                + '/'
           );
           chatSocket.onopen=(e)=>{
              setInoke(chatSocket)
              console.log("passed on connection") 
           }
            chatSocket.onmessage=(e)=>{
             const data=JSON.parse(e.data)//write to database
             setMessage(message=>[data.message,...message])
    
           }
    
           chatSocket.onclose=(e)=>{
             console.error("chat socket closed")
           }
          
           
        })
        .catch(err=>{
            console.log(err)
        })
    console.log("hello")
        
    
  
    })
    }

 
    

    
    return(
        <WebsocketContext.Provider value={{ message,websocketConnection,inoke }}>
            {props.children}
        </WebsocketContext.Provider>
    )
}

export default WebsocketContextProvider