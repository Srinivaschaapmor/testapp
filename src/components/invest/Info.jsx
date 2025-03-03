import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Finance from "../../../assets/dashboardIcons/Finance.png";
import best from "../../../assets/dashboardIcons/best.png";
import highReturns from "../../../assets/dashboardIcons/highReturns.png";
import noLock from "../../../assets/dashboardIcons/best.png";
const Info = () => {
  return (
    <View style={styles.container1}>
      {/* Row container for text and image */}
      <View style={styles.row}>
        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Best Chit Funds</Text>
          <Text style={styles.subtitle}>
            Invest in Chit Funds With Proven Performance
          </Text>
          <Text style={styles.description}>
            Secure Your Future With Chit Funds That Deliver Consistent Results
          </Text>
        </View>

        {/* Image */}
        <Image source={Finance} style={styles.image} />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <View style={styles.filterButton}>
          <Text style={styles.filterText}>High Growth</Text>
        </View>
        <View style={styles.filterButton}>
          <Text style={styles.filterText}>No Lock-in</Text>
        </View>
        <View style={styles.filterButton}>
          <Text style={styles.filterText}>Best Chits</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff", // Light background color
    borderRadius: 12,
    padding: 16,
    // margin: 16,
    marginTop: 20,
  },
  row: {
    flexDirection: "row", // Horizontal layout
    alignItems: "center", // Align items vertically in the center
    justifyContent: "space-between", // Space between text and image
    marginBottom: 16,
  },
  textContainer: {
    flex: 1, // Take up remaining space next to the image
    marginRight: 16, // Add space between text and image
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002e81",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#555",
  },
  image: {
    width: 100, // Set fixed width for the image
    height: 100, // Set fixed height for the image
    resizeMode: "contain",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    backgroundColor: "#e6f0ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#002e81",
  },
});
export default Info;
