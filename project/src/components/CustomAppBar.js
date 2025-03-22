import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires expo install expo-vector-icons

export default function CustomAppBar({ title, onBack }) {
    return (
        <View style={styles.appBar}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appBar: {
        height: 56,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        elevation: 4,
        fontFamily: 'Kanit-Regular',
    },
    backButton: {
        marginRight: 12,
        color: 'black',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        flex: 1,
        fontFamily: 'Kanit-Regular',
    },
});
