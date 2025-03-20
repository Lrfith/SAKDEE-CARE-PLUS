import React from "react";
import { ActivityIndicator, View, TouchableOpacity, Text } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./src/styles/app.styles";

// Import Screen Components
import LoginScreen from "./src/screens/LoginScreen";
import AppNavigator from "./src/navigations/AppNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import ChatScreen from "./src/screens/ChatScreen";
import CustomDrawer from "./src/screens/ProfileScreen";
import DisplaySymbols from "./src/screens/DisplaySymbols";

const Stack = createNativeStackNavigator();

const App = () => {
  
  // Load Fonts
  const [fontsLoaded] = useFonts({
    "Kanit-Regular": require("./assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
    "Kanit-Thifn": require("./assets/fonts/Kanit-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // DONT FORGET TO CHANGE TO 'FALSE'
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        
        {/* Profile Screen Setting */}
        <Stack.Screen name="Profile" component={ProfileScreen}
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

        {/* ChatBoard Screen Setting */}
        <Stack.Screen name="ChatBoard" component={ChatScreen} // ชื่อที่ใช้ต้องตรงกับ import
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Kanit-Regular',  // เปลี่ยนฟอนต์ของชื่อ header
              fontSize: 20,  // สามารถปรับขนาดฟอนต์ได้
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        {/* DisplaySymbols Screen Setting */}
        <Stack.Screen name="DisplaySymbols" component={DisplaySymbols}
          options={() => ({
            headerShown: true,
            headerTitle: 'สัญลักษณ์ผ้าบอกอะไร',
            headerTitleStyle: {
              fontFamily: 'Kanit-Regular',  // เปลี่ยนฟอนต์ของชื่อ header
              fontSize: 20,  // สามารถปรับขนาดฟอนต์ได้
            },
            headerLeft: () => (
              <View>
                <Text/>
              </View>
            ), 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
