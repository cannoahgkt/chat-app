import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { background, userName } = route.params;
  const [messages, setMessages] = useState([]); 

  const onSend = (newMessages = []) => {
    addDoc(collection(db, "messages"), newMessages[0]);
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }


  let unsubMessages;
  // useEffect hook to set messages options
  // Create a query to get the "messages" collection from the Firestore database
  useEffect(() => {
    navigation.setOptions({ title: userName });
  
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
  
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  
      // Subscribe to changes in the "messages" collection using onSnapshot.
      // This function will be called whenever there are changes in the collection.
      unsubMessages = onSnapshot(q, async (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        await cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
  
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);
  

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // Call this function if the isConnected prop turns out to be false in useEffect()
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: background || 'white',
  };

  return (
    <View style={containerStyle}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

export default Chat;
