import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { profile } from "../globalStyles";
import firebase from "firebase";
import { TextInput, Modal, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  const user = firebase.auth().currentUser;
  const [displayName, setDisplayName] = useState("");
  const userDetails = firebase.auth();
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

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

  const updateProfile = () => {
    user
      .updateProfile({
        displayName: displayName,
      })
      .then(function () {
        setDisplayName("");
        setUpdateProfileModal(false);
        Alert.alert(
          "Auth Profile",
          "Your profile has been successfully updated"
        );
      })
      .catch(function (error) {
        alert(error.message);
      });
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
      <Modal
        visible={updateProfileModal}
        contentContainerStyle={{ backgroundColor: "dodgerblue" }}
      >
        <View style={{ marginVertical: 50, alignItems: "center" }}>
          <Text
            onPress={() => setUpdateProfileModal(false)}
            style={{
              left: 100,
              color: "white",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            X
          </Text>
          <TextInput
            style={{ width: 300 }}
            placeholder="eg: Paul Babu"
            type="outlined"
            label="Your Name"
            value={displayName}
            error={displayName.length ? false : true}
            onChangeText={(displayName) => setDisplayName(displayName)}
          />
          <View style={{ alignItems: "center" }}>
            <Button onPress={updateProfile} color="yellow" title="Save" />
          </View>
        </View>
      </Modal>

      {userDetails.currentUser.emailVerified ? (
        <Text style={{ color: "green", fontSize: 15, textAlign: "center" }}>
          You are verified
        </Text>
      ) : (
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <Button onPress={emailVerify} title="Verify your Email" />
        </View>
      )}

      <TouchableOpacity onPress={() => setUpdateProfileModal(true)}>
        <Text style={{ textAlign: "center", marginTop: 40, color: "tomato" }}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
