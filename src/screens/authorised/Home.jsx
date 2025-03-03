import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import Headermain from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ChitInvestment from "../../components/home/ChitInvestment";
import AuctionInfo from "../../components/home/AuctionInfo";
import Announcements from "../../components/home/Announcements";
import InviteFriends from "../../components/home/ReferMembers";
import { CircularProgress } from "react-native-circular-progress";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const profile = useSelector((state) => state.profile.profile);

  // State to manage refreshing
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to simulate refresh action
  const onRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true
    setTimeout(() => {
      setIsRefreshing(false); // Stop refreshing after 2 seconds (or after fetch operation)
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Headermain />

      {/* Scrollable Content with Pull-to-Refresh */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#002f81"]} // You can customize the spinner color
            progressBackgroundColor="#fff" // Background color for the spinner
          />
        }
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome Back,{" "}
            <Text style={styles.welcomeText1}>{profile?.fullName}</Text>
          </Text>

          {/* Conditional rendering of CircularProgress during refresh */}
          {!isRefreshing && (
            <>
              <ChitInvestment />
              <AuctionInfo />
              <Announcements />
              <InviteFriends />
            </>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20, // Adjust for the height of the fixed header
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevent content from overlapping with the footer
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
  welcomeText1: {
    fontSize: 18,
    color: "rgb(0, 47, 129)",
    fontWeight: "600",
  },
  refreshIndicator: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#002f81",
    marginTop: 10,
  },
});

export default Home;
