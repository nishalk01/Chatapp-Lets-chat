import React, { createContext, useState,useCallback } from 'react'


export const StoreMessageContext=createContext();

const StoreMessageContextProvider =(props)=>{
    const [newMessage,setNewMesaage]=useState([]);
    const add_new_message=useCallback((recieved_messages = []) => {
        //send to user in that chatroom  
        setNewMesaage(newMessage =>[...newMessage,recieved_messages]) 
         
      }, [])
    const clear_new_message=useCallback(
        () => {
          setNewMesaage([])  
        },
        [],
    )

      return(
          <StoreMessageContext.Provider value={{add_new_message,newMessage,clear_new_message}}>
              {props.children}
          </StoreMessageContext.Provider>
      )
}


export default StoreMessageContextProvider;