import React from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import ModalNotification from '../../components/Home/ModalNotification'
import SwiperSlider from '../../components/Slide/SwiperSlider';
import Slide1 from '../../assets/images/Slide1.jpg';
import Slide2 from '../../assets/images/Slide2.png';
import Slide3 from '../../assets/images/Slide3.jpeg';
import * as userActions from '../../reduxs/authRedux/actions'
import * as productActions from '../../reduxs/productRedux/actions'
import { fcmService } from '../../config/notification/FCMService'
import { localNotificationService } from '../../config/notification/LocalNotificationService'
import { Dimensions } from 'react-native';
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
  },
  slideContainer: {
    flex: 1,
  },
});

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      askPermission: false
    }
  }

  componentDidMount = async () => {
    // Register FCM Service
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
    // Configure notification options
    localNotificationService.configure(this.onOpenNotification)

    // Check permission: true/false
    const locationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (!locationPermission) {
      await this.checkLocationPermission()
    }
  }

  checkLocationPermission = async () => {
    let locationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (!locationPermission) {
      locationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (locationPermission !== 'granted') {
        this.setAskPermission();
        return false
      }
    }
    return true
  }

  // NOTIFICATION SETUP
  onRegister = (token) => {
    console.log("Splash -> onRegister -> token", token)
    this.props.onChangeDeviceToken(token)
  }

  onNotification = (notify) => {
    console.log("Splash -> onNotification -> notify", notify)
    const options = {
      playSound: false
    }
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    )
  }

  onOpenNotification = (data) => {
    this.props.fetchOrder(this.props.user.id)
  }

  setAskPermission = () => {
    this.setState(prevState => ({
      askPermission: !prevState.askPermission
    }))
  }

  render() {
    const { askPermission } = this.state;
    return (
      <View style={styles.container}>
        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotsWrapperStyle: {
              bottom: Dimensions.get('window').height / 3,
            },
          }}>
          <View style={styles.slideContainer}>
            <SwiperSlider
              sourceImage={Slide1}
              title="Món ăn ngon và giá hợp lí"
              description="Rất nhiều món ăn ngon, chất lượng và giá thành hợp túi tiền"
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              sourceImage={Slide2}
              title="Thêm vào giỏ và đặt món"
              description="Món ăn sẽ được giữ trong 30 phút. Hãy chắc chắn là bạn đến lấy kịp giờ"
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              sourceImage={Slide3}
              title="Tận hưởng món ăn"
              description="Chọn những món ăn, nguyên liệu yêu thích và tận hưởng cuốn món ăn mà mình yêu thích thôi nào."
            />
          </View>
        </Swiper>
        <ModalNotification
          modalVisible={askPermission}
          setModalVisible={this.setAskPermission}
          text='Để ứng dụng biết được vị trí chính xác, vui lòng cho phép ứng dụng truy cập vị trí của bạn'
          textButton='Đã hiểu'
          navigateToCall={this.deleteItemCart}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    cart: state.productReducer.cart,
    products: state.productReducer.products,
    marketers: state.productReducer.marketers,
    restaurants: state.productReducer.restaurants
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDeviceToken: (token) => dispatch(userActions.updateDeviceToken(token)),
    fetchOrder: (userId) => dispatch(productActions.fetchOrder(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)