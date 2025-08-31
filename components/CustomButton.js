import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#76d99c',
    paddingHorizontal: Math.max(20, width * 0.05),
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 8,
    minWidth: Math.max(120, width * 0.3),
    alignItems: 'center',
    shadowColor: '#040811',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#040811',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomButton;
