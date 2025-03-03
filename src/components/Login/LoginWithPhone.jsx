import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, // Import ActivityIndicator for the loading spinner
  Modal,
} from "react-native";
import LoginImage from "../../../assets/dashboardIcons/LoginIllustration.png";
import backArrow from "../../../assets/dashboardIcons/back.png";
import lock from "../../../assets/dashboardIcons/lock.png";
import phone from "../../../assets/dashboardIcons/PhoneLogin.png";

import { AuthContext } from "../../AuthProvider";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
export default function LoginWithPhone({ navigation }) {
  const { setToken, token } = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const [errors, setErrors] = useState({ mobileNumber: "", pin: "" });

  const validate = () => {
    let valid = true;
    let tempErrors = { mobileNumber: "", pin: "" };

    if (!mobileNumber.trim()) {
      tempErrors.mobileNumber = "Phone number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      tempErrors.mobileNumber = "Enter a valid 10-digit phone number.";
      valid = false;
    }

    if (!pin.trim()) {
      tempErrors.pin = "Pin is required.";
      valid = false;
    } else if (pin.length < 4) {
      tempErrors.pin = "Pin must be at least 4 digits.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true); // Show loader
    const payload = { mobileNumber, pin };

    try {
      const response = await axios.post(
        "https://chit-fund-api.vercel.app/api/auth/login",
        payload
      );

      if (response.status === 200) {
        await SecureStore.setItemAsync("token", response.data.token);
        setToken(response.data.token);
        console.log(response.data.token, "token updated");
        setMobileNumber("");
        setPin("");
        setLoading(false); // Hide loader
        // navigation.navigate("Home");
      }
    } catch (error) {
      setLoading(false); // Hide loader
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
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

          {/* Phone Number Input */}
          <View style={styles.imageContainer}>
            <Image source={phone} style={styles.iconImage} />
            <TextInput
              placeholder="Phone Number"
              keyboardType="numeric"
              style={[
                styles.input,
                errors.mobileNumber && { borderBottomColor: "red" },
              ]}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>
          {errors.mobileNumber ? (
            <Text style={styles.errorText}>{errors.mobileNumber}</Text>
          ) : null}

          {/* Pin Input */}
          <View style={styles.imageContainer}>
            <Image source={lock} style={styles.iconImage} />
            <TextInput
              placeholder="Pin"
              style={[styles.input, errors.pin && { borderBottomColor: "red" }]}
              secureTextEntry
              keyboardType="numeric"
              value={pin}
              onChangeText={setPin}
            />
          </View>
          {errors.pin ? (
            <Text style={styles.errorText}>{errors.pin}</Text>
          ) : null}

          {/* Forgot Password Link */}
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

        {/* Modal for Loading */}
        <Modal
          transparent={true}
          visible={loading}
          animationType="fade"
          onRequestClose={() => setLoading(false)}
        >
          <View style={styles.modalOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        </Modal>
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
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
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
    backgroundColor: "rgb(0, 47, 129)",
    marginTop: 5,
    borderRadius: 5,
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
    left: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});
