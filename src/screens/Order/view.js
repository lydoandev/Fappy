import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database'
import {renderItem} from '../../components/Order/Item'



class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status:''
    };
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={renderItem}
          keyExtractor={item => item.orderId}
        />
      </SafeAreaView>
    );
  }
  componentDidMount(){
    var order = [];
    database()
    .ref(`/orders`)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(function(userSnapshot) {
        var user = userSnapshot.val();
        if (user.seller.id == 'RES1') {
          order.push(user)
        }else{
          console.log('false')
        }
      }) 
      this.setState({
        items : order
      })
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});

export default OrderList;
