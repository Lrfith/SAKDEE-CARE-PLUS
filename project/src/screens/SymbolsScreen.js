import { StyleSheet, View, Image, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../styles/app.styles';

// Laundry Categories
const categories = [
  { id: "1", title: "ทั้งหมด" },
  { id: "2", title: "การซัก" },
  { id: "3", title: "อุณหภูมิ" },
  { id: "4", title: "การซักแห้ง" },
  { id: "5", title: "สารฟอกขาว" },
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
      { id: "1", image: require("../../assets/laundry_symbols/Washing/hand-wash.png"), info: "ซักมือเท่านั้น"},
      { id: "2", image: require("../../assets/laundry_symbols/Washing/hand-dry-wash.png"), info: "ซัดได้ทั้งมือและเครื่องซักผ้า"},
      { id: "3", image: require("../../assets/laundry_symbols/Washing/dry-wash.png"), info: "ห้ามซักแบบปกติ(ควรซักแห้ง)"},
    ],
  },
  {
    id: "3",
    title: "อุณหภูมิ",
    symbols: [
      { id: "4", image: require("../../assets/laundry_symbols/Temperature/cold.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 30°"},
      { id: "5", image: require("../../assets/laundry_symbols/Temperature/warm.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 40°"},
      { id: "6", image: require("../../assets/laundry_symbols/Temperature/hot.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 50°"},
      { id: "7", image: require("../../assets/laundry_symbols/Temperature/hot4.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 60°"},
      { id: "8", image: require("../../assets/laundry_symbols/Temperature/hot5.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 70°"},
      { id: "9", image: require("../../assets/laundry_symbols/Temperature/hot6.png"), info: "ใช้อุณหภูมิน้ำในการซักได้ไม่เกิน 95°"},
    ],
  },
  {
    id: "4",
    title: 'การซักแห้ง',
    symbols: [
      { id: "10", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-clean.png"), info: "สามารถซักแห้งได้"},
      { id: "11", image: require("../../assets/laundry_symbols/Dry_Cleaning/do-not-dry.png"), info: "ห้ามซักแห้ง"},
      { id: "12", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-non-chlorine.png"), info: "ซักแห้งได้ด้วยน้ำยาซักแห้งได้ทุกชนิด\nยกเว้นไตรคลอโรเอทีลีน"},
      { id: "13", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-hydrocarbon.png"), info: "ใช้น้ำยาซักแห้งประเภทไฮโดรคาร์บอน\nเท่านั้น"},
      { id: "14", image: require("../../assets/laundry_symbols/Dry_Cleaning/dry-all.png"), info: "ซักแห้งได้ด้วยตัวน้ำยาซักแห้งทุกชนิด"},
    ],
  },
  {
    id: "5",
    title: 'การใช้สารฟอกขาว',
    symbols: [
      { id: "15", image: require("../../assets/laundry_symbols/Bleaching/bleach.png"), info: "สามารถใช้สารฟอกขาวได้ทุกชนิด" },
      { id: "16", image: require("../../assets/laundry_symbols/Bleaching/not-bleach.png"), info: "ห้ามใช้สารฟอกขาวเด็ดขาด" },
      { id: "17", image: require("../../assets/laundry_symbols/Bleaching/chlorine.png"), info: "สามารถใช้สารฟอกขาวที่มีส่วนผสมของ\nคลอรีน บรีซได้" },
      { id: "18", image: require("../../assets/laundry_symbols/Bleaching/non-chlorine.png"), info: "ห้ามใช้สารฟอกขาวที่มีส่วนผสมของ\nคลอรีน บรีซ" },
    ],
  },
  {
    id: "6",
    title: 'การอบแห้ง',
    symbols: [
      { id: "19", image: require("../../assets/laundry_symbols/Tumble_Drying/tumble-dry.png"), info: "อบแห้งได้แบบไม่จำกัดอุณหภูมิ" },
      { id: "20", image: require("../../assets/laundry_symbols/Tumble_Drying/low.png"), info: "อบแห้งได้โดยใช้อุณหภูมิต่ำ" },
      { id: "21", image: require("../../assets/laundry_symbols/Tumble_Drying/medium.png"), info: "อบแห้งได้โดยใช้อุณหภูมิกลาง" },
      { id: "22", image: require("../../assets/laundry_symbols/Tumble_Drying/high.png"), info: "อบแห้งได้โดยใช้อุณหภูมิสูง" },
      { id: "23", image: require("../../assets/laundry_symbols/Tumble_Drying/do-not-tumble-dry.png"), info: "ห้ามอบแห้งเด็ดขาด" },
    ],
  },
  {
    id: "7",
    title: 'การตากผ้า',
    symbols: [
      { id: "24", image: require("../../assets/laundry_symbols/Line_Drying/hang.png"), info: "ตากผ้าด้วยวิธีการแขวน" },
      { id: "25", image: require("../../assets/laundry_symbols/Line_Drying/drip-dry.png"), info: "ไม่ควรบิดผ้าก่อนตาก" },
      { id: "26", image: require("../../assets/laundry_symbols/Line_Drying/dry.png"), info: "ตากผ้าด้วยวางแนวราบ" },
      { id: "27", image: require("../../assets/laundry_symbols/Line_Drying/shade.png"), info: "ให้ตากในที่ร่ม" },
      { id: "28", image: require("../../assets/laundry_symbols/Line_Drying/wring.png"), info: "ห้ามบิดผ้า" },
    ],
  },
  {
    id: "8",
    title: 'การรีด',
    symbols: [
      { id: "29", image: require("../../assets/laundry_symbols/Ironing/iron.png"), info: "สามารถใช้อุณหภูมิใดก็ได้ในการรีดผ้า" },
      { id: "30", image: require("../../assets/laundry_symbols/Ironing/no-iron.png"), info: "ห้ามรีด" },
      { id: "31", image: require("../../assets/laundry_symbols/Ironing/high-temperature.png"), info: "ใช้อุณหภูมิสูงในการรีดผ้าได้\n(อุณหภูมิความร้อนประมาณ 200°C)" },
      { id: "32", image: require("../../assets/laundry_symbols/Ironing/medium-temperature.png"), info: "ใช้อุณหภูมิปานกลางในการรีดผ้าได้\n(อุณหภูมิความร้อนประมาณ 150°C)" },
      { id: "33", image: require("../../assets/laundry_symbols/Ironing/low-temperature.png"), info: "ใช้อุณหภูมิต่ำในการรีดผ้าได้\n(อุณหภูมิความร้อนประมาณ 100°C)" },
      { id: "34", image: require("../../assets/laundry_symbols/Ironing/no-steam.png"), info: "ห้ามรีดด้วยเตารีดไอน้ำ" },
    ],
  },
];

const SymbolsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  // Reset selectedSymbols when navigating to a new screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedSymbols([]);
    });
    return unsubscribe;
  }, [navigation]);
  
  // Handle Filter selection
  const getFilteredSymbols = () => {
    if (selectedCategory === "1") {
      return allSymbols;
    }
    return allSymbols.filter((category) => category.id === selectedCategory);
  };

  // Handle category selection
  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  // Toggle symbol selection (limit to 6)
  const handleSymbolSelect = (id) => {
    setSelectedSymbols((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If already selected, remove from the list
        return prevSelected.filter((symbolId) => symbolId !== id);
      } else {
        // If not selected and less than 6 selections, add it
        return prevSelected.length < 6 ? [...prevSelected, id] : prevSelected;
      }
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Display Card */}
      <View style={styles.displayCard}>
        {selectedSymbols.length > 0 ? (
          <View style={styles.selectedSymbolsGrid}>
            {selectedSymbols.map((symbolId) => {
              // Find the selected symbol from allSymbols array
              const symbol = allSymbols.flatMap((category) => category.symbols).find((s) => s.id === symbolId);
              return (
                <TouchableOpacity key={symbol.id} onPress={() => handleSymbolSelect(symbol.id)}>
                  <View style={[styles.symbolContainerDisplay, styles.shadowStyle]}>
                    <Image source={symbol.image} style={[styles.symbolImage, { tintColor: '#3180E1' }]} resizeMode="contain" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <View style={[styles.symbolContainer, styles.shadowStyle]}>
              <Image source={require("../../assets/laundry_symbols/question.png")} style={styles.symbolImage} resizeMode="contain" />
            </View>
            <Text style={styles.instructionText}>กรุณาเลือกสัญลักษณ์เพื่อแสดงคำแนะนำ</Text>
          </View>
        )}
      </View>


      {/* Category Selection with FlatList */}
      <View style={styles.categoryContainer}>
        <FlatList
          ref={flatListRef}
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ButtonCustom
              lable={item.title}
              color={selectedCategory === item.id ? "#3180E1" : "#DDDDDDFF"}
              colorText={selectedCategory === item.id ? "#fff" : "grey"}
              onPress={() => handleCategorySelect(item.id, item.title)}
              style={styles.buttonCategory}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* ปุ่มเมื่อเลือก symbols */}
      {selectedSymbols.length > 0 && (
        <View style={styles.floatingButton}>
          <ButtonCustom
            lable="ยืนยัน"
            color="#3180E1"
            colorText="#fff"
            onPress={() => navigation.navigate('DisplaySymbols', { selectedSymbols: selectedSymbols, allSymbols: allSymbols })}
            style={styles.confirmButton}
          />
        </View>
      )}

      {/* Symbols Display (Scrollable) */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {getFilteredSymbols().map((category) => (
          <View key={category.id} style={styles.categorySection}>
            {/* Category Title */}
            <Text style={styles.categoryTitle}>{category.title}</Text>

            {/* Symbol Grid */}
            <View style={styles.symbolsContainer}>

              {category.symbols.map((symbol) => {
                const isSelected = selectedSymbols.includes(symbol.id);
                return (
                  <TouchableOpacity key={symbol.id} style={[styles.symbolTouchable, styles.shadowStyle]}>
                    <ButtonCustom
                      color="#fff"
                      style={[styles.symbolContainer, styles.shadowStyle]}
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

        <View style={{ height: 170 }} />

      </ScrollView>
    </View>
  );
};

export default SymbolsScreen;
