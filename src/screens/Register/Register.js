import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { register } from '../../redux/userRedux/action';
import { AsyncStorage } from 'react-native';
import * as userActions from '../../redux/userRedux/action'
import database from '@react-native-firebase/database'
import Loading from '../../components/Loading/Loading'
import { sideMenu } from '../../config/bottomTab'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Van',
      firstNameError: '',
      lastName: 'Le Thi Thuy',
      lastNameError: '',
      email: 'vanle@gmail.com',
      emailError: '',
      password: '12345678',
      passwordError: '',
      confPassword: '12345678',
      confPasswordError: '',
      phone: '0123456789',
      phoneError: '',
      role: 'Seller',
      status: 'Active',
      id: '',
      storeId: '',
      errs: '',
      loading: false
    };
    Navigation.events().bindComponent(this);
  }

  isValidated = () => {
    let isValid = true
    const { firstName, lastName, email, phone, password, confPassword } = this.state
    let { firstNameError, lastNameError, emailError, phoneError, passwordError, confPasswordError } = this.state

    firstNameError = ""
    lastNameError = ""
    emailError = ""
    phoneError = ""
    passwordError = ""
    confPasswordError = ""

    const nameRgx = /^[a-zA-Z ]+$/
    const emailRex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRgx = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/

    if (!firstName) {
      firstNameError = "Tên là trường bắt buộc"
      isValid = false
    } else if (!nameRgx.test(firstName.toLowerCase())) {
      firstNameError = "Tên không hợp lệ"
      isValid = false
    }

    if (!lastName) {
      lastNameError = "Họ và tên đệm là trường bắt buộc"
      isValid = false
    } else if (!nameRgx.test(lastName.toLowerCase())) {
      lastNameError = "Họ và tên đệm không hợp lệ"
      isValid = false
    }

    if (!email) {
      emailError = "Email là trường bắt buộc"
      isValid = false
    } else if (!emailRex.test(email.toLowerCase())) {
      emailError = "Email không hợp lệ"
      isValid = false
    }

    if (!phone) {
      phoneError = "Số điện thoại là trường bắt buộc"
      isValid = false
    } else if (!phoneRgx.test(phone.toLowerCase())) {
      phoneError = "Số điện thoại không hợp lệ"
      isValid = false
    }

    if (!password) {
      passwordError = "Mật khẩu là trường bắt buộc"
      isValid = false
    } else if (password.length < 8) {
      passwordError = "Mật khẩu phải chứa ít nhất 8 kí tự"
      isValid = false
    }

    if (!confPassword) {
      confPasswordError = "Mật khẩu là trường bắt buộc"
      isValid = false
    } else if (password !== confPassword) {
      confPasswordError = "Mật khẩu không khớp"
      isValid = false
    }

    this.setState({ firstNameError, lastNameError, emailError, phoneError, passwordError, confPasswordError })

    return isValid
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId == 'left') {
      Navigation.dismissAllModals();
    }
  };

  checkPhoneExist = async () => {
    this.setState({ phoneError: '' });
    let result = false
    const { phone } = this.state
    const userRef = database().ref('users')
    await userRef.orderByChild('phone')
      .equalTo(phone)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          result = true
          this.setState({ phoneError: 'Số điện thoại đã tồn tại' });
        }
      })
    return result
  }

  checkEmailExist = async () => {
    this.setState({ emailError: '' });
    let result = false
    const { email } = this.state
    const userRef = database().ref('users')
    await userRef.orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          result = true
          this.setState({ emailError: 'Email đã tồn tại' });
        }
      })
    return result
  }

  navigationButtonPressed = ({ buttonId }) => {
    console.log('buttonId', buttonId);
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };

  register = async () => {
    if (this.isValidated()) {
      this.setState({ loading: true })
      const isPhoneExists = await this.checkPhoneExist()
      const isEmailExists = await this.checkEmailExist()
      if (!isPhoneExists && !isEmailExists) {
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
          deviceToken: '',
          // storeId: 'RES1'
        };
        await userRef.child(key).set(user)
        this.props.register(user);
        // this.props.onUpdateDeviceToken();
        Navigation.dismissModal(this.props.componentId);
      }
      this.setState({ loading: false })
    }
  };
  render() {
    const { isAuthenticated } = this.props;
    const { loading, firstNameError, lastNameError, emailError, phoneError, passwordError, confPasswordError } = this.state

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
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              <Text style={styles.errorMessage}>{lastNameError || ""}</Text>
            </View>
            <View style={styles.field}>
              <Text>Tên</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
              />
              <Text style={styles.errorMessage}>{firstNameError || ""}</Text>
            </View>
            <View style={styles.field}>
              <Text>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={true}
              />
              <Text style={styles.errorMessage}>{passwordError || ""}</Text>
            </View>
            <View style={styles.field}>
              <Text>Mật khẩu xác nhận</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => this.setState({ confPassword: text })}
                value={this.state.confPassword}
              />
              <Text style={styles.errorMessage}>{confPasswordError || ""}</Text>
            </View>
            <View style={styles.field}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                keyboardType='email-address'
              />
              <Text style={styles.errorMessage}>{emailError || ""}</Text>
            </View>
            <View style={styles.field}>
              <Text>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                keyboardType='numeric'
                maxLength={11}
              />
              <Text style={styles.errorMessage}>{phoneError || ""}</Text>
            </View>
            <View style={styles.errs}>
              <Text style={{ color: '#FFA07A' }}>{this.state.errs}</Text>
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
  errorMessage: {
    color: 'red'
  }
});
