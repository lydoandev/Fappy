import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import navigateTo from '../../until/navigateTo'

export default class IconCart extends Component {

  navigateToCart = () => {
    this.props.navigateToCart();
  }
  render() {
    return (
      <>
        <View style={{ position: 'absolute', right: 0, top: 420 }}>
          <TouchableOpacity style={styles.btn} onPress={this.navigateToCart}>
            <Icon name='shoppingcart' size={35} color='#ffffff'></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', right: 25, top: 425, borderRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#ffffff' }}>{this.props?.cart?.items?.length || 0}</Text>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2A90F',
  }
})