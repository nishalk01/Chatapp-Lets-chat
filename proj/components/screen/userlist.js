import React ,{ useEffect,useState }from 'react';
import { Avatar,Card,Divider,Badge } from 'react-native-paper'
import { View,ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
import   { axiosInstance } from '../axios_inst';
import { ActivityIndicator, Colors,TouchableRipple } from 'react-native-paper';



const UserList=({ navigation })=>{
  const [ userListsData,setUserListData ]=useState([]);
  const [roomId,setRoomId]=useState("");
  useEffect(()=>{
   AsyncStorage.getItem("acess_token").then(()=>{
     axiosInstance.get("userlist/get_room_id/")
     .then(res=>{
       console.log(res.data.roomid);//setup a websocket connection here
       
       axiosInstance.get("userlist/all_users/")
       .then(res=>{
         setUserListData(res.data);
       })
       .catch(err=>{
         console.log(err)
       })

     })
     .catch(err=>{
       console.log(err);
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
              <TouchableRipple>
      <Card>
      <Card.Title 
      title={userlist.username} 
      subtitle="last message" 
      left={(props) => <Avatar.Image {...props} size={48} source={{ uri: userlist.avatar}} />}
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