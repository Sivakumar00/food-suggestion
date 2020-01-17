import React, { useEffect } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Modal, Image } from 'react-native';
import { AsyncCodes } from '../config/Constant';
import { observer } from 'mobx-react';
import Constants from 'expo-constants';
import { colors } from '../styles/colors';
import AskQuestion from '../container/AskQuestion';
import HomeStore from '../store/HomeStore';
import ModalContainer from '../container/ModalContainer';
import MenuCards from '../container/MenuCards';

const Home = observer(props => {
  useEffect(() => {
    isFirstCheck().then(isFirstCheck => {
      if (isFirstCheck) props.navigation.navigate('AppIntro');
    });
  }, []);

  const isFirstCheck = async () => {
    return (await AsyncStorage.getItem(AsyncCodes.IS_FIRST)) ? false : true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <View style={styles.container}>
        <AskQuestion />
        <MenuCards {...props} />

        {HomeStore.isModalVisible && (
          <ModalContainer>
            <View style={styles.modalContainer}>
              <Image
                source={
                  HomeStore.modalData.image
                    ? { uri: HomeStore.modalData.image }
                    : require('../../assets/veg_stock.jpeg')
                }
                style={styles.imageStyles}
              />
              <Text style={styles.textTitle}>{HomeStore.modalData.data}</Text>
            </View>
          </ModalContainer>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: Constants.statusBarHeight,
    width: '100%',
    backgroundColor: colors.primary
  },
  modalContainer: {
    alignItems: 'center',
    padding: 10
  },
  imageStyles: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  textTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: 'grey'
  }
});
export default Home;
