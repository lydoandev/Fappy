import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database'
import { renderItem } from '../../components/Order/Item'
import _ from 'lodash'
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/orderRedux/actions';
import Item from '../../components/Order/Item';
import { ORDER_STATUS } from '../../constants/orderStatus';
import { fetchProducts } from '../../redux/productRedux/actions'


class OrderList extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
    // var order = [];
    // database()
    //   .ref(`/orders`)
    //   .once("value")
    //   .then(snapshot => {
    //     snapshot.forEach(function (userSnapshot) {
    //       var user = userSnapshot.val();
    //       if (user.seller.id == 'RES1') {
    //         order.push(user)
    //       } else {
    //         console.log('false')
    //       }
    //     })
    //     this.setState({
    //       items: order
    //     })
    //   })
  }

  changeStatus = async (item) => {
    if (item.status == ORDER_STATUS.received) {
      item.items.map( async prod => {
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
    let { orders } = this.props.ordering
    orders = _.orderBy(orders, ["orderDate"], ["desc"])
    console.log("OrderList -> render -> orders", orders)
    return (
      <SafeAreaView style={styles.container}>
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
