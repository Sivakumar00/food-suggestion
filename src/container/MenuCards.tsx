import React from 'react';
import { View, StyleSheet } from 'react-native';

const MenuList = [
  {
    image: '',
    label: '',
    onPress: () => {}
  }
];
const MenuCards = props => {
  return <View style={styles.menuContainer}></View>;
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});
export default MenuCards;
