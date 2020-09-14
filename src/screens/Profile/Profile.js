import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  TextInput
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {logout} from '../../redux/userRedux/action';
import {AsyncStorage} from 'react-native';
import database from '@react-native-firebase/database'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uEmail:'',
      uPhone:'',
      uFirstName:'',
      uLastName:'',
      sEmail:'',
      sPhone:'',
      sAddress:'',
      sName:'',
      sOpen:'',
      sClose:'',
      sKey:''
    };
  }
  logout = () => {
    AsyncStorage.removeItem('user');
    this.props.logout();
    Navigation.setRoot({
      root: {
        component: {
          name: 'Login',
        },
      },
    });
  };
  componentDidMount() {
    var storeId ="";
    AsyncStorage.getItem('user').then((val) => {
        let tUserInfo = JSON.parse(val);
        this.setState({ 
          uEmail:tUserInfo.email,
          uPhone:tUserInfo.phone,
          uFirstName:tUserInfo.firstName,
          uLastName:tUserInfo.lastName,
          uId:tUserInfo.id,
         });
        storeId = tUserInfo.storeId
        this.fetchStoreInfo(storeId)
    })
  }
  fetchStoreInfo = (id) =>{
    database()
    .ref(`/restaurants/`+id)
    .once("value")
    .then(snapshot => {
      var tStoreInfo = snapshot.val();
      this.setState({ 
        sKey: tStoreInfo.key,
        sPhone:tStoreInfo.phone,
        sAddress:tStoreInfo.location.address,
        sName:tStoreInfo.name,
        sOpen:tStoreInfo.openHour,
        sClose:tStoreInfo.closeHour
      });
    })
  }
  update = (type, id) =>{
    if(type == 'store'){
      database().ref('/restaurants/'+id)
      .update({
        phone:this.state.sPhone,
        name:this.state.sName,
        openHour: this.state.sOpen,
        closeHour: this.state.sClose
      })
      .then(()=>{
        Alert.alert('Fappy','Sửa sản phẩm thành công');
      });
    }
    if(type = 'profile'){
      let fullName = this.state.uLastName + this.state.uFirstName
      database()
      .ref('/users/'+id)
      .update({
        phone:this.state.uPhone,
        name:this.state.uName,
        email: this.state.uEmail,
        firstName: this.state.uFirstName,
        lastName: this.state.uLastName,
        fullName: fullName,
      })
      .then(()=>{
        Alert.alert('Fappy','Sửa sản phẩm thành công');
      });
    }
  }
  render() {
    console.log(this.state.storeInfo)
    return (
      <ScrollView style={{backgroundColor: "#ffffff"}}>
        <ImageBackground
          style={styles.cover}
          source={require('../../assets/image/cover.jpg')}>
          <Image
            style={styles.avatar_img}
            source={require('../../assets/image/avatar.jpg')}
          />
          <Image
            style={{width:20,height:20,position: 'absolute',bottom:0, left:20}}
            source={require('../../assets/image/online-icon.png')}
          />
        </ImageBackground>
        <View>
          <ScrollView>
            <View style={styles.wrapInfo}>
              <View style={styles.title}>
                <Text style={styles.titletxt}>Thông tin tài khoản cá nhân</Text>
                <View style={styles.wrap_btn}>
                  <TouchableOpacity onPress={() => this.update('profile',this.state.userInfo.id)}>
                    <Image
                      style={styles.logo}
                      source={require('../../assets/image/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View> 
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Họ và tên lót: </Text>
                <TextInput 
                onChangeText={text => this.setState({uLastName:text})}
                value={this.state.uLastName}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Tên: </Text>
                <TextInput 
                onChangeText={text => this.setState({uFirstName:text})}
                value={this.state.uFirstName}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Số điện thoại: </Text>
                <TextInput 
                onChangeText={text => this.setState({uPhone:text})}
                value={this.state.uPhone}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Email: </Text>
                <TextInput 
                onChangeText={text => this.setState({uEmail:text})}
                value={this.state.uEmail}/>
              </View>
            </View>
            
            <View style={styles.wrapInfo}>
              <View style={styles.title}>
                <Text style={styles.titletxt}>Thông tin cửa hàng</Text>
                <View style={styles.wrap_btn}>
                  <TouchableOpacity onPress={() => this.update('store',this.state.sKey)}>
                    <Image
                      style={styles.logo}
                      source={require('../../assets/image/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.field}>
                <TextInput 
                onChangeText={text => this.setState({sName:text})}
                value={this.state.sName}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Số điện thoại: </Text>
                <TextInput 
                onChangeText={text => this.setState({sPhone:text})}
                value={this.state.sPhone}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Địa chỉ: </Text>
                <TextInput 
                onChangeText={text => this.setState({sAddress:text})}
                value={this.state.sAddress}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Giờ mở cửa: </Text>
                <TextInput 
                onChangeText={text => this.setState({sOpen:text})}
                value={this.state.sOpen}/>
              </View>
              <View style={styles.field}>
                <Text style={{marginTop: 10}}>Giờ đóng cửa: </Text>
                <TextInput 
                onChangeText={text => this.setState({sClose:text})}
                value={this.state.sClose}/>
              </View>
            </View>

          </ScrollView>
        </View>
        
        <TouchableOpacity onPress={this.logout} 
          style={{backgroundColor: 'black', paddingHorizontal: 10,paddingVertical: 8,marginHorizontal: "20%",marginVertical: "10%",borderRadius: 6,}}>
          <Text style={{color:'#fff', fontWeight:'bold', textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch(logout(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
const styles = StyleSheet.create({
  avatar_img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 50,
    marginLeft: 20,
  },
  cover: {
    height: 150,
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginTop: 110,
    marginLeft: 10,
  },
  field: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 5
  },
  info_img: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  btn: {
    height: 30,
    width: 100,
    backgroundColor: '#DAA520',
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: 130,
    color: '#fff',
    marginBottom: 20
  },
  title:{
    backgroundColor: '#DAA520',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1, 
    flexDirection: 'row'
  },
  titletxt:{
    color: '#fff',
    fontWeight: "bold",
    fontSize: 15,
    width: "90%"
  },
  wrapInfo:{
    borderWidth: 2,
    borderColor: "#DAA520",
    borderRadius: 6,
    marginVertical: 12,
    paddingBottom: 12,
  },
  logo: {
    width: 40,
    height: 30,
  },
  check:{
    width: 30,
    height: 30,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 30,
  },
  wrap_btn:{
    flex: 1,
    flexDirection: 'row'
  }
});
