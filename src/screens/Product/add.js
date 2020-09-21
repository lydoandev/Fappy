import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Picker,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import database from '@react-native-firebase/database'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchProducts } from '../../redux/productRedux/actions';
import ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';

class AddProd extends Component {
  constructor(props) {
    super(props);
    const { name, cateId, createAt, image, price, quantity, timeUsed, unit } = this.props.product;
    this.state = {
      cateId: cateId || 'CT1',
      name: name || '',
      createAt: createAt || '',
      photo: image ? { uri: image } : image,
      price: price || '',
      quantity: quantity || '',
      sellerId: this.props.user.storeId,
      timeUsed: timeUsed || '',
      unit: unit || ''
    };
    Navigation.events().bindComponent(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.product !== prevProps.product) {
      const { name, cateId, createAt, image, price, quantity, timeUsed, unit } = this.props.product;
      this.setState({
        cateId: cateId || 'CT1',
        name: name || '',
        createAt: createAt || '',
        photo: image || '',
        price: price || '',
        quantity: quantity || '',
        sellerId: this.props.user.storeId,
        timeUsed: timeUsed || '',
        unit: unit || ''
      })
    }
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };
  addNew = async () => {
    let currentTime = moment().format();
    const prodRef = database().ref('products');
    const { photo } = this.state;
    var url = "https://firebasestorage.googleapis.com/v0/b/fappymanagement.appspot.com/o/images%2Fc6dc940457e1a8e6fc55082fd10dd04c.png?alt=media&token=0da4a526-9f18-4cfe-aedf-8d97c37543f6";
    if (photo) {
      url = await this.uploadImage();
    }

    const key = prodRef.push().key;

    var product = {
      id: key,
      cateId: this.state.cateId,
      createAt: currentTime,
      image: url,
      price: this.state.price,
      quantity: this.state.quantity,
      name: this.state.name,
      sellerId: this.props.user.storeId,
      timeUsed: this.state.timeUsed,
      unit: this.state.unit,

    };
    database().ref('/products').child(key).update(product).then((product) => {
      this.props.onFetchProducts();
    })
    Alert.alert(
      "Fappy",
      "Thêm sản phẩm thành công"
    );
    Navigation.dismissModal(this.props.componentId);
  };

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

  saveUpdate = async() => {
    const prodRef = database().ref('products');
    const { photo } = this.state;
    var url = this.props.product.image;
    if (photo.uri != this.props.product.image) {
      url = await this.uploadImage();
    }

    const { name, cateId, createAt, image, price, quantity, timeUsed, unit } = this.state;

    const newProduct = {
      ...this.props.product,
      name,
      cateId,
      image: url,
      price,
      quantity,
      timeUsed,
      unit,
      updatedAt: moment().format()
    }

    database().ref('/products').child(this.props.product.id).update(newProduct).then((product) => {
      this.props.onFetchProducts();
    })
    Alert.alert(
      "Fappy",
      "Sửa sản phẩm thành công"
    );
    Navigation.dismissModal(this.props.componentId);
  }

  onChangeCate = (text) => {
    console.log('tẽt: ', text);
    this.setState({ cateId: text })
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId == 'left') {
      Navigation.dismissAllModals();
    }
  };

  render() {
    const { photo, cateId } = this.state;
    const { isUpdate } = this.props;
    console.log('This satte: ', this.state);
    
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 10, flex: 1, margin: 15, flexDirection: 'column' }}>
          <View style={styles.form}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Tên sản phẩm</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Thể loại</Text>
              <View style={{ borderColor: '#111', borderWidth: 1, height: 50, width: 150, borderRadius: 5, marginVertical: 10 }}>
                <Picker
                  selectedValue={cateId}
                  style={{ height: 50, width: 150 }}
                  onValueChange={this.onChangeCate}>
                  <Picker.Item label="Nguyên liệu" value="CT1" />
                  <Picker.Item label="Món ăn" value="CT2" />
                </Picker>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Giá</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ price: text })}
                value={this.state.price}
                keyboardType='numeric'
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Số lượng</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ quantity: text })}
                value={this.state.quantity}
                keyboardType='numeric'
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Thời hạn sử dụng</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ timeUsed: text })}
                value={this.state.timeUsed}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Đơn vị</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ unit: text })}
                value={this.state.unit}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Hình ảnh</Text>
              {photo && (
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <TouchableOpacity
                style={styles.btn}
                onPress={this.handleChoosePhoto}>
                <Text style={styles.btnText}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <TouchableOpacity onPress={isUpdate ? this.saveUpdate : this.addNew} style={styles.btn}>
                <Text style={styles.btnText}>{isUpdate ? 'Thay đổi' : 'Thêm Mới'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
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
  },
  field: {
    marginTop: 15,
    alignItems: 'center'
  },
  img: {
    height: 100,
    width: 100,
    marginLeft: 110,
  },
  errs: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    isAuthenticated: state.userReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch(logout(user)),
    onFetchProducts: () => dispatch(fetchProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProd);
