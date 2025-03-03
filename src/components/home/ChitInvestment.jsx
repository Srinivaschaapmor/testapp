import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import Carousel from "react-native-reanimated-carousel";
import dataset from "../../../assets/dashboardIcons/data-set.png";
import { useNavigation } from "@react-navigation/native";

const ChitInvestment = () => {
  const investments = [
    {
      id: 1,
      completedMonths: 7,
      totalMonths: 12,
      maturityAmount: 20000,
      name: "Akashya",
    },
    {
      id: 2,
      completedMonths: 4,
      totalMonths: 12,
      maturityAmount: 15000,
      name: "Rahul",
    },
    {
      id: 3,
      completedMonths: 10,
      totalMonths: 12,
      maturityAmount: 25000,
      name: "Priya",
    },
  ]; // Change this to an empty array to simulate no data
  const width = Dimensions.get("window").width;
  const navigate = useNavigation();

  // State to animate circular progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animateProgress = () => {
      setProgress(0); // Reset progress to 0 when component mounts
      setTimeout(() => {
        setProgress(100); // Animate progress to 100
      }, 100); // Delay for a smoother animation
    };

    animateProgress(); // Trigger the animation when the page loads
  }, []);

  const renderInvestment = (investment, index, totalSlides) => {
    const { completedMonths, totalMonths, maturityAmount, name } = investment;
    const progress = (completedMonths / totalMonths) * 100;

    return (
      <View>
        <View style={styles.circleWrapper}>
          <TouchableOpacity>
            <CircularProgress
              size={200}
              fill={progress} // Use the progress here
              width={20}
              tintColor="#002f81"
              strokeLinecap="round"
              rotation={0}
              backgroundColor="#CBCBCB"
            >
              {() => (
                <View style={styles.centerTextWrapper}>
                  <Text style={styles.centerText1}>{name}</Text>
                  <Text style={styles.centerText2}>Maturity Amount</Text>
                  <Text style={styles.centerText1}>₹{maturityAmount}</Text>
                  <Text style={styles.centerText}>
                    {completedMonths}/{totalMonths}
                  </Text>
                  <Text style={styles.centerText3}>Months</Text>
                </View>
              )}
            </CircularProgress>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Chit Investments</Text>
      {investments.length > 0 ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <Carousel
              loop
              width={width - 100}
              height={230}
              data={investments}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ item, index }) =>
                renderInvestment(item, index, investments.length)
              }
            />
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#002e81",
                }}
              ></View>
              <Text>Completed</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#rgb(203, 203, 203)",
                }}
              ></View>
              <Text>Incomplete</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>More Chits</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Image
            source={dataset}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          ></Image>
          <Text style={styles.emptyMessage}>
            Start your journey with us! Invest in our flexible chit plans and
            watch your savings grow.
          </Text>
          <TouchableOpacity
            style={styles.investButton}
            onPress={() => {
              navigate.navigate("Invest");
            }}
          >
            <Text style={styles.investButtonText}>Invest Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#ffff",
    width: "100%",
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccc500",
    marginTop: 5,
  },
  centerText1: {
    fontSize: 20,
    fontWeight: "bold",
  },
  centerText2: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#adadad",
    marginTop: 5,
  },
  centerText3: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#adadad",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    fontWeight: "600",
  },
  investButton: {
    backgroundColor: "#002e81",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  investButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#002e81",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ChitInvestment;
