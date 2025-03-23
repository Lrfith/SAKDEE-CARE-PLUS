import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CustomSegmentedControl = ({ selectedIndex, setSelectedIndex }) => {
  return (
    <View style={styles.segmentedControl}>
      {['Tips', 'การดูแลเสื้อผ้า'].map((item, index) => (
        <Pressable
          key={index}
          style={styles.tab}
          onPress={() => setSelectedIndex(index)}
        >
          <Text style={[styles.text, selectedIndex === index && styles.activeText]}>
            {item}
          </Text>
        </Pressable>
      ))}
      <View style={[styles.underline, selectedIndex === 0 ? styles.left : styles.right]} />
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    overflow: 'hidden',
    fontFamily: 'Kanit-Regular',
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Kanit-Regular',
  },
  activeText: {
    color: '#3180E1',
    fontWeight: '600',

    fontFamily: 'Kanit-Regular',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#3180E1',
  },
  left: {
    left: '0%',
  },
  right: {
    left: '50%',
  },
});

export default CustomSegmentedControl; 