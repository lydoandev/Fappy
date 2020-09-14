import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import MainScreen from '../screens/Home/MainScreen';
import Detail from '../screens/Product/detail';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Profile from '../screens/Profile/Profile';
import Loading from '../screens/Loading';
import OrderList from '../screens/Order/view';
import {Provider} from 'react-redux';
import store from '../redux/store';
import SplashScreen from './SplashScreen'
import AddProd from './Product/add'
import Splash from './Splash/index'
import SideMenu from './SideMenu/index'
import ProductList from './Product/view-list'

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export const registerNav = () => {
  Navigation.registerComponent('SplashScreen', () => SplashScreen);
  Navigation.registerComponent('ProductList', () => ProductList);
  Navigation.registerComponent(
    'Loading',
    () => ReduxProvider(Loading),
    () => Loading,
  );

  Navigation.registerComponent('MainScreen', () => MainScreen);
  Navigation.registerComponent('AddProd', () => AddProd);
  Navigation.registerComponent('Detail', () => Detail);
  Navigation.registerComponent('OrderList', () => OrderList);
  Navigation.registerComponent(
    'Login',
    () => ReduxProvider(Login),
    () => Login,
  );
  Navigation.registerComponent(
    'Register',
    () => ReduxProvider(Register),
    () => Register,
  );
  Navigation.registerComponent(
    'Profile',
    () => ReduxProvider(Profile),
    () => Profile,
  );
  Navigation.registerComponent(
    'Splash',
    () => ReduxProvider(Splash),
    () => Splash,
  );
  Navigation.registerComponent(
    'SideMenu',
    () => ReduxProvider(SideMenu),
    () => SideMenu,
  );
};

registerNav();

const bottomTabs = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'SideMenu',
          }
        },
        center: {  
          bottomTabs: {
            options: {
              bottomTabs: {
                animate: false,
              },
            },
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'MainScreen',
                        options: {
                          topBar: {
                            title: {
                              text: 'Trang chủ',
                            },
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      animate: false,
                      icon: require('../assets/image/home.png'),
                      text: 'Trang chủ',
                      selectedTextColor: '#DAA520',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'OrderList',
                        options: {
                          topBar: {
                            title: {
                              text: 'Thông báo',
                            },
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      animate: false,
                      icon: require('../assets/image/notifi.png'),
                      text: 'Thông báo',
                      selectedTextColor: '#DAA520',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'ProductList',
                        options: {
                          topBar: {
                            title: {
                              text: 'Sản phẩm',
                            },
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      animate: false,
                      icon: require('../assets/image/cart-icon.png'),
                      text: 'Sản phẩm',
                      selectedTextColor: '#DAA520',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'OrderList',
                        options: {
                          topBar: {
                            title: {
                              text: 'Đơn hàng',
                            },
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      animate: false,
                      icon: require('../assets/image/order.png'),
                      text: 'Đơn hàng',
                      selectedTextColor: '#DAA520',
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
export default bottomTabs;

export const showModal = screenName => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: screenName,
            options: {
              topBar: {
                background: {
                  color: '#DAA520',
                },
                title: {
                  text: 'Fappy',
                  alignment: 'center',
                },
                rightButtons: [
                  {
                    id: 'close',
                    icon: require('../assets/image/circled-left.png'),
                  },
                ],
              },
            },
          },
        },
      ],
    },
  });
};


export const setRoot = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Splash',
      },
    },
  });
};
