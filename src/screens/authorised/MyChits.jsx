import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

const lastday = (value) =>
  value === "before_15th" ? "15th of every month" : "10th of every month";

const MyChits = ({ navigation }) => {
  const routeName = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [chitFundsData, setChitFundsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const GetAllChits = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://chit-fund-api.vercel.app/api/chits/user/${profile?.userId}`
      );

      if (response.status === 200) {
        setChitFundsData(response.data.chits);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    GetAllChits();
  }, [routeName]);

  const onRefresh = () => {
    setRefreshing(true);
    GetAllChits();
  };

  const filteredData = chitFundsData.filter((item) =>
    item.chitName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Chits</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Chit here"
          placeholderTextColor="#C1C1C1"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#002F81"
          style={{ marginTop: 20 }}
        />
      ) : filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchText ? "No results found" : "Start Investing!"}
          </Text>
          {!searchText && (
            <TouchableOpacity
              style={styles.investButton}
              onPress={() => navigation.navigate("Invest")}
            >
              <Text style={styles.investButtonText}>Go to Invest</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={`${item._id}-${index}`}
              style={styles.card}
              onPress={() =>
                navigate.navigate("mychitDetails", { chitDetails: item })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.chitName}</Text>
                <Text style={styles.amount}>₹{item.maturityAmount}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>Start Date</Text>
                <Text style={styles.detailsText}>Monthly Amount</Text>
                <Text style={styles.detailsText}>Last Day to Pay</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.valueText}>
                  {formatDate(item.startDate)}
                </Text>
                <Text style={styles.valueText}>₹{item.monthlyInstallment}</Text>
                <Text style={styles.valueText}>
                  {lastday(item.lastDayToPay)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyChits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#4A4A4A",
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002F81",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002F81",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  detailsText: {
    fontSize: 12,
    color: "#7D7D7D",
  },
  valueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A4A4A",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#7D7D7D",
    marginBottom: 10,
  },
  investButton: {
    backgroundColor: "#002F81",
    padding: 10,
    borderRadius: 5,
  },
  investButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
