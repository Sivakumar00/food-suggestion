import React from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors } from '../styles/colors';
import { AsyncCodes } from '../config/Constant';

const slides = [
  {
    key: 'first',
    title: 'Decide your food by your ingredients',
    text: 'The ambition of every good cook must be to make something very good with the fewest possible ingredients.',
    image: require('../../assets/cooking.png'),
    backgroundColor: colors.primary
  },
  {
    key: 'second',
    title: 'Nutrition matters',
    text:
      'Nutrition is the only remedy that can bring full recovery and can be used with any treatment. Remember, food is our best medicine!',
    image: require('../../assets/eating.png'),
    backgroundColor: colors.primary
  }
];
const AppIntro = props => {
  const _onDone = () => {
    AsyncStorage.setItem(AsyncCodes.IS_FIRST, 'true').then(() => {
      console.log('jajdlfja');
      props.navigation.navigate('Home');
    });
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.imageStyle} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View>
        <Text style={styles.title}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View>
        <Text style={styles.title}>Done</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppIntroSlider
        renderItem={_renderItem}
        slides={slides}
        onDone={_onDone}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  container: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  imageStyle: {
    width: '80%',
    height: '60%'
  }
});

export default AppIntro;
