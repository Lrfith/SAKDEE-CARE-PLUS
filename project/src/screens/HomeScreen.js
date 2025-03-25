import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Image, ScrollView, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { Card } from "@rneui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from '../components/firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { Animated, Easing } from "react-native";
import { tipsData, imageMap } from '../screens/TipsScreen'; // นำเข้าข้อมูลจาก TipsScreen.js


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "สวัสดีตอนเช้า";
  if (hour >= 12 && hour < 15) return "สวัสดีตอนเที่ยง";
  if (hour >= 15 && hour < 18) return "สวัสดีตอนบ่าย";
  if (hour >= 18 && hour < 22) return "สวัสดีตอนเย็น";
  return "สวัสดีตอนดึก";
};

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear": return "weather-sunny";
    case "clouds": return "weather-cloudy";
    case "rain": return "weather-rainy";
    case "snow": return "weather-snowy";
    default: return "weather-sunny";
  }
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -5, // ขยับขึ้น
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 5, // ขยับลง
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: "Bangkok,TH",
            appid: "c125eee6cba494a329341c56fcfbb227",
            units: "metric",
            lang: "th",
          },
        });

        const data = response.data;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const humidity = `${data.main.humidity}%`;
        const rainChance = data.pop ? `${(data.pop * 100).toFixed(0)}%` : "0%";
        const condition = data.weather[0].description;
        const icon = getWeatherIcon(data.weather[0].main);

        setWeatherData({
          location: "Bangkok",
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
    const rain = parseInt(weatherData.rainChance);
    const humidity = parseInt(weatherData.humidity);
    return rain < 30 && humidity < 70 ? "เหมาะสำหรับซักผ้า" : "ไม่เหมาะสำหรับซักผ้า";
  };

  const [tips, setTips] = useState([]);
  useEffect(() => {
    setTips(tipsData); // ตั้งค่าข้อมูล Tips ใน Home
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/image/HomeBackground.png')} // เปลี่ยนเป็น path ของรูปที่ต้องการใช้
      style={styles.background} // ใช้ styles
      resizeMode="cover" // ปรับขนาดรูปให้เต็มจอ
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* // Greeting Section */}
          <Text style={styles.sectionGeeting}>{getGreeting()}, {user?.userName}!</Text>
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
              <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
                <MaterialCommunityIcons name={weatherData.icon} size={85} color="orange" marginRight={15} />
              </Animated.View>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("TipDetail", {
                    id: item.id, // ส่ง id
                    title: item.title, // ส่ง title
                    description: item.description, // ส่ง description
                    image: item.image, // ส่ง image
                    details: JSON.stringify(item.details), // ส่ง details (แปลงเป็น JSON string ถ้าจำเป็น)
                  })}
                  style={styles.tipCard}
                >
                  <Image source={imageMap[item.image]} style={styles.tipImage} />
                  <Text style={styles.tipTitle} numberOfLines={1} ellipsizeMode="tail">
                    {item.title}
                  </Text>
                  <Text style={styles.tipDesc} numberOfLines={2} ellipsizeMode="tail">
                    {item.description}
                  </Text>
                </TouchableOpacity>
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