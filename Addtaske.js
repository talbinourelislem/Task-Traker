import React, { useState ,useEffect} from 'react';
import { Alert , Text, TextInput, SafeAreaView, StyleSheet,TouchableOpacity } from 'react-native';
import CustomDropdown from './CustomDropdown';
import pb from './Pb';
import { useNavigation } from '@react-navigation/native';



const Addtaske = () => {
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState(null);
  const [worker, setWorker] = useState(null);
  const [listworker, setListworker] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const navigation = useNavigation();

  const handleWorkerSelect = (option) => {
    setWorker(option);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resultList = await pb.collection('worker').getList();

        const workerUsernames = resultList.items.map(worker => worker.username);
        console.log('workerUsernames:', workerUsernames); // Log the extracted usernames
        setListworker(workerUsernames);
        console.log("listWorker",listworker); 
      } catch (error) {
        console.log(error.originalError)
            };
}      

    fetchData();
  }, []);
  const handleTask = async () => {
  
    try {
     
      const data = {
        "field": username,
        "field2": details,
    };
    
    const record = await pb.collection('task').create(data);
    const resultList = await pb.collection('worker').getList();//list worker
    const akramUser = resultList.items.find(user => user.username === worker);//serch and find the worker selected
    console.log("akramUser",akramUser.task);

  const updatedList = akramUser.task;//new task id
  const updatedListé = updatedList.concat(record.id);// link new task with older one 

  console.log("updatedList",updatedList);
  console.log("updatedListé",updatedListé);

    const post = await pb.collection('worker').update(akramUser.id, {
      'task': updatedListé,
  
  })

    Alert.alert("Success", "Task sent successfully");

    } catch (error) {
      console.log(error);
    }
  };
  const gotoTaskEdit=()=>{
    navigation.navigate('TaskEdit');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title1}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your Title here...'
        value={username}
        onChangeText={setUsername}
        autoCorrect={false}
        autoCapitalize='none'
      />
      <Text style={styles.title1}>Details</Text>
      <TextInput
        style={styles.input2}
        placeholderTextColor="#999"
        placeholder="Enter your description here..."
        value={details}
        onChangeText={setDetails}
        autoCorrect={false}
        autoCapitalize='none'
        numberOfLines={4}
        multiline={true}
        textAlignVertical="top"
      />
      <Text style={styles.title1}>Choose worker</Text>
      <CustomDropdown options={listworker} onSelect={handleWorkerSelect} />

      <TouchableOpacity style={styles.sendButton} onPress={handleTask}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.sendButton} onPress={gotoTaskEdit} >
        <Text style={styles.sendButtonText}>Show all tasks</Text>
      </TouchableOpacity>
      

      <Text style={{width:200,height:200}}></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: "90%",
    height: "90%",
    marginTop: 30,
  },
  title1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#000",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    width: '90%',
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 7,
    color: "black",
    backgroundColor: "#fff",
  },
  input2: {
    height: 150,
    paddingHorizontal: 20,
    width: '90%',
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 7,
    color: "black",
    backgroundColor: "#fff",
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Addtaske;
