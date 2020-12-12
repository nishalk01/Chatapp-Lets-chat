import  React,{ useRef,useContext,useEffect } from 'react';
import { Appbar } from 'react-native-paper';

import Menu,{ MenuItem } from 'react-native-material-menu';
import { AsyncStorage } from 'react-native';

import {navigate} from '../RootNavigation';
import { WebsocketContext } from '../contexts/websocketcontext';

const AppBar = () => {
  const { websocketConnection,message,inoke}=useContext(WebsocketContext);
  useEffect(()=>{
   websocketConnection();
   console.log(inoke)
   console.log("wat i passed inoke")
  },[])
  
  const _goBack = () => {console.log('Went back')
  if(inoke){
    inoke.close();//try and catch here
  }



 
};
  const MenuRef= useRef("null");
  const _handleSearch = () => {
    console.log(message)
    
  // AsyncStorage.clear()
};

  const hideMenu=()=>{
    
    MenuRef.current.hide();
    navigate('MainApp', { screen: 'UserList' });
  }
  const showMenu=()=>{
    MenuRef.current.show();
  }
  
  return (
    <Appbar.Header dark={false}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content  title="Let's Chat"  />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Menu
          ref={MenuRef}
          button={<Appbar.Action icon="dots-vertical" onPress={showMenu} />}
        >
          <MenuItem onPress={hideMenu}>New Group</MenuItem>
          <MenuItem onPress={hideMenu}>New Broadcast</MenuItem>
          <MenuItem onPress={hideMenu}>Settings</MenuItem>
        </Menu>
    </Appbar.Header>
  );
};

export default AppBar;