import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/app.styles";

const ButtonCustom = ({ lable, onPress, color, colorText, border, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderColor: border || color,
          flex: 1,
          marginHorizontal: 5,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.defaultText, { color: colorText }]}>{lable}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
