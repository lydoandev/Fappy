import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Picker
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import database from '@react-native-firebase/database'

let addProduct = item => {
  database().ref('/products').push(item);
};
class AddProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cateId: 'CT2',
      name: 'Bánh da lợn',
      createAt: '',
      image: 'https://thamhiemmekong.com/wp-content/uploads/2019/10/banh-da-lon-2.jpg',
      price: 20000,
      quantity: 3,
      sellerId:'RES1',
      timeUsed:6,
      unit:'cái'
    };
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({buttonId}) => {
    const {componentId} = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };
  addNew = () => {
    let currentTime = new Date().toLocaleString()
    var product = {
      cateId: this.state.cateId,
      createAt: currentTime,
      image: this.state.image,
      price: this.state.price,
      quantity: this.state.quantity,
      name: this.state.name,
      sellerId: this.state.sellerId,
      timeUsed: this.state.timeUsed,
      unit: this.state.unit
    };
    addProduct(product);
    Alert.alert(
      "Fappy",
      "Thêm sản phẩm thành công"
    );
    Navigation.dismissModal(this.props.componentId);
  };
  componentDidMount() {
    AsyncStorage.getItem('user').then((val) => {
        let tUserInfo = JSON.parse(val);
        this.setState({ 
          sellerId : tUserInfo.sellerId
         });
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.field}>
              <Text>Tên sản phẩm</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
              />
            </View>
            <View style={styles.field}>
              <Text>Thể loại</Text>
              <Picker
                style={{ height: 50, width: 150 }}
                onValueChange={text => this.setState({cateId: text})}>
                <Picker.Item label="Nguyên liệu" value="CT1" />
                <Picker.Item label="Món ăn" value="CT2" />
            </Picker>
            </View>
            <View style={styles.field}>
              <Text>Giá</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({price: text})}
                value={this.state.price}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.field}>
              <Text>Số lượng</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({quantity: text})}
                value={this.state.quantity}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.field}>
              <Text>Thời hạn sử dụng</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({timeUsed: text})}
                value={this.state.timeUsed}
              />
            </View>
            <View style={styles.field}>
              <Text>Đơn vị</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({unit: text})}
                value={this.state.unit}
              />
            </View>
            <TouchableOpacity style={styles.field} onPress={this.addNew}>
              <Text style={styles.btn}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AddProd;

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
    height: 50,
    width: 100,
    backgroundColor: '#DAA520',
    textAlign: 'center',
    paddingTop: 15,
    marginLeft: 85,
    marginBottom: 10,
    color: '#fff',
    borderRadius: 3,
  },
  field: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
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
});
