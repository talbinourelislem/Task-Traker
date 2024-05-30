/*eslint-disable prettier/prettier*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import HtmlScript from './utils/HtmlScript';
import {ToastAndroid, Platform} from 'react-native';
const logo = require("./emplacement.png")

type Position = {
  latitude: number;
  longitude: number;
  description: string;
};

type Event = {
  latitude: number;
  longitude: number;
  description: string;
  name: string;
  endDate: string;
};

// ask & get userPermision
export async function requestLocationPermission() {
  try {
    Geolocation.requestAuthorization();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      // @ts-ignore
      {
        title: 'IsUniv',
        message: 'Allow IsUniv to access your location ?',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      // @ts-ignore
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function Map() {
  // ask for userPermision
  useEffect(() => {
    async function getLocationPermission() {
      await requestLocationPermission();
    }
    getLocationPermission();
  }, []);

  const mapRef = useRef<WebView>(null);


  useEffect(() => {
    handleNew3();

  }, []);


 


// Your createUserLocationMarker function
const createUserLocationMarker = useCallback(
  ({ latitude, longitude, description }) => {
    try {
      // Check if mapRef is available
      if (mapRef && mapRef.current) {
        // Fly to the user's location
        mapRef.current.injectJavaScript(`
          map.flyTo([${latitude}, ${longitude}], 16);
        `);

        // Add a marker at the user's location
        mapRef.current.injectJavaScript(`
          L.marker([${latitude}, ${longitude}]).addTo(map)
            .bindPopup("${description}")
            .openPopup();
        `);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
  [],
);



// Extract coordinates and call the function
const description = 'User Location'; // You can change the description as needed
const [locationData1, setlocationData1] = useState<GeolocationPosition | null>(null);

const handleNew3 = async () => {
  try {
    Geolocation.getCurrentPosition((info: GeolocationPosition) => {
      setlocationData1(info);
      console.log("TRE", info);
      console.log("locationData1", locationData1); // Now locationData1 is declared and accessible here
    });
  } catch (error) {
    console.error("Error fetching record:", error);
    // Handle the error if necessary
  }
};

const { latitude, longitude } = locationData1?.coords || {};

createUserLocationMarker({ latitude, longitude, description });


  const [mapReady, setMapReady] = useState(false);

  const onMapReady = useCallback(() => {
    setMapReady(true);
  }, []);

 

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.Container}>
        <WebView
          ref={mapRef}
          source={{html: HtmlScript}}
          style={styles.Webview}
          allowFileAccess={true}
          onLoadEnd={onMapReady}
        />
       <TouchableOpacity style={styles.Route} onPress={handleNew3}>
          <Image source={logo} style={{width:50,left:100}} />
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
  },
  Webview: {
    flex: 1,
    flexGrow: 1,
  },
  Position: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    backgroundColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 360,
    padding: 8,
  },
  Route:{
    width:130,
    height:50,
    backgroundColor:"green"
  },
});