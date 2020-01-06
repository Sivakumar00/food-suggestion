import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';
import { askQuestions } from '../services/Questions';
import HomeStore from '../store/HomeStore';

const AskQuestion = observer(props => {
  const [question, setQuestion] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handleOnClickSendBtn = () => {
    setisLoading(true);
    askQuestions({ q: question }).then((response: any) => {
      console.log(JSON.stringify(response));
      HomeStore.modalData = {
        image: response.image,
        data: response.answer
      };
      setisLoading(false);
      setQuestion('');
      HomeStore.isModalVisible = true;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      <Text style={styles.description}>You can ask questions about foods and nutritions</Text>

      <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
        <TextInput
          style={styles.questionText}
          placeholder={'How much vitamin C is in 2 apples?'}
          onChangeText={text => setQuestion(text)}
          value={question}
        />
        <TouchableOpacity style={styles.recordBtn} onPress={handleOnClickSendBtn}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            <Image source={require('../../assets/right.png')} style={styles.recordImage} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  questionText: {
    backgroundColor: colors.white,
    width: '77%',
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 10
  },
  heading: {
    width: '100%',
    paddingLeft: 20,
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    paddingTop: 20,
    paddingBottom: 20
  },
  recordImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.primary
  },
  recordBtn: {
    padding: 7,
    backgroundColor: colors.white,
    borderRadius: 100
  },
  description: {
    width: '100%',
    color: colors.white,
    textAlign: 'left',
    marginLeft: 20,
    padding: 10
  }
});

export default AskQuestion;
