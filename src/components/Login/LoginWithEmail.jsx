import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import LoginImage from "../../../assets/dashboardIcons/LoginIllustration.png";
import backArrow from "../../../assets/dashboardIcons/back.png";
import lock from "../../../assets/dashboardIcons/lock.png";
import emailIcon from "../../../assets/dashboardIcons/emailLogin.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthProvider";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios"; // Ensure axios is imported for making API calls

export default function LoginWithEmail({ navigation }) {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({ email: "", password: "" });

    let isValid = true;

    // Email validation
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email address",
      }));
      isValid = false;
    }

    // Password validation
    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    }

    if (!isValid) return; // Stop execution if validations fail

    setLoading(true); // Show loader
    const payload = { email, password };

    try {
      const response = await axios.post(
        "https://chit-fund-api.vercel.app/api/auth/login",
        payload
      );
      setLoading(false);
      console.log(response);
      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
        setToken(response.data.token); // Store token in context
        setEmail(""); // Clear email field
        setPassword(""); // Clear password field
        navigation.navigate("Home"); // Navigate to home or desired screen
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={backArrow} style={styles.backArrowImage} />
        </TouchableOpacity>

        <View style={styles.container}>
          <Image source={LoginImage} style={styles.image} />
          <Text style={styles.header}>Login</Text>

          {/* Email Image and Input */}
          <View style={styles.imageContainer}>
            <Image source={emailIcon} style={styles.iconImage} />
            <TextInput
              placeholder="Email ID"
              style={[
                styles.input,
                errors.email && { borderBottomColor: "red" },
              ]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          {/* Lock Image and Input */}
          <View style={styles.imageContainer}>
            <Image source={lock} style={styles.iconImage} />
            <TextInput
              placeholder="Password"
              style={[
                styles.input,
                errors.password && { borderBottomColor: "red" },
              ]}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.5 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </View>

        {/* Loading Modal */}
        {loading && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={loading}
            onRequestClose={() => setLoading(false)}
          >
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  header: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    fontWeight: 600,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: "10%",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  link: {
    alignSelf: "flex-end",
    marginRight: "10%",
    marginBottom: 10,
  },
  linkText: {
    color: "rgb(0, 47, 129)",
  },
  button: {
    width: "80%",
    padding: 15,
    marginTop: 5,
    backgroundColor: "rgb(0, 47, 129)",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "rgb(0, 47, 129)",
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
    zIndex: 10,
    width: 50,
    height: 50,
  },
  backArrowImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
