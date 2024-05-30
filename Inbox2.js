import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet,FlatList } from 'react-native';
import pb from './Pb';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const screenw = screenWidth - 60;

const Inbox2 = () => {

  const [Rcords, setRecords] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const recordList = await pb.collection('Inboxadmin').getList();
  
       
        console.log("recordList",recordList);
        setRecords(recordList.items);
        console.log("record",Rcords);
      } catch (error) {
        console.log(error.originalError)
            };
    }
  
    fetchData();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.description}>{item.Description}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={Rcords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff",
    height: screenHeight,
    
  },

  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width:screenWidth,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
});

export default Inbox2;
