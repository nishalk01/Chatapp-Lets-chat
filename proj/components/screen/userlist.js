import React ,{ useEffect,useRef,useState,useCallback }from 'react';
import { Avatar,Card,Divider,Badge } from 'react-native-paper'
import { View,ScrollView,TouchableOpacity,AsyncStorage, Text ,StyleSheet} from 'react-native';
import { ActivityIndicator, Colors,TouchableRipple,FAB,Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
// custom imports
import   { axiosInstance } from '../axios_inst';
import { CaptilizeFirstWord } from '../utils';



const UserList=({ navigation })=>{
 const modalizeRef=useRef(null);
 const [showFab,setShowFab]=useState(true);
 const [ userListsData,setUserListData ]=useState([]);

 const onOpen = () => {
   setShowFab(false)
  modalizeRef.current?.open();
};

const ShowHiddenFab=()=>{
  setShowFab(true)
}

  useFocusEffect( //remove this 
    useCallback(() => {
      AsyncStorage.getItem("acess_token").then(()=>{
        axiosInstance.get("userlist/user_relation_list/").then(res=>{
          console.log(res.status)

        })
        .catch(err=>{
          console.log(err)
        })
        axiosInstance.get("userlist/all_users/")
        .then(res=>{
          setUserListData(res.data);
        })
        .catch(err=>{
          console.log(err)
        })
    })

      // return () => unsubscribe();
    }, [])
  );


  
  
  // useEffect(()=>{
  //  AsyncStorage.getItem("acess_token").then(()=>{
  //      axiosInstance.get("userlist/all_users/")
  //      .then(res=>{
  //        setUserListData(res.data);
  //      })
  //      .catch(err=>{
  //        console.log(err)
  //      })
  //  })
 
  // },[])

 
 const user_list=userListsData.length?(
   userListsData.map(userlist=>{
     return(
       <View  key={userlist.id}>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={()=>{navigation.navigate("ChatRoom",{user_room_id:userlist.user_room_id })}}
            onLongPress={()=>{console.log("im long pressed")}}>
              <TouchableRipple>
      <Card>
      <Card.Title 
      title={CaptilizeFirstWord(userlist.username)} 
      subtitle="last message" 
      left={(props) => <Avatar.Image {...props} size={52} source={{ uri: userlist.avatar}} />}
      right={(props)=><Badge {...props}  style={{ marginRight:20 }}>3</Badge>}
        />
      </Card>
      </TouchableRipple>
      <Divider/>
      </TouchableOpacity>
      </View>
      
     )
   })

 ):(<ActivityIndicator animating={true} color={Colors.purple500} />)
  // const LeftContent = props => <Avatar.Image size={24} source={require('../')} /> //set icon here
    return(

  <View style={{ flex:1 }}>
    
  
  <Modalize ref={modalizeRef} onClose={ShowHiddenFab}
  HeaderComponent={
    <View style={{ padding:"5%" }}>
      <Title>All available Chats</Title>
    </View>
  }
  >{user_list}</Modalize>
    <ScrollView>
       <Divider/>
          {user_list}
       <Divider/>
    </ScrollView>
  {showFab?(<FAB
    style={styles.fab}
    large
    icon="chat"
    onPress={onOpen}
  />)
  :null}
    
  </View>
    )
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default UserList;