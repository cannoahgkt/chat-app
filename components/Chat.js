import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
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


  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
         setMessages(newMessages);
    });

        // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: userName });
  }, [userName]);

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
