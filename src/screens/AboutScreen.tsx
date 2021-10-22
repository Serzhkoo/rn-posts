import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const AboutScreen: React.FC = () => {
  return (
    <View style={styles.center}>
      <Text>AboutScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
