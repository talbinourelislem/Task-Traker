import React, { useState,useEffect } from 'react';
import { View, Text, Alert,Pressable, StyleSheet } from 'react-native';
import pb from './Pb';

const Inbox = ({item}) => {
  const [activeButton, setActiveButton] = useState('inbox'); // Initial active button

 
  

  return (
    <View style={styles.container}>
        <View style={styles.lineone}>
        <Text style={styles.title1}>{item.title}</Text>
        <Text style={styles.title2}>{item.updated}</Text>
        </View>
        <Text style={styles.title3}>{item.description}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:"90%",
    height:150,
    marginTop:20,
    backgroundColor:"#fff",
    borderRadius:10,
  },
  title1:{
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:10,
    color: "#000", 
  },
  lineone:{
    marginTop:22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"90%",

  },
  title2:{
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:1,
    color: "#888", 
  },
  title3:{
    marginTop:10,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom:1,
    color: "#555", 
  },
});

export default Inbox;
