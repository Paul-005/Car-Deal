import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, RefreshControl } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Card, Button } from "react-native-paper";
import FIREBASE_CONFIG from "./firebase";
import { ActivityIndicator } from "react-native-paper";
import { createStackNavigator } from "react-navigation-stack";
import CarDetails from "./CarDetails";

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  console.log(err);
}

const db = firebase.firestore();

function NeedCar({ navigation }) {
  const [Data, setData] = useState([]);
  const [Pending, setPending] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection("FireCloud").onSnapshot(function (querySnapshot) {
      setPending(false);
      setData(
        querySnapshot.docs.map((doc) => ({
          image: doc.data().image,
          Name: doc.data().Name,
          Car: doc.data().user,
          Content: doc.data().content,
        }))
      );
    });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {Pending ? (
        <View style={{ justifyContent: "center", flex: 1, marginTop: 250 }}>
          <ActivityIndicator animating={true} size={80} />
          <Text
            style={{ fontStyle: "italic", fontSize: 20, textAlign: "center" }}
          >
            Fetching Data...
          </Text>
        </View>
      ) : null}

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={Data}
        renderItem={({ item }) => (
          <Card>
            <View
              style={{
                shadowColor: "black",
                shadowOpacity: 1,
                marginHorizontal: 10,
                marginVertical: 40,
              }}
            >
              <Card.Title title={item.Car} />
              <TouchableOpacity
                onPress={() => navigation.navigate("CarDetails", item)}
              >
                <Card.Cover source={{ uri: item.image }} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const screens = {
  NeedCar: {
    screen: NeedCar,
  },
  CarDetails: {
    screen: CarDetails,
  },
};

const NeedCarStack = createStackNavigator(screens);

export default NeedCarStack;
