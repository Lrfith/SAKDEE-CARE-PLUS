import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const SymbolsScreen = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([1, 2, 3, 4, 5, 6]); // All symbols selected by default

  const handleSymbolPress = (index) => {
    // Toggle selection - if already selected, deselect, otherwise select
    setSelectedSymbols((prevSelectedSymbols) =>
      prevSelectedSymbols.includes(index)
        ? prevSelectedSymbols.filter((symbol) => symbol !== index) // Deselect symbol
        : [...prevSelectedSymbols, index] // Select symbol
    );
  };

  const getSymbolStyle = (index) => {
    // Check if the current symbol is selected or not and apply the respective style
    return selectedSymbols.includes(index) ? styles.selectedSymbol : styles.symbol;
  };

  return (
    <View style={styles.container}>
      {/* Symbol 1 */}
      <TouchableOpacity onPress={() => handleSymbolPress(1)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(1)}
          />
        </View>
      </TouchableOpacity>

      {/* Symbol 2 */}
      <TouchableOpacity onPress={() => handleSymbolPress(2)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(2)}
          />
        </View>
      </TouchableOpacity>

      {/* Symbol 3 */}
      <TouchableOpacity onPress={() => handleSymbolPress(3)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(3)}
          />
        </View>
      </TouchableOpacity>

      {/* Symbol 4 */}
      <TouchableOpacity onPress={() => handleSymbolPress(4)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(4)}
          />
        </View>
      </TouchableOpacity>

      {/* Symbol 5 */}
      <TouchableOpacity onPress={() => handleSymbolPress(5)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(5)}
          />
        </View>
      </TouchableOpacity>

      {/* Symbol 6 */}
      <TouchableOpacity onPress={() => handleSymbolPress(6)}>
        <View style={styles.symbolContainer}>
          <Image
            source={require('../../assets/laundry_symbols/question.png')} // replace with your logo path
            style={getSymbolStyle(6)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  symbolContainer: {
    backgroundColor: '#BDC0C3',
    width: 90,
    height: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  symbol: {
    width: 50,
    height: 50,
    tintColor: '#6c757d',  // Default color (if you want a different default color)
  },
  selectedSymbol: {
    width: 50,
    height: 50,
    tintColor: '#3180E1', // Change color to red when selected (change to any color of your choice)
  },
});

export default SymbolsScreen;
