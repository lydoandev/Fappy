import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native'

export default class ModalNotification extends Component {
  navigateTo = () => {
    this.props.navigateToCall()
  }
  render() {
    const { text, textButton, textButton2 } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible();
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={{ textAlign: 'center' }}>{text}</Text>
            <View style={styles.buttonContent}>
              <TouchableOpacity
                style={[styles.btnAnother, { display: textButton2 ? 'flex' : 'none' }]}
                onPress={() => {
                  this.props.setModalVisible();
                }}>
                <Text style={styles.anotherText}>{textButton2}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnRegister, { display: textButton ? 'flex' : 'none' }]}
                onPress={this.navigateTo}>
                <Text style={styles.registerText}>{textButton}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },

  contentContainer: {
    backgroundColor: '#ffffff',
    width: "90%",
    borderRadius: 10,
    padding: 20
  },

  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },

  btnAnother: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F2A90F'
  },
  anotherText: {
    color: '#F2A90F',
    textAlign: 'center',
  },
  btnRegister: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#F2A90F',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  registerText: {
    color: '#fff',
    textAlign: 'center',
  }
})