import React, { createContext, useState, useEffect } from "react";
import { AppState, ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import AppNavigator from "./navigation/AppNavigator";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authloading, setAuthLoading] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  // Load the token when the app starts
  useEffect(() => {
    const loadToken = async () => {
      setAuthLoading(true);
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        console.log(storedToken, "storedAuth");
        if (storedToken) setToken(storedToken);
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setAuthLoading(false);
      }
    };
    loadToken();
  }, []);

  // Listen for app state changes
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/active|background/) && nextAppState === "inactive") {
        // App is being removed from recent tabs or closed
        console.log("App is closing or removed from recent tabs");
        await removeToken(); // Clear token when app is closed
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [appState]);

  const removeToken = async () => {
    setAuthLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      console.log("Token removed");
    } catch (error) {
      console.error("Error removing token:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  if (authloading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#002e81" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken, authloading }}>
      <AppNavigator />
    </AuthContext.Provider>
  );
};
