import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert 
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {register} from '../../redux/userRedux/action';
import {AsyncStorage} from 'react-native';
import * as userActions from '../../redux/userRedux/action'
import database from '@react-native-firebase/database'
import Loading from '../../components/Loading/Loading'

let addUser = item => {
  database().ref('/users').push(item);
};
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Van',
      lastName: 'Le Thi Thuy',
      email: 'vanle@gmail.com',
      password: '123456',
      confPassword: '123456',
      phone: '0123456789',
      role:'Seller',
      status:'Active',
      id:'',
      storeId:'',
      errs:'',
      loading: false
    };
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({buttonId}) => {
    console.log('buttonId', buttonId);
    const {componentId} = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };
  register = async() => {
    if(this.state.password == this.state.confPassword){
      this.setState({
        loading: true
      })
      const userRef = database().ref('users')
      const key = userRef.push().key
      var fullName = this.state.lastName + " " + this.state.firstName;
      var user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullName: fullName,
        password: this.state.password,
        phone: this.state.phone,
        role: this.state.role,
        status: this.state.status,
        id: key,
        storeId:'RES1'
      };
      await database().ref('/users').child(key).update(user).then((user) => {
        this.props.register(user);
        this.props.onUpdateDeviceToken();
        this.setState({
          loading: false
        })
      })
      
      Navigation.dismissModal(this.props.componentId);
    }else{
      this.setState({errs: "Mật khẩu xác nhận không đúng"})
    }
  };
  render() {
    const { isAuthenticated } = this.props;
    const { loading } = this.state;

    if (isAuthenticated) {
      Navigation.setRoot({
        root: {
          sideMenu
        }
      })
    }
    if (loading) {
      return (
        <Loading></Loading>
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.field}>
              <Text>Họ và tên lót</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({lastName: text})}
                value={this.state.lastName}
              />
            </View>
            <View style={styles.field}>
              <Text>Tên</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({firstName: text})}
                value={this.state.firstName}
              />
            </View>
            <View style={styles.field}>
              <Text>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true} 
              />
            </View>
            <View style={styles.field}>
              <Text>Mật khẩu xác nhận</Text>
              <TextInput
                secureTextEntry={true} 
                style={styles.input}
                onChangeText={text => this.setState({confPassword: text})}
                value={this.state.confPassword}
              />
            </View>
            <View style={styles.field}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
                keyboardType='email-address'
              />
            </View>
            <View style={styles.field}>
              <Text>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({phone: text})}
                value={this.state.phone}
                keyboardType='numeric'
                maxLength={11}
              />
            </View>
            <View style={styles.errs}>
              <Text style={{color: '#FFA07A'}}>{this.state.errs}</Text>
            </View>
            <TouchableOpacity style={styles.field} onPress={this.register}>
              <Text style={styles.btn}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    users: state.userReducer.user,
    errs: state.userReducer.errs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user)),
    onUpdateDeviceToken: () => dispatch(userActions.updateDeviceToken()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  form: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    height: 50,
    width: 150,
    backgroundColor: '#00BFFF',
    textAlign: 'center',
    paddingTop: 13,
    marginLeft: 85,
    marginBottom: 10,
    marginTop: -10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
  },
  btn: {
    height: 50,
    backgroundColor: '#DAA520',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    color: '#fff',
    fontWeight: "bold",
    borderRadius: 13,
    fontSize: 20,
    marginTop: -15,
  },
  field: {
    marginLeft: 20,
    marginRight: 20,
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
