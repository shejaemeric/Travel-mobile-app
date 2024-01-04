import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { updateUserById, deleteUserById } from "../../crud/index";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Update(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const response = await axios.get(
          `https://travel051-theta.vercel.app/api/users/${userId}`
        );
        const userData = response.data.user;

        setEmail(userData.email);
        setName(userData.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await updateUserById(userId, { name, email });
      setError(null);
      setName("");
      setEmail("");
      navigation.navigate("home");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await deleteUserById(userId);
      await AsyncStorage.removeItem("id");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error deleting user:", error);
      showError("Failed to delete user. Please try again." + error.error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("id");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error logging out:", error);
      showError("Failed to log out. Please try again.");
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.titleText}>Update Profile</Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/cross.png")}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        {/* update form */}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor="#000"
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#000"
            style={styles.input}
          />

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleUpdate}
              style={[styles.button, { backgroundColor: "#4CAF50" }]}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.button, { backgroundColor: "#FF5722" }]}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              styles.button,
              { backgroundColor: "#4285F4", marginTop: 10 },
            ]}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* view for error */}
        <View style={styles.errorContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    marginTop: 80,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  titleText: {
    fontSize: wp(7),
    fontWeight: "bold",
    color: "#000",
  },
  avatarImage: {
    height: wp(12),
    width: wp(12),
    borderRadius: 9999,
  },
  formContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  input: {
    height: hp(7),
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#000",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    height: hp(7),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  errorContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  errorText: {
    color: "red",
    backgroundColor: "white",
    padding: 10,
  },
});
