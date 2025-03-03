import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Initially empty
  const [emailError, setEmailError] = useState(""); // Error state
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Initially disabled button

  useEffect(() => {
    validateForm(); // Validate form whenever email changes
  }, [email]);

  const handleInputChange = (value) => {
    setEmail(value); // Update email state
  };

  const validateForm = () => {
    // Only validate email if it's been touched (user has started typing or submitting)
    if (email === "") {
      setEmailError(""); // No error if the field is empty
      setIsButtonEnabled(false); // Keep button disabled
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address"); // Invalid email format
      setIsButtonEnabled(false); // Disable button if email is invalid
    } else {
      setEmailError(""); // Clear any errors
      setIsButtonEnabled(true); // Enable button if email is valid
    }
  };

  const handleSubmit = () => {
    validateForm(); // Validate form on submit
    if (isButtonEnabled) {
      console.log("Password Reset Request Sent:", email); // Log or make API call
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {/* Email Input Field */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={handleInputChange} // Update email on text change
        />
        {/* Show error only if there's an error and email is not empty */}
        {emailError && email !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, !isButtonEnabled && styles.buttonDisabled]} // Apply button styles based on validation
        onPress={handleSubmit}
        disabled={!isButtonEnabled} // Disable button if there's an error
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ff6b6b",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#ff6347",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#a40000",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#ddd", // Grey out button when disabled
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
