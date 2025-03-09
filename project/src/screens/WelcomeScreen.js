import React, { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/app.styles';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';  // ✅ Import useNavigation

const WelcomeScreen = () => {
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
          <Text style={styles.title}>SAKDEE CARE+</Text>
        </View>

        {/* Animated Card */}
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>ยินดีต้อนรับ</Text>
          <Text style={styles.defaultText}>
            ยินดีต้อนรับสู่ SAKDEE CARE+ ในการเริ่มต้น กรุณาเข้าสู่ระบบหรือสร้างบัญชีผู้ใช้งานด้วยบัญชีอีเมลของคุณ
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 50 }}>
            <ButtonCustom 
              lable='เข้าสู่ระบบ' 
              color='#3180E1' 
              colorText='#fff' 
              onPress={() => navigation.navigate('Login')}  // ✅ ใช้ navigation.navigate()
            />
            <ButtonCustom 
              lable='สมัครสมาชิก' 
              color='#fff' 
              colorText='#3180E1' 
              border='#3180E1' 
              // onPress={() => navigation.navigate('Register')}  // ✅ นำทางไปหน้าสมัครสมาชิก
              onPress={() => console.log('CLICK GOTO REGISTER')}  // ✅ นำทางไปหน้าสมัครสมาชิก
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;
