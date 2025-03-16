import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/app.styles';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = () => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const navigation = useNavigation();
  const otpRef = useRef(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Linear Gradient Background */}
        <LinearGradient colors={['#68B9F2', '#3180E1']} style={{ flex: 1 }}>
          <View style={styles.screenContainer}>
            <Image
              source={require('../../assets/image/IconSymbols.png')}
              style={{ width: 140, height: 160, marginTop: 30 }}
            />
          </View>

          {/* Animated Card */}
          <Animated.View style={[
            styles.card,
            { height: 600 },
            { transform: [{ translateY: slideAnim }] },
          ]}>
            <Text style={styles.title}>การยืนยัน</Text>
            <Text style={[styles.defaultText, { marginBottom: 20 }]}>
              กรุณาตรวจสอบอีเมลของท่านตามที่ระบุไว้{"\n"}เพื่อยืนยันการลงทะเบียน
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <ButtonCustom
                lable='กลับไปหน้าเข้าสู่ระบบ'
                color='#3180E1'
                colorText='#fff'
                border='#3180E1'
                onPress={() => navigation.navigate("Login")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <Text style={{ fontSize: 16 }}>คุณยังไม่ได้รับอีเมลใช่หรือไม่ </Text>
              <TouchableOpacity onPress={() => console.log('Send Verificate again.')}>
                <Text style={[styles.linkText, { marginLeft: 5 }]}>
                  ส่งอีเมลอีกครั้ง
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default VerificationScreen;
