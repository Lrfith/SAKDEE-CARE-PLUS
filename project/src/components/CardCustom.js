import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/app.styles'
const Card = ({ children, height = 300 }) => {
  return (
    <View style={[styles.card, { height }]}>
      {children}
    </View>
  );
};


export default Card;
