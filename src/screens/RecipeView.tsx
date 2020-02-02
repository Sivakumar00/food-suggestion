import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../styles/colors';
import { getRecipeInstruction } from '../services/ReceipeService';
import Store from '../store/Store';

const RecipeView = props => {
  const { recipes } = props.route.params;
  const [recipeList, setRecipeList] = useState(recipes);

  const getIngredients = (option, item) => {
    var temp = item[option].map(item => item.name || null);
    return temp.join();
  };

  const handleOnClickRecipe = item => {
    Store.isLoading = true;
    getRecipeInstruction(item.id).then((response: any) => {
      if (response) {
        Store.isLoading = false;
        if (response[0].analyzedInstructions.length) {
          props.navigation.navigate('Instructions', {
            data: response[0]
          });
        } else {
          alert('No recipe instruction found for this item.');
        }
      }
    });
  };

  const renderRecipeList = ({ item, index }) => {
    return (
      <Card elevation={1} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ width: '100%', height: 350 }} onPress={() => handleOnClickRecipe(item)}>
          <View>
            <Image
              style={{ width: '100%', height: 200, borderRadius: 5, resizeMode: 'cover' }}
              source={{ uri: item.image }}
            />
            <View style={{ height: 100, width: '100%', padding: 10 }}>
              <Text style={styles.titleStyle}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>Used:</Text>
                <Text style={styles.ingredientStyle} numberOfLines={2}>
                  {getIngredients('usedIngredients', item)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>Missed:</Text>
                <Text style={styles.ingredientStyle} numberOfLines={2}>
                  {getIngredients('missedIngredients', item)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>Unused:</Text>
                <Text style={styles.ingredientStyle} numberOfLines={2}>
                  {getIngredients('unusedIngredients', item)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={{ width: '100%', height: '100%', padding: 10 }}>
      <FlatList data={recipeList} renderItem={renderRecipeList} keyExtractor={item => item.id + ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    padding: 3,
    color: colors.primary
  },
  heading: {
    fontSize: 14,
    padding: 3,
    color: 'grey',
    fontWeight: 'bold'
  },
  ingredientStyle: {
    fontSize: 14,
    color: 'grey',
    padding: 3
  }
});

export default RecipeView;
