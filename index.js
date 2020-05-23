import React from 'react';
import { Navigation } from "react-native-navigation"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/reduxs/store';
import { Provider } from 'react-redux';

import Home from "./src/screens/Home"
import Order from './src/screens/Order'
import Notification from './src/screens/Notification'
import Profile from './src/screens/Profile'
import Detail from './src/screens/Home/Detail'
import SeeAll from './src/screens/Home/SeeAll'
import RestaurantDetail from './src/screens/Home/RestaurantDetail'
import MarketerDetail from './src/screens/Home/MarketerDetail'
import Auth from './src/screens/Auth'
import Cart from './src/screens/Home/Cart'

console.disableYellowBox = true;

import SideBar from './src/screens/SideBar'

Navigation.registerComponent("HomeScreen", () => ReducerComponent(Home), () => Home)
Navigation.registerComponent("OrderScreen", () => ReducerComponent(Order), () => Order)
Navigation.registerComponent("NotificationScreen", () => ReducerComponent(Notification), () => Notification)
Navigation.registerComponent("ProfileScreen", () => ReducerComponent(Profile), () => Profile)
Navigation.registerComponent("Detail", () => ReducerComponent(Detail), () => Detail)
Navigation.registerComponent("SeeAll", () => ReducerComponent(SeeAll), () => SeeAll)
Navigation.registerComponent("RestaurantDetail", () => ReducerComponent(RestaurantDetail), () => RestaurantDetail)
Navigation.registerComponent("MarketerDetail", () => ReducerComponent(MarketerDetail), () => MarketerDetail)
Navigation.registerComponent("Auth", () => ReducerComponent(Auth), () => Auth)
Navigation.registerComponent("Cart", () => ReducerComponent(Cart), () => Cart)

Navigation.registerComponent("SideBar", () => ReducerComponent(SideBar), () => SideBar)


function ReducerComponent(Component) {
  return props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}

Navigation.setRoot({
  root: {
    component: {
      name: 'Auth'
    },
    // stack: {
    //   children: [
    //     {
    //       bottomTabs: {
    //         children: [
    //           {
    //             component: {
    //               name: 'HomeScreen',
    //               options: {
    //                 bottomTab: {
    //                   text: 'Trang Chủ',
    //                   icon: require('./src/assets/icons/icon_home.png'),
    //                   selectedIconColor: '#ffcc00',
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             component: {
    //               name: 'OrderScreen',
    //               options: {
    //                 topBar: {
    //                   visible: true,
    //                   title: {
    //                     text: 'Danh sách đơn hàng',
    //                     alignment: 'center'
    //                   },
    //                 },
    //                 bottomTab: {
    //                   text: 'Đơn Hàng',
    //                   icon: require('./src/assets/icons/icon_order.png'),
    //                   selectedIconColor: '#ffcc00',
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             component: {
    //               name: 'NotificationScreen',
    //               options: {
    //                 bottomTab: {
    //                   text: 'Thông Báo',
    //                   icon: require('./src/assets/icons/icon_notification.png'),
    //                   selectedIconColor: '#ffcc00',
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             component: {
    //               name: 'ProfileScreen',
    //               options: {
    //                 bottomTab: {
    //                   text: 'Tài Khoản',
    //                   icon: require('./src/assets/icons/icon_profile.png'),
    //                   selectedIconColor: '#ffcc00',
    //                 },
    //               },
    //             },
    //           },

    //         ],
    //         options: {
    //           backgroundColor: 'white',
    //           animate: false,
    //           drawBehind: false,
    //           titleDisplayMode: 'alwaysHide',
    //           topBar: {
    //             visible: false,
    //           },
    //         },
    //       },
    //     }
    //   ]
    // }
  }
});
