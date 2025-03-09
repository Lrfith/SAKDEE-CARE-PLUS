import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import { styles } from '../styles/app.styles';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonCustom from '../components/ButtonCustom';

const LoginScreen = ({ navigation }) => { // รับ navigation จาก props
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#68B9F2', '#3180E1']} style={{ flex: 1 }}>
          <View style={styles.screenContainer}>
            <Text style={styles.title}>SAKDEE CARE+</Text>
          </View>

          <Animated.View style={[styles.card, { height: 600 }, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.title}>เข้าสู่ระบบ</Text>
            <Text style={styles.defaultText}>
              ยินดีต้อนรับสู่ SAKDEE CARE+ กรุณาเข้าสู่ระบบ
            </Text>

            <View style={{ marginTop: 20 }}>
              <TextInput
                style={styles.input}
                placeholder="กรอกอีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 50 }}>
              <ButtonCustom 
                lable='เข้าสู่ระบบ' 
                color='#3180E1' 
                colorText='#fff' 
                onPress={() => navigation.navigate('AppNavigator')} // ใช้ navigation จาก props
              />
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    );
};

export default LoginScreen;
