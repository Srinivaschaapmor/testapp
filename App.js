import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/AuthProvider";

import store from "./src/store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider></AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
