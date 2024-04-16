import { View, Platform, KeyboardAvoidingView, navigation } from 'react-native';
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { background } = route.params;
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
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
          _id: 1
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

export default Chat;
