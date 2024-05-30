import React, { useState } from 'react'
import { Alert,Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const logo = require("./picture_creera.png")
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const Welcome = ({navigation}) => {



    return (
        <SafeAreaView style={styles.container}>
           <Image source={logo}  style={{ width: screenWidth, height: 411, top: 12, left: 27, position: 'absolute' }} resizeMode='contain' />
           <View>
        <Text style={styles.title}>B2B Delivery</Text>
        <Text style={styles.description}>
          Welcome, delivery superstar! Your hard work and commitment mean the world to us. Thank you for being a crucial part of our delivery family.
        </Text>
        <View style={styles.buttonView}>
         <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Start using </Text>
         </Pressable>
         </View>
      </View>












        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 70,
        height: screenHeight, // Set the height dynamically based on screen height
        backgroundColor:"#fff",
      },
      title: {
        color: 'black',
        position: 'absolute',
        top: 370,
        left: 90,
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 31,
      },
      description: {
        color: 'black',
        width: screenWidth,
        height: 90,
        position: 'absolute',
        top:420,
        left:15,
        fontSize: 13.5,
      },
      button: {
        backgroundColor: "#4CAF50", // Changed color to "#4CAF50"
        height: 45,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop:565,
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
      },
      buttonView: {
        width: "100%",
        paddingHorizontal: 50,
      },




    });

    export default Welcome;