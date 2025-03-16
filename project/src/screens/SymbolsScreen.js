import { StyleSheet, View, Image, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import ButtonCustom from "../components/ButtonCustom";

const SymbolsScreen = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default to "ทั้งหมด"
  const flatListRef = useRef(null);

  // Laundry Categories
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

  // Symbols for each category
  const allSymbols = [
    {
      id: "2",
      title: "การซัก",
      symbols: [
        { id: "1", image: require("../../assets/laundry_symbols/Washing/hand-wash.png") },
        { id: "2", image: require("../../assets/laundry_symbols/Washing/hand-dry-wash.png") },
        { id: "3", image: require("../../assets/laundry_symbols/Washing/dry-wash.png") },
      ],
    },
    {
      id: "3",
      title: "อุณหภูมิ",
      symbols: [
        { id: "4", image: require("../../assets/laundry_symbols/Temperature/cold.png") },
        { id: "5", image: require("../../assets/laundry_symbols/Temperature/warm.png") },
        { id: "6", image: require("../../assets/laundry_symbols/Temperature/hot.png") },
        { id: "7", image: require("../../assets/laundry_symbols/Temperature/hot4.png") },
        { id: "8", image: require("../../assets/laundry_symbols/Temperature/hot5.png") },
        { id: "9", image: require("../../assets/laundry_symbols/Temperature/hot6.png") },
      ],
    },
    {
      id: "4",
      title: 'การซักแห้ง',
      symbols: [
        { id: "10", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-clean.png") },
        { id: "11", image: require("../../assets/laundry_symbols/Dry_Cleaning/do-not-dry.png") },
        { id: "12", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-non-chlorine.png") },
        { id: "13", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-hydrocarbon.png") },
        { id: "14", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-all.png") },
      ],
    },
    {
      id: "5",
      title: 'การใช้สารฟอกขาว',
      symbols: [
        { id: "15", image: require("../../assets/laundry_symbols/Bleaching/bleach.png") },
        { id: "16", image: require("../../assets/laundry_symbols/Bleaching/not-bleach.png") },
        { id: "17", image: require("../../assets/laundry_symbols/Bleaching/chlorine.png") },
        { id: "18", image: require("../../assets/laundry_symbols/Bleaching/non-chlorine.png") },
      ],
    },
    {
      id: "6",
      title: 'การอบแห้ง',
      symbols: [
        { id: "19", image: require("../../assets/laundry_symbols/Tumble_Drying/tumble-dry.png") },
        { id: "20", image: require("../../assets/laundry_symbols/Tumble_Drying/low.png") },
        { id: "21", image: require("../../assets/laundry_symbols/Tumble_Drying/medium.png") },
        { id: "22", image: require("../../assets/laundry_symbols/Tumble_Drying/high.png") },
        { id: "23", image: require("../../assets/laundry_symbols/Tumble_Drying/do-not-tumble-dry.png") },
      ],
    },
    {
      id: "7",
      title: 'การตากผ้า',
      symbols: [
        { id: "24", image: require("../../assets/laundry_symbols/Line_Drying/hang.png") },
        { id: "25", image: require("../../assets/laundry_symbols/Line_Drying/drip-dry.png") },
        { id: "26", image: require("../../assets/laundry_symbols/Line_Drying/dry.png") },
        { id: "27", image: require("../../assets/laundry_symbols/Line_Drying/shade.png") },
        { id: "28", image: require("../../assets/laundry_symbols/Line_Drying/wring.png") },
      ],
    },
    {
      id: "8",
      title: 'การรีด',
      symbols: [
        { id: "29", image: require("../../assets/laundry_symbols/Ironing/iron.png") },
        { id: "30", image: require("../../assets/laundry_symbols/Ironing/no-iron.png") },
        { id: "31", image: require("../../assets/laundry_symbols/Ironing/high-temperature.png") },
        { id: "32", image: require("../../assets/laundry_symbols/Ironing/medium-temperature.png") },
        { id: "33", image: require("../../assets/laundry_symbols/Ironing/low-temperature.png") },
        { id: "34", image: require("../../assets/laundry_symbols/Ironing/no-steam.png") },
      ],
    },
  ];

  // Get symbols based on selected category
  const getFilteredSymbols = () => {
    if (selectedCategory === "1") {
      return allSymbols; // Show all categories
    }
    return allSymbols.filter((category) => category.id === selectedCategory);
  };

  // Toggle symbol selection
  const handleSymbolSelect = (id) => {
    setSelectedSymbols((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((symbolId) => symbolId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle category selection
  const handleCategorySelect = (id, name) => {
    setSelectedCategory(id);
    console.log(`id: ${id}, name: ${name}, click: true`);
  };

  return (
    <View style={styles.container}>
      {/* ✅ Display Card (Unchanged) */}
      <View style={styles.displayCard}>
        <View style={[styles.symbolContainer, { backgroundColor: "#C0C0C0FF" }]}>
          <Image
            source={require("../../assets/laundry_symbols/question.png")}
            style={styles.questionImage} // ✅ Fixed size & no tint color issue
            resizeMode="contain"
          />
        </View>
        <Text style={styles.instructionText}>
          กรุณาเลือกสัญลักษณ์เพื่อแสดงคำแนะนำ
        </Text>
      </View>

      {/* ✅ Category Selection with FlatList */}
      <View style={styles.categoryContainer}>
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

      {/* ✅ Symbols Display (Scrollable) */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
      >
        {getFilteredSymbols().map((category) => (
          <View key={category.id} style={styles.categorySection}>
            {/* Category Title */}
            <Text style={styles.categoryTitle}>{category.title}</Text>

            {/* Symbol Grid */}
            <View style={styles.symbolsContainer}>
              {category.symbols.map((symbol) => {
                const isSelected = selectedSymbols.includes(symbol.id);
                return (
                  <TouchableOpacity key={symbol.id} style={styles.symbolTouchable}>
                    <ButtonCustom
                      color={isSelected ? "#3180E1" : "#C0C0C0FF"} // Change color when selected
                      style={styles.symbolContainer}
                      tintColor={isSelected ? "#3180E1" : "#6c757d"} // Change tint when selected
                      image={symbol.image}
                      onPress={() => handleSymbolSelect(symbol.id)}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayCard: {
    flexDirection: "row",
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
  questionImage: {
    width: 50, // ✅ Fixed size
    height: 50, // ✅ Fixed size
    resizeMode: "contain", // ✅ Prevent stretching
    tintColor: 'grey'
  },
  instructionText: {
    fontSize: 17,
    fontWeight: "500",
  },
  categoryContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontFamily: "Kanit-Regular",
    marginBottom: 10,
  },
  symbolsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  symbolTouchable: {
    width: 80,
    height: 80,
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
