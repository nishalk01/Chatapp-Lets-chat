import  React,{ useRef } from 'react';
import { Appbar } from 'react-native-paper';

import Menu,{ MenuItem } from 'react-native-material-menu';
import { AsyncStorage } from 'react-native';

const AppBar = () => {
  // const _goBack = () => console.log('Went back');
  const MenuRef= useRef("null");
  const _handleSearch = () => {console.log('Searching')
  AsyncStorage.clear()
};

  const _handleMore = () => console.log('Shown more');

  const hideMenu=()=>{
    
    MenuRef.current.hide();
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
          {/* <MenuItem onPress={hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
        </Menu>
    </Appbar.Header>
  );
};

export default AppBar;