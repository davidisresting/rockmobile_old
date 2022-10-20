// import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegisterScreen } from './src/screens'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import firebase from '@react-native-firebase/app';
import RemotePushController from './src/RemotePushController';

const credentials = {
  apiKey: "AIzaSyDTtKPRVfPBuH3F2eeUM4b5uEvlzjYd2yg",
  authDomain: "rocket-ec86b.firebaseapp.com",
  databaseURL: "https://rocket-ec86b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rocket-ec86b",
  storageBucket: "rocket-ec86b.appspot.com",
  messagingSenderId: "670247851047",
  appId: "1:670247851047:web:4c289e7d650206dbb26a02",
  measurementId: "G-S6R4VV8ZKG"
};

const config = {
  name: 'SECONDARY_APP',
};



const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // firebase.initializeApp(credentials, config);

  useEffect(() => {
    const initFirebaseApp = async () => {
      await firebase.initializeApp(credentials, config);
    }

    initFirebaseApp();
    
    const apps = firebase.apps;

    apps.forEach(app => {
      console.log('App name: ', app.name);
    });


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