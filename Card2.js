import React, { useState,useEffect } from 'react';
import { View, Text, Modal,Pressable, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import pb from './Pb';

const Card = ({ item, index }) => {
  const [activeButton, setActiveButton] = useState('inbox'); // Initial active button
  const [buttonText, setButtonText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
console.log("item",item);
const handleTask = async (taskId) => {
  try {
    
    navigation.navigate('Taskdetails', { data: taskId }); // Pass taskId as a parameter
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};
useEffect(() => {
  async function fetchData() {
    try {
      setButtonText(item.field3 ? 'Active' : 'Waiting');
    } catch (error) {
      console.log(error.originalError);
    }
  }

  fetchData();
}, []);
const handleProblem = async () => {
  try {
    const data = {
      "Title": name,
      "Description": message,
  };
  
  const record = await pb.collection('Inboxadmin').create(data);
  console.log("record",record);
  } catch (error) {
    console.error('Error fetching problem:', error);
  }
};


  return (
    <Pressable onPress={() => handleTask(item.id)} style={styles.container}>
      <View style={styles.Processed_container}>
      <View style={item.field3 ? styles.Processed : styles.Active}>
  <Text style={item.field3 ? styles.processedText : styles.activeText}>
    {buttonText}
  </Text>
</View>
       
      </View>
      <View style={styles.container_number}>
        <Pressable >
          <View style={styles.container_Processed_number}>
            <Text style={styles.location_text}> {item.field}</Text>
            <Text style={styles.location_text2}>See Description</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Problem</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, height: 300, width: 300 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name/title..."
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { height: 100, marginTop: 10 }]}
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
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProblem} style={styles.sendButton}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>


    </Pressable>
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
    width: 100,
    height: 30,
    backgroundColor: "#FEF7EC",
    borderRadius: 5,
    color: "white", 
  },
  Active: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 30,
    backgroundColor: "#FEF7EC", 
    borderRadius: 5,
    color: "white", 
  },
  processedText: {
    color: 'green', 
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom:1,
    width:280,
  },
  activeText: {
    color: "#F2AB58",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom:1,
    width:280,
   },
  title:{
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom:1,
    color: "#F2B58", 
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
    color: "#B8B8B8", 
    width:230,
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
 
});

export default Card;
