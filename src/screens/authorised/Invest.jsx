import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Info from "../../components/invest/Info";
import Shortlist from "../../components/invest/Shortlist";
import ChitFund from "../../components/invest/ChitFund";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import AdditionalFeature from "../../components/invest/AdditionsFeature";
import { useSelector } from "react-redux";
import { GetAllInvestChits } from "../../apiCalls/apiRequests";

const Invest = () => {
  const routeName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigation();
  const [chitFundsData, setChitFundsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const GetAllChits = async () => {
    try {
      setLoading(true); // Start loading

      const response = await axios.get(
        `https://chit-fund-api.vercel.app/api/chits/exclude-user/${profile?.userId}`
      );
      // const response1 = await GetAllInvestChits(profile.userId);
      // console.log(response1, "response");
      if (response.status === 200) {
        setChitFundsData(response?.data.chits);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await GetAllChits();
    setRefreshing(false);
  };

  useEffect(() => {
    GetAllChits();
  }, [routeName]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#002F81" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#002F81"]}
        />
      }
    >
      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: 20,
          fontWeight: "600",
          paddingVertical: 10,
        }}
      >
        Invest
      </Text>
      <Info />
      <Shortlist />
      <ChitFund chitFundsData={chitFundsData} />
      <AdditionalFeature chitFundsData={chitFundsData} />
    </ScrollView>
  );
};

export default Invest;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80, // Ensure this works by applying it to contentContainerStyle
    marginBottom: 20, // Add margin to avoid overlap with bottom indicators
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
