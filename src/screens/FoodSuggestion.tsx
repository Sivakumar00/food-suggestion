import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { colors } from '../styles/colors';
import { useDebounce } from '../utils/useDebounce';
import { getAutoCompleteIngredients } from '../services/IngredientsService';
import { ImageUrl } from '../config/Constant';
import { getFoodSuggestion } from '../services/ReceipeService';

const FoodSuggestion = props => {
  const [searchText, setSearchText] = useState('');
  const [showAutoComplete, setAutoComplete] = useState(false);
  const [autoCompleteList, setAutoCompleteList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const debouncedSearchTerm = useDebounce(searchText, 800);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      updateSearch(debouncedSearchTerm).then(results => {
        setIsLoading(false);
        setAutoCompleteList(results);
      });
    } else {
      setIsLoading(false);
      setAutoCompleteList([]);
    }
  }, [debouncedSearchTerm]);

  const updateSearch = (searchText: string) => {
    return getAutoCompleteIngredients(searchText)
      .then((response: any) => {
        return response;
      })
      .catch(error => {
        alert(error.message);
        return [];
      });
  };

  const handleOnClickAutoComplete = (item, index) => {
    let ingredients = ingredientsList;
    if (!ingredients.includes(item)) {
      ingredients.push(item);
      setIngredientsList(ingredients);
      setAutoCompleteList([]);
      setSearchText('');
    }
  };

  const handleOnDelete = (item, index) => {
    let list = ingredientsList.filter((item, i) => index !== i);
    setIngredientsList(list);
  };

  const renderIngredientsList = ({ item, index }) => {
    return (
      <View style={styles.ingredientItemStyle}>
        <Image source={{ uri: ImageUrl.INGREDIENTS + item.image }} style={styles.ingredientsImage} />
        <Text style={styles.ingredientsText}>{item.name}</Text>
        <TouchableOpacity style={styles.deleteContainer} onPress={() => handleOnDelete(item, index)}>
          <Image source={require('../../assets/delete.png')} style={styles.deleteImage} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={styles.emptyText}> No Ingredients added </Text>
      </View>
    );
  };

  const renderEmptyAutoCompleteList = () => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  const renderAutoCompleteList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.autocompleteItemStyles} onPress={() => handleOnClickAutoComplete(item, index)}>
        <Image source={{ uri: ImageUrl.INGREDIENTS + item.image }} style={styles.thumbnailImage} />
        <Text style={styles.autocompleteTextStyles}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleOnClickNext = () => {
    setIsLoading(true);
    let list = [];
    ingredientsList.forEach(item => {
      list.push(item.name);
    });
    let query = list.toString();
    getFoodSuggestion(query).then((response: any[]) => {
      if (response.length) {
        props.navigation.navigate('Recipes', {
          recipes: response
        });
        setIsLoading(false);
      } else {
        alert('No food recipe available for this ingredients');
        setIsLoading(false);
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainerStyle}>
        <TextInput
          placeholder={'Search Ingredients'}
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
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => Math.random() + ''}
          contentContainerStyle={{ width: '100%', height: '100%' }}
          data={ingredientsList}
          renderItem={renderIngredientsList}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
      {!!ingredientsList.length && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleOnClickNext} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.nextText}>Next</Text>}
        </TouchableOpacity>
      )}
      {!!searchText && (
        <View style={styles.autocompleteList}>
          <FlatList
            keyExtractor={item => Math.random() + ''}
            data={autoCompleteList.slice()}
            renderItem={renderAutoCompleteList}
            ListEmptyComponent={renderEmptyAutoCompleteList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white'
  },
  emptyText: {
    color: 'grey',
    fontSize: 17,
    textAlign: 'center'
  },
  autocompleteList: {
    position: 'absolute',
    top: 50,
    left: 30,
    right: 30,
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  deleteContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  deleteImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  autocompleteItemStyles: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  ingredientsText: {
    width: '60%',
    fontSize: 18,
    margin: 10
  },
  ingredientsImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 10
  },
  ingredientItemStyle: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'grey',
    marginTop: 7
  },
  thumbnailImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  textInputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10
  },
  autocompleteTextStyles: {
    fontSize: 17,
    paddingLeft: 10,
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
  },
  listContainer: {
    width: '100%',
    height: '100%',
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  nextBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextText: {
    color: 'white',
    fontSize: 18
  }
});
export default FoodSuggestion;
