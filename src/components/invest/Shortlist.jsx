import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import search from "../../../assets/dashboardIcons/search.png";
const Shortlist = () => {
  return (
    <View style={styles.container}>
      <Image source={search} style={styles.image}></Image>
      <View>
        <Text style={styles.text1}>Shortlisted Funds</Text>
        <Text style={styles.text2}>
          by Research Team.<Text style={styles.text3}> Learn More</Text>
        </Text>
      </View>
    </View>
  );
};

export default Shortlist;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    // height: 200,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#ffff",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  text1: {
    fontSize: 14,
    fontWeight: 600,
  },
  text2: {
    fontSize: 12,
  },
  text3: {
    color: "rgb(0, 46, 129)",
    fontWeight: 600,
  },
});
