import { StyleSheet, ScrollView, Image, View, Text } from 'react-native';
import React, { useState } from 'react';
import CustomAppBar from '../components/CustomAppBar';
import { StatusBar, Platform } from 'react-native';

const imageMap = {
   't11.png': require('../../assets/image/tips/t01.jpg'),
  't12.png': require('../../assets/image/tips/t02.jpg'),
  't13.png': require('../../assets/image/tips/t03.jpg'),
  't14.png': require('../../assets/image/tips/t04.jpg'),
  't15.png': require('../../assets/image/tips/t05.jpg'),
  't16.png': require('../../assets/image/tips/t06.jpg'),
  't17.png': require('../../assets/image/tips/t07.webp'),
  't21.png': require('../../assets/image/tips/t08.webp'),
  't22.png': require('../../assets/image/tips/t09.jpg'),
  't23.png': require('../../assets/image/tips/t10.jpg'),
  't24.png': require('../../assets/image/tips/t111.jpg'),
  't25.png': require('../../assets/image/tips/t112.webp'),
  't26.png': require('../../assets/image/tips/t113.jpg'),
};



export default function TipDetailScreen({ route, navigation }) {
    const { item } = route.params; // ดึง item ออกมาก่อน

    const { id, title, description, image, details } = route.params; // Use route.params from React Navigation

    const imageSource = image && typeof image === 'string' ? imageMap[image] : null;
    const parsedDetails = details && typeof details === 'string' ? JSON.parse(details) : {};

    // Set the screen title using navigation.setOptions
    React.useEffect(() => {
        navigation.setOptions({
            title: typeof title === 'string' ? title : 'Detail',
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <CustomAppBar title={title || 'Detail'} onBack={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {imageSource && <Image source={imageSource} style={styles.headerImage} />}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                {Object.keys(parsedDetails).length > 0 && (
                    <>
                        <Text style={styles.subtitle}>รายละเอียดเพิ่มเติม</Text>

                        {/* For tipsData with 'steps' */}
                        {parsedDetails.steps && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>ขั้นตอน</Text>
                                {parsedDetails.steps.map((step, index) => (
                                    <Text key={index} style={styles.tipItem}>{`• ${step}`}</Text>
                                ))}
                            </View>
                        )}

                        {/* For careData with detailed sections */}
                        {parsedDetails.washing && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>1. วิธีการซัก</Text>
                                {parsedDetails.washing.map((tip, index) => (
                                    <Text key={index} style={styles.tipItem}>{`• ${tip}`}</Text>
                                ))}
                            </View>
                        )}

                        {parsedDetails.drying && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>2. วิธีการตาก</Text>
                                {parsedDetails.drying.map((tip, index) => (
                                    <Text key={index} style={styles.tipItem}>{`• ${tip}`}</Text>
                                ))}
                            </View>
                        )}

                        {parsedDetails.ironing && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>3. วิธีการรีด</Text>
                                {parsedDetails.ironing.map((tip, index) => (
                                    <Text key={index} style={styles.tipItem}>{`• ${tip}`}</Text>
                                ))}
                            </View>
                        )}

                        {parsedDetails.storing && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>4. วิธีการเก็บรักษา</Text>
                                {parsedDetails.storing.map((tip, index) => (
                                    <Text key={index} style={styles.tipItem}>{`• ${tip}`}</Text>
                                ))}
                            </View>
                        )}

                        {/* Common 'tip' field for both tipsData and careData */}
                        {parsedDetails.tip && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>เคล็ดลับ</Text>
                                <Text style={styles.tipItem}>{parsedDetails.tip}</Text>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 55,
        fontFamily: 'Kanit-Regular',
    },
    scrollContainer: {
        padding: 16,
    },
    headerImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        paddingTop: 16,
        fontSize: 20,
        marginTop: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit-Regular',
    },
    subtitle: {
        marginTop: 12,
        marginBottom: 8,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        fontFamily: 'Kanit-Regular',
    },
    description: {
        lineHeight: 24,
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 16,
        backgroundColor: '#F6F6F6',
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '600',
        fontFamily: 'Kanit-Regular',
    },
    tipItem: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
        color: '#666',
        fontFamily: 'Kanit-Regular',
    },
});