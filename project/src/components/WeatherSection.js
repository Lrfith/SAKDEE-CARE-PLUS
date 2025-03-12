import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";

const WeatherSection = ({ weatherData }) => {
  return (
    <Card containerStyle={styles.weatherCard}>
      <Text style={styles.weatherTitle}>แนะนำสภาพอากาศ</Text>
      <Text>{weatherData.location} - {weatherData.date}</Text>
      <Text style={styles.temp}>{weatherData.temperature}</Text>
      <Text>ความชื้น {weatherData.humidity}</Text>
      <Text>โอกาสฝนตก {weatherData.rainChance}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  weatherCard: { alignItems: "center", padding: 15, borderRadius: 10 },
  weatherTitle: { fontSize: 18, fontWeight: "bold" },
  temp: { fontSize: 24, fontWeight: "bold", color: "#ff5733" },
});

// WeatherSection.js
export default WeatherSection;

