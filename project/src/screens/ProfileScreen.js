import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from '../styles/app.styles';
import Page404view from '../components/404page'; // Import the 404 page component

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Display the 404 page */}
        <Page404view />
      
    </SafeAreaView>
  );
}

export default ProfileScreen;
