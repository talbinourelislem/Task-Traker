import React, { useState,useEffect } from 'react'
import { Alert, ScrollView , Image, Pressable, SafeAreaView, StyleSheet, Switch,Button, Text, TextInput, View } from 'react-native'
import { Dimensions } from 'react-native';
import User from './User.png';
import House from './House.png';
import SlideButton from './SlideButton';
import Card from './Card';
import Card2 from './Card2';
import Inbox from './Inbox';
import pb from './Pb';
import Each from './Each';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { ReactComponent as Logo } from './User.svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Home({route}) {
  const Rdata = route.params.data;
    const [click,setClick] = useState(false);
    const {username,setUsername}=  useState("");
    const {password,setPassword}=  useState("");
    const [task, settask] = useState([]);
  const [Colltask, setColltask] = useState([]);
  const [inbox, setinbox] = useState([]);

  const [isTrue, setIsTrue] = useState(false); //- Initial state is false
  const toggleState = (value) => {
    setIsTrue(value === 'task');
  };

          console.log("Rdata",Rdata);

    useEffect(() => {
      async function fetchData() {
        try {
          LocationPermission();
          handleNew4();
          handleLogin5();
          handleLogin2();
        } catch (error) {
          console.log(error.originalError)
              };
} 
      fetchData();
    }, []);

    
    const  LocationPermission = async () => {
      try {
         Geolocation.requestAuthorization();
    
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'IsUniv',
            message: 'Allow IsUniv to access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Add logic for when the permission is granted
          console.log('Location permission granted');
        } else {
          Alert.alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
// Extract coordinates and call the function
const description = 'User Location'; // You can change the description as needed
const [locationData1, setLocationData1] = useState(null);

useEffect(() => {
  if (locationData1) {
    console.log("locationData1 updated:", locationData1);
    console.log("locationData1.coords.latitude", locationData1.coords.longitude);
    console.log("locationData1.coords.latitude", locationData1.coords.latitude);
  }
}, [locationData1]);

const handleNew4 = async () => {
  try {
    Geolocation.getCurrentPosition((info) => {
      setLocationData1(info);
      console.log("TRE", info);
    });
  } catch (error) {
    console.error("Error fetching record:", error);
    // Handle the error if necessary
  }
};


const { latitude, longitude } = locationData1?.coords || {};
const handleLogin5 = async () => {
  try {
    const data = {
      "latitude": locationData1.coords.latitude,
      "longitude": locationData1.coords.longitude,
    }; 
  const record = await pb.collection('worker').update(Rdata.userId, data);



 

  } catch (error) {
    // Handle the error
  }
};

    
    const handleLogin2 = async () => {
      try {
      
      const records = await pb.collection('worker').getOne(Rdata.userId);
      console.log("_____________________________________________________________________");
      console.log("Rdata",records);
      handleNew2(records.task);
      handleNew3(records.inbox);

      console.log("_____________________________________________________________________");
     

      } catch (error) {
        // Handle the error
      }
    };
    const handleNew2 = async (tasks) => {
      setColltask([])
      for (let x = 0; x < Object.keys(tasks).length; x++) {
        try {
          const record = await pb.collection('task').getOne(tasks[x]);
          if (record) {
            setColltask(prevState => [...prevState, record]); // Add the record to colltask array
            console.log('Colltask',Colltask);

          }
        } catch (error) {
          console.error("Error fetching record:", error);
          // Handle the error if necessary
        }
      }

      };
      const handleNew3 = async (tasks) => {
      setinbox([])
        for (let x = 0; x < Object.keys(tasks).length; x++) {
          try {
            const record = await pb.collection('inbox').getOne(tasks[x]);
            if (record) {
              setinbox(prevState => [...prevState, record]); // Add the record to colltask array
              console.log('Colltask',Colltask);
  
            }
          } catch (error) {
            console.error("Error fetching record:", error);
            // Handle the error if necessary
          }
        }
  
        };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.flexView}>
        <Text style={styles.title5}></Text>
        <View style={styles.flexView2}>

        <Image source={User} style={styles.image2}  />
        <Image source={House} style={styles.image2}  />
        </View>
    
        </View>
        <ScrollView  style={styles.flexViewcont}>

        <View style={styles.centeredContent}>

  
      <SlideButton onToggle={toggleState}  />

{isTrue ?  
  <Each of={Colltask} render={(Item, index) => (
    <Card2 key={index} item={Item} index={index} />
  )} />  
  : 
  <Each of={inbox} render={(Item, index) => (
    <Inbox key={index} item={Item} index={index} />
  )} />
}



  
         </View>
         </ScrollView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: 0,
    height: screenHeight, // Set the height dynamically based on screen height
    backgroundColor:"#fff",
  },
  image2: {
    height: 30,
    width: 30, 

  },
  flexViewcont:{
    backgroundColor:"#F6F6F6",
    height: "85%",
    width: screenWidth, 
  },
  centeredContent: {
    alignItems: 'center',
  },
  flexView:{
 flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  width: "100%",

  overflow: 'hidden', 
  },

  flexView2:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100,
   

  },
  title5: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    color: "#1E232C" ,

    marginLeft:30,
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
  input2: {
    height: 50,
    width:"90%",
    paddingHorizontal: 20,
    borderColor: "#4CAF50",
    backgroundColor:"#fff",
    borderWidth: 1,
    borderRadius: 7,
    color: "black", 
    marginTop:40,

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