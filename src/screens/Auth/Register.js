import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import InputText from '../../components/Form/InputText'
import Title from '../../components/Form/Title'
import Error from '../../components/Form/Error'
import { connect } from 'react-redux'
import * as userActions from '../../reduxs/authRedux/actions'
import Loading from '../../components/Home/Loading'
import LinearGradient from 'react-native-linear-gradient';


// import TextInputState from 'react-native/lib/TextInputState';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        firstName: "Ly",
        lastName: "Đoàn Thị",
        email: "ly.dev@gmail.com",
        phone: "0348543343",
        password: "123456",
        confirmPass: "123456"
      },
      errors: {
        firstNameErr: "",
        emailErr: "",
        phoneErr: "",
        lastNameErr: "",
        passErr: "",
        confirmPassErr: "",
        phone: ''
      }
    }
  }

  getData = (name, text) => {
    var nameErr = name + "Err";
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [nameErr]: ""
      },
      info: {
        ...prevState.info,
        [name]: text
      }
    }));
  }

  checkPhoneExist = async () => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        phoneErr: '',
      },
    }));
    let result = false
    const { phone } = this.state.info
    const userRef = firebase.database().ref('users')
    await userRef.orderByChild('phone')
      .equalTo(phone).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          result = true
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              phoneErr: 'Số điện thoại đã tồn tại',
            },
          }));
        }
      })
    return result
  }

  clear = () => {
    this.setState(prevState => ({
      ...prevState,
      info: {
        firstName: "",
        email: "",
        phone: "",
        lastName: "",
        pass: "",
        confirmPass: ""
      }
    }));
  }

  checkValidation = () => {
    var { firstName, email, phone, lastName, password, confirmPass } = this.state.info;
    var countErr = 0;
    var { firstNameErr, emailErr, phoneErr, lastNameErr, passErr, confirmPassErr } = this.state.errors;
    firstNameErr = "";
    emailErr = "";
    phoneErr = "";
    lastNameErr = "";
    passErr = "";
    confirmPassErr = "";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (firstName == "") {
      firstNameErr = "Tên là trường bắt buộc";
      countErr++;
    }
    if (email == "") {
      countErr++;
      emailErr = "Email là trường bắt buộc";
    } else if (!re.test(String(email).toLowerCase())) {
      countErr++;
      emailErr = "Email không đúng format";
    }
    if (lastName == "") {
      lastNameErr = "Họ là trường bắt buộc"
      countErr++;
    }
    if (phone == "") {
      countErr++;
      phoneErr = "Phone là trường bắt buộc";
    } else if (phone.length != 10) {
      countErr++;
      phoneErr = "Phone không đúng format "
    }
    if (password == "") {
      countErr++;
      passErr = "Password là trường bắt buộc";
      countErr++;
    } else if (password.length < 6) {
      countErr++;
      passErr += "Độ dài password không đúng\n"
    } else if (password != confirmPass) {
      countErr++;
      confirmPassErr += "Xác nhận password không trùng khớp\n"
    }

    this.setState({
      errors: {
        firstNameErr,
        emailErr,
        phoneErr,
        lastNameErr,
        passErr,
        confirmPassErr
      }
    })

    return countErr;
  }

  login = () => {
    this.props.changeState();
  }

  signUp = async () => {
    var { firstName, phone, lastName, password } = this.state.info;
    if (this.checkValidation() == 0) {
      this.setState({ loading: true })
      if (!await this.checkPhoneExist()) {

        const userRef = firebase.database().ref('users')
        const key = userRef.push().key
        const user = {
          id: key,
          firstName,
          lastName,
          fullName: lastName + ' ' + firstName,
          phone,
          password,
          role: 'buyer',
        }
        
        await userRef.child(key).update(user).then(() => {
          this.props.loginSuccessed(user);
          this.props.onUpdateDeviceToken();
        })
      }
      this.setState({ loading: false })
    }
  }

  render() {
    var { firstName, phone, lastName, password, confirmPass } = this.state.info;
    var { firstNameErr, phoneErr, lastNameErr, passErr, confirmPassErr } = this.state.errors;
    var { loading } = this.state;
    if (loading) {
      return (
        <Loading></Loading>
      )
    } else
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.gradient}>
            <View style={styles.contentLogo}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo}></Image>
            </View>
          </LinearGradient>
          <View style={{ flex: 1, margin: 15, flexDirection: 'column', borderRadius: 20, backgroundColor: '#fff', padding: 10 }}>
            <View style={{ flex: 1, marginBottom: 8 }}>
              <Title title="Tên người dùng *"></Title>
              <InputText
                name="firstName"
                icon='user'
                value={firstName}
                getData={this.getData}
                onSubmitEditing={() => this.refInput.getInnerRef().focus()}
                returnKeyType="next"></InputText>
              <Error errorText={firstNameErr}></Error>
            </View>
            <View style={{ flex: 1, marginBottom: 8, }}>
              <Title title="Họ *"></Title>
              <InputText name="lastName" value={lastName} getData={this.getData} icon='user'></InputText>
              <Error errorText={lastNameErr}></Error>
            </View>
            <View style={{ flex: 1, marginBottom: 8, }}>
              <Title title="Số điện thoại *"></Title>
              <InputText name="phone" value={phone} getData={this.getData} icon='phone'></InputText>
              <Error errorText={phoneErr}></Error>
            </View>
            <View style={{ flex: 1, marginBottom: 8, }}>
              <Title title="Mật khẩu *"></Title>
              <InputText pass={true} name="password" value={password} getData={this.getData} icon='lock'></InputText>
              <Error errorText={passErr}></Error>
            </View>
            <View style={{ flex: 1, marginBottom: 8, }}>
              <Title title="Xác nhận mật khẩu *"></Title>
              <InputText pass={true} name="confirmPass" value={confirmPass} getData={this.getData} icon='lock'></InputText>
              <Error errorText={confirmPassErr}></Error>

            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}><Text style={styles.signUpText}>ĐĂNG KÍ</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={this.login}>
                <Text style={{ color: '#616161' }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center' }}><Text>Bằng việc xác nhận tạo tài khoản, bạn đã đồng ý với các</Text> <Text style={{ color: '#fff' }}>điều khoản quy định</Text> của chúng tôi</Text>
            </View>
          </View>
        </ScrollView>
      )
  }
}



const styles = StyleSheet.create({
  titleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  btnLogin: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F2A90F'
  },
  loginText: {
    color: '#F2A90F',
    textAlign: 'center',
  },
  btnSignUp: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F2A90F',
    backgroundColor: '#F2A90F'
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  gradient: {
    height: 170,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  logo: {
    width: 250,
    height: 250
  },
  contentLogo: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    loginSuccessed: user => dispatch(userActions.loginSuccessed(user)),
    onUpdateDeviceToken: () => dispatch(userActions.updateDeviceToken())
  }
}

export default connect(null, mapDispatchToProps)(Register)