import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const Hello = require("./Hello.png")
import { Dimensions } from 'react-native';
import pb from './Pb'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Register({navigation}) {
    const [click,setClick] = useState(false);
    const [username, setUsername] = useState("");
    const [email,setEmail]=  useState("");
    const [password,setPassword]=  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone_number,setPhone_number]=  useState("");
    const gotoLogin =()=>{
      navigation.navigate('Login');
    }; 
    const handleRegister = async () => {
    
      try {
       
      //   if (password !== confirmPassword) {
      //     // Passwords don't match, handle this scenario (e.g., display an error message)
      //     Alert.alert("Password do not match ");
      //     return; // Exit function
      // };
      const data = {
        username: username,
        email: email,
        emailVisibility: true,
        password:password,
        passwordConfirm:confirmPassword,
        AD: false,
        phone_number:phone_number,
       
    };
    
const record = await pb.collection('worker').create(data);
console.log("record",record);
gotoLogin();
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <SafeAreaView style={styles.container}>
        <Image source={Hello} style={styles.image2} resizeMode='contain' />
        <Text style={styles.title}>Register to get started</Text>

        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='USERNAME' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />
        <TextInput style={styles.input} placeholder='EMAIL' value={email} onChangeText={setEmail} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
         <TextInput style={styles.input} placeholder='Confirm password' secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} autoCorrect={false}
        autoCapitalize='none'/>
         <TextInput style={styles.input} placeholder='Phone number'   keyboardType='numeric'  value={phone_number} onChangeText={setPhone_number} autoCorrect={false}
        autoCapitalize='none'/>

        </View>



        <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            
        </View>

        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
        </View>
        
       

        

        
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    height: screenHeight, // Set the height dynamically based on screen height
    backgroundColor:"#fff",
  },
  image2: {
    height: 180,
    width: screenWidth, // Set the width dynamically based on screen width
   marginBottom:20, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    paddingVertical: 10,
    marginBottom:20,
    color: "#1E232C" // Changed color to "#4CAF50"
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#4CAF50", // Changed color to "#4CAF50"
    borderWidth: 1,
    borderRadius: 7,
    color: "black", 

  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rememberText: {
    fontSize: 13
  },
  forgetText: {
    fontSize: 11,
    color: "#4CAF50" ,
  },
  button: {
    backgroundColor: "#4CAF50", 
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop:20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23
  },
 
  footerText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  signup: {
    color: "#4CAF50", // Changed color to "#4CAF50"
    fontSize: 13
  }
  
 
})