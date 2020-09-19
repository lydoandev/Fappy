import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database'
import { showModal } from '../../screens/Navigations';
import { ORDER_STATUS } from '../../constants/orderStatus';
import moment from 'moment'

const changeStatus = (ustatus, id) => {
  var ref = database().ref("orders").orderByChild("orderId").equalTo(id);
  ref.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      childSnapshot.ref.update({
        "status": ustatus
      }).then(function () {
        console.log("Success")
      });
    });
  })
}

export default class Item extends Component {

  changeStatus = (status) => {
    let { item } = this.props;
    item = {
      ...item,
      status
    }
    this.props.changeStatus(item);
  }

  getStatusText = (status) => {
    switch (status) {
      case ORDER_STATUS.unConfirmed:
        return "Đơn hàng mới"
      case ORDER_STATUS.confirmed:
        return "Đợi nhận"
      case ORDER_STATUS.received:
        return "Đã nhận"
      case ORDER_STATUS.canceled:
        return "Đã huỷ"
      default:
        return "Không xác định";
    }
  }

  buildActionButtons = (item) => {
    switch (item.status) {
      case ORDER_STATUS.unConfirmed:
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.changeStatus(ORDER_STATUS.canceled)}
            >
              <Image
                style={styles.check}
                source={require('../../assets/image/red_cancel.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeStatus(ORDER_STATUS.confirmed)}
            >
              <Image
                style={styles.check}
                source={require('../../assets/image/green-check.png')} />
            </TouchableOpacity>
          </View>
        )
      case ORDER_STATUS.confirmed:
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              backgroundColor: "green",
              alignItems: "center",
              marginRight: 15,
              paddingHorizontal: 10,
              borderRadius: 15,
              height: 40,
              width: 100
            }}
            onPress={() => this.changeStatus(ORDER_STATUS.received)}
          >
            <Text>Nhận</Text>
          </TouchableOpacity>
        )
      default:
        return <View />;
    }
  }

  render() {
    const { item } = this.props;
    let statusColor = "#fff";
    if (item.status === ORDER_STATUS.canceled) {
      statusColor = '#ff1a1a';
    }
    if (item.status === ORDER_STATUS.unConfirmed) {
      statusColor = '#ff9966';
    }
    if (item.status === ORDER_STATUS.confirmed) {
      statusColor = '#4dff4d';
    }
    if (item.status === ORDER_STATUS.received) {
      statusColor = '#3399ff';
    }
    return (
      <ScrollView style={styles.wrap_item}>
        <View style={styles.wrap_title}>
          <View style={{ width: '30%', flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
            <Image
              style={styles.user_logo}
              source={require('../../assets/image/user-male.png')}
            />

            <View style={{flexDirection: 'column'}}>
              <Text style={{ marginTop: 15, marginLeft: 5 }}>{item.buyer.fullName}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              backgroundColor: statusColor,
              alignItems: "center",
              marginRight: 15,
              paddingHorizontal: 10,
              borderRadius: 15,

            }}
          >
            <Text>{this.getStatusText(item.status)}</Text>
          </TouchableOpacity>
        </View>
        <View>
          {item.items.map(prod => {
            return (
              <View style={styles.wrap_cnt_item}>
                <Image
                  style={styles.logo}
                  source={{ uri: prod.image }}
                />
                <View>
                  <Text>{prod.name}</Text>
                  <Text>{prod.price}đ x {prod.quantity}</Text>
                </View>
              </View>
            )
          })}

        </View>
        <Text style={styles.txt} numberOfLines={2}>SDT: {item.buyer.phone.substring(0, 4)} {item.buyer.phone.substring(4, 7)} {item.buyer.phone.substring(7, 10)}</Text>

        <Text>Giờ đến nhận: {moment(item.receiveTime).format('HH:mm:ss')}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text>{item.items[0].quantity} sản phẩm</Text>
          <Text style={{ textAlign: 'right', marginHorizontal: 5, borderLeftColor: "#DAA520", borderLeftWidth: 2 }}> Tổng thanh toán: {item.totalPrice}đ</Text>
        </View>
        {this.buildActionButtons(item)}
      </ScrollView>
    )
  }
}

export const renderItem = ({ item }) => (
  <Item item={item} changeStatus />
);

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12
  },
  wrap_item: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#DAA520",
    marginVertical: 10,
    marginHorizontal: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff'
  },
  user_logo: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderColor: "#20232a",
    borderWidth: 2,
    marginTop: 3,
    marginLeft: 3
  },
  wrap_cnt_item: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row'
  },
  wrap_title: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#DAA520",
    borderRadius: 10,
    paddingVertical: 5
  },
  check: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 30,
  }
});
