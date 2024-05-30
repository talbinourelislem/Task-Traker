import React, { useEffect,useState } from 'react';
import { View, Text, Image, ScrollView, TextInput,Button,SafeAreaView, Alert  } from 'react-native';
import pb from './Pb';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './Login';
import Register from './Register';
import Forgot from './Forgot';
import New_password from './New_password';
import Changed from './Changed';
import Home from './Home';
import Home2 from './Home2';
import WelcomePage from './Welcome';
import Taskdetails from './Taskdetails'
import Inbox2 from './Inbox2';
import Map from './Map';
import Map2 from './Map2';
import TaskEdit from './TaskEdit';
import EditedTask  from './EditedTask';



const Stack = createNativeStackNavigator();

const FirstApp = () => {
  const [IMGID, setIMGID] = useState([]);
  const [IMGID1, setIMGID1] = useState([]);

  const [test1, settest1] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await pb.collection('worker').getList();
        console.log("records55", records);
        settest1(records.items);

      } catch (error) {
        console.log(error.originalError)
            };
    }

    fetchData();
  }, []);
  console.log("test&&&");
  const handleNew = async () => {

  try {
    const authData = await pb.collection('ust').authWithPassword(
      '12345@gmail.com',
      '12345@gmail.com',
  );
  setIMGID(pb.authStore.isValid);
  console.log("authData",pb.authStore.isValid);


  } catch (error) {
    // Handle the error
  }

  };

  const log = async () => {
 
  try {
    const authData = await pb.collection('ust').authWithOAuth2({
      provider: "google",
      urlCallback: async (url) => {
        // Not getting called. No error is thrown.
        console.log("Callback Url");
      },
    });

  } catch (error) {
    console.log(error)
  }

  };
  const [isValid, setIsValid] = useState(false);
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = (task) => {
    setIMGID1({ task });
    console.log("IMGID1", IMGID1);
  };
  const handleLoginStatus = (status) => {
    setIsTrue(status.isLoggedIn);
    console.log("status",status);
    console.log("authData2",authData2);

    setAuthData2(status.userId);
    console.log("authData2",authData2);

  };
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Forgot" component={Forgot}  options={{ headerShown: false }}/>
      <Stack.Screen name="WelcomePage" component={WelcomePage}  options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }}/>
      <Stack.Screen name="New_password" component={New_password}  options={{ headerShown: false }} />
      <Stack.Screen name="Changed" component={Changed}  options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
      <Stack.Screen name="Home2" component={Home2}    options={{ headerShown: false }}/>
      <Stack.Screen name="Taskdetails" component={Taskdetails}    options={{ headerShown: false }}/>
      <Stack.Screen name="Inbox2" component={Inbox2}    options={{ headerShown: false }}/>
      <Stack.Screen name="Map" component={Map}    options={{ headerShown: false }}/>
      <Stack.Screen name="Map2" component={Map2}    options={{ headerShown: false }}/>
      <Stack.Screen name="TaskEdit" component={TaskEdit}    options={{ headerShown: false }}/>
      <Stack.Screen name="EditedTask" component={EditedTask}    options={{ headerShown: false }}/>

    </Stack.Navigator>
  </NavigationContainer>
);
  
};
export default FirstApp;