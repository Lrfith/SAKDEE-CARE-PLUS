import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { Platform, Linking } from 'react-native';
import stores from '../components/dataDept';
import Feather from '@expo/vector-icons/Feather';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Rating } from 'react-native-ratings';

export default function StoreInfoScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [region, setRegion] = useState(null); // ✅ ตั้งค่าเริ่มต้นเป็น null

  // ✅ สร้าง state สำหรับเก็บ region ของแผนที่
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      // ✅ อัปเดต region ให้แผนที่โฟกัสที่ตำแหน่งผู้ใช้
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
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

  const [rating, setRating] = useState(0);

  <Rating
    type="star"
    ratingCount={5}
    imageSize={30}
    startingValue={rating}
    onFinishRating={(value) => setRating(value)}
    style={{ paddingVertical: 10 }}
  />

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
        region={region} // ✅ ให้แผนที่ใช้ค่า region ของผู้ใช้
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
      // showsCompass={true}
      >
        {/* ✅ ใช้ Marker แสดงสาขาทั้งหมด */}
        {filteredStores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
              backgroundColor: '#3180E1',
            }}

            title={store.name}
            description={store.description}
            onPress={() => toggleModal(store)}
          >
            {/* ใช้ Image แทนไอคอน */}
            <Image source={require('../../assets/store-icon.png')} style={{ width: 40, height: 40 }} />
          </Marker>
        ))}
      </MapView>

      {/* ✅ ปุ่มกลับไปยังตำแหน่งของผู้ใช้ */}
      <TouchableOpacity style={styles.locationButton} onPress={() => {
        if (userLocation) {
          setRegion({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05, backgroundColor: '#3180E1',

            longitudeDelta: 0.05,
          });
        }
      }}>
        <Feather name="map-pin" size={24} color="white" />
      </TouchableOpacity>



      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.bottomModal}
      >
        {selectedStore && (
          <View style={styles.modalContent}>

            {/* แถวบน แบ่ง2คอลัม */}
            {/* คอลัมน์ที่ 1: รูปภาพสาขา) */}
            <View style={styles.imageColumn}>
              <Image source={{ uri: selectedStore?.image }} style={styles.modalImage} />
            </View>

            {/* คอลัมน์ที่ 2: ข้อความ + ปุ่มนำทาง) */}
            <View style={styles.textColumn}>
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

            {/* แถวล่าง (เต็มความกว้าง) */}
            <View style={styles.fullWidthColumn}>
              {/* ไอคอนเครื่องซักผ้าและเครื่องอบผ้า */}
              <View style={styles.laundryIcons}>
                {/* เครื่องซักผ้า */}
                <View style={styles.laundryItem}>
                  <MaterialIcons name="local-laundry-service" size={50} color='#3180E1' />
                  <Text style={styles.laundryTitle}>{selectedStore?.washing || ''}/6</Text>
                </View>

                {/* เส้นแบ่งกลาง (แนวตั้ง) */}
                <View style={styles.divider} />

                {/* เครื่องอบผ้า */}
                <View style={styles.laundryItem}>
                  <MaterialCommunityIcons name="tumble-dryer" size={50} color='#3180E1' />
                  <Text style={styles.laundryTitle}>{selectedStore?.dryer || ''}/4</Text>
                </View>
              </View>
            </View>

            <View style={styles.fullWidthColumn}>
              <View style={{ alignItems: 'center', marginVertical: 5, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Kanit-Regular' }}>ให้คะแนนสาขานี้</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  startingValue={rating}
                  onFinishRating={(value) => setRating(value)}
                  style={{ paddingLeft: 10 }}
                />
              </View></View>


          </View>
        )}
      </Modal>



    </View >
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
    fontFamily: 'Kanit-Regular',
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
    flexDirection: 'row',
    flexWrap: 'wrap', // จัดให้แถวล่างขึ้นบรรทัดใหม่
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 'auto',
    marginBottom: 120,
    margin: 10,
  },

  imageColumn: {
    flex: 2, // ให้รูปภาพใช้พื้นที่ 1 ส่วน
    alignItems: 'center', // จัดให้อยู่ตรงกลาง
  },

  textColumn: {
    flex: 3, // ให้ข้อความใช้พื้นที่ 2 ส่วน
    paddingLeft: 10,
  },

  modalImage: {
    width: 120,  // ปรับขนาดให้เหมาะสม
    height: 130,
    borderRadius: 10,
  },

  fullWidthColumn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  laundryIcons: {
    flexDirection: 'row', // จัดเรียงไอคอนให้อยู่ในบรรทัดเดียวกัน
    alignItems: 'center',
    justifyContent: 'center',
  },

  laundryItem: {
    alignItems: 'center',
    flexDirection: 'row', // จัดให้ไอคอนกับตัวเลขอยู่ในแนวนอน
    paddingHorizontal: 20, // ให้แต่ละไอคอนมีระยะห่างที่เหมาะสม
  },

  divider: {
    width: 2, // ความกว้างของเส้น
    height: '80%', // ความสูงของเส้น (ทำให้เส้นสูงขึ้นเล็กน้อย)
    backgroundColor: 'gray',
    marginHorizontal: 10, // ระยะห่างจากไอคอน
  },

  laundryTitle: {
    fontSize: 38,
    fontFamily: 'Kanit-Regular',
    marginLeft: 5, // เพิ่มระยะห่างระหว่างไอคอนกับตัวเลข
    color: 'gray',
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

  // ปุ่มนำทาง
  navigateButton: {
    backgroundColor: '#3180E1',
    //borderColor: '#fff',
    // borderWidth: 0,
    padding: 8,
    marginTop: 5,
    alignSelf: 'flex-start', // จัดปุ่มให้ชิดซ้าย
    borderRadius: 30,

  },

  locationButton: {
    position: 'absolute',
    bottom: 120, // ปรับตำแหน่งให้อยู่ด้านล่าง
    right: 20,  // ปรับให้อยู่ด้านขวา
    backgroundColor: '#3180E1',
    padding: 12,
    borderRadius: 30,
    elevation: 5, // เงา (Android)
    shadowColor: '#000', // เงา (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  rating: {

  },

});