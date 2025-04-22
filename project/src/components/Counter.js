import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = ({ value = 0, onChange }) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    onChange?.(count);
  }, [count]);

  const decrease = () => {
    if (count > 0) setCount(prev => prev - 1);
  };

  const increase = () => {
    if (count < 20) setCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={decrease}
        disabled={count <= 0}
        style={[styles.button, count <= 0 && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>

      <View style={styles.countBox}>
        <Text style={styles.countText}>{count}</Text>
      </View>

      <TouchableOpacity
        onPress={increase}
        disabled={count >= 99}
        style={[styles.button, count >= 99 && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.3,
  },
  countBox: {
    width: 50,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  countText: {
    fontSize: 20,
  },
});

export default Counter;
