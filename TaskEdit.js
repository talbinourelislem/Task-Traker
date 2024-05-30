import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet,FlatList,TouchableOpacity,Alert,SafeAreaView,Image } from 'react-native';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import pb from './Pb';
const logo = require("./delete.jpg")

const TaskEdit = ({navigation}) => {
    
  const [Records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const recordList = await pb.collection('task').getList();
        setRecords(recordList.items);
        console.log("record<<<<<<<<<<", recordList.items); // Log the fetched items directly
      } catch (error) {
        console.log(error.originalError);
      }
    }
  
    fetchData();
  }, []);
  
 
  
  const handleEdit = (id) => {
    const taskid = id;
    navigation.navigate('EditedTask', { data: taskid });
  };
  
  const handleDelete = async (id) => {
    try {
      await pb.collection('task').delete(id);
      Alert.alert("Task deleted. Please refresh.");
    } catch (error) {
      console.error('Error fetching stat:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.Processed_container}>
        <View style={item.field3 ? styles.Processed : styles.Active}>
          <Text style={item.field3 ? styles.processedText : styles.activeText}>
            {item.field3 ? 'Active' : 'Waiting'}
          </Text>
        </View>
      </View>
      <View style={styles.container_Processed_number}>
        <Text style={styles.location_text}>{item.field}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Image source={logo} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
  


  return (
   <SafeAreaView style={{width:screenWidth,height:750}}>
     <FlatList
        data={Records}
        renderItem={renderItem}
        keyExtractor={(Records) => Records.id.toString()}
      />
   </SafeAreaView>
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
    left:20
  },
      container_Processed_number:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    
      },
      container_number:{
            marginTop:10,
    
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
      bcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      editButton: {
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        top:25,
        left:110,
      },
      deleteButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        top:-130,
        left:130,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default TaskEdit;
