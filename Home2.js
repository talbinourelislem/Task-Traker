import React, { useState,useEffect } from 'react'
import { Alert, ScrollView , Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native';
import User from './Map.jpg';
import House from './House.png';
import Addtaske from './Addtaske';
import Worker from './Worker';
import SlideButtonofadmen from './SlideButtonofadmen';
import pb from './Pb';
import Each from './Each';

import { ReactComponent as Logo } from './User.svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Home2({route,navigation}) {
  const Rdata = route.params.data;
    const [click,setClick] = useState(false);
    const {username,setUsername}=  useState("");
    const {password,setPassword}=  useState("");
    const [task, settask] = useState([]);
  const [Colltask, setColltask] = useState([]);
  const [Orker, setOrker] = useState([]);
  const [Rcords, setRecords] = useState([]);
  const [Rcord, setRecord] = useState([]);
  const [workerPhoneNumber, setWorkerPhoneNumber] = useState('');


  const [isTrue, setIsTrue] = useState(false); //- Initial state is false
  const toggleState = (value) => {
    setIsTrue(value === 'task');
  };

          console.log("Rdata",Rdata);

    useEffect(() => {
      async function fetchData() {
        try {
          const recordList  = await pb.collection('worker').getList();

          console.log("_____________________________________________________________________");
          console.log("recordList",recordList.items);
          console.log("_____________________________________________________________________");
          setRecords(recordList.items);
  
            console.log("records",Rcords);         
        } catch (error) {
          console.log(error.originalError)
              };
      }
  
      fetchData();
    }, []);
    useEffect(() => {
      async function fetchData() {
        try {
          const recordList  = await pb.collection('worker').getList();

          console.log("_____________________________________________________________________");
          console.log("recordList",recordList.items);
          console.log("_____________________________________________________________________");
          setRecords(recordList.items);
  
            console.log("records",Rcords);         
        } catch (error) {
          console.log(error.originalError)
              };
      }
  
      fetchData();
    }, []);

    useEffect(() => {
      console.log("Updated records:", Rcords);
    }, [Rcords]);

  
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.flexView}>
        <Text style={styles.title5}></Text>
        <View style={styles.flexView2}>
        <TouchableOpacity onPress={() => navigation.navigate('Map2')}>
        <Image source={User} style={styles.image2}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Inbox2')}>
        <Image source={House} style={styles.image2}  />
        </TouchableOpacity>
        </View>
    
        </View>
        <ScrollView  style={styles.flexViewcont}>

        <View style={styles.centeredContent}>

  
      <SlideButtonofadmen onToggle={toggleState}  />

      {isTrue ?  
  <Addtaske/>
  : 
  <Each of={Rcords} render={(Item, index) => (
    <Worker key={index} item={Item} index={index} />
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