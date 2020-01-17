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
const AppContainer = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={HomeOption} />
        <Stack.Screen name="AppIntro" component={AppIntro} options={HomeOption} />
        <Stack.Screen name="Food Suggestion" component={FoodSuggestion} options={FoodSuggestionOption} />
      </Stack.Navigator>
    </NavigationNativeContainer>
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
