import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Create refs for both TextInput fields
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

  const handleLogin = () => {
    // Check if email or password is empty
    // if (!email || !password) {
    //   Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", "อีเมลและรหัสผ่านจำเป็นต้องกรอก");
    //   return;
    // }

    // // Check if email ends with @gmail.com
    // if (!email.includes("@gmail.com")) {
    //   Alert.alert("อีเมลไม่ถูกต้อง");
    //   return;
    // }

    // Proceed with navigation if both fields are filled
    navigation.navigate("AppNavigator");
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
          <Text style={styles.title}>เข้าสู่ระบบ</Text>
          <Text style={styles.defaultText}>
            ในการเริ่มต้นกรุณาเข้าสู่ระบบหรือสร้างบัญชีผู้ใช้งานด้วยบัญชีอีเมลของคุณ
          </Text>

          {/* start keyboardavoingveiw */}
          {/* Form */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.defaultText}>อีเมล</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกอีเมล"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              ref={emailRef}
              returnKeyType="next" // Sets the "next" button on the keyboard
              onSubmitEditing={() => passwordRef.current.focus()} // Focus the password field when "next" is pressed
            />
            <Text style={styles.defaultText}>รหัสผ่าน</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              ref={passwordRef}
              returnKeyType="done" // Sets the "done" button on the keyboard
              onSubmitEditing={handleLogin} // Triggers the login when "done" is pressed
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={30} color='grey' />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 50, marginBottom: 30 }}
          >
            <ButtonCustom
              lable="เข้าสู่ระบบ"
              color="#3180E1"
              colorText="#fff"
              onPress={handleLogin} // Use handleLogin instead of direct navigation
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'Kanit-Regular' }}>ยังไม่ได้เป็นสมาชิก? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.linkText, { marginLeft: 5, fontFamily: 'Kanit-Regular' }]}>สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
