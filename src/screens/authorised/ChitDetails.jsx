import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import bird from "../../../assets/dashboardIcons/bird.png";
import axios from "axios";
import { useSelector } from "react-redux";

const ChitDetails = ({ route, navigation }) => {
  const profile = useSelector((state) => state.profile.profile);
  const { fundDetails } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  console.log(fundDetails.slots.availableSlots);
  const lastday = (value) => {
    if (value === "before_15th") {
      return "15th of every month";
    } else {
      return "10th of every month";
    }
  };

  const handleProceed = () => {
    setModalVisible(true);
  };

  const confirmInvestment = async () => {
    try {
      const data = {
        chitId: fundDetails?.chitID,
        userId: profile?.userId,
        status: "Inprogress",
      };
      console.log(data);
      const response = await axios.post(
        "https://chit-fund-api.vercel.app/api/requests",
        data
      );

      if (response.status === 201) {
        Alert.alert("Success", "You have successfully invested in this chit!");
        setModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }

    // Add your investment logic here.
  };

  const cancelInvestment = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chit Details</Text>
          <Ionicons name="help-circle" size={24} color="#000" />
        </View>

        {/* Chit Overview */}
        <View style={styles.overviewCard}>
          <Image source={bird} style={styles.logo} />
          <Text style={styles.title}>{fundDetails.title}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {fundDetails?.slots.totalSlots}
              </Text>
              <Text style={styles.statLabel}>Number of Members</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {fundDetails?.slots.availableSlots}
              </Text>
              <Text style={styles.statLabel}>Current Openings</Text>
            </View>
          </View>
        </View>

        {/* Fund Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Fund Details</Text>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Maturity Amount</Text>
              <Text style={styles.value}>₹2000000</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>24-12-2024</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Monthly Installment</Text>
              <Text style={styles.value}>₹10000</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Months</Text>
              <Text style={styles.value}>16</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Auction Date</Text>
              <Text style={styles.value}>
                {lastday(fundDetails.lastDayToPay)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>Chit Fund</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailItemWide}>
              <Text style={styles.label}>Withdrawal Charge</Text>
              <Text style={styles.value}>
                5% of the maturity amount will be deducted for maintenance
              </Text>
            </View>
          </View>
        </View>

        {/* Eligibility Criteria */}
        <View style={styles.eligibilityCard}>
          <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
          <Text style={styles.criteria}>
            Age: Participants must be at least 18 years old.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Proceed Button */}
      <View style={styles.proceedButtonContainer}>
        {fundDetails?.slots.availableSlots > 0 ? (
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
          >
            <Text style={styles.proceedText}>PROCEED TO INVEST</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disableProceedButton}>
            <Text style={styles.proceedText}>No Slots Left</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelInvestment}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to invest in this chit?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmInvestment}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelInvestment}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  overviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textTransform: "capitalize",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 30,
  },
  detailItem: {
    flex: 1,
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  detailItemWide: {
    width: "100%",
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
  eligibilityCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  criteria: {
    fontSize: 14,
    color: "#666",
  },
  proceedButtonContainer: {
    // backgroundColor: "#F5F5F5",
    // padding: 10,
    // borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  proceedButton: {
    backgroundColor: "#002e81",
    // borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disableProceedButton: {
    backgroundColor: "grey",
    // borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
  },
  // Existing styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#002e81",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChitDetails;
