import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Or use a different icon library

const InviteFriends = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="group-add"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>Invite Your Friends</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    // margin: 16,
    marginTop: 20,
    marginBottom: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default InviteFriends;
