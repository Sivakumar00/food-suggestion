import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { colors } from '../styles/colors';
const NoConnection = props => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/artboard.png')} style={{ width: '100%', height: '40%' }} />
      <Text style={styles.text}>No network connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#428DFF'
  }
});
export default NoConnection;
