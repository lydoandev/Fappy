import React from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import SwiperSlider from '../../components/Swiper/SwiperSlider';
import Slide1 from '../../assets/image/Slide1.png';
import Slide2 from '../../assets/image/Slide2.png';
import Slide3 from '../../assets/image/Slide3.png';
import * as userActions from '../../redux/userRedux/action'
import * as appActions from '../../redux/appRedux/actions'
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {fcmService} from '../../FCMService'
import {localNotificationService} from '../../LocalNotificationService'
// import { sideMenu } from '../../config/bottomTabs';
import { Navigation } from 'react-native-navigation';
import { sideMenu } from '../../config/bottomTab'
import { fetchOrders } from '../../redux/orderRedux/actions';

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
    this.isStarted();
  }

  moveToHome = async () => {
    Navigation.setRoot({
      root: {
        sideMenu
      },
    });
  }
  isStarted = () => {
    const { isStarted } = this.props;
    console.log("Splash -> isStarted -> isStarted", isStarted)
    if (isStarted) {
      this.moveToHome();
    }
  }

  // NOTIFICATION SETUP
  onRegister = (token) => {
    console.log("Splash -> onRegister -> token", token);
    this.props.onChangeDeviceToken(token);
    this.props.onUpdateDeviceToken(token);
  }
  onNotification = (notify) => {
    console.log('on noti: ', notify)
    const options = {
      playSound: false
    }
    this.props.fetchOrder();
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    )
  }

  onOpenNotification = (notification) => {
    Navigation.dismissAllModals();
    Navigation.mergeOptions('NOTIFICATION', {
      bottomTabs: {
        currentTabIndex: 2
      }
    });
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
              getStarted={this.props.getStarted}
              sourceImage={Slide1}
              title="Bán hoặc cho đi"
              description="Thu lại vốn hoặc cho chúng cho những ngừoi cần nó."
              moveToHome={this.moveToHome}
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              getStarted={this.props.getStarted}
              sourceImage={Slide2}
              title="Quản lí các đơn hàng một cách thuận lợi"
              description="Theo dõi đơn hàng thuận tiện."
              moveToHome={this.moveToHome}
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              getStarted={this.props.getStarted}
              sourceImage={Slide3}
              title="Thống kê doanh thu"
              description="Thống kê doanh thu hàng tháng một cách thuận lợi"
              moveToHome={this.moveToHome}
            />
          </View>
        </Swiper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // isAuthenticated: state.authReducer.isAuthenticated,
    user: state.user,
    // cart: state.productReducer.cart,
    // products: state.productReducer.products,
    // marketers: state.productReducer.marketers,
    // restaurants: state.productReducer.restaurants,
    isStarted: state.appReducer.isStarted
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateDeviceToken: () => dispatch(userActions.updateDeviceToken()),
    getStarted: () => dispatch(appActions.getStarted()),
    onChangeDeviceToken: (token) => dispatch(appActions.changeDiviceToken(token)),
    onFetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)