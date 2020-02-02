import React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import AppIntro from '../screens/AppIntro';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodSuggestion from '../screens/FoodSuggestion';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../styles/colors';
import RecipeView from '../screens/RecipeView';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Store from '../store/Store';
import RecipeInstructions from '../screens/RecipeInstructions';
import FindRecipe from '../screens/FindRecipe';
import Videos from '../screens/Videos';
import VideoScreen from '../screens/VideoScreen';

const Stack = createStackNavigator();
const HomeOption = {
  headerShown: false
};
const FoodSuggestionOption = {
  title: 'Food Suggestion',
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.white
};

const RecipeViewOption = {
  title: 'Recipes',
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.white
};

const Instructions = {
  title: 'Instructions',
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.white
};

const FindRecipeOption = {
  title: 'Find Recipe',
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.white
};

const videoOption = {
  title: 'Videos',
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.white
};

const AppContainer = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <NavigationNativeContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={HomeOption} />
          <Stack.Screen name="AppIntro" component={AppIntro} options={HomeOption} />
          <Stack.Screen name="Food Suggestion" component={FoodSuggestion} options={FoodSuggestionOption} />
          <Stack.Screen name="Recipes" component={RecipeView} options={RecipeViewOption} />
          <Stack.Screen name="Instructions" component={RecipeInstructions} options={Instructions} />
          <Stack.Screen name="FindRecipe" component={FindRecipe} options={FindRecipeOption} />
          <Stack.Screen name="Videos" component={Videos} options={videoOption} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} options={videoOption} />
        </Stack.Navigator>
      </NavigationNativeContainer>
      <ProgressDialog visible={Store.isLoading} title="Loading" message="Please wait..." />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    width: '100%'
  }
});
export default AppContainer;
