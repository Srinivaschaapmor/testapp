import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LoginImage from "../../../assets/dashboardIcons/LoginIllustration.png";
import backArrow from "../../../assets/dashboardIcons/back.png";
// import { Icon } from "react-native-vector-icons";
export default function LoginPage({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navigate to the previous screen
      >
        <Image
          source={backArrow} // Replace with your back arrow image path
          style={styles.backArrowImage}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* Back Arrow */}

        {/* Image */}
        <Image source={LoginImage} style={styles.image} />

        {/* Login Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginWithEmail")}
        >
          <Text style={styles.buttonText}>Login with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginWithPhone")}
        >
          <Text style={styles.buttonText}>Login with Phone Number</Text>
        </TouchableOpacity>

        {/* Register Text */}
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          {/* <TouchableOpacity onPress={() => navigation.navigate("Register")}> */}{" "}
          <Text style={styles.registerLink}>Register</Text>
          {/* </TouchableOpacity> */}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute", // Position it absolutely
    top: 50, // Distance from the top
    left: 30, // 10Distance from the left
    zIndex: 10,
    // backgroundColor: "black",
    width: 50, // Ensure it appears above other elements
    height: 50, // Ensure it appears above other elements
  },
  backArrowImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 350,
    marginBottom: 20,
    resizeMode: "contain",
  },
  button: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "rgb(0, 47, 129)",
    fontWeight: "600",
    // marginTop: 10,
  },
});
