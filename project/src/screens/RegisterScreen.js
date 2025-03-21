import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../components/firebaseConfig"; // ตรวจสอบว่ามีไฟล์ firebase.js ที่ตั้งค่า Firebase ไว้
import { setDoc, doc } from "firebase/firestore";


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
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", "ชื่อผู้ใช้, อีเมล, และรหัสผ่านจำเป็นต้องกรอก");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("อีเมลไม่ถูกต้อง", "กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ส่งอีเมลยืนยัน
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        userName: userName,
        email: email,
        password: password,
        createdAt: new Date(),
        verified: false, // เก็บสถานะว่าอีเมลยังไม่ได้ยืนยัน
      });

      Alert.alert("สมัครสมาชิกสำเร็จ", "กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("เกิดข้อผิดพลาด", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={20}>
      <View style={styles.container}>
        <LinearGradient colors={["#68B9F2", "#3180E1"]} style={{ flex: 1 }}>
          <View style={styles.screenContainer}>
            <Image
              source={require("../../assets/image/IconSymbols.png")}
              style={{ width: 140, height: 160, marginTop: 30 }}
            />
          </View>

          {/* Animated Card */}
          <Animated.View style={[styles.card, { height: 600, transform: [{ translateY: slideAnim }] }]}>
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
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
              />

              <Text style={styles.defaultText}>อีเมล</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกอีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />

              <Text style={styles.defaultText}>รหัสผ่าน</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="กรอกรหัสผ่าน"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  ref={passwordRef}
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={25} color="grey" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
              <ButtonCustom
                lable="สมัครสมาชิก"
                color="#3180E1"
                colorText="#fff"
                onPress={handleRegister} 
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontFamily: 'Kanit-Regular' }}>หากเป็นสมาชิกแล้ว </Text>
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text style={[styles.linkText, { marginLeft: 5, fontFamily: 'Kanit-Regular' }]}>
                  เข้าสู่ระบบ
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
