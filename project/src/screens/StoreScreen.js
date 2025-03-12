import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { Platform, Linking } from 'react-native';
import stores from '../components/dataDept';
import Feather from '@expo/vector-icons/Feather';

export default function StoreInfoScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };
    getLocation();
  }, []);

  const toggleModal = (store) => {
    if (userLocation && store) {
      const distanceToStore = getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: store.latitude, longitude: store.longitude }
      );
      setDistance(distanceToStore);
    }
    setSelectedStore(store);
    setIsModalVisible(!isModalVisible);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStore = (store) => {
    setSearchQuery(store.name);
    setIsDropdownVisible(false);
    toggleModal(store);
  };

  const openMap = (latitude, longitude, name) => {
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
    });

    Linking.openURL(url).catch((err) => console.error('ไม่สามารถเปิดแผนที่ได้:', err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="ค้นหาสาขา..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setIsDropdownVisible(text.length > 0);
        }}
      />

      {isDropdownVisible && (
        <FlatList
          data={filteredStores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelectStore(item)}>
              <Text style={styles.dropdownText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}>
        {filteredStores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={store.description}
            onPress={() => toggleModal(store)}
          />
        ))}
      </MapView>

      {/* Modal แสดงที่ด้านล่างของจอ */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.bottomModal}

        // coverScreen={false} // ✅ ทำให้หน้าหลังยังสามารถกดได้
        // backdropOpacity={0}  // ✅ เอาเงาดำออกเพื่อให้ดูเป็นส่วนหนึ่งของ UI
      >
        {selectedStore && (
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedStore?.image }} style={styles.modalImage} />
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>{selectedStore?.name || 'ไม่มีข้อมูล'}</Text>
              <Text style={styles.modalDescription}>{selectedStore?.description || 'ไม่มีรายละเอียด'}</Text>
              <Text style={styles.modalDescription2}>{selectedStore?.aboutdept || ''}</Text>


              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => openMap(selectedStore?.latitude, selectedStore?.longitude, selectedStore?.name)}
              >
                {distance !== null && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="map" size={24} color={'white'} style={{ marginRight: 10 }} />
                    <Text style={styles.modalDistance}>ห่างจากคุณ: ~{Math.round(distance / 1000)} กม.</Text>
                  </View>



                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#f9f9f9',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    maxHeight: 200,
    zIndex: 2,
    borderColor: '#ddd',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: { fontSize: 15, fontFamily: 'Kanit-Regular', },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,


  },
  modalContent: {
    flexDirection: 'row', // จัดเรียงรูปภาพกับข้อความให้อยู่ในแนวนอน
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center', // จัดเนื้อหาให้อยู่ตรงกลางแนวตั้ง
    height: '22%',
    marginBottom: 100,
    margin: 10,
  },
  modalImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 15, // ให้มีระยะห่างระหว่างภาพกับข้อความ
  },
  modalTextContainer: {
    flex: 1, // ให้กล่องข้อความขยายเต็มพื้นที่ที่เหลือ
  },
  modalTitle: {
    fontSize: 18, 
    fontFamily: 'Kanit-Regular',

  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Kanit-Regular',
  },
  modalDescription2: {
    fontSize: 11,
    marginBottom: 5,
    fontFamily: 'Kanit-Regular',
    color: '#787878',
  },
  modalDistance: {
    fontSize: 12,
    fontFamily: 'Kanit-Regular',
    color: 'white',
  },
  navigateButton: {
    backgroundColor: '#00a14b',
    borderColor: '#3180E1',
    borderWidth: 0,
    padding: 8,
    marginTop: 5,
    alignSelf: 'flex-start', // จัดปุ่มให้ชิดซ้าย
    borderRadius: 30,

  },
});