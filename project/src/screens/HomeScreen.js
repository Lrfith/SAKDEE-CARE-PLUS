import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { Card } from "@rneui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { auth, db } from '../components/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "สวัสดีตอนเช้า";
  } else if (hour >= 12 && hour < 15) {
    return "สวัสดีตอนเที่ยง";
  } else if (hour >= 15 && hour < 18) {
    return "สวัสดีตอนบ่าย";
  } else if (hour >= 18 && hour < 22) {
    return "สวัสดีตอนเย็น";
  } else {
    return "สวัสดีตอนดึก";
  }
};

// Function to map weather conditions to icons
const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return "weather-sunny";
    case "clouds":
      return "weather-cloudy";
    case "rain":
      return "weather-rainy";
    case "snow":
      return "weather-snowy";
    default:
      return "weather-sunny"; blocationButorderRadius
  }
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
  
  const [weatherData, setWeatherData] = useState({});
  const [userName, setUserName] = useState("Guest User");

    // Fetch user's name from Firebase Authentication or Firestore
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserName(userSnap.data().userName || "User");
          }
        }
      });
  
      return () => unsubscribe();
    }, []);

  useEffect(() => {
    const located = "Bangkok,TH"; // ตำแหน่งที่ตั้ง

    // Fetch weather data from OpenWeatherMap API (example)
    const fetchWeather = async () => {
      try {
        const response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: located, // Change the location to your preferred city
            appid: "c125eee6cba494a329341c56fcfbb227", // Replace with your OpenWeatherMap API key
            units: "metric", // To get temperature in Celsius
            lang: "th", // Thai language for weather conditions
          },
        });

        const data = response.data;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const humidity = `${data.main.humidity}%`;
        const rainChance = data.pop ? `${(data.pop * 100).toFixed(0)}%` : "0%";
        const condition = data.weather[0].description;
        const icon = getWeatherIcon(data.weather[0].main);

        setWeatherData({
          location: located,  // You can change this based on the response if needed
          temperature,
          humidity,
          rainChance,
          condition,
          icon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const getLaundryRecommendation = () => {
    if (!weatherData.rainChance || !weatherData.humidity) return "กำลังโหลด...";

    const rain = parseInt(weatherData.rainChance); // แปลงเป็นตัวเลข
    const humidity = parseInt(weatherData.humidity);

    if (rain < 30 && humidity < 70) {
      return "เหมาะสำหรับซักผ้า";
    } else {
      return "ไม่เหมาะสำหรับซักผ้า";
    }
  };

  const navigation = useNavigation(); // Get navigation object

  return (
    <ImageBackground
      source={require('../../assets/HomeBackground.png')} // เปลี่ยนเป็น path ของรูปที่ต้องการใช้
      style={styles.background} // ใช้ styles
      resizeMode="cover" // ปรับขนาดรูปให้เต็มจอ
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* // Greeting Section */}
          <Text style={styles.sectionGeeting}>{getGreeting()}, {userName}!</Text>
          {/* <Text style={styles.sectionGeeting}>{getGreeting()}, Guest User!</Text> */}

          {/* // Weather Section */}
          <Card containerStyle={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <Text style={styles.location}>{weatherData.location}</Text>
              <View style={styles.statusButton}>
                <Text style={styles.statusText}>{getLaundryRecommendation()}</Text>
              </View>
            </View>

            <View style={styles.weatherContent}>
              <MaterialCommunityIcons name={weatherData.icon} size={85} color="orange" style={styles.weatherIcon} />
              <View style={styles.weatherText}>
                <Text style={styles.temp}>{weatherData.temperature}</Text>
                <View style={styles.weatherDetails}>
                  <MaterialCommunityIcons name="water" size={20} color="gray" />
                  <Text style={styles.detailText}>ความชื้น {weatherData.humidity}</Text>
                  <MaterialCommunityIcons name="weather-rainy" size={20} color="gray" paddingLeft={10} />
                  <Text style={styles.detailText}> โอกาสฝนตก {weatherData.rainChance}</Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Banner Section */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
            <Image source={require("../../assets/ads-banner/ads-banner1.png")} style={styles.banner} />
            <Image source={require("../../assets/ads-banner/ads-banner2.png")} style={styles.banner} />
            <Image source={require("../../assets/ads-banner/ads-banner3.png")} style={styles.banner} />
          </ScrollView>

          <View style={styles.BgColor}>
            {/* Tips Section */}
            <View style={styles.sectionTitleTip}>
              <Text style={styles.sectionTitleTipText}>Tips ในการดูแลผ้า</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
                <Text style={styles.sectionTitleTipText2}>ดูทั้งหมด</Text>
              </TouchableOpacity>
            </View>
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

            <View style={styles.sectionTitleTip}>
              <Text style={styles.sectionTitleTipText}>Tips ในการดูแลผ้า</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
                <Text style={styles.sectionTitleTipText2}>ดูทั้งหมด</Text>
              </TouchableOpacity>
            </View>
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


          </View>




        </ScrollView>
      </SafeAreaView>
    </ImageBackground>


  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#3180E1', 
  },
  scrollContainer: {
    paddingBottom: 20,
    //backgroundColor: "blue",
  },

  // Greeting Section
  sectionGeeting: {
    fontSize: 20,
    marginTop: 15,
    marginRight: 15,
    fontFamily: 'Kanit-Regular',
    textAlign: 'right', // เพิ่มบรรทัดนี้เพื่อให้ข้อความชิดขวา
    color: "#1a2e51",
  },

  // Weather Section
  weatherCard: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "white", // เพิ่มสีพื้นหลังให้ชัดเจนขึ้น
    shadowColor: "#000", // สีเงา
    shadowOffset: { width: 2, height: 2 }, // ทิศทางเงา
    shadowOpacity: 0.3, // ความเข้มของเงา
    shadowRadius: 4, // ความฟุ้งของเงา
    elevation: 5, // เงาสำหรับ Android
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
    color: "#3180e1",
    paddingLeft: 10,
  },
  weatherContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherIcon: {
    marginRight: 15,
  },
  weatherText: {
    flex: 1,
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    // marginVertical: 5,
    //fontFamily: 'Kanit-Bold',
    fontFamily: 'Kanit-Regular',
    color: "#3180e1"
  },
  weatherDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 13,
    fontFamily: 'Kanit-Regular',
    color: "gray",
  },
  statusButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  statusText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Kanit-Regular',
  },

  // Banner Section
  bannerContainer: {
    marginTop: 20,
    marginBottom: 10,

  },
  banner: {
    width: 300,
    height: 150,
    marginLeft: 15,
    borderRadius: 10,
  },

  BgColor: {
    backgroundColor: "white",
    paddingBottom: 80,
  },

  // Tips Section
  sectionTitleTip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',  // ทำให้ข้อความแนวตั้งตรงกัน
  },

  sectionTitleTipText: {
    fontSize: 20,
    margin: 15,
    fontFamily: 'Kanit-Regular',
    color: "#1a2e51",
  },
  sectionTitleTipText2: {
    fontSize: 14,
    margin: 15,
    fontFamily: 'Kanit-Regular',
    color: '#787878',
  },

  tipCard: {
    width: 180,
    marginLeft: 15,
    backgroundColor: "#f5f3f2",
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  tipDesc: {
    fontSize: 12,
    color: '#787878',
    fontFamily: 'Kanit-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Home;