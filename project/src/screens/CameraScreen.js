import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ScanQRCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');
  const [isFlashOn, setIsFlashOn] = useState(false); // เปิด/ปิดแฟลช
  const [cameraRef, setCameraRef] = useState(null); // อ้างอิงกล้อง

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

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setData(data);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setData('');
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        flash={isFlashOn ? 'torch' : 'off'} // เปิดแฟลช
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={(ref) => setCameraRef(ref)} // เก็บค่า ref ของกล้อง
      />

      {/* กรอบสแกน QR Code */}
      <View style={styles.scanFrame}>
        <Ionicons name="scan-outline" size={300} color="#3180e1" />
        <Text style={styles.txtdecs}>กรุณาสแกนหน้าเครื่องซักผ้า หรือเครื่องอบผ้า ที่ต้องการใช้บริการ</Text>
      </View>

      {/* ปุ่มเปิด/ปิดแฟลช */}
      <TouchableOpacity
        style={styles.flashButton}
        onPress={() => setIsFlashOn(!isFlashOn)}
      >
        <Ionicons
          name={isFlashOn ? 'flash' : 'flash-off'}
          size={30}
          color="white"
        />
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
    bottom: 100,
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
    top: '20%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtdecs: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
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
});
