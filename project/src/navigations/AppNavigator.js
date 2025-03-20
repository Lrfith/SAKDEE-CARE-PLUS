import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../styles/app.styles'; // Import styles

// Stack Screen
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
        headerLeft: () => (
          <Image
            source={require('../../assets/image/TopIcon.png')} // replace with your logo path
            style={{ width: '100%', height: 50, marginLeft: 10, }}
          />
        ),
        headerTitle: '', // เอาชื่อออก
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 100,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -4 },
          elevation: 5,
          position: 'absolute',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 20,
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

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#459bec',
            height: 100, // เพิ่มความสูงของ header
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

              <TouchableOpacity onPress={() => navigation.navigate('ChatBoard')}>
                <Ionicons name="chatbubbles-outline" size={32} color="white" paddingRight={20} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 20 }}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />


      <Tab.Screen name="Symbols" component={SymbolsScreen} options={{
        headerRight: () => (
          <Text style={styles.headerRightText}>สัญลักษณ์ผ้าบอกอะไร</Text>),
      }} />

      <Tab.Screen name="Camera" component={CameraScreen} options={{
        headerRight: () => (
          <Text style={styles.headerRightText}>สแกนชำระเงิน</Text>),
      }} />

      <Tab.Screen name="Store" component={StoreScreen} options={{
        headerRight: () => (
          <Text style={styles.headerRightText}>ค้นหาสาขา</Text>),
      }} />

      <Tab.Screen name="Tips" component={TipsScreen} options={{
        headerRight: () => (
          <Text style={styles.headerRightText}>Tips</Text>),
      }} />

      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarButton: () => null }}/> */}

    </Tab.Navigator>
  );
};

export default AppNavigator;