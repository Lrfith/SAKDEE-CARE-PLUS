import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "../styles/app.styles";

const ButtonCustom = ({ lable, onPress, color, colorText, border, style, image, tintColor }) => {
  return (
    <TouchableOpacity
    
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderColor: border || color,
          flex: 1,
          marginHorizontal: 5,
          flexDirection: 'row', // Arrange image and text horizontally
          alignItems: 'center', // Center vertically
          justifyContent: 'center', // Center horizontally
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {image && (
        <Image
          source={image}
          style={{ width: 40, height: 40, marginLeft: 5, tintColor: tintColor}} // Adjust size & spacing
          resizeMode="contain"
        />
      )}
      <Text style={[styles.defaultText, { color: colorText }]}>{lable}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
