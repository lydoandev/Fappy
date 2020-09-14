import React from 'react'
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';

export default class UploadFile extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
        
      }
    })
  }

  uploadImage = async () => {
    const { uri } = this.state.photo;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    
    await storage()
    .ref('images/' + filename)
    .putFile(uri);
    let imageRef = storage().ref('images/' + filename);
    let finalUrl = await imageRef
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
    return finalUrl;
  }

  saveProduct = async () => {
    const url = await this.uploadImage();
    console.log('final: ', url);
  }

  render() {
    const { photo } = this.state;
    console.log('hihi', photo);
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={this.handleChoosePhoto}>
          <Text style={styles.btnText}>Choose</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.saveProduct}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#F2A90F',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15
  }
})
