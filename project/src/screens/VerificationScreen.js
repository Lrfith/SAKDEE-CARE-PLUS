import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/app.styles';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native'; 
import { OtpInput } from 'react-native-otp-entry';

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
              <Text style={styles.title}>การยืนยัน OTP</Text>
              <Text style={[styles.defaultText, {marginBottom: 20}]}>
                กรอกรหัสที่ส่งไปที่อีเมลของคุณ
              </Text>

              {/* OTP Input */}
              <OtpInput
                ref={otpRef}
                numberOfDigits={6}
                onTextChange={(text) => {
                  console.log(text);
                  if (text.length === 6) {
                    otpRef.current?.focus();  // Keep input focused
                  }
                }}
                focusColor='#3180E1'
                theme={{
                  pinCodeContainerStyle: {
                    backgroundColor: '#fff',
                    width: 50,
                    height: 60,
                    borderRadius: 12,
                  },
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30
                }}
              >
                <Text style={{ fontSize: 16 }}>คุณยังไม่ได้รับรหัสใช่หรื่อไม่ </Text>
                <TouchableOpacity onPress={() => console.log('Send OTP again.')}>
                  <Text style={[styles.linkText, { marginLeft: 5 }]}>
                    ส่งรหัสอีกครั้ง
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 20}}>
                <ButtonCustom
                  lable='ยืนยัน'
                  color='#3180E1'
                  colorText='#fff'
                  border='#3180E1'
                  onPress={() => navigation.navigate("AppNavigator")}
                />
              </View>
            </Animated.View>
          </LinearGradient>
        </View>
      </ScrollView>
  );
};

export default VerificationScreen;
