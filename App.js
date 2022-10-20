// import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegisterScreen } from './src/screens'
import { credentials } from './firebase.config'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import firebase from '@react-native-firebase/app';
import RemotePushController from './src/RemotePushController';





  // const initFirebaseApp = async () => {
  //   try {
  //     await firebase.initializeApp(credentials, config);
  //   }
  //   catch (err) {
  //     console.log('initFirebaseApp', err);
  //   }
  // }

  // initFirebaseApp();
// firebase.initializeApp(credentials, config);

const Stack = createStackNavigator();


export default function App() {
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  firebase.initializeApp(credentials).catch(console.log);  

  useEffect(() => {
    // const initFirebaseApp = async () => {
    // }

    // initFirebaseApp();
    
    // const apps = firebase.apps;

    // apps.forEach(app => {
    //   console.log('App name: ', app.name);
    // });


    const usersRef = firestore().collection('users');
    auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) return <></>;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
      <RemotePushController />
    </NavigationContainer>
  );
}