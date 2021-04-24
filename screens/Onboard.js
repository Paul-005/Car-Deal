import React from "react";
import { Text, View, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function onBoarding() {
  return (
    <View>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={{
                  uri:
                    "https://c4.wallpaperflare.com/wallpaper/149/550/537/nissan-sunny-2012-wallpaper-thumb.jpg",
                }}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={{
                  uri:
                    "https://c4.wallpaperflare.com/wallpaper/149/550/537/nissan-sunny-2012-wallpaper-thumb.jpg",
                }}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}
