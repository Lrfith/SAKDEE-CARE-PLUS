import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';  // ใช้ useFonts จาก expo-font
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/app.styles';  // ตรวจสอบเส้นทางไฟล์ styles ให้ถูกต้อง
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-Bold.ttf'),
  });

  // ถ้ายังโหลดฟอนต์ไม่เสร็จ ให้แสดง ActivityIndicator
  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    //   <Text style={styles.defaultText}>Hello, First Project!</Text>
    //   <Text style={styles.title}>This is a title with Kanit-Bold font.</Text>
    //   <Text style={styles.defaultText}>สวัสดีจร้า</Text>
    //   <Text>This is a title with Kanit-Bold font.</Text>
    //   <StatusBar style="auto" />
    // </View>

    <View style={styles.container}>
      <AppNavigator/>
    </View>
  );
}

export default App;
