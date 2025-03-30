import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import jsQR from 'jsqr';
import { Buffer } from "buffer"; // ใช้ Buffer เพื่อแปลง Base64

export default function ScanQRCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [image, setImage] = useState(null); // เก็บรูปที่เลือกจากแกลลอรี่

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Requesting camera permission....</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setData(`Type: ${type}, Data: ${data}`);
    }
  };


  const handleScanAgain = () => {
    setScanned(false);
    setData('');
    setImage(null);
  };

  // 📌 ฟังก์ชันเปิดแกลเลอรี่
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      scanQRCodeFromImage(result.assets[0].uri);
    }
  };

  // 📌 ฟังก์ชันสแกน QR Code จากรูป
  const scanQRCodeFromImage = async (uri) => {
    try {
      // Resize รูปและแปลงเป็น Base64
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300, height: 300 } }],
        { format: ImageManipulator.SaveFormat.PNG, base64: true }
      );

      if (!manipResult.base64) {
        alert("เกิดข้อผิดพลาดในการโหลดภาพ");
        return;
      }

      // ใช้ Buffer แปลง Base64 เป็น Binary Data
      const raw = Buffer.from(manipResult.base64, "base64");
      const imageData = new Uint8ClampedArray(raw);

      const width = 300;
      const height = 300;

      const qrCode = jsQR(imageData, width, height);

      if (qrCode) {
        setData(qrCode.data);
        setScanned(true);
      } else {
        alert("ไม่พบ QR Code ในรูปภาพ");
      }
    } catch (error) {
      console.error("Error scanning QR Code from image:", error);
      alert("เกิดข้อผิดพลาดในการสแกน QR Code");
    }
  };

  return (
    <View style={styles.container}>/home/northsnx/Downloads/ai-studio-2025.0.1/Altair/RapidMiner/AI Studio 2025.0.1
      {!image ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128'],
          }}
          flash={isFlashOn ? 'torch' : 'off'}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}

        />
      ) : (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      {/* กรอบสแกน QR Code */}
      <View style={styles.scanFrame}>
        <Ionicons name="scan-outline" size={300} color="#3180e1" />
        <Text style={styles.txtdecs}>สแกน QR Code หรือเลือกรูปจากแกลลอรี่</Text>
      </View>

      {/* ปุ่มเปิด/ปิดแฟลช */}
      {!image && (
        <TouchableOpacity style={styles.flashButton} onPress={() => setIsFlashOn(!isFlashOn)}>
          <Ionicons name={isFlashOn ? 'flash' : 'flash-off'} size={30} color="white" />
        </TouchableOpacity>
      )}

      {/* ปุ่มเปิดแกลอรี่ */}
      <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
        <Ionicons name="images-outline" size={30} color="white" />
      </TouchableOpacity>

      {scanned && (
        <View style={styles.overlay}>
          <Text style={styles.scannedText}>Scanned: {data}</Text>
          <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
            <Text style={styles.scanAgainButtonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: '#3180e1',
    padding: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  scannedText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  scanAgainButton: {
    backgroundColor: '#3180e1',
    padding: 10,
    borderRadius: 8,
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scanFrame: {
    position: 'absolute',
    top: '15%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtdecs: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 50,
    color: 'white',
  },
  flashButton: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  galleryButton: {
    position: 'absolute',
    bottom: 150,
    left: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
