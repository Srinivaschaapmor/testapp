import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { setProfile } from "../store/slices/profileSlice";

import MainPage from "../screens/unauthorised/MainPage";
import LoginPage from "../screens/unauthorised/LoginPage";
import LoginWithEmail from "../components/Login/LoginWithEmail";
import LoginWithPhone from "../components/Login/LoginWithPhone";
import Register from "../components/register/Register";
import ForgotPassword from "../components/Login/ForgotPassword";

import Menu from "../screens/authorised/Menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../AuthProvider";

import homeActive from "../../assets/dashboardIcons/home-active.png";
import homeInactive from "../../assets/dashboardIcons/home.png";
import mychitsActive from "../../assets/dashboardIcons/mychits-active.png";
import mychitsInactive from "../../assets/dashboardIcons/mychits.png";
import investActive from "../../assets/dashboardIcons/invest-active.png";
import investInactive from "../../assets/dashboardIcons/invest.png";
import contactActive from "../../assets/dashboardIcons/contact-active.png";
import contactInactive from "../../assets/dashboardIcons/contact.png";
import Contact from "../screens/authorised/Contact";
import Home from "../screens/authorised/Home";
import MyChits from "../screens/authorised/MyChits";
import Invest from "../screens/authorised/Invest";
import logo from "../../assets/dashboardIcons/logo.png";
import ChitDetails from "../screens/authorised/ChitDetails";

import MyChitDetailsScreen from "../screens/authorised/MyChitDetailsScreen";
import MoreChitsScreen from "../screens/authorised/FullChits";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = "Home";
const myChitsName = "My Chits";
const investName = "Invest";
const contactUsName = "Contact";

const AuthenticatedTabs = () => (
  <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === homeName) {
          iconName = focused ? homeActive : homeInactive;
        } else if (route.name === myChitsName) {
          iconName = focused ? mychitsActive : mychitsInactive;
        } else if (route.name === investName) {
          iconName = focused ? investActive : investInactive;
        } else if (route.name === contactUsName) {
          iconName = focused ? contactActive : contactInactive;
        }

        return (
          <Image
            source={iconName}
            style={{ width: 40, height: 40, marginTop: 20 }}
            color={color}
          />
        );
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 15,
      },
      tabBarStyle: styles.tabBarStyle,
      tabBarActiveTintColor: "#4A4A4A",
      tabBarInactiveTintColor: "#C1C1C1",
    })}
  >
    <Tab.Screen name={homeName} component={Home} />
    <Tab.Screen name={myChitsName} component={MyChits} />
    <Tab.Screen name={investName} component={Invest} />
    <Tab.Screen name={contactUsName} component={Contact} />
  </Tab.Navigator>
);

const AuthenticatedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Tabs"
      component={AuthenticatedTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="ChitDetails" component={ChitDetails} />
    <Stack.Screen name="mychitDetails" component={MyChitDetailsScreen} />
    <Stack.Screen name="moreChitsScreen" component={MoreChitsScreen} />
  </Stack.Navigator>
);

const UnauthenticatedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainPage" component={MainPage} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
    <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { token, setToken, authloading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const dispatch = useDispatch();
  console.log(authloading, "authloading");

  useEffect(() => {
    console.log(`isAdmin in useEffect:`, isAdmin);
    checkToken();
    console.log(`isAdmin in useEffect: after:`, isAdmin);
  }, [token, authloading]);

  const checkToken = async () => {
    try {
      setLoading(true);
      if (token) {
        console.log(token, "token");
        // Decode the token to extract user details
        const decoded = jwtDecode(token);
        console.log(decoded);

        // Check if the user is an admin
        if (decoded?.isAdmin) {
          // Display a toast message
          Toast.show({
            type: "error",
            text1: "Access Denied",
            text2: "Admins cannot log in through this application.",
          });

          // Reset token and admin state
          setToken(null);
          setIsAdmin(false);
          dispatch(setProfile(null));
          return; // Exit early to prevent further actions
        }

        // Set user roles and dispatch profile
        console.log(`decoded?.isAdmin`, decoded?.isAdmin);
        setIsAdmin(decoded?.isAdmin);
        dispatch(setProfile(decoded));
      } else {
        // Handle case with no token
        setToken(null);
        setIsAdmin(false);
        dispatch(setProfile(null));
      }
    } catch (error) {
      console.error("Error checking token:", error);

      // Reset states on error
      setToken(null);
      setIsAdmin(false);
      dispatch(setProfile(null));
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };

  if (authloading === true && loading === true) {
    // Display a loading spinner while checking token
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          width: "100%",
        }}
      >
        <Image source={logo} style={{ width: 250, height: 100 }} />
        <ActivityIndicator size="large" color="#002e81" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {token && !isAdmin ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        <Toast />
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "#FFFFFF",
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    position: "absolute", // Floating tab bar
    left: 10,
    right: 10,
  },
});
