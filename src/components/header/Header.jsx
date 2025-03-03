import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import logo from "../../../assets/dashboardIcons/logo.png";
import notifications from "../../../assets/dashboardIcons/notifications.png";
import menu from "../../../assets/dashboardIcons/menu.png";
import closeIcon from "../../../assets/dashboardIcons/close.png"; // Add your close icon here
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const menuWidth = width; // 70% of screen width

const Headermain = () => {
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(menuWidth)); // Initialize animation value
  const [overlayAnim] = useState(new Animated.Value(0)); // For fading in/out the overlay
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    if (isMenuVisible) {
      // Slide menu out (from right to left)
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: menuWidth, // Slide out to 70% of screen width
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0, // Fade out the overlay
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setIsMenuVisible(false));
    } else {
      // Slide menu in (from right to left)
      setIsMenuVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide in to the full width of the side menu (0)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1, // Fade in the overlay
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: menuWidth, // Slide out to 70% of screen width
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0, // Fade out the overlay
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsMenuVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.stack}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.stack1}>
          <Image source={notifications} style={styles.headerIcons} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Image source={menu} style={styles.headerIcons} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#fff",
    width: "100%",
    // paddingVertical: 40,
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 20,
  },
  logo: {
    width: 120,
    height: 50,
  },
  headerIcons: {
    width: 35,
    height: 35,
  },
  stack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stack1: {
    flexDirection: "row",
    gap: 20,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    width: menuWidth, // 70% of the screen width
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  menuHeader: {
    height: 100,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  menuLogo: {
    width: 150,
    height: 50,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  menuItems: {
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
});

export default Headermain;
