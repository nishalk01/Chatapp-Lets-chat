import React,{ useState } from 'react';
import {
  Alert, Dimensions, KeyboardAvoidingView,AsyncStorage
} from 'react-native';
import { axiosInstance,setRefreshToken,setAcessToken } from '../axios_inst';
// galio component
import {
  Block, Button, Input, Text,
} from 'galio-framework';
import { ValidateEmail,ValidatePassword } from '../utils';
import theme from '../theme';
import {styles} from '../Auth_styles'
const {  width } = Dimensions.get('window');
console.log(axiosInstance)

const Login =({ navigation })=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [passwordError,setPasswordError]=useState(false);
  const [emailError,setEmailError ] =useState(false);
  const [isLoading,setIsLoading]=useState(false);


  const handleChange=(name,text)=>{
    if(name==='email'){
      setEmail(text);
      
    }
    else if(name==='password'){
      setPassword(text);
    }
 
  }
  
  const handleSubmit=(e)=>{
    let val_email=ValidateEmail(email);
    // let val_password=ValidatePassword(password);
    let val_password=true;
    if(!val_email){
      setEmailError(true);
    }
    if(!val_password){
      setPasswordError(true);
      
    }
    if(val_password && val_email){
      //do axios call
      setIsLoading(true);
      axiosInstance.post("token/",{
        "email":email,
        "password":password
      })
      .then( async (res)=>{
        // AsyncStorage.setItem('access_token',res.data.access);
        // AsyncStorage.setItem('refresh_token',res.data.refresh);
        await setAcessToken(res);
        await setRefreshToken(res);
        
        axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + res.data.access
        setEmail("")
        setPassword("")
        setIsLoading(false);
        navigation.navigate('MainApp', { screen: 'UserList' });

      })
      .catch(err=>{
        console.log(err)
        Alert.alert(err);
      })
      setEmailError(false)
      setPasswordError(false)
      
    }
  
  }
 

  return(
  <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        {/* <NavBar
          title="LOGIN"
          onLeftPress={()=>{console.log("pressed")}}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        /> */}
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875 }}>
            <Text muted center size={theme.SIZES.FONT * 0.875} >
             Replace with icon
            </Text>
          
            <Text muted center size={theme.SIZES.FONT * 0.875}>
              or be classical
            </Text>
          </Block>
 
          <Block flex={4} >
            <Block >
              <Text style={{ color:"black"}} >Email:</Text>
              <Input
                rounded
                type="email-address"
                placeHolder="theme"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={text =>handleChange('email', text)}
                value={email}
                help={emailError?(<Text style={{color:"red"}}>email entered is not in proper format</Text>):(<Text> </Text>)}
                bottomHelp
              />
              <Text  style={{ color:"black"}}>Password:</Text>
              <Input
                rounded
                password
                viewPass
                placeHolder="Password"
                style={{ width: width * 0.9}}
                onChangeText={text => handleChange('password', text)}
                value={password}
                help={passwordError?(<Text style={{color:"red"}}>password has to be so and so</Text>):(<Text> </Text>)}
                bottomHelp
              />
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => {
                  // console.log(As)
                  AsyncStorage.clear();
                  console.log("cleared local stoarge")
                  navigation.navigate('MainApp', { screen: 'UserList' })
                }
                   }
                style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
              >
                Forgot your password?
              </Text>
            </Block>
            <Block  middle>
              <Button
                round
                uppercase
                size="large"
                loading={isLoading}
                color="success" 
                onPress={handleSubmit}
              >
                LOGIN
              </Button>
              <Button color="transparent"  shadowless onPress={()=>{navigation.navigate('RegisterPage')}}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
  )
}

export default Login;