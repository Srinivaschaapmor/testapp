import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

import register from "../../../assets/dashboardIcons/register.png";
import register1 from "../../../assets/dashboardIcons/register1.png";

import password from "../../../assets/dashboardIcons/password.png";
import password1 from "../../../assets/dashboardIcons/confirmPassword.png";
import backArrow from "../../../assets/dashboardIcons/back.png";
import lock from "../../../assets/dashboardIcons/lock.png";
import phone from "../../../assets/dashboardIcons/PhoneLogin.png";
import user from "../../../assets/dashboardIcons/user.png";
import arrow from "../../../assets/dashboardIcons/Arrow.png";
import emailIcon from "../../../assets/dashboardIcons/emailLogin.png";
import { RegisterUser } from "../../apiCalls/apiRequests";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });

  const [nextTab, setNextTab] = useState(false);
  const [loading, setLoading] = useState(false); // State for the loading modal

  const [errors, setErrors] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });

  const handleTabSwitch = () => {
    if (nextTab) {
      if (!validateSecondStep()) return;
    } else {
      if (!validateStep()) return;
    }

    setNextTab(!nextTab); // Switch to the next tab
  };

  const validateStep = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    } else {
      newErrors.fullName = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email.";
        valid = false;
      } else {
        newErrors.email = "";
      }
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Phone number is required.";
      valid = false;
    } else {
      newErrors.mobileNumber = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const validateSecondStep = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters.";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (!formData.pin) {
      newErrors.pin = "Pin is required.";
      valid = false;
    } else if (formData.pin.length !== 4) {
      newErrors.pin = "Pin should be exactly 4 digits.";
      valid = false;
    } else {
      newErrors.pin = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    try {
      if (nextTab) {
        if (!validateSecondStep()) return;
      } else {
        if (!validateStep()) return;
      }

      setLoading(true); // Show loading modal

      console.log(formData);
      const response = await axios.post(
        `https://chit-fund-api.vercel.app/api/users/register`,
        formData
      );

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "User Created Successfully",
          text2: "You can login now",
        });
        navigation.navigate("LoginPage");
        setFormData({
          fullName: "",
          mobileNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          pin: "",
        });
      }
    } catch (error) {
      console.log("Error during registration:", error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Please try again later.",
      });
    } finally {
      setLoading(false); // Hide loading modal
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {nextTab ? (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setNextTab(false)}
            >
              <Image source={backArrow} style={styles.backArrowImage} />
            </TouchableOpacity>

            <Image source={register1} style={styles.image} />

            <View style={styles.imageContainer}>
              <Image source={password} style={styles.iconImage} />
              <TextInput
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.imageContainer}>
              <Image source={password1} style={styles.iconImage} />
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.imageContainer}>
              <Image source={lock} style={styles.iconImage} />
              <TextInput
                value={formData.pin}
                onChangeText={(text) => setFormData({ ...formData, pin: text })}
                placeholder="Create 4 Digit Pin"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
              Already have an account?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => {
                  navigation.navigate("LoginPage");
                }}
              >
                Login
              </Text>
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={backArrow} style={styles.backArrowImage} />
            </TouchableOpacity>

            <Image source={register} style={styles.image} />
            <Text style={styles.header}>Register</Text>

            <View style={styles.imageContainer}>
              <Image source={user} style={styles.iconImage} />
              <TextInput
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
                placeholder="Full Name"
                style={styles.input}
              />
            </View>
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <View style={styles.imageContainer}>
              <Image source={emailIcon} style={styles.iconImage} />
              <TextInput
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="Email ID"
                style={styles.input}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={styles.imageContainer}>
              <Image source={phone} style={styles.iconImage} />
              <TextInput
                value={formData.mobileNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, mobileNumber: text })
                }
                placeholder="Phone Number"
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
            {errors.mobileNumber && (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            )}

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleTabSwitch}
            >
              <Image source={arrow} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>

            <Text style={styles.registerText}>
              Already have an account?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => {
                  navigation.navigate("LoginPage");
                }}
              >
                Login
              </Text>
            </Text>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 20,
    paddingBottom: 80,
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
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: "10%",
    alignSelf: "flex-start",
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
    marginTop: 25,
    fontSize: 14,
    color: "#666",
    textAlign: "center", // Aligns text and inline elements
  },
  registerLink: {
    color: "rgb(0, 47, 129)",
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
    width: 50, // Ensure it appears above other elements
    height: 50,
    zIndex: 10,
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
  iconImage1: {
    width: 20,
    height: 20,
  },
  arrowButton: {
    alignSelf: "flex-end",
    marginRight: "15%",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});

export default Register;
