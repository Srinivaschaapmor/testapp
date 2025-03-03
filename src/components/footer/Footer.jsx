import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

// Import icons for active and inactive states
import homeActive from "../../../assets/dashboardIcons/home-active.png";
import homeInactive from "../../../assets/dashboardIcons/home.png";
import mychitsActive from "../../../assets/dashboardIcons/mychits-active.png";
import mychitsInactive from "../../../assets/dashboardIcons/mychits.png";
import investActive from "../../../assets/dashboardIcons/invest-active.png";
import investInactive from "../../../assets/dashboardIcons/invest.png";
import contactActive from "../../../assets/dashboardIcons/contact-active.png";
import contactInactive from "../../../assets/dashboardIcons/contact.png";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute for getting the current route

const Footer = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation();
  const route = useRoute(); // Use route to track the current screen

  const tabs = [
    {
      name: "Home",
      activeIcon: homeActive,
      inactiveIcon: homeInactive,
      screen: "Home",
    },
    {
      name: "My Chits",
      activeIcon: mychitsActive,
      inactiveIcon: mychitsInactive,
      screen: "MyChits",
    },
    {
      name: "Invest",
      activeIcon: investActive,
      inactiveIcon: investInactive,
      screen: "Invest",
    },
    {
      name: "Contact Us",
      activeIcon: contactActive,
      inactiveIcon: contactInactive,
      screen: "Contactus",
    },
  ];

  // Update the active tab based on the current route
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.screen === route.name);
    if (currentTab) {
      setActiveTab(currentTab.name);
    }
  }, [route.name]); // Run whenever the route changes

  const handleTabPress = (tabName, screen) => {
    setActiveTab(tabName);
    navigation.navigate(screen); // Navigate to the respective screen
  };

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.footerItem}
          onPress={() => handleTabPress(tab.name, tab.screen)} // Pass the screen name on tab press
        >
          <Image
            source={activeTab === tab.name ? tab.activeIcon : tab.inactiveIcon}
            style={styles.icon}
          />
          <Text
            style={[
              styles.footerText,
              activeTab === tab.name && styles.activeText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
    position: "absolute", // Position the footer absolutely
    bottom: 0, // Stick to the bottom of the screen
    left: 0,
    right: 0,
    elevation: 5, // Add a shadow for elevation (Android)
    shadowColor: "#000", // Add a shadow for elevation (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#A3A3A3",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 5,
  },
  activeText: {
    color: "#000", // Highlighted color for the active tab text
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Footer;
