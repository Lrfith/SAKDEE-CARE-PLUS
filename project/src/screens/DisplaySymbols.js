import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DisplaySymbols = () => {
    return (
        <View style={styles.container}>
            <Text>DisplaySymbols</Text>
        </View>
    )
}

export default DisplaySymbols

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
    },
})