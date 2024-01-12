import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButton = (props) => {
  const { func, refreshKey } = props
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleToggle = (choice) => {
    setSelectedChoice(choice);
    func(choice)
  };

  useEffect(() => {
    setSelectedChoice(null)
  }, [refreshKey])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedChoice === 'day' && styles.selectedButton]}
        onPress={() => handleToggle('day')}
      >
        <Text style={styles.buttonText}>Day</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedChoice === 'month' && styles.selectedButton]}
        onPress={() => handleToggle('month')}
      >
        <Text style={styles.buttonText}>Month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedChoice === 'year' && styles.selectedButton]}
        onPress={() => handleToggle('year')}
      >
        <Text style={styles.buttonText}>Year</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginLeft: 5
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 3
  },
  selectedButton: {
    backgroundColor: 'lightgrey',
    borderColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
  },
});

export default ToggleButton;
