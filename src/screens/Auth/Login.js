import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Keyboard, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image } from "react-native"
import InputText from '../../components/Form/InputText'
import Title from '../../components/Form/Title'
import Error from '../../components/Form/Error'
import * as userActions from '../../reduxs/authRedux/actions'
import firebase from 'react-native-firebase'

import Loading from '../../components/Home/Loading'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "354654343",
      password: "1234",
      phoneErr: "",
      passwordErr: "",
    }
  }

  getData = (name, text) => {
    this.setState({
      [name]: text
    })
  }

  checkValidation = () => {
    var { phone, password, phoneErr, passwordErr } = this.state;
    var countErr = 0;
    phoneErr = "";
    passwordErr = "";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (phone == "") {
      countErr++;
      phoneErr = "Số điện thoại là trường bắt buộc";
    } else if (phone.length != 9) {
      countErr++;
      phoneErr = "Số điện thoại không đúng format";
    }

    if (password == "") {
      countErr++;
      passwordErr = "Mật khẩu là trường bắt buộc";
    }

    this.setState({
      phoneErr,
      passwordErr
    })

    return countErr;
  }


  login = async () => {
    Keyboard.dismiss();
    const { phone, password } = this.state;
    const userRef = firebase.database().ref('users');

    if (this.checkValidation() == 0) {
      this.setState({ loading: true })
      await userRef.orderByChild('phone')
        .equalTo("0" + phone).once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            const user = Object.values(snapshot.val())[0];
            console.log("user: ", user)
            if (user?.password == password) {
              this.setState({ message: '' })
              this.props.loginSucceeded(user)
            } else {
              this.setState({ message: 'Tên tài khoản hoặc mật khẩu không đúng' })
            }
          } else {
            this.setState({ message: 'Tên tài khoản không tồn tại' })
          }
          this.setState({ loading: false })
        })
    }
  }


  signUp = () => {
    this.props.changeState();
  }

  render() {
    var { password, phone, phoneErr, passwordErr, loading, message } = this.state;
    console.log("Load", loading);

    if (loading) {
      return (
        <Loading></Loading>
      )
    }
    return (
      <ScrollView style={{ backgroundColor: '#F2A90F' }}>
        <View style={{ flex: 1, margin: 15, flexDirection: 'column', }}>
          <View style={styles.titleContent}>
            <Text style={{ fontSize: 20 }}>Chào mừng bạn đến với Fappy</Text>
          </View>
          <View style={styles.wellcome}>
            <Text style={{ fontSize: 17 }}>Chào mừng bạn đến với Fappy!</Text>
            <Text style={{ color: '#616161' }}>Vui lòng đăng nhập để tiếp tục</Text>
          </View>
          <Error errorText={message}></Error>
          <View style={{ flex: 1, marginBottom: 5, marginTop: 10 }}>
            <Title title="Số điện thoại *"></Title>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 42, borderRadius: 5, backgroundColor: '#fff', padding: 6, marginRight: 10 }}>
                <Image source={require('../../assets/icons/icon_vn.png')}></Image>
                <Text>+84</Text>
              </View>
              <View style={{ flex: 1 }}>
                <InputText name="phone" value={phone} getData={this.getData}></InputText>
              </View>
            </View>
            <Error errorText={phoneErr} />
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Mật khẩu *"></Title>
            <InputText pass={true} name="password" value={password} getData={this.getData}></InputText>
            <Error errorText={passwordErr}></Error>
          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.btnLogin} onPress={this.login}><Text style={styles.loginText}>ĐĂNG NHẬP</Text></TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}><Text style={styles.signUpText}>Đăng kí</Text></TouchableOpacity> */}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity onPress={this.signUp}>
              <Text style={{ color: '#616161' }}>Đăng kí</Text>
            </TouchableOpacity>
            <Text style={{ color: '#616161' }}>Quên mật khẩu?</Text>
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
    marginBottom: 20
  },
  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  btnSignUp: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F2A90F'
  },
  signUpText: {
    color: '#F2A90F',
    textAlign: 'center',
  },
  btnLogin: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff'
  },
  loginText: {
    color: '#F2A90F',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

const mapDispatchToProps = dispatch => {
  return {
    loginSucceeded: user => dispatch(userActions.loginSuccessed(user))
  }
}

export default connect(null, mapDispatchToProps)(LogIn)