import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const announcements = [
  { id: "1", text: "Next auction date is 20-11-2024" },
  { id: "2", text: "Next auction date is 20-11-2024" },
  { id: "3", text: "Next auction date is 20-11-2024" },
  { id: "4", text: "Next auction date is 20-11-2024" },
];

const AnnouncementList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Announcements</Text>
      {announcements.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.bullet} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>See More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#002e81",
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: "#000",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#002e81",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AnnouncementList;
