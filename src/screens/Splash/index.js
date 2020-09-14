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
import {FCMService} from '../../FCMService'
import {LocalNotificationService} from '../../LocalNotificationService'
// import { sideMenu } from '../../config/bottomTabs';
import { Navigation } from 'react-native-navigation';
import bottomTabs from '../Navigations'

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
    FCMService.register(this.onRegister, this.onNotification, this.onOpenNotification)
    // Configure notification options
    LocalNotificationService.configure(this.onOpenNotification)

    // Check permission: true/false
    this.isStarted();
  }

  moveToHome = async () => {
    // bottomTabs()
    Navigation.setRoot({
      root: {
        component: {
          name: 'Login',
        },
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

    const { id } = this.props.user;
    this.props.fetchOrder(id);
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
              title="Món ăn ngon và giá hợp lí"
              description="Rất nhiều món ăn ngon, chất lượng và giá thành hợp túi tiền"
              moveToHome={this.moveToHome}
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              getStarted={this.props.getStarted}
              sourceImage={Slide2}
              title="Thêm vào giỏ và đặt món"
              description="Món ăn sẽ được giữ trong 30 phút. Hãy chắc chắn là bạn đến lấy kịp giờ"
              moveToHome={this.moveToHome}
            />
          </View>
          <View style={styles.slideContainer}>
            <SwiperSlider
              getStarted={this.props.getStarted}
              sourceImage={Slide3}
              title="Tận hưởng món ăn"
              description="Chọn những món ăn, nguyên liệu yêu thích và tận hưởng cuốn món ăn mà mình yêu thích thôi nào."
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)