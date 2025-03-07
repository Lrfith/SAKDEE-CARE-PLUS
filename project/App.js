import React, { useState, useEffect } from 'react';  // นำเข้า useState และ useEffect
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';  // นำเข้า Font.loadAsync
import { StatusBar } from 'expo-status-bar';
import Styles from './src/styles/Styles';  // นำเข้า Styles

// ฟังก์ชันโหลดฟอนต์
const loadFonts = () => {
  return Font.loadAsync({
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-Bold.ttf'),
    // เพิ่มฟอนต์อื่นๆ ตามที่ต้องการ
  });
};

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontLoaded(true));
  }, []);

  // รอจนกว่าฟอนต์จะโหลดเสร็จ
  if (!isFontLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={Styles.defaultText}>Hello, First Project!</Text>
      <Text style={Styles.title}>This is a title with Kanit-Bold font.</Text>
      <Text style={Styles.defaultText}>สวัสดีจร้า</Text>
      <Text>This is a title with Kanit-Bold font.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
