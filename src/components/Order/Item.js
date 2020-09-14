import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database'
import {showModal} from '../../screens/Navigations';

const changeStatus = (ustatus,id) =>{
    var ref = database().ref("orders").orderByChild("orderId").equalTo(id);
    ref.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        childSnapshot.ref.update({
            "status" : ustatus
        }).then(function() {
            console.log("Success")
        });
    });
    })
}
export  const Item = ({ item }) => (
    <ScrollView style={styles.wrap_item}>
      <View style={styles.wrap_title}>
        <View style={{width: '30%',flex: 1, flexDirection: 'row'}}>
          <Image
                style={styles.user_logo}
                source={require('../../assets/image/user-male.png')}
              />
          <Text style={{ marginTop: 15, marginLeft: 5}}>{item.buyer.fullName}</Text>
        </View>
        <TouchableOpacity
            onPress={() => changeStatus('canceled', item.orderId)}
        >
          <Image 
            style={styles.check}
            source={require('../../assets/image/red_cancel.png')}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => changeStatus('confirmed', item.orderId)}
        >
          <Image 
            style={styles.check}
            source={require('../../assets/image/green-check.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.wrap_cnt_item}>
        <Image
            style={styles.logo}
            source={{uri: item.items[0].image}}
          />
        <View>
          <Text>{item.items[0].name}</Text>
          <Text>{item.items[0].price}đ X {item.items[0].quantity}</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>{item.items[0].quantity} sản phẩm</Text>
        <Text style={{ textAlign: 'right', marginHorizontal: 5, borderLeftColor:"#DAA520", borderLeftWidth: 2}}> Tổng thanh toán: {item.totalPrice}đ</Text>
      </View>
    </ScrollView>
  );
  
export const renderItem = ({ item }) => (
    <Item item={item} />
);

const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
      borderColor: "#20232a",
      borderWidth: 2,
      marginRight: 12
    },
    wrap_item: {
      borderWidth: 2,
      borderColor: "#DAA520",
      borderRadius: 6,
      marginVertical: 10,
      marginHorizontal:2,
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
      marginTop:3,
      marginLeft:3
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
      borderRadius: 30,
      paddingVertical: 5
    },
    check:{
      width: 30,
      height: 30,
      marginRight: 5,
      marginTop: 5,
      borderRadius: 30,
    }
  });
  