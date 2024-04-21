import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const firebaseConfig = {
  apiKey: "AIzaSyADFAK2D-5Dpn0AhxUD0CDgfRNgCmqP0Ic",
  authDomain: "chatapp-c3144.firebaseapp.com",
  projectId: "chatapp-c3144",
  storageBucket: "chatapp-c3144.appspot.com",
  messagingSenderId: "181661899165",
  appId: "1:181661899165:web:5c755d3559fad834e0f774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
   return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
       <Stack.Screen
          name="Chat"
        >
            {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
