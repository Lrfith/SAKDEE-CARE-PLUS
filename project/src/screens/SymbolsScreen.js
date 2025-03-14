import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import ButtonCustom from "../components/ButtonCustom";

const SymbolsScreen = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([1, 2, 3, 4, 5, 6]);
  const [selectedCategory, setSelectedCategory] = useState("1");
  const getSymbolStyle = (index) =>
    selectedSymbols.includes(index) ? styles.selectedSymbol : styles.symbol;

  const flatListRef = useRef(null);

  const categories = [
    { id: "1", title: "ทั้งหมด" },
    { id: "2", title: "การซัก" },
    { id: "3", title: "อุณหภูมิ" },
    { id: "4", title: "การซักแห้ง" },
    { id: "5", title: "การใช้สารฟอกขาว" },
    { id: "6", title: "การอบแห้ง" },
    { id: "7", title: "การตากผ้า" },
    { id: "8", title: "การรีด" },
  ];
  // Function to handle category selection
  const handleCategorySelect = (id, name) => {
    setSelectedCategory(id);
    console.log(`id: ${id}, name: ${name}, click: true`);
  };

  return (
    <View style={styles.container}>
      {/* Display Card */}
      <View style={styles.displayCard}>
        <View style={styles.symbolContainer}>
          <Image
            source={require("../../assets/laundry_symbols/question.png")}
            style={styles.symbol}
          />
        </View>
        <Text style={styles.instructionText}>
          กรุณาเลือกสัญลักษณ์เพื่อแสดงคำแนะนำ
        </Text>
      </View>
      {/* select category */}
      {/* category: all, 1, 2, 3, 4, 5, 6, 7 */}
      <View
        style={{
          //backgroundColor: "#fff",
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ButtonCustom
              lable={item.title}
              color={selectedCategory === item.id ? "#3180E1" : "#C0C0C0FF"}
              colorText={selectedCategory === item.id ? "#fff" : "grey"}
              onPress={() => handleCategorySelect(item.id, item.title)}
              style={styles.buttonCategory}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* All Symbols */}
      <View style={{ backgroundColor: "", flex: 1 }}>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การซัก
        </Text>
        <Image source={require("../../assets/laundry_symbols/question.png")}
            style={styles.symbol}/>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          อุณหภูมิ
        </Text>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การซักแห้ง
        </Text>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การใช้สารฟอกขาว
        </Text>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การอบแห้ง
        </Text>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การตากผ้า
        </Text>
        <Text style={{ fontSize: 24, margin: 10, fontFamily: "Kanit-Regular" }}>
          การรีด
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  displayCard: {
    flexDirection: "row", // ✅ Make text and image side by side
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  symbolContainer: {
    backgroundColor: "#C0C0C0FF",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  instructionText: {
    fontSize: 17,
    fontWeight: 500,
  },
  symbol: {
    width: 50,
    height: 50,
    tintColor: "#6c757d",
  },
  selectedSymbol: {
    width: 50,
    height: 50,
    tintColor: "#3180E1",
  },
  categoryItem: {
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  selectedCategory: {
    backgroundColor: "#3180E1", // Highlight selected category
  },
  categoryText: {
    color: "#3180E1",
    fontWeight: "bold",
  },
  buttonCategory: {
    alignItems: "center",
    borderRadius: 50,
    height: 35,
    borderWidth: 2,
    justifyContent: "center",
    width: 100,
  },
});

export default SymbolsScreen;
