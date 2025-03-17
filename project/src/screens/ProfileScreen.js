import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../components/firebaseConfig.js'; // นำเข้า storage จาก firebaseConfig
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const menuItems = [
  { title: "ค้นหาสาขา", route: "Store" },
  { title: "สัญลักษณ์บนป้ายผ้า", route: "Symbols" },
  { title: "แจ้งเตือน", route: "Notifications" },
  { title: "แจ้งปัญหา", route: "ReportIssue" },
  { title: "ออกจากระบบ", route: "Login" }
];

const ProfileMenu = () => {
  const navigation = useNavigation();

  const handleTabNavigation = (route) => {
    navigation.replace(route); // ใช้ replace แทน navigate
  };

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
          setImageUri(userSnap.data()?.profileImage);  // โหลด URL ของภาพโปรไฟล์
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const userId = auth.currentUser.uid;
    const storageRef = ref(storage, `profileImages/${userId}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error("Upload error: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updateUserProfileImage(downloadURL);
      }
    );
  };

  const updateUserProfileImage = async (url) => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      profileImage: url
    });
    setImageUri(url);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/icon.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.userName}>Name: {user?.userName}</Text>
      <Text style={styles.userEmail}>Email: {user?.email}</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleTabNavigation(item.route)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center"
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
    fontSize: 14,
    color: "gray",
    fontFamily: "Kanit-Regular"
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 0,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
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
