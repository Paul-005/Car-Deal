import React, { useState, useEffect } from "react";
import { Button, Text, View, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import "firebase/storage";
import { ProgressBar } from "react-native-paper";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBsUWtnnpfv3wlZa76X5wfPhr25sJfRlFE",
  authDomain: "carcart-paul.firebaseapp.com",
  projectId: "carcart-paul",
  storageBucket: "carcart-paul.appspot.com",
  messagingSenderId: "98215944364",
  appId: "1:98215944364:web:f0165358f84d00a6edbf09",
  measurementId: "G-QYL88F0B8N",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  console.log(err);
}

export default function SellCar() {
  const [uploaded, setUploaded] = useState(0);
  const [image, setImage] = useState([]);

  const reference = firebase.storage().ref();

  const onChooseImagePress = async () => {
    let image = await ImagePicker.launchImageLibraryAsync();
    setImage(image.uri);
  };

  const upload = async () => {
    let filename = image.substring(image.lastIndexOf("/") + 1);
    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + filename);
    return ref.put(blob);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <ProgressBar progress={uploaded} />

      <View style={{ marginBottom: 30 }}>
        {image.length ? (
          <View>
            <Image
              source={{ uri: image }}
              style={{ height: 200, width: 300, marginBottom: 20 }}
            />
            <Button title="Post" onPress={upload} />
          </View>
        ) : null}
        <Button title="Choose Image..." onPress={onChooseImagePress} />
      </View>
    </View>
  );
}
