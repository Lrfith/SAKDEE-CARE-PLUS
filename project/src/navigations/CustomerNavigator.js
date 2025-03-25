import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform, ActionSheetIOS } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; // Corrected import
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigScreen from "../screens/ConfigScreen";
import ControlScreen from "../screens/ControlScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const CustomerNavigator = () => {
  const navigation = useNavigation();

  const openMenu = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Switch Account"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            navigation.replace("AppNavigator");
          }
        }
      );
    } else {
      Alert.alert("Switch Account", "Do you want to switch accounts?", [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => console.log("Switch Account selected") },
      ]);
    }
};

  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
    }}>
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          headerTitle: 'HOME STORE',
          headerStyle: {
            height: 100,
          },
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="ellipsis-horizontal" size={30} color="color" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="Control" component={ControlScreen} options={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => {
            Alert.alert(
              "Warning!",
              "This action will turn off all switches! Are you sure you want to proceed?",
              [
                {
                  text: "OK",
                  onPress: () => navigation.goBack()
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log("Canceled"),
                  styles: 'cancle'
                },
              ]
            )
          }}>
            <Ionicons name="chevron-back-outline" size={30} color="color" />
          </TouchableOpacity>
        )
      })} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
