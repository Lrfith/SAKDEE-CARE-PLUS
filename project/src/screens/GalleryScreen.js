import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/app.styles';

const GalleryScreen = () => {

  const [imagesAssets, setImagesAssets] = useState([]);
  const onMultiplePicturePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.canceled) {
        console.log("the result => ", JSON.stringify(result, null, 4));
        setImagesAssets(result.assets);
      }

    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {imagesAssets.map((asset, index) => (
          <View
            key={index}
            style={{
              width: '33%',         // Each image container occupies 1/3 of the width
              alignItems: 'center',  // Center the image horizontally in its container
              marginBottom: 5,      // Optional: spacing between rows
            }}
          >
            <Image
              source={{ uri: asset.uri }}
              style={{
                width: 130,
                height: 130,
                borderRadius: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 3,
              }}
            />
          </View>
        ))}

        <TouchableOpacity onPress={onMultiplePicturePick}>
          <Text>Pick Image.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

export default GalleryScreen;

