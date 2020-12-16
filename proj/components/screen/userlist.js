import React ,{ useEffect,useState }from 'react';
import { Avatar,Card,Divider,Badge } from 'react-native-paper'
import { View,ScrollView,TouchableOpacity,AsyncStorage, Text } from 'react-native';
import { ActivityIndicator, Colors,TouchableRipple } from 'react-native-paper';

// custom imports
import   { axiosInstance } from '../axios_inst';
import { CaptilizeFirstWord } from '../utils';


const UserList=({ navigation })=>{
  const [ userListsData,setUserListData ]=useState([]);
  const [roomId,setRoomId]=useState("");
  useEffect(()=>{
   AsyncStorage.getItem("acess_token").then(()=>{
       axiosInstance.get("userlist/all_users/")
       .then(res=>{
         setUserListData(res.data);
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