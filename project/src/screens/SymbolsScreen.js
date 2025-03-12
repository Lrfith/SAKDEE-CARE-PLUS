import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SymbolsScreen = () => {
  return (
    <View>
      <Image
        source={require('../../assets/image/404.png')} // replace with your logo path
        style={{ width: '100%', height: '78%', marginTop: 90 }}
      />
      <Text style={{ fontSize: 40, position: 'absolute', fontWeight: 'bold', top: '78%', alignSelf: 'center' }}>COMMING SOON</Text>
    </View>
  )
}

export default SymbolsScreen
