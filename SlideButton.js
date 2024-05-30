import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SlideButton = ({ onToggle }) => {
  const [activeButton, setActiveButton] = useState('inbox'); // Initial active button

  const handleToggle = () => {
    setActiveButton(activeButton === 'inbox' ? 'task' : 'inbox');
    onToggle(activeButton === 'inbox' ? 'task' : 'inbox'); 

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeButton === 'task' ? styles.activeButton : null]}
        onPress={handleToggle}>
        <Text style={[styles.activebuttonText, activeButton === 'inbox' ? styles.buttonText : null]}>Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeButton === 'inbox' ? styles.activeButton : null]}
        onPress={handleToggle}>
        <Text  style={[styles.buttonText, activeButton === 'inbox' ? styles.activebuttonText : null]}>Inbox</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:"90%",
    height:50,
    marginTop:20,
    backgroundColor:"#fff",
    borderRadius: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    width:"48%",
  },
  activeButton: {
    backgroundColor: '#4CAF50',

  },
  activebuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SlideButton;
