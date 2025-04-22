import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../components/firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking } from "react-native";


const menuItems = [
  { title: "ค้นหาสาขา", route: "Store" },
  { title: "สัญลักษณ์บนป้ายผ้า", route: "Symbols" },
  // { title: "สำหรับผู้ดูแลร้านค้า", route: "CustomerNavigator"}
];

const ProfileMenu = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
          setImageUri(userSnap.data()?.profileImage || null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login"); // Redirect to Login after logout
    } catch (error) {
      Alert.alert("ข้อผิดพลาด", "ออกจากระบบไม่สำเร็จ");
    }
  };

  const handleLanguageChange = (language) => {
    // ใส่โค้ดที่เกี่ยวข้องกับการเปลี่ยนภาษาที่นี่
    console.log(`Language changed to: ${language}`);
  };

  const showLanguageAlert = () => {
    Alert.alert(
      "เลือกภาษา",
      "เลือกภาษา",
      "กรุณาเลือกภาษาที่ต้องการ",
      [
        { text: "ไทย", onPress: () => handleLanguageChange('th') },
        { text: "English", onPress: () => handleLanguageChange('en') },
        { text: "ยกเลิก", style: "cancel" },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/image/ProfilePageBackground.png')} // เปลี่ยนเป็น path ของรูปที่ต้องการใช้
      style={styles.background} // ใช้ styles
      resizeMode="cover" // ปรับขนาดรูปให้เต็มจอ
    >
      <View style={styles.container}>
        {/* Displaying the Profile Image without TouchableOpacity */}
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/image/profile.png')}
          style={styles.profileImage}
        />

        <Text style={styles.userName}>{user?.userName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate("AppNavigator", { screen: item.route })}
          >
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
        {/* Customer */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.replace("CustomerNavigator")}>
          <Text style={[styles.menuText]}>สำหรับผู้ดูแลร้านค้า</Text>
        </TouchableOpacity>

        {/* AboutUs Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Linking.openURL("https://northsnx.github.io/SAKDEE.App/")}
        >
          <Text style={[styles.menuText,]}>เกี่ยวกับเรา</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.replace("Gallery")}>
          <Text style={[styles.menuText]}>Gallery</Text>
        </TouchableOpacity> */}

        {/* Logout Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={[styles.menuText, { color: "red" }]}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.translateBTN} onPress={showLanguageAlert}>
        <Ionicons name="language-outline" size={50} color="white" />
      </TouchableOpacity>



    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Kanit-Regular"
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Kanit-Regular",
    paddingBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 0,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 18,
    fontFamily: "Kanit-Regular",
    color: "#333"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    flex: 1,
  },

  translateBTN: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#3180E1',
    padding: 12,
    borderRadius: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default ProfileMenu;