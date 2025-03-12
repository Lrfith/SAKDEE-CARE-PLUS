import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../styles/app.styles';
import Page404View from '../components/404page' // ✅ Import the 404 page component

const HomeScreen = () => {
  return (
    <Page404View/>
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

  );
};

export default HomeScreen;
