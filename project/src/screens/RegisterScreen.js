import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Refs for each input field
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle the register logic
  const handleRegister = () => {
    // Check if any field is empty
    if (!userName || !email || !password) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", "ชื่อผู้ใช้, อีเมล, และรหัสผ่านจำเป็นต้องกรอก");
      return;
    }

    // Check if email ends with @gmail.com
    if (!email.includes("@gmail.com")) {
      Alert.alert("อีเมลไม่ถูกต้อง");
      return;
    }

    // Proceed with navigation to the next screen
    navigation.navigate("Verification");
  };

  return (
    <View style={styles.container}>
      {/* Linear Gradient Background */}
      <LinearGradient colors={["#68B9F2", "#3180E1"]} style={{ flex: 1 }}>
        <View style={styles.screenContainer}>
          <Image
            source={require("../../assets/image/IconSymbols.png")} // Update the path to point to your image
            style={{ width: 140, height: 160, marginTop: 30 }} // You can adjust the size as needed
          />
        </View>

        {/* Animated Card */}
        <Animated.View
          style={[styles.card, { height: 600 }, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.title}>สมัครสมาชิก</Text>
          <Text style={styles.defaultText}>
            ในการเริ่มต้นกรุณาเข้าสู่ระบบหรือสร้างบัญชีผู้ใช้งานด้วยบัญชีอีเมลของคุณ
          </Text>
          {/* Form */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.defaultText}>ชื่อผู้ใช้</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกชื่อผู้ใช้"
              value={userName}
              onChangeText={setUserName}
              keyboardType="default"
              returnKeyType="next" // Show "next" button on keyboard
              onSubmitEditing={() => emailRef.current.focus()} // Focus email field when "next" is pressed
            />
            <Text style={styles.defaultText}>อีเมล</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกอีเมล"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              ref={emailRef}
              returnKeyType="next" // Show "next" button on keyboard
              onSubmitEditing={() => passwordRef.current.focus()} // Focus password field when "next" is pressed
            />
            <Text style={styles.defaultText}>รหัสผ่าน</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              ref={passwordRef}
              returnKeyType="done" // Show "done" button on keyboard
              onSubmitEditing={handleRegister} // Trigger the register function when "done" is pressed
            />
            <TouchableOpacity style={[styles.eyeIcon, { top: '79%' }]} onPress={togglePasswordVisibility}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={30} color='grey' />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
            <ButtonCustom
              lable="สมัครสมาชิก"
              color="#3180E1"
              colorText="#fff"
              onPress={handleRegister} // Use handleRegister instead of direct navigation
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'Kanit-Regular' }}>หากเป็นสมาชิกแล้ว </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.linkText, { marginLeft: 5, fontFamily: 'Kanit-Regular' }]}>
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default RegisterScreen;
