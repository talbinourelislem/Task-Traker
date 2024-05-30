import React, { useState, useEffect } from 'react';
import { View,Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Icon from './Icon.png';
const logo = require("./mapw.png")

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const screenw = screenWidth - 60;
import pb from './Pb';

const Taskdetails = ({ route }) => {
  const taskId = route.params.data;
  const navigation = useNavigation();
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const record = await pb.collection('task').getOne(taskId);
        setItem(record);
        setLoading(false); // Set loading to false after data is fetched
        setButtonText(record.field3 ? 'Finish' : 'Working in');
      } catch (error) {
        console.log(error.originalError);
      }
    }

    fetchData();
  }, []);

  const handleState = async () => {
    try {
      if (item.field3 == false) {
        const data = {
          field: item.field,
          field2: item.field2,
          field3: true,
        };

        await pb.collection('task').update(taskId, data);
      } else if (item.field3 == true) {
        const data = {
          "Title":item.field,
          "Description": "Task Finish",
      };
      
       await pb.collection('Inboxadmin').create(data);
      
        await pb.collection('task').delete(taskId);
      }
    } catch (error) {
      console.error('Error fetching stat:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backbutton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
       <View style={{     top: -23,
       left:-23,
           flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:60,
        }}>
                <Image source={Icon} style={styles.image2}  />
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Task No.{taskId}</Text>
       </View>

        </TouchableOpacity>
      </View>
      <View style={styles.map}>
     <TouchableOpacity  onPress={() => navigation.navigate('Map')} style={{top:140,left:150}}>
      <Text style={{fontSize:20}}>View Map</Text>
      <Image source={logo} style={styles.image} resizeMode='contain' />
     </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>{item.field}</Text>
        <Text style={{ fontSize: 12, marginTop: 10 }}>{item.field2}</Text>
      </View>
      <TouchableOpacity onPress={handleState} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    height: screenHeight, // Set the height dynamically based on screen height
    width: screenWidth,
    backgroundColor: "#fff",
  },
  backbutton: {
    left: -29,
    top: -15,
  },
  map: {
    top: -25,
    height: 340,
    width: 400,
  },
  info: {
    width: screenw,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: -34,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    left: 100,
    top: -20,
  },
  image2: {
    height: 30,
    width: 30, 

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:screenWidth,
    height:350,
    top:-180,
    left:-150
  }
});

export default Taskdetails;