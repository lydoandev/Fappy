import React from 'react';
import { Navigation } from "react-native-navigation"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/reduxs/store';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging'

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
import OrderDetail from './src/screens/Order/OrderDetail'
import Search from './src/screens/Home/SearchScreen'
import Splash from './src/screens/Splash'
import UploadFile from './src/screens/Splash/UploadFile'

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
Navigation.registerComponent("OrderDetail", () => ReducerComponent(OrderDetail), () => OrderDetail)
Navigation.registerComponent("Search", () => ReducerComponent(Search), () => Search)
Navigation.registerComponent("Splash", () => ReducerComponent(Splash), () => Splash)

Navigation.registerComponent("SideBar", () => ReducerComponent(SideBar), () => SideBar)
Navigation.registerComponent("UploadFile", () => ReducerComponent(UploadFile), () => UploadFile)


function ReducerComponent(Component) {
  return props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("BRM: ", remoteMessage)
})

Navigation.setRoot({
  root: {
    component: {
      name: 'UploadFile'
    }
  }
});
