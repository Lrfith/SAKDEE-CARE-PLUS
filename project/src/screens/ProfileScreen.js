import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../components/firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const menuItems = [
  { title: "ค้นหาสาขา", route: "Store" },
  { title: "สัญลักษณ์บนป้ายผ้า", route: "Symbols" },
  { title: "แจ้งเตือน", route: "Notifications" },
  { title: "แจ้งปัญหา", route: "ReportIssue" }
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

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Displaying the Profile Image without TouchableOpacity */}
      <Image
        source={imageUri ? { uri: imageUri } : require('../../assets/icon.png')}
        style={styles.profileImage}
      />

      <Text style={styles.userName}>Name: {user?.userName}</Text>
      <Text style={styles.userEmail}>Email: {user?.email}</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate("AppNavigator", { screen: item.route })}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={[styles.menuText, { color: "red" }]}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontFamily: "Kanit-Regular"
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
  }
});

export default ProfileMenu;
