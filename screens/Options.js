import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { SliderBox } from "react-native-image-slider-box";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Card, IconButton } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/auth";

import SellCar from "./SellCar";
import NeedCar from "./NeedCar";
import CarDetails from "./CarDetails";
import Profile from "./profile";
import onBoarding from "./Onboard";

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

function Options({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredential, setUserCredentials] = useState([]);
  const [modal, setModal] = useState(true);
  const [onBoarding, setOnBoarding] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserCredentials(user);
        setModal(false);
        console.log(user);
      } else {
        setModal(true);
      }
    });
  }, []);

  const SlideImage = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/p90285377-highres-the-new-bmw-i8-roads-1579102441.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/my20-gt-r-nismo-germany-24-source-1562607770.jpg",
    "https://gaadiwaadi.com/wp-content/uploads/2020/09/2021-Mercedes-Benz-S-Class-6.jpg",
    "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https%3A%2F%2Fcdni.autocarindia.com%2FExtraImages%2F20190404024935_DSC_4718.jpg&h=795&w=1200&c=0",
  ];

  const SignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Alert.alert("Successfully Created an account", "Welcome");
        setUserCredentials(userCredential);
        navigation.navigate("Profile");
      })
      .catch((err) => {
        Alert.alert("Auth Error", err.message);
      });
  };

  const Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setModal(false);
        setUserCredentials(userCredential);
        console.log(userCredential);
      })
      .catch((err) => {
        Alert.alert("Auth Error", err.message);
      });
  };

  const image = {
    uri:
      "https://images.pexels.com/photos/2453286/pexels-photo-2453286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  };

  const LoginModal = (
    <Modal visible={modal} animationType="slide">
      <View style={styles.container}>
        <Image
          source={require("../assets/icon.png")}
          style={{ height: 100, width: 100 }}
        />
        <Text style={styles.logo}>Car Deal</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            required
            placeholder="Enter your Email here..."
            placeholderTextColor="black"
            onChangeText={(val) => setEmail(val)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            required
            animationType
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="black"
            onChangeText={(val) => setPassword(val)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={Login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={SignUp}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <Text style={{ top: 160 }}>Created By Paul</Text>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styleOptions.container}>
      {LoginModal}
      <Modal visible={onBoarding} animationType="fade">
        {onBoarding}
      </Modal>
      <ImageBackground source={image} style={styleOptions.image}>
        <View style={{ marginTop: 100, marginBottom: 40 }}>
          <SliderBox images={SlideImage} autoplay circleLoop />
        </View>
        <ScrollView>
          <Card style={{ marginVertical: 30, borderRadius: 30 }}>
            <Card.Title
              title="Nissan Sunny "
              size={20}
              right={() => (
                <Image
                  style={{ height: 100, width: 180 }}
                  source={{
                    uri:
                      "https://imgctcf.aeplcdn.com/thumbs/p-nc-b-ver54/images/cars/Nissan-Sunny-2011.jpg",
                  }}
                />
              )}
            />
          </Card>
          <Card style={{ marginVertical: 30, borderRadius: 30 }}>
            <Card.Title
              title="Toyota Yaris "
              size={20}
              right={() => (
                <Image
                  style={{ height: 100, width: 160, borderRadius: 20 }}
                  source={{
                    uri:
                      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Yaris/7283/1579858168291/front-left-side-47.jpg",
                  }}
                />
              )}
            />
          </Card>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styleOptions = StyleSheet.create({
  logo: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    top: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  option: {
    height: 140,
    width: 140,
    borderRadius: 60,
    alignItems: "center",
    left: 100,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 35,
    color: "black",
    marginBottom: 40,
    top: 0,
    textAlign: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },

  icon: {
    left: 50,
    position: "absolute",
    top: 15,
  },
  loginBtn: {
    backgroundColor: "tomato",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Options: {
      screen: Options,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        ),
        tabBarLabel: "Home",
        activeColor: "yellow",
        inactiveColor: "white",
        barStyle: { backgroundColor: "tomato" },
      },
    },
    NeedCar: {
      screen: NeedCar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-car-sport-sharp" size={25} color={tintColor} />
        ),

        tabBarLabel: "Car",
        activeColor: "yellow",
        inactiveColor: "white",
        barStyle: { backgroundColor: "dodgerblue" },
      },
    },
    SellCar: {
      screen: SellCar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-key" size={24} color={tintColor} />
        ),
        activeColor: "yellow",
        inactiveColor: "white",
        barStyle: { backgroundColor: "#0BE397" },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={24} color={tintColor} />
        ),
        activeColor: "yellow",
        inactiveColor: "white",
        barStyle: { backgroundColor: "#0BE397" },
      },
    },
  },
  {
    initialRouteName: "Options",
  }
);

export default createAppContainer(TabNavigator);
