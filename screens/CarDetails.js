import React from "react";
import { Text, View, Image } from "react-native";

export default function CarDetails({ navigation }) {
  return (
    <View style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontSize: 25,
          color: "black",
          fontWeight: "bold",
          padding: 10,
          backgroundColor: "white",
          marginBottom: 20,
        }}
      >
        {navigation.getParam("Car")}
      </Text>
      <Text
        style={{
          fontSize: 25,
          color: "tomato",
          fontWeight: "bold",
          padding: 10,
          marginBottom: 20,
        }}
      >
        {navigation.getParam("Content")}
      </Text>
      <Image
        source={{ uri: navigation.getParam("image") }}
        style={{
          height: 200,
          width: 350,
          borderRadius: 30,
        }}
      />
    </View>
  );
}
