import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Platform } from "react-native";
import { Animated } from "react-native";
import { styles } from "../styles/app.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () => {
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleForgotPassword = () => {
        navigation.navigate("Login");
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={20} // Adjusts scrolling to keep the password field visible
        >
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
                                ref={emailRef}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current.focus()}
                            />


                            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <ButtonCustom lable="ส่งรหัสไปยังอีเมล" color="#3180E1" colorText="#fff" onPress={handleForgotPassword} />
                            </View>

                        </View>
                    </Animated.View>
                </LinearGradient>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
