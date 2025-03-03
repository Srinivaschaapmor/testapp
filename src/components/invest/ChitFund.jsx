import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import bird from "../../../assets/dashboardIcons/bird.png";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import axios from "axios";

const ChitFund = ({ chitFundsData }) => {
  const navigate = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {chitFundsData.length > 0 ? (
        chitFundsData.slice(0, 3).map((fund) => (
          <View key={fund._id} style={styles.card}>
            <View style={styles.header}>
              <Image source={bird} style={styles.logo} />
              <Text style={styles.title}>{fund.chitName}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate("ChitDetails", {
                    fundDetails: {
                      title: fund.chitName,
                      maturityAmount: fund.maturityAmount,
                      monthlyInstallment: fund.monthlyInstallment,
                      months: fund.duration,
                      lastDayToPay: fund.lastDayToPay,
                      chitID: fund._id,
                      slots: fund.slots,
                    },
                  });
                }}
              >
                <Text style={styles.moreDetails}>More Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Maturity Amount</Text>
                <Text style={styles.value}>₹{fund.maturityAmount}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Monthly Installment</Text>
                <Text style={styles.value}>₹{fund.monthlyInstallment}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Months</Text>
                <Text style={styles.value}>{fund.duration}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Chits Found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  moreDetails: {
    color: "rgb(0, 46, 129)",
    fontSize: 14,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 10,
    width: "100%",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
});

export default ChitFund;
