import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    color: '#000',
    textAlign: 'center', // ทำให้ข้อความอยู่ตรงกลาง
  },
  title: {
    fontFamily: 'Kanit-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 10, // เพิ่มระยะห่างด้านล่าง
  },
  screenContainer: {
    alignSelf: 'center',
    top: 10
  },
});
