import { Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from '../styles/app.styles'
import { LinearGradient } from 'expo-linear-gradient'; // why lineargradient in side {}
import ButtonCustom from '../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 750,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#68B9F2', '#3180E1']} style={{ flex: 1}}>
        <View style={styles.screenContainer}>
          <Image
            source={require('../../assets/image/IconSymbols.png')}
            style={{ width: 300, height: 350, marginTop: 100}}
          />
          
          {/* Animated Card */}
          <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim}] }] }>
            <Text style={styles.title}>ยินดีต้อนรับ</Text>
            <Text style={styles.defaultText}>
              ในการเริ่มต้นกรุณาเข้าสู่ระบบหรือสร้างบัญชีผู้ใช้งานด้วยบัญชีอีเมลของคุณ
            </Text>

            {/* Button Selection */}
            <View style={{ flexDirection: 'row', marginTop: 50}}>
              <ButtonCustom
                lable='เข้าสู่ระบบ'
                color='#3180E1'
                colorText='#fff'
                onPress={() => navigation.replace('Login')} 
              />
              <ButtonCustom
                lable='สมัครสมาชิก'
                color='#fff'
                colorText='#3180E1'
                border='#3180E1'
                onPress={() => navigation.replace('Register')} 
              />
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default WelcomeScreen