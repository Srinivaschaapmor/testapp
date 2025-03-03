import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import logo from "../../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logoPosition] = useState(new Animated.Value(0)); // For moving the logo up
  const [buttonOpacity] = useState(new Animated.Value(0)); // For fading in the buttons
  const navigation = useNavigation();
  useEffect(() => {
    // Simulate the loading state for 3 seconds
    const timer = setTimeout(() => {
      // Animate the logo moving up
      Animated.timing(logoPosition, {
        toValue: -150, // Move logo up by 150 pixels
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Fade in the buttons
      Animated.timing(buttonOpacity, {
        toValue: 1, // Fully visible
        duration: 1000,
        useNativeDriver: true,
        delay: 500, // Start after the logo animation begins
      }).start(() => {
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoPosition }] },
        ]}
      >
        <Image source={logo} style={styles.logo} />
      </Animated.View>

      {/* Buttons */}
      <Animated.View
        style={[styles.buttonContainer, { opacity: buttonOpacity }]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("LoginPage");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonText1}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    position: "absolute",
    top: "30%", // Start position of the logo
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  buttonContainer: {
    position: "absolute",
    top: "50%", // Position for the buttons
    alignItems: "center",
    width: "100%",
    marginTop: 150,
  },
  button: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgb(0, 47, 129)",
    borderRadius: 5,
    alignItems: "center",
  },
  button1: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgb(241, 245, 246)",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffff",
    fontWeight: "600",
  },
  buttonText1: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
});

export default MainPage;
