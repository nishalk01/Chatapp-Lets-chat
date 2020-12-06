import React,{ useState } from 'react'
import { Dimensions, KeyboardAvoidingView,AsyncStorage} from 'react-native';

//third party library imports
import { Block, Button, Input, NavBar, Text,} from 'galio-framework';
import axios from 'axios';

//custom imports
import   { baseURL } from '../axios_inst';
import {ValidateEmail,ValidatePassword,checkifempty} from '../utils';
import theme from '../theme';
import {styles} from '../Auth_styles'

const { width } = Dimensions.get('window');

const RegisterPage=({ navigation })=>{
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [password2,setPassword2]=useState("");
    const [isLoading,setIsLoading]=useState(false)

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
            setIsLoading(true);
            axios.post(baseURL+"account/register",{
                  'email':String(email),
                  'username':String(username),
                  'password':String(password),
                  'password2':String(password2),
            })
            .then(res=>{
              let returned_res=res.data;
              console.log(returned_res);
              setIsLoading(false);
              setEmailExists(false);
              setUsernameExists(false);
              //write code to navigate to login page once registered
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
                value={email}
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
                value={username}
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
                value={password}
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
                value={password2} 
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
                loading={isLoading}
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


  
  
export default RegisterPage