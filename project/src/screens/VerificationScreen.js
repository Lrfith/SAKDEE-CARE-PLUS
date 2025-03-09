import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/app.styles';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';  // ✅ Import useNavigation

const VerificationScreen = () => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const navigation = useNavigation();  // ✅ ใช้ navigation object

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Linear Gradient Background */}
      <LinearGradient colors={['#68B9F2', '#3180E1']} style={{ flex: 1 }}>
        <View style={styles.screenContainer}>
          <Image
            source={require('../../assets/image/IconSymbols.png')}  // Update the path to point to your image
            style={{ width: 140, height: 160, marginTop: 30 }}  // You can adjust the size as needed
          />
        </View>

        {/* Animated Card */}
        <Animated.View style={[
          styles.card,
          { height: 600 },
          { transform: [{ translateY: slideAnim }] },
        ]}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.defaultText}>
            กรอกรหัสที่ส่งไปที่อีเมลของคุณ
          </Text>
          <TextInput
          keyboardType="numeric"
          />

          <View style={{ flexDirection: 'row', marginTop: 50, marginBottom: 30 }}>
            <ButtonCustom
              lable='Vertify'
              color='#3180E1'
              colorText='#fff'
              border='#3180E1'
              onPress={() => navigation.navigate("AppNavigator")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>คุณยังไม่ได้รับรหัสใช่หรื่อไม่ </Text>
            <TouchableOpacity onPress={() => console.log('Send OTP again.')}>
              <Text style={[styles.linkText, { marginLeft: 5 }]}>
                ส่งรหัสอีกครั้ง
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default VerificationScreen
