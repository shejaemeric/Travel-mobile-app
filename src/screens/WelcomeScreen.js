import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* background image */}
      <Image
        source={require("../../assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      {/* content & gradient */}
      <View style={styles.contentContainer}>
        <LinearGradient
          colors={["transparent", "rgba(27, 18, 1, 0.85)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Traveling made easy!</Text>
          <Text style={styles.description}>
            Experience the world's best adventure around the world with us
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  gradient: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
    bottom: 0,
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: wp(10),
    fontWeight: "bold",
  },
  description: {
    color: "#BDBDBD",
    fontSize: wp(4),
    fontWeight: "medium",
  },
  button: {
    backgroundColor: "rgba(243, 136, 10, 0.8)",
    marginHorizontal: "auto",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: wp(5.5),
    fontWeight: "bold",
    textAlign: "center",
  },
});
