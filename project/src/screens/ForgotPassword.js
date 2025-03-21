import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Platform } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../components/firebaseConfig"; // นำเข้า Firebase ที่ตั้งค่าไว้


const ForgotPassword = () => {
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [email, setEmail] = useState("");

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            alert("กรุณากรอกอีเมล");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว!");
            navigation.replace("Login"); // กลับไปหน้า Login หลังส่งอีเมล
        } catch (error) {
            alert("เกิดข้อผิดพลาด: " + error.message);
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={20}>
            <View style={styles.container}>
                <LinearGradient colors={["#68B9F2", "#3180E1"]} style={{ flex: 1 }}>
                    <View style={styles.screenContainer}>
                        <Image
                            source={require("../../assets/image/IconSymbols.png")}
                            style={{ width: 140, height: 160, marginTop: 130 }}
                        />
                    </View>

                    {/* Animated Login Card */}
                    <Animated.View style={[styles.card, { height: 400, transform: [{ translateY: slideAnim }] }]}>
                        <Text style={styles.title}>ลืมรหัสผ่าน</Text>
                        <Text style={styles.defaultText}>
                            กรุณาใช้บัญชีอีเมลของคุณเพื่อกู้คืนรหัสผ่าน
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
                                onSubmitEditing={handleForgotPassword}
                            />


                            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <ButtonCustom lable="ส่งรหัสไปยังอีเมล" color="#3180E1" colorText="#fff" onPress={handleForgotPassword} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                                <Text style={[{ fontFamily: "Kanit-Regular", color: 'grey', fontSize: 16 }]}>กลับ</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </LinearGradient>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;