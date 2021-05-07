import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Ionicons, Entypo, Feather, AntDesign } from "@expo/vector-icons";

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

export default function SellCar({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [image, setImage] = useState([]);
  const [Car, setCar] = useState("");
  const [Data, setData] = useState([]);

  const userDetails = firebase.auth();
  const db = firebase.firestore();

  const getData = () => {
    db.collection("FireCloud")
      .where("uid", "==", userDetails.currentUser.uid)
      .onSnapshot(function (querySnapshot) {
        setData(
          querySnapshot.docs.map((doc) => ({
            image: doc.data().image,
            Name: doc.data().Name,
            Car: doc.data().user,
            Content: doc.data().content,
            Uid: doc.data().uid,
          }))
        );
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    getData();
  }, []);

  const onChooseImagePress = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  const onChooseImagefromCamera = async () => {
    await ImagePicker.getCameraPermissionsAsync();
    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  const upload = async () => {
    let filename = image.substring(image.lastIndexOf("/") + 1);
    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + filename);
    ref.put(blob).on("state_changed", (snapshot) => {
      setUploading(true);
      setUploaded(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    });
    ref.put(blob).then(() => {
      setImage("");
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          setUploading(false);
          navigation.navigate("Options");
          Alert.alert(
            "Image Status",
            "Successfully uploaded your image to cloud. Thank You !"
          );
          firebase.firestore().collection("FireCloud").add({
            image: url,
            user: Car,
            Name: userDetails.currentUser.displayName,
            uid: userDetails.currentUser.uid,
          });
        });
    });
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
      <ScrollView>
        <View style={{ marginBottom: 30, alignItems: "center" }}>
          {image.length ? (
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: image }}
                style={{ height: 200, width: 300, marginBottom: 20 }}
              />
              <TouchableOpacity onPress={upload}>
                <AntDesign name="cloudupload" size={40} color="black" />
                <Text style={{ fontStyle: "italic", fontSize: 20 }}>Post</Text>
              </TouchableOpacity>
              <TextInput
                style={{ width: 300, top: 90 }}
                placeholder="eg: Nissan Sunny"
                mode="outlined"
                label="Car Name"
                onChangeText={(value) => setCar(value)}
              />
            </View>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              Your Cars for Sale
            </Text>
          )}

          {uploading ? (
            <View style={{ flexDirection: "row" }}>
              <Text>{uploaded} % </Text>
              <ActivityIndicator size={30} />
            </View>
          ) : null}

          <View
            style={{ flexDirection: "row", marginBottom: 100, marginTop: 100 }}
          >
            <Entypo
              style={{ right: 40 }}
              name="folder-images"
              size={40}
              color="black"
              onPress={onChooseImagePress}
            />
            <Ionicons
              label="camera"
              style={{ left: 40 }}
              onPress={onChooseImagefromCamera}
              name="ios-camera"
              size={40}
              color="black"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
