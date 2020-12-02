import React,{ useState } from 'react'
import {
    Block, Button, Input, NavBar, Text,
  } from 'galio-framework';

  import {
    Alert, Dimensions, KeyboardAvoidingView, StyleSheet, AsyncStorage
  } from 'react-native';

import   { baseURL } from '../axios_inst';
import axios from 'axios';
import {ValidateEmail,ValidatePassword,checkifempty} from '../utils';
import theme from '../theme';
const { width } = Dimensions.get('window');

const RegisterPage=({ navigation })=>{
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [password2,setPassword2]=useState("");

    const [fieldemptyerror,setFieldEmptyError]=useState(false);
    const [passworderror,setPasswordError]=useState(false);
    const [emailerror,setEmailError]=useState(false);
    const [passwordNotMatch,setPasswordNotMatch]=useState(false);
    const [usernameExists,setUsernameExists]=useState(false);
    const [emailExists,setEmailExists]=useState(false);
    

    const handleChange=(name,text)=>{
      if(name==="username"){
        setUsername(text);
      }
      if(name=="email"){
        setEmail(text);
      }
      if(name=="password"){
        setPassword(text);
      }
      if(name=="password2"){
        setPassword2(text);
      }
    }
    const handleSubmit=(e)=>{
      const  text_username=checkifempty(username);
      const  text_password=checkifempty(password);
      const  text_password2=checkifempty(password2);
      const  text_email=checkifempty(email);
      // const  valid_password= ValidatePassword(password);//add this while building
      const valid_password=true //for dev only
      const  valid_email=ValidateEmail(email); 

      if(text_email && text_username && text_password && text_password2){  //check if empty
        setFieldEmptyError(false);
        if(valid_email && valid_password){ //check if email is valid
          setEmailError(false);
          setPasswordError(false);
          if(password===password2){ //check if the password is equal
            setPasswordNotMatch(false);
            axios.post(baseURL+"account/register",{
                  'email':String(email),
                  'username':String(username),
                  'password':String(password),
                  'password2':String(password2),
            })
            .then(res=>{
              let returned_res=res.data;
              console.log(returned_res);
              setEmailExists(false);
              setUsernameExists(false);
             if(returned_res.email!==undefined){
                    setEmailExists(true);
             }
             if(returned_res.username!==undefined){
                    setUsernameExists(true);    
             }
            })
            .catch(err=>{
              console.log(err);
            })
           }
          else{
            setPasswordNotMatch(true);
           }
        }
        else{
          if(!valid_password){
            setPasswordError(true);
          }
          if(!valid_email){
            setEmailError(true);
          }
        }
 
      }
      else{
        setFieldEmptyError(true);
      }
    }
    return(
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Register a New Account"
          onLeftPress={()=>{console.log("pressed")}}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE, } : null}
        />
        
        {fieldemptyerror?(<Text center style={styles.errorColor} >Dont leave any field empty*</Text>):null}
        
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <Block  center style={{ marginTop: theme.SIZES.BASE * 1.875 }}>
         
          </Block>
 
          <Block flex={3} >
            <Block >
              <Text >Email:</Text>
              
              <Input
                rounded
                onChangeText={text => handleChange('email', text)} 
                type="email-address"
                placeHolder="theme"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                help={emailerror?(<Text style={styles.errorColor}>Email is not valid</Text>):null}
                bottomHelp
              />
              {emailExists?(<Text center style={styles.errorColor }>Email is already registered</Text>):null}
              <Text >UserName:</Text>
              <Input
                onChangeText={text => handleChange('username', text)} 
                rounded              
                type="email-address"
                placeHolder="theme"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                // onChangeText={text => handleChange('email', text)}
                help={usernameExists?(<Text center style={{color:"red"}}>Username is taken*</Text>):(null)}
                bottomHelp
              />
              <Text>Password:</Text>
              
              <Input
                rounded
                onChangeText={text => handleChange('password', text)} 
                password
                viewPass
                placeHolder="Password"
                style={{ width: width * 0.9 }}
                // onChangeText={text => handleChange('password', text)}
                help={passworderror?(<Text style={styles.errorColor}>Password must be 8 character long with 1 capital and special character</Text>):null}
                bottomHelp
              />

                <Text>Confirm password:</Text>
              <Input
                rounded
                onChangeText={text => handleChange('password2', text)} 
                password
                viewPass
                placeHolder="Password"
                style={{ width: width * 0.9 }}
                // onChangeText={text => handleChange('password', text)}
                help={passwordNotMatch?(<Text center style={styles.errorColor}>Password's do not match</Text>):null}
                bottomHelp
              />
             
            </Block>
            <Block flex middle>
              <Button
                round
                size="large"
                color="success" 
                onPress={handleSubmit}
              >
                Sign up
              </Button>
              <Button color="transparent" shadowless onPress={()=>{navigation.navigate('Login')}}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                  {"Already Have an Account Sign in?"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: theme.SIZES.BASE * 0.3,
      paddingHorizontal: theme.SIZES.BASE,
      backgroundColor: theme.COLORS.WHITE,
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
    },
    errorColor:{
      color:"red"
    }
  });
  
  
export default RegisterPage