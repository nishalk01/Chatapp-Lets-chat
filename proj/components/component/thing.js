import React,{useState} from 'react';
import image from '../screen/default.png'
import {Avatar,Title,List,Divider,Caption,TouchableRipple,TextInput,Provider,Dialog,Button, Paragraph,Portal,Modal} from 'react-native-paper'
import {View,StyleSheet,Text } from 'react-native'

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
         onChangeText={text => console.log(text)}
        
        ></TextInput>
        <Button onPress={()=>{console.log("done clicked")}}>Done</Button>
        </Modal>


      </Portal>
     
   
      <Avatar.Image style={styles.avatar} source={image} size={150} />
      <Divider/>
{/* first input */}
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
{/* second input */}
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
  <TouchableRipple
      onPress={() => {navigation.navigate("ShowQR")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
     <List.Item 
      title={<Text>QRcode</Text>}
      // description={<Text>nonek25121999@gmail.com</Text>}
      left={props=><List.Icon  icon="qrcode"  size={30} />}
      // right={props=><List.Icon  icon="pencil" />}
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
  }
})
export default ProfilePage;