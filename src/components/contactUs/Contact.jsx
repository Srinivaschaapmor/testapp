import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import callIcon from "../../../assets/dashboardIcons/Phone.png";
import emailIcon from "../../../assets/dashboardIcons/email.png";
import whatsappIcon from "../../../assets/dashboardIcons/whatsapp.png";
import { Linking } from "react-native";

const ContactComponent = () => {
  const handlePhonePress = () => {
    const phoneNumber = "tel:9876543212";
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Failed to open phone dialer:", err)
    );
  };

  const handleEmailPress = () => {
    const email = "mailto:support@example.com";
    Linking.openURL(email).catch((err) =>
      console.error("Failed to open email app:", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={handlePhonePress}>
          <Image source={callIcon} style={styles.icon} />
          <Text style={styles.title}>Call us</Text>
          <Text style={styles.description}>Our team is online</Text>
          <Text style={styles.timing}>Mon-Fri • 9-17</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleEmailPress}>
          <Image source={emailIcon} style={styles.icon} />
          <Text style={styles.title}>Email us</Text>
          <Text style={styles.description}>Our team is online</Text>
          <Text style={styles.timing}>Mon-Fri • 9-17</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#717171",
    textAlign: "center",
    marginBottom: 5,
  },
  timing: {
    fontSize: 12,
    color: "#A0A0A0",
    textAlign: "center",
  },
});
