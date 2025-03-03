import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import investAddImg from "../../../assets/dashboardIcons/investAdd.png";
import { useNavigation } from "@react-navigation/native";
const AdditionalFeature = ({ chitFundsData }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("moreChitsScreen", { fundDetails: chitFundsData });
      }}
    >
      <View style={styles.container}>
        <View style={styles.cont1}>
          <Image source={investAddImg} style={styles.img}></Image>
          <Text style={styles.text1}>View All funds in this collection</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdditionalFeature;
const styles = StyleSheet.create({
  container: {
    // height: 50,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  img: { width: 40, height: 40 },
  cont1: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    gap: 20,
  },
  text1: {
    fontSize: 14,
    color: "#002F81",
    fontWeight: 600,
  },
});
