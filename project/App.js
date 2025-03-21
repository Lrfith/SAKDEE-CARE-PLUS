import React from "react";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./src/styles/app.styles";

import LoginScreen from "./src/screens/LoginScreen";
import AppNavigator from "./src/navigations/AppNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ForgotPassword from "./src/screens/ForgotPassword";

import ChatScreen from "./src/screens/ChatScreen";
import CustomDrawer from "./src/screens/ProfileScreen";


const Stack = createNativeStackNavigator();



const App = () => {
  const [fontsLoaded] = useFonts({
    "Kanit-Regular": require("./assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
    "Kanit-Thin":  require("./assets/fonts/Kanit-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // DONT FORGET TO CHANGE TO 'FALSE'
          gestureEnabled: true,
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Kanit-Regular',  // เปลี่ยนฟอนต์ของชื่อ header
              fontSize: 20,  // สามารถปรับขนาดฟอนต์ได้
            },
            headerStyle: {
              backgroundColor: '#C2E3FB',
              height: 100, // เพิ่มความสูงของ header
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="ChatBoard"
          component={ChatScreen} // ชื่อที่ใช้ต้องตรงกับ import
          
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Kanit-Regular',  // เปลี่ยนฟอนต์ของชื่อ header
              fontSize: 20,  // สามารถปรับขนาดฟอนต์ได้
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />




        {/* Main App Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
