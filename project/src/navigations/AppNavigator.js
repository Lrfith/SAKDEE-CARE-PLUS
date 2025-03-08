import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  // Import for bottom tabs
import { NavigationContainer } from '@react-navigation/native';  // Wrap everything with NavigationContainer
import { styles } from '../styles/app.styles';  // ตรวจสอบเส้นทางไฟล์ styles ให้ถูกต้อง
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons


// Import Screen ../src/screens/xxx.js
import HomeScreen from '../screens/HomeScreen'
import SymbolsScreen from '../screens/SymbolsScreen';
import CameraScreen from '../screens/CameraScreen';
import StoreScreen from '../screens/StoreScreen';
import TipsScreen from '../screens/TipsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor: '#fff',
            height: 80,
        },
        tabBarIcon: ({ color, size }) => {
            const icons = {
                Home: 'home',
                Symbols: 'shirt',
                Camera: 'qr-code',
                Store: 'storefront',
                Tips: 'bulb',
            };
            return <Ionicons name={`${icons[route.name]}-outline`} size={size} color={color} style={styles.screenContainer}/>;
        },
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Symbols" component={SymbolsScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Tips" component={TipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
