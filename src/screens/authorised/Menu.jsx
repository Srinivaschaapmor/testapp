import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import logo from "../../../assets/dashboardIcons/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../AuthProvider";
import document from "../../../assets/dashboardIcons/document.png";
import notifications from "../../../assets/dashboardIcons/notifications.png";
import card from "../../../assets/dashboardIcons/card.png";

import back from "../../../assets/dashboardIcons/back.png";
import about from "../../../assets/dashboardIcons/about.png";
import account from "../../../assets/dashboardIcons/profile.png";
import logout from "../../../assets/dashboardIcons/logout.png";
import { useNavigation } from "@react-navigation/native";
const Menu = ({ navigation }) => {
  const navigate = useNavigation();
  const { token, setToken, removeToken } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      console.log(token, "token");
      await removeToken();
      console.log("User logged out!");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const homeName = "Home";
  const myChitsName = "My Chits";
  const investName = "Invest";
  const contactUsName = "Contact";
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Navigate to the previous screen
        >
          <Image source={back} style={styles.backIcon}></Image>
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />
      </View>

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "Invest", // Navigate to the "Invest" tab
          }); // Use 'navigate' from useNavigation
        }}
      >
        <Image source={document} style={styles.menuicon}></Image>
        <Text style={styles.menuText}>View Chits</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "MyChits", // Navigate to the "Invest" tab
          }); // Use 'navigate' from useNavigation
        }}
      >
        <Image source={card} style={styles.menuicon}></Image>
        <Text style={styles.menuText}>Manage Chits</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={notifications} style={styles.menuicon}></Image>
        <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.menuItem}>
        <Image source={settings} style={styles.menuicon}></Image>
        <Text style={styles.menuText}>Preferences</Text>
      </TouchableOpacity> */}

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={about} style={styles.menuicon}></Image>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={account} style={styles.menuicon}></Image>
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleLogout}>
          <Image source={logout} style={styles.menuicon}></Image>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 50,
    // paddingHorizontal: 20,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    // marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    width: 150,
    height: 50,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuText: {
    fontSize: 18,
    // fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  footerItem: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuicon: {
    width: 30,
    height: 30,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
});

export default Menu;
