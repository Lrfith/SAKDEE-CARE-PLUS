import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import Counter from "../components/Counter";
import { styles } from '../styles/app.styles'

const ConfigScreen = () => {
  const navigation = useNavigation();
  const [displayAddButton, setDisplayAddButton] = useState(false);
  const [washCount, setWashCount] = useState(0);
  const [tumbleCount, setTumbleCount] = useState(0);

  const storeID = 12345;

  useEffect(() => {
    if (washCount > 0 || tumbleCount > 0) {
      setDisplayAddButton(true); // Show the button
    } else {
      setDisplayAddButton(false); // Hide the button
    }
  }, [washCount, tumbleCount]);

  return (
    <View style={styles.container}>
      <View style={styles.displayCard}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={[styles.circleProfile, { width: 90, height: 90, backgroundColor: '#fff', borderRadius: 50 }]}>
            <Image
              source={require("../../assets/store-icon.png")}
              style={{width: 60, height: 70, marginTop: 10, marginLeft: 15}}
            />
          </View>

          <View style={{ width: '50%', height: 70, backgroundColor: '#fff', marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mc Place Ramintra</Text>
            <Text style={{fontSize: 16}}>ซอยรามอินทรา</Text>
          </View>

          <View style={{ width: '20%', height: 50, backgroundColor: '#fff', marginLeft: 5, paddingTop: 10 }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}} onPress={() => console.log("click")}>ดูรีวิว</Text>
          </View>
        </View>

      </View>

      <View style={styles.displayCard}>
        <Text style={[styles.titleText, { marginLeft: 20 }]}>ID Store: {storeID}</Text>
        <Text style={[styles.detailText, { marginLeft: 20 }]}>
          รายละเอียด: {"\n"}
          จำนวนเครื่องซักผ้า: {washCount} {"\n"}
          จำนวนเครื่องอบผ้า: {tumbleCount}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>จำนวนเครื่อง</Text>

      <View style={styles.machineCard}>
        {/* Washing Machine */}
        <Text style={styles.machineTitle}>เครื่องซักผ้า</Text>
        <View style={styles.machineRow}>
          <Image
            source={require("../../assets/laundry_symbols/washing-machine-icon.png")}
            style={styles.machineIcon}
            resizeMode="contain"
          />
          <Counter value={washCount} onChange={(val) => setWashCount(val)} />
        </View>

        {/* Tumble Dryer */}
        <Text style={styles.machineTitle}>เครื่องอบผ้า</Text>
        <View style={styles.machineRow}>
          <Image
            source={require("../../assets/laundry_symbols/tumble-dry-icon.png")}
            style={styles.machineIcon}
            resizeMode="contain"
          />
          <Counter value={tumbleCount} onChange={(val) => setTumbleCount(val)} />
        </View>
      </View>

      {displayAddButton > 0 && (
        <View style={styles.controlButtonRow}>
          <ButtonCustom
            lable="ควบคุม"
            color="#3180E1"
            colorText="#fff"
            border="#3180E1"
            onPress={() => navigation.navigate("Control", { washCount, tumbleCount })}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      )}
    </View>
  );
};

export default ConfigScreen;