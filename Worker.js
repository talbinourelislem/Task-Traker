import React, { useState } from 'react';
import { View, Text, Linking,Image, StyleSheet,TextInput,TouchableOpacity,Modal} from 'react-native';
import photo from './photo.png';
import Phone from './Phone.png';
import ChatCircleDots from './ChatCircleDots.png';
import pb from './Pb';



const Worker = ({ item, index ,phoneNumber  }) => {
  const [activeButton, setActiveButton] = useState('inbox'); // Initial active button
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleInbox = async () => {
    setModalVisible(false);
    try {
      console.log("fuf",message);
      const data = {
        "title": "Boss",
        "description": message,
    };
    
    const record = await pb.collection('Inbox').create(data);

    const post = await pb.collection('worker').update(item.id, {
      // message to the target worker
      'inbox': record.id,
  
  })
    console.log("record",record);
    console.log("post",post);

    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setActiveButton(activeButton === 'inbox' ? 'task' : 'inbox');
  };
  const originalNumber = item.phone_number.toString();
  const formattedNumber = "0" + originalNumber.slice(3); // Replace only the first 3 characters with "0" // Replaces "213" with "0"
  const handleCall = () => {
    const url = `tel:${formattedNumber}`;
    console.log(item.phone_number);
    Linking.openURL(url);
  };
 
  return (
    <View style={styles.container}>
        <Image source={photo} style={styles.image2}  />

        <View style={styles.lineone}>
        <Text style={styles.title1}> {item.username}  </Text>
        <Text style={styles.title2}>{item.Zone}</Text>
        {/* <Text style={styles.title3}>{item.Zone} </Text> */}
        </View>
        <View style={styles.lineone2}>
        <TouchableOpacity onPress={handleCall}>
          <Image source={Phone}   />
        </TouchableOpacity>
        <TouchableOpacity  title="Open Modal"
        onPress={() => setModalVisible(true)}>
        <Image source={ChatCircleDots}  />
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10,height:250,width:300, }}>
           
            <TextInput
        style={styles.input}
        placeholder="Enter your message here..."
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        autoCorrect={false}
        autoCapitalize="none"
        numberOfLines={4}
        multiline={true}
        textAlignVertical="top"
      />
            <TouchableOpacity  onPress={() => setModalVisible(false)} style={styles.cancelbutton}>
            <Text style={styles.canceltext}> Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleInbox } style={styles.sendbutton} >
         <Text style={styles.sendtext}> Send</Text>
        </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"90%",
    height:80,
    marginTop:20,
    backgroundColor:"#fff",
    borderRadius:10,
  },
  title1:{
    fontSize: 14,
    fontWeight: "bold",
    marginBottom:1,
    color: "#000", 
  },
  lineone:{
    flexDirection: 'culem',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width:"40%",

  },
  lineone2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"20%",
    marginRight:10,
  },
  title2:{
    height:40,
    width:150,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "flex-start",
    marginBottom:1,
    color: "#4CAF50", 
  
  },
  
  image2:{
  marginLeft:10,
  width:40,
  height:40,
  borderRadius:20,
  },
  input2:{
    height: 150,
    paddingHorizontal: 20,
    width:'90%',
    borderColor: "#4CAF50", 
    borderWidth: 1,
    borderRadius: 7,
    color: "black", 
    backgroundColor:"#fff",
    color: "#000", 
    padding: 10,

  },
  sendbutton:{
    borderRadius:5,
    borderColor: "gray",
    backgroundColor:"green",
    left:140,
    height:40,
    width:120,
    top:30,
  },
  sendtext:{
    left:36,
    top:7,
    color:"white",
  },
  cancelbutton:{
    borderRadius:5,
    borderColor: "gray",
    backgroundColor:"#AA4C4C",
    height:40,
    width:120,
    top:70,

  },
  canceltext:{
    left:25,
    top:7,
    color:"white",
  }
});

export default Worker;
