import React, { useState } from 'react';
import { View, Text, Alert,Pressable, StyleSheet } from 'react-native';

const Card = ({ item, index }) => {
  const [activeButton, setActiveButton] = useState('inbox'); // Initial active button

  const handleToggle = () => {
    setActiveButton(activeButton === 'inbox' ? 'task' : 'inbox');
  };

  return (
    <View style={styles.container}>
        
     <View style={styles.Processed_container}>
     <View style={styles.Processed}>
      <Text style={styles.title}>Processed </Text>
     </View>
     <Text style={styles.Processed_number}>No. {index}  </Text>
     </View>
     <View style={styles.container_number} >

<View style={styles.container_Processed_number} >
<Text style={styles.location_text}>88 Zurab Gorgiladze St</Text>
<Text style={styles.location_text2}>Georgia, Batumi</Text>
</View>
<View style={styles.container_Processed_number} >
<Text style={styles.location_text}>88 Zurab Gorgiladze St</Text>
<Text style={styles.location_text2}>Georgia, Batumi</Text>
</View>
</View>

<Pressable style={styles.button} onPress={() => Alert.alert("Login Successfuly!","see you in my instagram if you have questions : must_ait6")}>
                <Text style={styles.buttonText}>Problem</Text>
            </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:"90%",
    height:180,
    marginTop:20,
    backgroundColor:"#fff",
    borderRadius:10,
  },
  Processed_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"90%",
    height:40,
    marginTop:10,
    backgroundColor:"#fff",  
    bordercolor:'#fff',
  },
  container_Processed_number:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  container_number:{
        marginTop:10,

  },
  Processed_number: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom:1,
    color: "#B8B8B8", 
    width:280,
  },
  Processed: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    height:30,
    backgroundColor:"#FEF7EC",
    borderRadius: 5,
    
  },
  title:{
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom:1,
    color: "#F2AB58", 
    width:280,
  },
  
  location_text:{
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000", 
    width:280,
  },
  location_text2:{
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#B8B8B8", 
    width:280,
  },
  button:{
    backgroundColor: "#D97272", 
    height: 30,
    width:100,
    borderColor: "#D97272",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:180,
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold"
  },
});

export default Card;
