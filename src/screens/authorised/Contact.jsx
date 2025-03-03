import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import contactUs from "../../../assets/dashboardIcons/Layer 2.png";
import ContactComponent from "../../components/contactUs/Contact";
// import contactUs from "../../assets/dashboardIcons/Customer-support.png";

const Contact = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.imageContainer}>
        <Image source={contactUs} style={styles.image} />
      </View>
      <Text style={styles.text}>
        Don’t hesitate to contact us whether you have a suggestion on our
        improvement, a complaint to discuss, or an issue to solve.
      </Text>
      <ContactComponent />
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 80,
  },
  title: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  text: {
    color: "#717171",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  box: {
    flex: 1,
    height: 100,
    marginHorizontal: 5, // Space between boxes
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Optional for rounded corners
  },
  boxText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
