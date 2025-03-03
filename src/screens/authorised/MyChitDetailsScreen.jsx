import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { CircularProgress } from "react-native-circular-progress";
import deposit from "../../../assets/dashboardIcons/deposit.png";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";
const MyChitDetailsScreen = ({ navigation, route }) => {
  const { chitDetails } = route.params;
  const transactions = [];
  const profile = useSelector((state) => state.profile.profile);

  const [paymentDetails, setPaymentDetails] = useState();
  function calculateCompletion(startDateStr, totalMonths) {
    // Parse the start date
    const startDate = new Date(startDateStr);

    // Current date
    const currentDate = new Date();

    // Calculate the number of months completed
    const completedMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());

    // Ensure completedMonths is not negative or more than totalMonths
    const validCompletedMonths = Math.min(
      Math.max(completedMonths, 0),
      totalMonths
    );

    // Calculate percentage completed and remaining
    const percentageCompleted = (validCompletedMonths / totalMonths) * 100;
    const percentageRemaining = 100 - percentageCompleted;

    return {
      completedMonths: validCompletedMonths,
      percentageCompleted: percentageCompleted.toFixed(2),
      percentageRemaining: percentageRemaining.toFixed(2),
    };
  }

  // Example usage

  const result = calculateCompletion(
    chitDetails?.startDate,
    chitDetails?.duration
  );
  console.log(chitDetails);
  console.log(chitDetails._id, profile.userId);
  const fetchPaymentDetails = async () => {
    try {
      const url = `https://chit-fund-api.vercel.app/api/chits/${chitDetails?._id}/payments/current/${profile.userId}`;
      console.log(url);
      const resonse = await axios.get(url);
      console.log(resonse);
      if (resonse.status) {
        setPaymentDetails(resonse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chitDetails?._id && profile?.userId) {
      fetchPaymentDetails();
    } else {
      console.log("Waiting for data to be available...");
    }
  }, [chitDetails, profile]);

  console.log(paymentDetails, "hello");
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionRow}>
      <Image source={deposit} style={{ width: 40, height: 40 }}></Image>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Chit Details</Text>
        <FontAwesome name="question-circle" size={20} color="gray" />
      </View>

      {/* Chit Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chit Info</Text>
        <View style={styles.cardInfo}>
          <View style={styles.chitInfo}>
            <CircularProgress
              size={120}
              width={15}
              fill={result?.percentageCompleted}
              tintColor="#002e81"
              backgroundColor="#E0E0E0"
              rotation={0}
            >
              {() => (
                <Text style={styles.progressText}>
                  <Text style={styles.highlightText}>
                    {result.completedMonths}/{chitDetails?.duration}
                  </Text>
                  {"\n"}Months
                </Text>
              )}
            </CircularProgress>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infoRow}>Chit Name:</Text>
              <Text style={styles.infoRow}>Maturity Amount:</Text>
              <Text style={styles.infoRow}>Monthly Amount:</Text>
              <Text style={styles.infoRow}>Total Amount Due:</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>{chitDetails?.chitName}</Text>
              <Text style={styles.infoLabel}>
                ₹ {chitDetails?.maturityAmount}
              </Text>
              <Text style={styles.infoLabel}>
                ₹ {chitDetails?.monthlyInstallment}
              </Text>
              <Text style={styles.infoLabel}>₹ 10,000</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Amount Payable */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Amount Payable</Text>
        <View style={styles.amountContainer}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Total Subscription</Text>
            <Text style={styles.amountValue}>
              ₹ {paymentDetails?.totalAmount}
            </Text>
          </View>
          <View style={styles.divider1} />
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Penalty</Text>
            <Text style={styles.amountValue}>
              ₹ {paymentDetails?.penalityAmount}
            </Text>
          </View>
          <View style={styles.divider1} />
          <View style={styles.amountRow}>
            <Text style={styles.amountLabelFinal}>Amount Payable</Text>
            <Text style={styles.amountValueFinal}>
              ₹ {paymentDetails?.totalAmount + paymentDetails?.penalityAmount}
            </Text>
          </View>
          <TouchableOpacity style={styles.payNowButton}>
            <Text style={styles.payNowText}>Pay Now</Text>
          </TouchableOpacity>
          {/* Values Column */}
        </View>
      </View>

      {/* Transactions */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>View Transactions</Text>
        {chitDetails.transactions?.length > 0 ? (
          chitDetails.transactions.map((item, index) => (
            <View key={index} style={styles.transactionRow}>
              <Image source={deposit} style={{ width: 40, height: 40 }} />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>₹ {item.amount}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions</Text>
          </View>
        )}
      </View>

      {/* Pay Now Button */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F4F8FC",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    // marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitle: {
    // color: "#002e81",
    fontWeight: "600",
    marginBottom: 25,
    fontSize: 16,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  chitInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    color: "black",
  },
  highlightText: {
    color: "#CCC500",
    fontWeight: "600",
    fontSize: 14,
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: "#D6D6D6",
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoRow: {
    fontSize: 12,
    marginBottom: 15,
    color: "#494949",
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 15,
    color: "black",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  amountLabel: {
    fontSize: 14,
    color: "black",
  },
  amountLabelFinal: {
    fontSize: 14,
    color: "black",
    fontWeight: 600,
  },
  amountValue: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "black",
  },
  amountValueFinal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  transactionDate: {
    fontSize: 12,
    color: "gray",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  seeMore: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  payNowButton: {
    backgroundColor: "#002E81",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider1: {
    height: 1, // Thickness of the divider
    backgroundColor: "#E0E0E0", // Light gray color for the divider
    marginVertical: 5, // Add spacing around the divider
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#757575", // Gray text color
  },
});

export default MyChitDetailsScreen;
