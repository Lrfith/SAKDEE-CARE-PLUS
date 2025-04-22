// import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import * as ImagePicker from 'expo-image-picker';
// import { styles } from '../styles/app.styles';
// import Ionicons from "react-native-vector-icons/Ionicons";

// const GalleryScreen = () => {

//   const [imagesAssets, setImagesAssets] = useState([]);
//   const [hasImportImage, setHasImportImage] = ([]);

//   const onMultiplePicturePick = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: true,
//         quality: 1,
//       });
//       if (!result.canceled) {
//         console.log("the result => ", JSON.stringify(result, null, 4));
//         setImagesAssets(result.assets);
//       }

//     } catch (error) {
//       console.error("Error picking image: ", error);
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
//         {imagesAssets.map((asset, index) => (
//           <View
//             key={index}
//             style={{
//               width: '33.3%',         // Each image container occupies 1/3 of the width
//               alignItems: 'center',  // Center the image horizontally in its container
//               // justifyContent: 'center'
//             }}
//           >
//             <TouchableOpacity onLongPress={() => console.log(`Image: ${index} `)} onPress={() => console.log("Click")}>
//               <Image
//                 source={{ uri: asset.uri }}
//                 style={{
//                   width: 130,
//                   height: 130,
//                   // borderRadius: 4,
//                   padding: 2
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//         ))}
//         <TouchableOpacity onPress={onMultiplePicturePick}>
//           <View style={styles.frameContainer}>
//             <Ionicons name="add-outline" size={45} color="blue" />
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View style={{ height: 50 }} />
//     </ScrollView>
//   );

// };

// export default GalleryScreen;

// import { Text, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
// import React, { useState } from 'react';
// import * as ImagePicker from 'expo-image-picker';
// import { styles } from '../styles/app.styles';
// import Ionicons from "react-native-vector-icons/Ionicons";

// const GalleryScreen = ({ navigation }) => {
//   const [imagesAssets, setImagesAssets] = useState([]);  // Stores selected images
//   const [selectedImage, setSelectedImage] = useState(null); // Tracks selected image index
//   const [profileImage, setProfileImage] = useState(null);  // Stores profile image URI

//   const onMultiplePicturePick = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: true, // ✅ Allow multiple images
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const newImages = result.assets.filter(
//           (newImage) => !imagesAssets.some((existingImage) => existingImage.uri === newImage.uri) // Remove duplicates
//         );

//         if (newImages.length === 0) {
//           Alert.alert("Duplicate Images", "All selected images are already in the gallery.");
//           return;
//         }

//         setImagesAssets([...imagesAssets, ...newImages]); // ✅ Add only new images
//       }
//     } catch (error) {
//       console.error("Error picking images: ", error);
//     }
//   };

//   const selectImage = (index, uri) => {
//     setSelectedImage(index === selectedImage ? null : index); // Toggle selection
//     setProfileImage(uri); // Set the selected image as profile picture
//   };

//   return (
//     <ScrollView>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
//         {imagesAssets.map((asset, index) => {
//           const isSelected = selectedImage === index;
//           return (
//             <View key={index} style={{ width: '33.3%', alignItems: 'center', position: 'relative' }}>
//               <TouchableOpacity 
//                 onLongPress={() => console.log(`Long Press on Image: ${index}`)}
//                 onPress={() => selectImage(index, asset.uri)}
//                 activeOpacity={0.7}
//               >
//                 <Image
//                   source={{ uri: asset.uri }}
//                   style={{
//                     width: 130,
//                     height: 130,
//                     borderRadius: 8,
//                   }}
//                 />
//                 {/* Selection Overlay */}
//                 {isSelected && (
//                   <View
//                     style={{
//                       position: 'absolute',
//                       width: 130,
//                       height: 130,
//                       backgroundColor: 'rgba(0,0,0,0.4)',
//                       borderRadius: 8,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Ionicons name="checkmark-circle" size={30} color="white" />
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>
//           );
//         })}

//         {/* Add Image Button */}
//         <TouchableOpacity onPress={onMultiplePicturePick}>
//           <View style={styles.frameContainer}>
//             <Ionicons name="add-outline" size={45} color="blue" />
//           </View>
//         </TouchableOpacity>
//       </View>
      
//       {/* Profile Image Preview */}
//       <View style={{ alignItems: 'center', marginTop: 20 }}>
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>Profile Picture</Text>
//         <Image
//           source={profileImage ? { uri: profileImage } : require('../../assets/icon.png')}
//           style={{width: 100, height: 100}}
//         />
//       </View>

//       <View style={{ height: 50 }} />
//     </ScrollView>
//   );
// };

// export default GalleryScreen;

import { Text, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/app.styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Buffer } from "buffer";  // Import Buffer for Base64 encoding

// ✅ FIXED: Use correct Nextcloud WebDAV URL for file uploads
const NEXTCLOUD_URL = "https://172.20.10.5/remote.php/dav/files/lfrith";
const USERNAME = "lfrith";
const PASSWORD = "qwerlkjname123";

// ✅ FIXED: Base64 encoding for authentication
const authHeader = "Basic " + Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");

const GalleryScreen = () => {
  const [imagesAssets, setImagesAssets] = useState([]);

  // ✅ Select multiple images
  const onMultiplePicturePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Selected images:", JSON.stringify(result.assets, null, 4));
        setImagesAssets(result.assets);
        await uploadToNextcloud(result.assets);  // ✅ Upload images
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Could not pick images.");
    }
  };

  // ✅ Upload images to Nextcloud
  const uploadToNextcloud = async (images) => {
    for (const image of images) {
      const uri = image.uri;
      const fileName = uri.split('/').pop();  // Extract filename

      try {
        const response = await fetch(`${NEXTCLOUD_URL}${fileName}`, {
          method: 'PUT',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/octet-stream',  // ✅ FIXED header
          },
          body: await fetch(uri).then(res => res.blob())  // Convert image to Blob
        });

        if (response.ok) {
          console.log(`Uploaded ${fileName} successfully!`);
        } else {
          console.error(`Failed to upload ${fileName}:`, response.status, response.statusText);
        }
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Failed", `Could not upload ${fileName}.`);
      }
    }

    Alert.alert("Upload Complete", "All images have been uploaded.");
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {imagesAssets.map((asset, index) => (
          <View key={index} style={{ width: '33.3%', alignItems: 'center' }}>
            <TouchableOpacity onLongPress={() => console.log(`Image: ${index}`)} onPress={() => console.log("Click")}>
              <Image source={{ uri: asset.uri }} style={{ width: 130, height: 130, padding: 2 }} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={onMultiplePicturePick}>
          <View style={styles.frameContainer}>
            <Ionicons name="add-outline" size={45} color="blue" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default GalleryScreen;
