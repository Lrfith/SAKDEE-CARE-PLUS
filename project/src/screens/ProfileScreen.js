import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation



const UserName = "Nuttamon";




const menuItems = [
  { title: "ค้นหาสาขา", route: "Tips" },
  { title: "สัญลักษณ์บนป้ายผ้า", route: "FabricSymbols" },
  { title: "แจ้งเตือน", route: "Notifications" },
  { title: "แจ้งปัญหา", route: "ReportIssue" },
  { title: "ออกจากระบบ", route: "Logout" }
];

const ProfileMenu = () => {
  
    const navigation = useNavigation(); // ใช้ useNavigation ภายใน component

    const handleTabNavigation = (route) => {
      // ใช้ jumpTo สำหรับเปลี่ยนไปที่ Tab Screen ที่ต้องการ
      navigation.jumpTo(route);
    };
    
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center" }}>
      {/* รูปโปรไฟล์ */}
      <Image
        source={require('../../assets/profile-icon.png')}
        style={{ width: 120, height: 120, borderRadius: 100, }}
      />

      {/* ชื่อและอีเมล */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, fontFamily: "Kanit-Regular" }}>{UserName}</Text>
      <Text style={{ fontSize: 14, color: "gray", fontFamily: "Kanit-Regular" }}>{UserName}@spumail.net</Text>

    
    {/* รายการเมนู */ }
    {menuItems.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{
          paddingVertical: 15,
          borderBottomWidth: 0,
          borderBottomColor: "#eee",
          
        }}
        // onPress={() => navigation.navigate(item.route)}
        onPress={() => handleTabNavigation(item.route)}
      >
        <Text style={{
          fontSize: 16,
          fontFamily: "Kanit-Regular",
          color: "#333",

        }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
  );
};

export default ProfileMenu;
