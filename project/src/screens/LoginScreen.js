import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Alert, Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Backend
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert("ข้อผิดพลาด", "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
        return;
      }
      Alert.alert("เข้าสู่ระบบสำเร็จ", `ยินดีต้อนรับ ${user.email}`);
      navigation.replace("AppNavigator"); // เปลี่ยนไปหน้าแอปหลัก
    } catch (error) {
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", `อีเมลหรือรหัสผ่านไม่ถูกต้อง\n${error.message}`);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={20} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <LinearGradient colors={["#68B9F2", "#3180E1"]} style={{ flex: 1 }}>
          <View style={styles.screenContainer}>
            <Image
              source={require("../../assets/image/IconSymbols.png")}
              style={{ width: 140, height: 160, marginTop: 30 }}
            />
          </View>

          {/* Animated Login Card */}
          <Animated.View style={[styles.card, { height: 600, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.title}>เข้าสู่ระบบ</Text>
            <Text style={styles.defaultText}>
              ในการเริ่มต้นกรุณาเข้าสู่ระบบหรือสร้างบัญชีผู้ใช้งานด้วยบัญชีอีเมลของคุณ
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.defaultText}>อีเมล</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกอีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Text style={styles.defaultText}>รหัสผ่าน</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="กรอกรหัสผ่าน"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  returnKeyType="done"
                  ref={passwordRef}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={28} color="grey" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("ForgotPassword")}>
                <Text style={[styles.defaultText, { color: 'grey' }]}>ลืมรหัสผ่าน?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
              <ButtonCustom lable="เข้าสู่ระบบ" color="#3180E1" colorText="#fff" onPress={handleLogin} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.defaultText}>ยังไม่ได้เป็นสมาชิก? </Text>
              <TouchableOpacity onPress={() => navigation.replace("Register")}>
                <Text style={[styles.defaultText, { color: '#3180E1', marginLeft: 5, textDecorationLine: 'underline' }]}>สมัครสมาชิก</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;