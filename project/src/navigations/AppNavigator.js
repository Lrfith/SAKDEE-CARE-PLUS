import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import HomeScreen from "../screens/HomeScreen";
import SymbolsScreen from "../screens/SymbolsScreen";
import CameraScreen from "../screens/CameraScreen";
import StoreScreen from "../screens/StoreScreen";
import TipsScreen from "../screens/TipsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          height: 100,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff', // โปร่งใส 50%
          height: 80, // ความสูงของ Tab Bar
          shadowColor: '#000', // ใส่เงาของ Tab Bar
          shadowOpacity: 0.1, // ความโปร่งใสของเงา
          shadowRadius: 10, // ความเบลอของเงา
          shadowOffset: { width: 0, height: -4 }, // การตั้งค่าเงา
          elevation: 5, // สำหรับ Android เพื่อเพิ่มเงา
          position: 'absolute', // ทำให้ตำแหน่งของ tab bar อยู่ที่ด้านล่าง
          // left: 5,
          // right: 5,
          // bottom: 0
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: "home",
            Symbols: "shirt",
            Camera: "qr-code",
            Store: "storefront",
            Tips: "bulb",
          };
          return (
            <Ionicons
              name={
                focused ? icons[route.name] : `${icons[route.name]}-outline`
              }
              size={size || 24}
              color={color || "#000"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerTintColor: '#fff', headerLeft: () => (
          <Image
            source={require('../../assets/image/TopIcon.png')} // replace with your logo path
            style={{ width: '100%', height: 40, marginLeft: 10 }}
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={40} color='#6c757d' style={{ marginRight: 15, marginTop: 2 }} />
          </TouchableOpacity>
        ),
      }}
      />
      <Tab.Screen name="Symbols" component={SymbolsScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Store" component={StoreScreen} options={{
        headerTintColor: '#fff', headerLeft: () => (
          <Image
            source={require('../../assets/image/TopIcon.png')} // replace with your logo path
            style={{ width: '100%', height: 40, marginLeft: 10 }}
          />
        ),
        headerRight: () => (
          <Text style={{ marginRight: 15, fontSize: 16, color: 'black', fontFamily: 'Kanit-Regular', }}>ค้นหาสาขา</Text>
        ),
      }} />
      <Tab.Screen name="Tips" component={TipsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
