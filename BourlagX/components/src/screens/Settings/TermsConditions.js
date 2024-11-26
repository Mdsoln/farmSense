import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutSettings = () => {
  return (
    <View style={styles.container}>
      <Text>About the App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutSettings;
