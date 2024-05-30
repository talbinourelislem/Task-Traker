import React, { useState,useEffect } from 'react'
import { Alert,  Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const logo = require("./welcome.png")
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import pb from './Pb';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login( { onLogin,navigation }) {
    const [click,setClick] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false)
    const [test, settest] = useState([]);
    console.log("test",test);

    const [Colltask, setColltask] = useState([]);
    const [Inbox, setInbox] = useState([]);


    useEffect(() => {
      // Check if credentials are stored in AsyncStorage
      AsyncStorage.getItem('userData').then((data) => {
        if (data) {
          const { storedUsername, storedPassword } = JSON.parse(data);
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberMe(true);
        }
      });
    }, []);


    const handleNew2 = async (tasks) => {
      setColltask([])
      for (let x = 0; x < Object.keys(tasks).length; x++) {
        try {
          const record = await pb.collection('task').getOne(tasks[x]);
          if (record) {
            setColltask(prevState => [...prevState, record]); // Add the record to colltask array
          }
        } catch (error) {
          console.error("Error fetching record:", error);
          // Handle the error if necessary
        }
      }

      };
      const handleNew3 = async (Inbox) => {
        setInbox([])
          try {
            const record = await pb.collection('Inbox').getOne(Inbox[x]);
            if (record) {
              setInbox(prevState => [...prevState, record]); // Add the record to colltask array
            }
          } catch (error) {
            console.error("Error fetching record:", error);
            // Handle the error if necessary
          }
        
        
        };

    const handleLogin = async () => {
      try {
        const authData = await pb.collection('worker').authWithPassword(
          username,
          password,
      );


      const records = await pb.collection('worker').getOne(authData.record.id);
      console.log("_____________________________________________________________________");

      handleNew2(records.task);
      handleNew3(records.inbox);
      console.log("_____________________________________________________________________");

        console.log("authData", authData.record.AD); // Wait for handleNew() to complete
        const authData2 = {
          isLoggedIn: pb.authStore.isValid, 
          userId: authData.record.id, 
          task:records.task,
          Inbox:Inbox,

        };
        if (authData.record.AD) {
          navigation.navigate('Home2',{data:authData2});
        } else {
          navigation.navigate('Home',{data:authData2}); 
        }

        console.log("status",authData2 );
       

      onLogin(authData2);
      if (rememberMe) {
        AsyncStorage.setItem('userData', JSON.stringify({ storedUsername: username, storedPassword: password }));
      }
      } catch (error) {
        // Handle the error
      }
      
    };
    const gotoregister =()=>{
      navigation.navigate('Register');
    };
    const goToForgotPassword = () => {
      navigation.navigate('Forgot'); 
    };

  return (
    <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.image} resizeMode='contain' />
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
        </View>
        <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}}  onPress={() => setRememberMe(!click)} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <View>
                <Pressable onPress={goToForgotPassword}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
        </View>

        <View style={styles.footerText}>
        <Text>Don't Have Account?</Text>
        <Pressable onPress={gotoregister}>
              <Text style={styles.signup}>  Sign Up</Text> 
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
  image: {
    height: 260,
    width: screenWidth, // Set the width dynamically based on screen width
   marginBottom:20, 
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    paddingVertical: 40,
    color: "#4CAF50" // Changed color to "#4CAF50"
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
    color: "#4CAF50" // Changed color to "#4CAF50"
  },
  button: {
    backgroundColor: "#4CAF50", // Changed color to "#4CAF50"
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
    fontWeight: "bold",
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
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    position: 'absolute',
    bottom: 0,
    left: 78,
    right: 0,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
    
  },
  
  signup: {
    color: "#4CAF50", // Changed color to "#4CAF50"
    fontSize: 14,
    left: 160,
    top:-24,
  }
  
})