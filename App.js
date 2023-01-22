import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginView, HomeView, RegistrationView } from './src/views'
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth(firebase);
    const firestore = getFirestore(firebase);

    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid
        const usersRef = doc(firestore, 'users', uid);
        getDoc(usersRef)
          .then((firestoreDocument) => {
            const userData = firestoreDocument.data()
            setUser(userData)
          })
      }
      else {
        setUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home" options={{ title: 'Savepoint' }}>
            {props => <HomeView {...props} userData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Register" component={RegistrationView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;