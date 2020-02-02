import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import HomeStore from '../store/HomeStore';
import { colors } from '../styles/colors';

interface IModal {
  children: any;
}

const ModalContainer = (props: IModal) => {
  return (
    <Modal animationType="fade" transparent={true} visible={HomeStore.isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalSubContainer}>
          {props.children}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              HomeStore.isModalVisible = false;
            }}
          >
            <Text style={styles.btnTextStyle}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    elevation: 2
  },
  modalSubContainer: {
    width: '90%',
    height: '45%',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  buttonStyle: {
    position: 'absolute',
    bottom: -1,
    width: '100%',
    height: 40,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTextStyle: {
    color: colors.white,
    textAlign: 'center',
    width: '100%',
    fontSize: 16
  }
});

export default ModalContainer;
