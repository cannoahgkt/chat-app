# Chat App

## Description
A chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images, audio, and location.

## Dependencies 
* **React Native**: Framework for building mobile applications using JavaScript and React.
* **Expo**: Development platform for building React Native applications.
* **GiftedChat**: A library for creating chat interfaces in React Native applications.
* **Google Firebase**: Cloud-based platform that provides various services, including Firestore for real-time database and authentication.
* **AsyncStorage**: Local storage system in React Native for caching and persisting data.
* **Expo ImagePicker**: Expo API for accessing the device's image picker to choose images from the gallery.
* **Expo MediaLibrary**: Expo API for accessing and managing media assets on the device.
* **Expo Location**: Expo API for obtaining location information from a device.
* **react-native-maps**: React Native Map components for iOS and Android.
* **MapView**: Specific component from the react-native-maps library used to display maps in React Native applications.

## Features
* Users can enter their name and choose a background color for the chat screen before joining the chat.
* Send and receive messages.
* Send and receive images (from the media library or the device's camera).
* Send and receive locations.
* Record, send, and receive audio.
* Users can view previous messages when offline.

## Set up this App
* Clone this repository.
* Navigate to the chat-app folder and run `npm install`.
* Set up Firebase for your project:
    - Sign in to Google Firebase.
    - Create a project.
    - Set up Firestore Database (production mode).
    - Adjust rules from `allow read, write: if false;` to `allow read, write: if true;`.
    - Register your app in Project Overview.
    - Navigate to the chat-app folder and install Firebase using `npm install firebase`.
    - Initialize Firebase by copying and pasting the provided Firebase configuration into the `App.js`.
* Download Android Studio on your computer or use the Expo Go App on your mobile device.
* Run `expo start`.
