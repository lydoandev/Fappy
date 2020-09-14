
import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Alert } from "react-native"
import {showModal} from '../Navigations';
import database from '@react-native-firebase/database'
import {connect} from 'react-redux';
import bottomTabs from '../Navigations';
import {AsyncStorage} from 'react-native';
import {login} from '../../redux/userRedux/action';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: 'vanle@gmail.com',
      password: '123456',
    };
  } 
  login = () => {
    var userLogin = {
      email: this.state.email,
      password: this.state.password,
    };
    var login;
    this.props.login(userLogin);
    database()
    .ref(`/users`)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(function(userSnapshot) {
        var user = userSnapshot.val();
        if (user.email == userLogin.email && user.password == userLogin.password) {
          AsyncStorage.setItem('user',JSON.stringify(user));
          bottomTabs();
          login = true
          return 0;
        }else{
          login = false
        }
      })
    })
    if(login == false){
      this.alert('Đăng nhập không thành công')
    }
  };
  alert(message){
    Alert.alert(
      'Fappy Thông báo',
        message,
      [
        {
          text: 'Đã hiểu',
          onPress: () => console.log('Ask me later pressed')
        },
        {
          text: 'Đóng',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }
  register = () => {
    showModal('Register');
  };
  render(){
      return(
          <View style={styles.wrap}>
              <View style={styles.wrapLogin}>
                  <View style={styles.contentLogo} >
                      <Image source={require('../../assets/image/logo.png')} style={styles.logo}></Image>
                      <Text style={styles.pageName}>Đăng nhập</Text>
                  </View>
                  <View style={styles.wrapInput}>
                      <TextInput 
                        style={styles.input}  
                        placeholder="Email"
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                      />
                      <TextInput 
                        style={styles.input} 
                        secureTextEntry={true} 
                        placeholder="Mật khẩu"
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                        />
                        <View style={styles.errs}>
                          <Text style={{color: '#FFA07A'}}>{this.props.errs}</Text>
                        </View>
                  </View>
                  <TouchableOpacity>
                      <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                      <Text style={styles.loginTxt}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.signupBtn} onPress={this.register}>
                      <Text style={styles.signupTxt}>Đăng ký tài khoản bán hàng</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }
}
const mapStateToProps = state => {
  return {
    users: state.users.users,
    errs: state.users.errs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
    wrap:{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    wrapLogin:{
        borderRadius: 7,
        borderColor: '#DAA520',
        margin: 20,
        paddingHorizontal:10,
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        paddingBottom: 10,
        backgroundColor: "#fff"
    },
    contentLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:40,
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: -40,
    },
    pageName:{
        fontSize: 25,
        fontWeight: "bold",
        color: "#DAA520",
        marginTop: "-15%",

    },
    wrapInput:{
        
    },
    input:{
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 2,
    },
    forgotPass:{
        textAlign: 'center',
        color: "#DAA520",
        marginTop: 40
    },
    loginBtn:{
        paddingVertical:5,
        backgroundColor: "#DAA520",
        marginTop: 20,
        borderColor: '#DAA520',
        borderWidth: 2,
    },
    loginTxt:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
    },
    signupBtn:{
        paddingVertical:5,
        backgroundColor: "#fff",
        marginTop: 20,
        borderColor: '#DAA520',
        borderWidth: 2,
    },
    signupTxt:{
        textAlign: 'center',
        color: '#DAA520',
        fontSize: 15,
    }
})