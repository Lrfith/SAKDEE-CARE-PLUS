import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";

const BannerSection = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
      <Image source={{ uri: "https://example.com/banner1.png" }} style={styles.banner} />
      <Image source={{ uri: "https://example.com/banner2.png" }} style={styles.banner} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: { marginVertical: 10 },
  banner: { width: 300, height: 150, marginHorizontal: 5, borderRadius: 10 },
});

export default BannerSection;
