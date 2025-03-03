import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import auction from "../../../assets/dashboardIcons/auction.png";

const AuctionInfo = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "10%",
        backgroundColor: "white",
        borderRadius: 12,
        marginTop: 20,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          // paddingHorizontal: 30,
          display: "flex",
          flexDirection: "row",

          // paddingTop: 18,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          View Ongoing Auctions
        </Text>
        <Image source={auction} style={{ width: 40, height: 40 }}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default AuctionInfo;
