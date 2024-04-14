import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route }) => {
  const { name, background } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text>Welcome to the chat, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;
