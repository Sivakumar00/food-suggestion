import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { colors } from '../styles/colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FlatList } from 'react-native-gesture-handler';

const RecipeInstructions = props => {
  const { data } = props.route.params;
  const [info, setInfo] = useState(data);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    setIngredients(info.extendedIngredients);
    setInstructions(info.analyzedInstructions[0].steps);
  }, []);

  const handleOnSubmitClicked = () => {
    props.navigation.goBack();
  };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={{ width: '100%' }}>
        <Text numberOfLines={1} style={styles.titleStyle}>{`${info.title} (${info.cookingMinutes || 30}mins)`}</Text>
      </View>
      <View style={{ width: '100%', height: '100%' }}>
        <ProgressSteps>
          <ProgressStep label="Ingredients" nextBtnTextStyle={styles.nxtBtn} previousBtnTextStyle={styles.nxtBtn}>
            <ScrollView>
              {ingredients.map((item, index) => {
                return (
                  <View style={{ width: '100%', height: 50, flexDirection: 'row', padding: 10 }}>
                    <Text numberOfLines={1} style={{ width: '40%', fontWeight: 'bold' }}>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ width: '60%' }}>
                      {item.originalString}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </ProgressStep>
          <ProgressStep
            label="Instructions"
            nextBtnTextStyle={styles.nxtBtn}
            previousBtnTextStyle={styles.nxtBtn}
            onSubmit={handleOnSubmitClicked}
          >
            <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
              {instructions.map((item, index) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      borderColor: 'grey',
                      borderWidth: 0.6,
                      padding: 7,
                      marginTop: 10,
                      borderRadius: 5
                    }}
                  >
                    <View></View>
                    <Text>{item.number + ') ' + item.step}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 17,
    color: colors.primary,
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    padding: 7,
    borderBottomColor: 'grey',
    borderWidth: 0.8
  },
  nxtBtn: {
    color: colors.primary,
    padding: 5
  }
});
export default RecipeInstructions;
