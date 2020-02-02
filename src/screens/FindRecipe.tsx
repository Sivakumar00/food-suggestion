import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../styles/colors';
import { getRecipeByQuery, getRecipeInstruction } from '../services/ReceipeService';
import { ImageUrl } from '../config/Constant';
import { Card } from 'react-native-paper';

const FindRecipe = props => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  const handleOnClickSearch = () => {
    setIsLoading(true);
    getRecipeByQuery(searchText).then((response: any) => {
      if (response && response.results.length) {
        setRecipeList(response.results);
        setIsLoading(false);
      } else {
        alert('No results found !!');
      }
    });
  };

  const handleOnClickRecipe = item => {
    getRecipeInstruction(item.id).then((response: any) => {
      if (response) {
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
    //console.log(ImageUrl.RECIPE + item.image);
    let image = ImageUrl.RECIPE + item.image;
    return (
      <Card elevation={1} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ width: '100%', height: 320 }} onPress={() => handleOnClickRecipe(item)}>
          <View style={{ width: '100%', height: '100%' }}>
            <Image
              style={{ width: '100%', height: 250 }}
              source={{
                uri: 'https://spoonacular.com/recipeImages/teriyaki-chicken-2-143317.jpg'
              }}
            />
            <View style={{ height: 50, width: '100%', padding: 10 }}>
              <Text numberOfLines={2} style={{ color: colors.primary, fontSize: 17 }}>
                {item.title + '  (' + (item.readyInMinutes || '30') + ' mins)'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10
        }}
      >
        <View style={styles.textInputContainerStyle}>
          <TextInput
            placeholder={'Search Recipe'}
            style={styles.textInputStyle}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          {!!searchText && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Image source={require('../../assets/cancel.png')} style={styles.cancelImage} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={handleOnClickSearch}
          style={{
            borderRadius: 100,
            backgroundColor: colors.primary,
            width: 40,
            height: 40,
            alignItems: 'center',
            marginLeft: 5,
            marginRight: 10,
            justifyContent: 'center'
          }}
        >
          <Image
            source={require('../../assets/search.png')}
            style={{ width: 15, height: 15, padding: 10, tintColor: 'white' }}
          />
        </TouchableOpacity>
      </View>
      <FlatList data={recipeList} renderItem={renderRecipeList} keyExtractor={(item, index) => item.id + index + ''} />
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: 40,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10
  },
  textInputStyle: {
    width: '95%',
    height: 40
  },
  cancelImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain'
  }
});

export default FindRecipe;
