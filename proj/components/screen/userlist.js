import React ,{ useEffect,useState }from 'react';
import { Avatar,Card,Divider } from 'react-native-paper'
import { View,ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
import   { axiosInstance } from '../axios_inst';
import { ActivityIndicator, Colors } from 'react-native-paper';


const UserList=({ navigation })=>{
  const [ userListsData,setUserListData ]=useState([])
  useEffect(()=>{
   AsyncStorage.getItem("acess_token").then(()=>{
    axiosInstance.get("userlist/all_users/")
    .then(res=>{
      setUserListData(res.data);
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
   })
 
  },[])

 const user_list=userListsData.length?(
   userListsData.map(userlist=>{
     return(
       <View  key={userlist.id}>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={()=>{navigation.navigate("ChatRoom",{user_room_id:userlist.user_room_id })}}
            onLongPress={()=>{console.log("im long pressed")}}>
      <Card>
      <Card.Title 
      title={userlist.username} 
      subtitle="last message" 
      // source={{ uri: userlist.avatar  }} Image not loading in avatar icon
      left={(props)=>{<Avatar.Image size={24} source={require("./default.png")} />}}
        />
        {/* <Card.Cover source={require("./default.png")} /> */}
      </Card>
      <Divider/>
      </TouchableOpacity>
      </View>
      
     )
   })

 ):(<ActivityIndicator animating={true} color={Colors.red800} />)
  // const LeftContent = props => <Avatar.Image size={24} source={require('../')} /> //set icon here
    return(
  <View>
    <ScrollView>
       <Divider/>
          {user_list}
       <Divider/>
    </ScrollView>
  </View>
    )
}


export default UserList;