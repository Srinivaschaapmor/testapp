import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";
const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />r
      <TouchableOpacity
        onPress={() => navigation.navigate("MainPage")}
        style={styles.arrowContainer}
      >
        <View style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 111, 111)",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  arrowContainer: {
    marginTop: 20,
  },
  arrow: {
    width: 30,
    height: 30,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "#fff",
    marginTop: 100,
    transform: [{ rotate: "320deg" }],
  },
});

export default LandingPage;
