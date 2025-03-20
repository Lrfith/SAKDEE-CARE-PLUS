import { Image, ScrollView, Text, View, } from 'react-native'
import React from 'react'
import { styles } from '../styles/app.styles'
import ButtonCustom from "../components/ButtonCustom";
import { useNavigation } from '@react-navigation/native'; 

const DisplaySymbols = ({ route }) => {
    const { selectedSymbols, allSymbols } = route.params; // รับข้อมูลจาก SymbolsScreen
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{ height: 10 }} />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {selectedSymbols.map((symbolId) => {
                    const symbol = allSymbols.flatMap((category) => category.symbols).find((s) => s.id === symbolId);
                    return (
                        <View key={symbol.id} style={[styles.placeholderContainer, {margin: 10}]}>
                            <View style={[styles.symbolContainer, styles.shadowStyle]}>
                                <Image source={symbol.image} style={[styles.symbolImage, { tintColor: '#3180E1' }]} resizeMode="contain" />
                            </View>
                            <Text style={styles.instructionText}>{symbol.info}</Text>
                        </View>
                    );
                })}

                <View style={{ height: 60 }} />
            </ScrollView>
                <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' }}>
                    <ButtonCustom
                        lable="กลับไปก่อนหน้านี้"
                        color="#3180E1"
                        colorText="#fff"
                        style={styles.confirmButton}
                        onPress={() => navigation.goBack()}
                    />
                </View>
        </View>
    );
};


export default DisplaySymbols

  