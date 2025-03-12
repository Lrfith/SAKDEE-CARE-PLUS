import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const tips = [
    {
      id: "1",
      title: "5 เคล็ดลับซักผ้าให้สะอาด",
      image: "https://example.com/tip1.png",
    },
    {
      id: "2",
      title: "4 วิธีตากผ้าในวันที่ไม่มีแดด",
      image: "https://example.com/tip2.png",
    },
    {
      id: "3",
      title: "ซักผ้าให้หอมติดทนนาน",
      image: "https://example.com/tip3.png",
    },
  ];
  

const TipsSection = ({ tips }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Tips ในการดูแลผ้า</Text>
      <FlatList
        horizontal
        data={tips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tipCard}>
            <Image source={{ uri: item.image }} style={styles.tipImage} />
            <Text>{item.title}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", margin: 10 },
  tipCard: { width: 200, margin: 10, backgroundColor: "white", padding: 10, borderRadius: 10 },
  tipImage: { width: "100%", height: 120, borderRadius: 10 },
});

export default TipsSection;

