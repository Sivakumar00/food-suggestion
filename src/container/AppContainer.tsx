import React from 'react';
import Home from '../screens/Home';
import AppIntro from '../screens/AppIntro';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const HomeOption = {
  headerShown: false
};
const AppContainer = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={HomeOption} />
        <Stack.Screen name="AppIntro" component={AppIntro} options={HomeOption} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};
export default AppContainer;
