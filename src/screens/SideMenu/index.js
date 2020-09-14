import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {logout} from '../../redux/userRedux/action';
import {AsyncStorage} from 'react-native';
import database from '@react-native-firebase/database'

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {},
      storeInfo : {},
      address:''
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
  moveToDetail = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Profile',
              options: {
                topBar: {
                  title: {
                    text: 'Thông tin chi tiết',
                  },
                },
              },
            },
          },
        ],
      },
    });
  };
  componentDidMount() {
    var storeId ="RES1";
    AsyncStorage.getItem('user').then((val) => {
        let tUserInfo = JSON.parse(val);
        this.setState({ 
          userInfo : tUserInfo,
         });
        storeId = tUserInfo.storeId
    })
    this.fetchStoreInfo(storeId)
  }
  fetchStoreInfo = (id) =>{
    database()
    .ref(`/restaurants/`+id)
    .once("value")
    .then(snapshot => {
      var tStoreInfo = snapshot.val();
      this.setState({ 
        storeInfo : tStoreInfo,
        address : tStoreInfo.location.address,
      });
    })
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: "#ffffff"}}>
        <ImageBackground
          style={styles.cover}
          source={require('../../assets/image/cover.jpg')}>
          <Image
            style={styles.avatar_img}
            source={require('../../assets/image/avatar.jpg')}
          />
        </ImageBackground>
        <View>
          <ScrollView>
            <View style={styles.wrapInfo}>
              <View style={styles.title}>
                <Text style={styles.titletxt}>Thông tin tài khoản cá nhân</Text>
                <View style={styles.wrap_btn}>
                  <TouchableOpacity onPress={() => this.moveToDetail()}>
                    <Image
                      style={styles.logo}
                      source={require('../../assets/image/more-icon.jpg')}
                    />
                  </TouchableOpacity>
                </View>
              </View> 
              <View style={styles.field}>
                <Text>Họ và tên: </Text>
                <Text>{this.state.userInfo.fullName}</Text>
              </View>
              <View style={styles.field}>
                <Text>Số điện thoại: </Text>
                <Text>{this.state.userInfo.phone}</Text>
              </View>
              <View style={styles.field}>
                <Text>Email: </Text>
                <Text>{this.state.userInfo.email}</Text>
              </View>
            </View>
            
            <View style={styles.wrapInfo}>
              <View style={styles.title}>
                <Text style={styles.titletxt}>Thông tin cửa hàng</Text>
                <View style={styles.wrap_btn}>
                  <TouchableOpacity onPress={() => this.moveToDetail()}>
                    <Image
                      style={styles.logo}
                      source={require('../../assets/image/more-icon.jpg')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Image
                    style={{height: 70, width: '100%'}}
                    source={{uri:this.state.storeInfo.image}}
                  />
              </View>
              <View style={styles.field}>
                <Text style={{fontWeight:"bold"}}>{this.state.storeInfo.name}</Text>
              </View>
              <View style={styles.field}>
                <Text>Số điện thoại: </Text>
                <Text>{this.state.storeInfo.phone}</Text>
              </View>
              <View style={styles.field}>
                <Text>Địa chỉ: </Text>
              </View>
              <View style={{marginLeft:10}}>
                <Text>{this.state.address}</Text>
              </View>
            </View>

          </ScrollView>
        </View>
        
        <TouchableOpacity 
            onPress={this.logout} 
            style={{backgroundColor: 'black', paddingHorizontal: 10,paddingVertical: 8,marginHorizontal: "20%",marginVertical: "10%",borderRadius: 6,}}
        >
            <Text style={styles.logouttxt}>Đăng xuất</Text>
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
)(SideMenu);
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
    width: 30,
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
  },
  logouttxt:{
    color: '#DAA520',
    fontWeight: "bold",
    fontSize: 15,
    width: "90%",
    textAlign: "center"
  }
});
