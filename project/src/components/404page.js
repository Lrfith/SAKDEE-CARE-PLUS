import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Page404view = () => {
  return (
    <View>
      <Image
        source={require('../../assets/image/404.png')} // replace with your logo path
        style={{ width: '100%', height: '78%', marginTop: 50, padding: 40, }}
      />
      <Text style={{ fontSize: 28, position: 'absolute', top: '65%', alignSelf: 'center', fontFamily: 'Kanit-Regular', }}>กำลังสร้าง มองข้ามไปก่อน</Text>

      <Text style={{ fontSize: 18, position: 'absolute', top: '72%', alignSelf: 'center', fontFamily: 'Kanit-Regular', }}>Design by North-Lake</Text>

    </View>
  )
}

export default Page404view
