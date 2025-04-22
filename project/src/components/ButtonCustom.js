import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "../styles/app.styles";

const ButtonCustom = ({ lable, onPress, color, colorText, border, style, image, tintColor, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderColor: border || color,
          flex: 1,
          marginHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {image && (
        <Image
          source={image}
          style={{ width: 40, height: 40, marginLeft: 5, tintColor: tintColor}}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.defaultText, { color: colorText }, textStyle]}>{lable}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
