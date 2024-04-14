import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const image = require('../img/BackgroundImage.png'); 

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Chat App</Text>
        <View style={styles.containerWhite}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#757083"
            />
          </View>
          <Text style={styles.text1}>Choose Background Color:</Text>
          <View style={styles.colorButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#090C08', opacity: selectedColor === '#090C08' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#090C08')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#474056', opacity: selectedColor === '#474056' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#474056')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#8A95A5', opacity: selectedColor === '#8A95A5' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#8A95A5')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#B9C6AE', opacity: selectedColor === '#B9C6AE' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#B9C6AE')}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStartChatting}
            onPress={() => navigation.navigate('Chat', { name: name, background: selectedColor })}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: '25%',
    flex: 6,
    fontSize: 45,
    fontWeight: '600',
    color: 'white',
  },
  containerWhite: {
    width: '88%',
    height: '44%',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 0,
    alignItems: 'center',
    marginBottom: '6%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#757083',
    padding: 18,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -10,
    marginBottom: 10
  },
  text1: {
    fontSize: 16,
    color: '#757083',
    fontWeight: '300',
    marginTop: 10
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  buttonStartChatting: {
    backgroundColor: '#757083',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Start;