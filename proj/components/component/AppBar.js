import  React,{ useRef,useContext,useEffect } from 'react';
import { Appbar } from 'react-native-paper';

import Menu,{ MenuItem } from 'react-native-material-menu';
import { AsyncStorage } from 'react-native';

import {navigate} from '../RootNavigation';
import { WebsocketContext } from '../contexts/websocketcontext';
var inoke=""
const AppBar = () => {
  const { websocketConnection,message  }=useContext(WebsocketContext);
  useEffect(()=>{
     inoke=websocketConnection();
   
  },[])
  // const _goBack = () => console.log('Went back');
  const MenuRef= useRef("null");
  const _handleSearch = () => {
    console.log(message)
    inoke.close();
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
      {/* <Appbar.BackAction onPress={_goBack} /> */}
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