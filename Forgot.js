import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const forgot = require("./forgot.png")
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const Forgot = ({navigation}) => {
    const [click,setClick] = useState(false);
    const {username,setUsername}=  useState("");
    const {password,setPassword}=  useState("");
  return (
    <SafeAreaView style={styles.container}>
        <Image source={forgot} style={styles.image2} resizeMode='contain' />
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.info}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>

        <View style={styles.inputView}>
        <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />

        </View>
       

        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={() => Alert.alert("Forget Password!")}>
                <Text style={styles.buttonText}>Send Code</Text>
            </Pressable>
        </View>
        <Text style={styles.footerText}>Remember Password?<Text style={styles.signup}>  Login</Text></Text>

        
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
    width: 150, // Set the width dynamically based on screen width
   marginBottom:20, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    marginBottom:1,
    color: "#1E232C", 
    width:280,
  },
  info:{
    fontSize: 14,
    fontWeight: "medium",
    textAlign: "left",
    width:280,
    paddingVertical: 10,
    marginBottom:20,
    color: "#8391A1",
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
  
 
});
export default Forgot;