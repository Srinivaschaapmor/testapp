import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bird from "../../../assets/dashboardIcons/bird.png";
import { Ionicons } from "@expo/vector-icons";

const ChitCard = ({ fund }) => {
  const navigation = useNavigation();

  return (
    <View key={fund._id} style={styles.card}>
      <View style={styles.headerCard}>
        <Image source={bird} style={styles.logo} />
        <Text style={styles.cardTitle}>{fund.chitName}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChitDetails", {
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
          <Text style={styles.value}>{fund.maturityAmount}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Monthly Installment</Text>
          <Text style={styles.value}>{fund.monthlyInstallment}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Months</Text>
          <Text style={styles.value}>{fund.duration}</Text>
        </View>
      </View>
    </View>
  );
};

const MoreChitsScreen = ({ route, navigation }) => {
  const { fundDetails = [] } = route.params || {};
  const [searchText, setSearchText] = useState("");
  const [filteredFunds, setFilteredFunds] = useState(fundDetails);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = fundDetails.filter(
      (fund) =>
        fund.chitName.toLowerCase().includes(text.toLowerCase()) ||
        fund.maturityAmount.toString().includes(text) ||
        fund.duration.toString().includes(text)
    );
    setFilteredFunds(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredFunds(fundDetails);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>More Chits</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, amount, or months"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredFunds.map((fund) => (
          <ChitCard key={fund._id} fund={fund} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  cardTitle: {
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
});

export default MoreChitsScreen;
