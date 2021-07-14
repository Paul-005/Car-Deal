import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { profile } from "../globalStyles";
import firebase from "firebase";
import { TextInput, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";
import { Input } from "react-native-elements";

export default function Profile({ navigation }) {
  const user = firebase.auth().currentUser;
  const userDetails = firebase.auth();
  const [Name, setName] = useState("");

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.goBack();
      });
  };

  const emailVerify = () => {
    user
      .sendEmailVerification()
      .then(function () {
        Alert.alert(
          "Email Verification",
          "An Mail has been sent your your email. please verify."
        );
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const updatePR = () => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: Name,
      })
      .then(function () {
        Alert.alert(
          "Profile Updated",
          "Your profile had been updated successfully "
        );
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const OverlayExample = () => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    return (
      <View>
        <TouchableOpacity onPress={toggleOverlay}>
          <Text
            style={{
              textAlign: "center",
              color: "tomato",
              marginTop: 40,
              fontSize: 15,
            }}
          >
            Update Profile
          </Text>
        </TouchableOpacity>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{ width: 400 }}>
            <Input placeholder="Enter Name" onChange={(val) => setName(val)} />
            <Button onPress={updatePR} title="Update" />
          </View>
        </Overlay>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 20,
          marginTop: 40,
          marginBottom: 30,
        }}
      >
        <Text
          style={{ fontSize: 15, textAlign: "center", fontStyle: "italic" }}
        >
          Email: {userDetails.currentUser.email}
        </Text>
      </View>
      <View>
        <View style={{ alignItems: "center" }}>
          {userDetails.currentUser.displayName !== null ? (
            <Avatar.Text
              size={100}
              label={userDetails.currentUser.displayName.split("")[0]}
            />
          ) : null}

          <Text style={profile.user}>
            Hello {userDetails.currentUser.displayName}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={signOut}>
            <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {userDetails.currentUser.emailVerified ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "green", fontSize: 15, textAlign: "center" }}>
            You are verified
          </Text>
          <FontAwesome5 name="signature" size={24} color="black" />
        </View>
      ) : (
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <Button onPress={emailVerify} title="Verify your Email" />
          <FontAwesome5 name="signature" size={24} color="black" />
        </View>
      )}
      <OverlayExample />
    </View>
  );
}
