import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ตรวจสอบว่าอีเมลได้รับการยืนยันแล้ว
      if (!user.emailVerified) {
        Alert.alert("ข้อผิดพลาด", "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
        return;
      }

      // Alert.alert("เข้าสู่ระบบสำเร็จ", `ยินดีต้อนรับ ${user.displayName}`);
      Alert.alert("เข้าสู่ระบบสำเร็จ", `ยินดีต้อนรับ ${user.email}`);
      navigation.navigate("AppNavigator"); // เปลี่ยนไปหน้าแอปหลัก
    } catch (error) {
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", "\nอีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง\n" + error.message );
    }
  };


  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient colors={["#68B9F2", "#3180E1"]} style={{ flex: 1 }}>
          <View style={styles.screenContainer}>
            <Image source={require("../../assets/image/IconSymbols.png")} style={{ width: 140, height: 160, marginTop: 30 }} />
          </View>

          <Animated.View style={[styles.card, { height: 600 }, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.title}>เข้าสู่ระบบ</Text>
            <Text style={styles.defaultText}>กรุณาเข้าสู่ระบบด้วยอีเมลของคุณ</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.defaultText}>อีเมล</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกอีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.defaultText}>รหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={30} color='grey' />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
              <ButtonCustom lable="เข้าสู่ระบบ" color="#3180E1" colorText="#fff" onPress={handleLogin} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontFamily: 'Kanit-Regular' }}>ยังไม่ได้เป็นสมาชิก? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.linkText, { marginLeft: 5, fontFamily: 'Kanit-Regular' }]}>สมัครสมาชิก</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
