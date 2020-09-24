import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Picker, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database'
import { renderItem } from '../../components/Order/Item'
import _ from 'lodash'
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/orderRedux/actions';
import Item from '../../components/Order/Item';
import { ORDER_STATUS } from '../../constants/orderStatus';
import moment from "moment"
import { fetchProducts } from '../../redux/productRedux/actions'


class OrderList extends Component {
constructor(props) {
  super(props);
  this.state = {
    statusOrder: "all"
  }
}

  componentDidMount() {
    this.props.onFetchOrders();
    setInterval(() => this.props.onFetchOrders(), 1000);
  }

  onChangeStatus = (text) => {
    console.log('Text: ', text)
    this.setState({ statusOrder: text })
  }

  changeStatus = async (item) => {
    if (item.status == ORDER_STATUS.received) {
      item.items.map(async prod => {
        const newProd = {
          ...prod,
          deleted: true
        }

        await database().ref("products").child(prod.id).update(newProd);
      })
      this.props.onFetchProducts();
    }
    await database().ref("orders").child(item.orderId).update(item);
    this.props.onFetchOrders();
  }

  render() {
    let { orders } = this.props.ordering;
    const { statusOrder } = this.state;
    if (statusOrder != "all") {
      orders = orders.filter(order => order.status == statusOrder)
    }
    // orders = _.orderBy(orders, ["orderDate"], ["desc"])
    console.log("OrderList -> render -> orders", statusOrder)
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ borderColor: '#111', borderWidth: 1, height: 50, width: 150, borderRadius: 5, margin: 15 }}>
          <Picker
            selectedValue={statusOrder}
            style={{ height: 50, width: 150 }}
            onValueChange={this.onChangeStatus}>
            <Picker.Item label="Tất cả" value="all" />
            <Picker.Item label="Mới" value="unConfirmed" />
            <Picker.Item label="Đợi nhận" value="confirmed" />
            <Picker.Item label="Đã nhận" value="received" />
            <Picker.Item label="Đã huỷ" value="canceled" />
          </Picker>
        </View>
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={({ item }) => (<Item item={item} changeStatus={this.changeStatus} />)}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});

const mapState = state => {
  return {
    ordering: state.ordering,
    auth: state.userReducer
  }
}

const mapDispatch = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onFetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(OrderList);
