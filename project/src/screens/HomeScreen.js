import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../styles/app.styles';

const HomeScreen = () => {
  return (
    // * make cant scroll up
    // <ScrollView style={{flex: 1}}>
    //   {/* <View style={{ width: '100%', height: '300%', backgroundColor: 'red' }}>
    //     <Text>สภาพอากาศ</Text>
    //   </View>
    //   <View style={{ width: '100%', height: '300%', backgroundColor: 'yellow' }}>
    //     <Text>Promote</Text>
    //   </View>
    //   <View style={{ width: '100%', height: '600%', backgroundColor: 'blue' }} /> */}

    // </ScrollView>
    <View>
      <Image
        source={require('../../assets/image/404.png')} // replace with your logo path
        style={{ width: '100%', height: '78%', marginTop: 90 }}
      />
      <Text style={{ fontSize: 40, position: 'absolute', fontWeight: 'bold', top: '78%', alignSelf: 'center' }}>COMMING SOON</Text>
    </View>
  );
};

export default HomeScreen;
