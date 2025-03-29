import React from "react";
import { ActivityIndicator, View, TouchableOpacity, Text } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./src/styles/app.styles";

// Import Screen Components
import { WelcomeScreen, LoginScreen, RegisterScreen, VerificationScreen, ForgotPassword, ProfileScreen, GalleryScreen, ChatScreen, DisplaySymbols, TipsScreen,TipDetailScreen } from "./src/screens";

import { AppNavigator, CustomerNavigator } from "./src/navigations";

import CustomDrawer from "./src/screens/ProfileScreen";

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
          gestureEnabled: false, // DONT FORGET TO CHANGE TO 'FALSE'
        }}
      >
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} /> */}
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="TipDetail" component={TipDetailScreen} />

        {/* Profile Screen Setting */}
        <Stack.Screen name="Profile" component={ProfileScreen}
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
                <Text />
              </View>
            ),
          })}
        />
        {/* Main App Screens */}
        <Stack.Screen name="TipsScreen" component={TipsScreen} />

        <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
        <Stack.Screen name="Gallery" component={GalleryScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Kanit-Regular',  // เปลี่ยนฟอนต์ของชื่อ header
              fontSize: 20,  // สามารถปรับขนาดฟอนต์ได้
            },
            headerStyle: {
              height: 100, // เพิ่มความสูงของ header
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={()=> console.log("add image.")}>
                <Ionicons name="add" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
