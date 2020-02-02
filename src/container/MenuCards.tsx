import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, Image } from 'react-native';
import { colors } from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MenuList = [
  {
    image: require('../../assets/idea.png'),
    label: 'Food Suggestion',
    screen: 'Food Suggestion'
  },
  {
    image: require('../../assets/recipe.png'),
    label: 'Find recipe',
    screen: 'FindRecipe'
  },
  {
    image: require('../../assets/recipe.png'),
    label: 'Videos',
    screen: 'Videos'
  }
];
const MenuCards = props => {
  const renderMenuItems = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => props.navigation.navigate(item.screen)}>
        <Image source={item.image} style={styles.imageStyles} />
        <Text style={styles.labelStyles}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => {
    return item.label;
  };

  return (
    <View style={styles.menuContainer}>
      <FlatList
        contentContainerStyle={styles.listStyle}
        data={MenuList}
        renderItem={renderMenuItems}
        numColumns={2}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#f0f0f7',
    padding: 8
  },
  cardContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').width / 2 - 20,
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyles: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  labelStyles: {
    color: colors.primary,
    fontSize: 15,
    paddingTop: 10,
    fontWeight: 'bold'
  }
});
export default MenuCards;
