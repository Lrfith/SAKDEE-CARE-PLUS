import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Card } from "@rneui/themed";

const weatherData = {
  location: "กรุงเทพมหานคร",
  date: "8 มีนาคม 2568",
  temperature: "32°C",
  humidity: "65%",
  rainChance: "0%",
  condition: "เหมาะสม",
};

const tips = [
  {
    id: "1",
    title: "5 เคล็ดลับซักผ้าให้สะอาด",
    description: "เคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาด",
    image: require("../../assets/TipSection-img/TipSec-img1.png"),
  },
  {
    id: "2",
    title: "4 วิธีตากผ้าในวันที่ไม่มีแดด",
    description: "เคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาด",
    image: require("../../assets/TipSection-img/TipSec-img2.png"),
  },
  {
    id: "3",
    title: "ซักผ้าให้หอมติดทนนาน",
    description: "เคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาดเคล็ดลับซักผ้าให้สะอาด",
    image: require("../../assets/TipSection-img/TipSec-img3.png"),
  },
];

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Weather Section */}
        <Card containerStyle={styles.weatherCard}>
          <Text style={styles.weatherTitle}>แนะนำสภาพอากาศ</Text>
          <Text>{weatherData.location} - {weatherData.date}</Text>
          <Text style={styles.temp}>{weatherData.temperature}</Text>
          <Text>ความชื้น {weatherData.humidity}</Text>
          <Text>โอกาสฝนตก {weatherData.rainChance}</Text>
        </Card>

        {/* Banner Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
          <Image source={require("../../assets/ads-banner/ads-banner1.png")} style={styles.banner} />
          <Image source={require("../../assets/ads-banner/ads-banner2.png")} style={styles.banner} />
          <Image source={require("../../assets/ads-banner/ads-banner3.png")} style={styles.banner} />
        </ScrollView>

        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Tips ในการดูแลผ้า</Text>
        <FlatList
          horizontal
          data={tips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tipCard}>
              <Image source={item.image} style={styles.tipImage} />
              <Text style={styles.tipTitle} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.tipDesc} numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80, // ป้องกันเนื้อหาถูก TabNavigator ทับ
  },
  weatherCard: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'Kanit-Regular'
  },
  temp: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff5733",
    fontFamily: 'Kanit-Regular'
  },
  bannerContainer: {
    marginVertical: 10,
  },
  banner: {
    width: 300,
    height: 150,
    marginLeft: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    margin: 15,
    fontFamily: 'Kanit-Regular'
  },
  tipCard: {
    width: 180,
    marginLeft: 15,
    backgroundColor: "white",
    padding: 0,
    borderRadius: 10,
  },
  tipImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  tipTitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    margin: 10,
  },
  tipDesc: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    margin: 10,
  },
});

export default Home;
