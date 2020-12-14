import React,{useState,useRef,useEffect} from 'react';
import {Avatar,Title,List,Divider,Caption,TouchableRipple,TextInput,Provider,FAB,Button, Paragraph,Portal,Modal,IconButton,Colors} from 'react-native-paper'
import {View,StyleSheet,Text,Platform,Image } from 'react-native'
import { Modalize } from 'react-native-modalize';
import * as ImagePicker from 'expo-image-picker';
//custom imports
import axios from 'axios'
import images from '../screen/default.png'
import { base64ToBlob } from '../utils';

const ProfilePage=({ navigation })=>{
  const [visibleName, setVisibleName] = useState(false);
  const [visibleAbout,setVisibleAbout]=useState(false);
  const [visibleEmail,setVisibleEmail]=useState(false);

  // const [visible,setVisible]=useState(false);
  const showModalName = () => setVisibleName(true);
  const hideModalName = () => setVisibleName(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const showModalAbout = () => setVisibleAbout(true);
  const hideModalAbout = () => setVisibleAbout(false);

  const showModalEmail = () => setVisibleEmail(true);
  const hideModalEmail = () => setVisibleEmail(false);

  const modalizeRef = useRef(null);
  const [image, setImage] = useState(null);
  
  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);




  const onOpen=()=>{
   modalizeRef.current?.open();
  };
  
  const pickImage = async () => {
    modalizeRef.current?.close();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      base64:true,
      quality: 0.6,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      let uri = result.uri;
      let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);
      console.log(fileExtension)
      const type='image/'+String(fileExtension)
      console.log(type)
      // base64ToBlob(result.base64,res)
      let ProfilepicForm=new FormData();
     
      axios.post('http://192.168.0.108:8000/api/userlist/update_profile/',{ //anonymous for now 
        file:ProfilepicForm
      }).then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
      console.log(ProfilepicForm)
      

    }
  };

  const [text,setText]=useState("")

  

    return(
      <Provider>
  <View style={styles.container}>
      <Portal>
        <Modal visible={visibleName} onDismiss={hideModalName} contentContainerStyle={containerStyle}>
          <TextInput
         label="Name"
         mode="flat"
         onChangeText={text => console.log(text)}
        
        ></TextInput>

        </Modal>

        <Modal visible={visibleAbout} onDismiss={hideModalAbout} contentContainerStyle={containerStyle}>
          <TextInput
         label="About"
         mode="flat"
         onChangeText={text => console.log(text)}
        
        ></TextInput>
        <Button onPress={()=>{console.log("done clicked")}}>Done</Button>
        <Button onPress={()=>{console.log("done clicked")}}>Done</Button>

        </Modal>
        <Modal visible={visibleEmail} onDismiss={hideModalEmail} contentContainerStyle={containerStyle}>
          <TextInput
         label="About"
         mode="flat"
         onChangeText={text => console.log(text)}>

         </TextInput>
        <Button onPress={()=>{console.log("done clicked")}}>Done</Button>
        </Modal>


      </Portal>
    
      {/* <Searchbar
      placeholder="Search"
     
    /> */}
      <Avatar.Image style={styles.avatar} source={images} size={150} />
      <FAB
      loading={false}
    style={styles.fab}
    large
    icon="camera"
    onPress={onOpen}
      />
     
      <Modalize 
      ref={modalizeRef}
      modalHeight={140}
      HeaderComponent={
        <View style={{ alignSelf:"center" }}>
          <Paragraph>Change Profile Photo</Paragraph>
        </View>
      }

      >
        <View >
  <IconButton
    style={styles.roundButton1}
    icon="folder-multiple-image"
    color={Colors.grey100}
    size={36}
    onPress={pickImage}
  />
  <IconButton
    style={styles.roundButton2} 
    icon="trash-can"
    color={Colors.grey100}
    size={36}
    onPress={() => console.log('Pressed')}
  />


       </View>
      </Modalize>
     
      <Divider/>
{/* first input  Name */}
{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableRipple
      onPress={showModalName}
      rippleColor="rgba(0, 0, 0, .32)"
      >
      <List.Item 
        title={<Paragraph>Name</Paragraph>}
        description={<Text><Title>Mr.unknown02<Text>{'\n'}</Text></Title><Caption>This is your username</Caption></Text>}
        left={props=><List.Icon  icon="account"  size={30} />}
        right={props=><List.Icon  icon="pencil" />}
      />
     </TouchableRipple>

     <Divider/>
{/* second input ABout */}
     <TouchableRipple
      onPress={showModalAbout}
      rippleColor="rgba(0, 0, 0, .32)"
     >
     <List.Item 
      title={<Paragraph>About</Paragraph>}
      description={<Title>Zzz.......</Title>}
      left={props=><List.Icon  icon="information"  size={30} />}
      right={props=><List.Icon  icon="pencil" />}
  />
  </TouchableRipple>
  <Divider/>
  {/* third input email */}
  <TouchableRipple
      onPress={showModalEmail}
      rippleColor="rgba(0, 0, 0, .32)"
     >
     <List.Item 
      title={<Paragraph>Email</Paragraph>}
      description={<Text>nonek25121999@gmail.com</Text>}
      left={props=><List.Icon  icon="email"  size={30} />}
      right={props=><List.Icon  icon="pencil" />}
  />
  </TouchableRipple>
  <Divider/>

{/* QR option */}

  <TouchableRipple
      onPress={() => {navigation.navigate("ShowQR")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
     <List.Item 
      title={<Text>QRcode</Text>}
      left={props=><List.Icon  icon="qrcode"  size={30} />}
  />
  </TouchableRipple>
  <Divider/>

  </View>
  </Provider>
    )
}



const styles=StyleSheet.create({
  container:{
    flex:1,  
  },
  avatar:{
    marginTop:30,
    alignSelf:"center",
    marginBottom:30,
  },
  fab: {
    position: 'absolute',
    top:"18%",
    right:"28%",
    
  },
  roundButton1: {
    width: 70,
    height: 70,
    position:"relative",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1a75ff',
    left:"10%",
    top:"10%",
    // elevation:4,
  },
  roundButton2: {
    width: 70,
    height: 70,
    padding: 10,
    borderRadius: 100,
    position:"relative",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff1a1a",
    left:"42%",
    bottom:"40%",
  },
})




export default ProfilePage;