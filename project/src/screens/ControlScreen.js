import { StyleSheet, Text, View, FlatList, ScrollView, Switch, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import ButtonCustom from "../components/ButtonCustom";
import { styles } from '../styles/app.styles'
// Machine Categories
const categoriesMachine = [
  { id: "1", title: "ทั้งหมด" },
  { id: "2", title: "เครื่องซักผ้า" },
  { id: "3", title: "เครื่องอบผ้า" },
];

const allMachine = [
  {
    id: "2",
    title: "เครื่องซักผ้า",
  },
  {
    id: "3",
    title: "เครื่องอบผ้า",
  },
];

const ControlScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const flatListRef = useRef(null);
  const { washCount, tumbleCount } = route.params;

  const [isWashEnabled, setIsWashEnabled] = useState(Array(washCount).fill(false));
  const [isTumbleEnabled, setIsTumbleEnabled] = useState(Array(tumbleCount).fill(false));

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const getFilteredMachine = () => {
    if (selectedCategory === "1") {
      return allMachine;
    }
    return allMachine.filter((machine) => machine.id === selectedCategory);
  };

  const handleWashSwitchChange = (index, newValue) => {
    const updatedWashStatus = [...isWashEnabled];
    updatedWashStatus[index] = newValue;
    setIsWashEnabled(updatedWashStatus);
  };

  const handleTumbleSwitchChange = (index, newValue) => {
    const updatedTumbleStatus = [...isTumbleEnabled];
    updatedTumbleStatus[index] = newValue;
    setIsTumbleEnabled(updatedTumbleStatus);
  };

  const countWash = isWashEnabled.filter(status => status).length;
  const countTumble = isTumbleEnabled.filter(status => status).length;

  return (
    <View style={styles.container}>
      <View style={styles.displayCardStore}>
        {/* Title Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
          <Text style={[styles.textCard, { textAlign: 'center', marginRight: 20 }]}>เครื่องซักผ้า</Text>
          <Text style={[styles.textCard, { textAlign: 'center', marginLeft: 20 }]}>เครื่องอบผ้า</Text>
        </View>

        {/* Icon and Count Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* Washing machine icon */}
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require("../../assets/laundry_symbols/washing-machine-icon.png")}
              style={{ width: 60, height: 60, tintColor: '#3180E1' }}
            />
            <Text style={[styles.textCard, { marginTop: 10 }]}>{countWash}/{washCount}</Text>
          </View>

          {/* Vertical Separator */}
          <View style={{ width: 5, height: 60, backgroundColor: 'black', borderRadius: 30, position: 'absolute', left: '50%', bottom: '35%' }} />

          {/* Tumble dryer icon */}
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require("../../assets/laundry_symbols/tumble-dry-icon.png")}
              style={{ width: 60, height: 60, tintColor: '#3180E1' }}
            />
            <Text style={[styles.textCard, { marginTop: 10 }]}>{countTumble}/{tumbleCount}</Text>
          </View>
        </View>
      </View>

      {/* Category Selection */}
      <View style={[styles.categoryContainer, { marginLeft: 30 }]}>
        <FlatList
          ref={flatListRef}
          data={categoriesMachine}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ButtonCustom
              lable={item.title}
              color={selectedCategory === item.id ? "#3180E1" : "#DDDDDDFF"}
              colorText={selectedCategory === item.id ? "#fff" : "grey"}
              onPress={() => handleCategorySelect(item.id)}
              style={styles.buttonCategory}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Display Machines */}
      <ScrollView style={[styles.scrollContainer, styles.displayCardStore, { marginBottom: 40 }]} showsVerticalScrollIndicator={false}>
        {getFilteredMachine().map((machine) => (
          <View key={machine.id} style={[styles.displayMachine, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
            <Text style={styles.textCard}>{machine.title}</Text>
            {/* Display Washing Machines */}
            {machine.title === "เครื่องซักผ้า" && Array.from({ length: washCount }).map((_, index) => (
              <View key={`wash-${index}`} style={[styles.displayMachine, { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
                <View style={styles.placeholderContainer}>
                  <View style={styles.symbolContainer}>
                    <Image
                      source={require("../../assets/laundry_symbols/washing-machine-icon.png")}
                      style={[styles.symbolImage, { tintColor: isWashEnabled[index] ? 'grey' : '#3180E1' }]}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={[styles.textCard, { width: 100 }]}>
                  {isWashEnabled[index] ? 'กำลังทำงาน' : 'ว่าง'}
                </Text>
                <Switch
                  value={isWashEnabled[index]}
                  onValueChange={(newValue) => handleWashSwitchChange(index, newValue)}
                />
              </View>
            ))}

            {/* Display Tumble Dryers */}
            {machine.title === "เครื่องอบผ้า" && Array.from({ length: tumbleCount }).map((_, index) => (
              <View key={`tumble-${index}`} style={[styles.displayMachine, { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
                <View style={styles.placeholderContainer}>
                  <View style={styles.symbolContainer}>
                    <Image
                      source={require("../../assets/laundry_symbols/tumble-dry-icon.png")}
                      style={[styles.symbolImage, { tintColor: isTumbleEnabled[index] ? 'grey' : '#3180E1' }]}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={[styles.textCard, { width: 100 }]}>
                  {isTumbleEnabled[index] ? 'กำลังทำงาน' : 'ว่าง'}
                </Text>
                <Switch
                  value={isTumbleEnabled[index]}
                  onValueChange={(newValue) => handleTumbleSwitchChange(index, newValue)}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ControlScreen;