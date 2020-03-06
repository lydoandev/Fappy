import React, { Component } from 'react'
import { View, ActivityIndicator, Text, StatusBar } from 'react-native'

export default class Loading extends Component {
  render() {
    const {color, bkg} = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: bkg || '#F2A90F' }}>
        <ActivityIndicator size="large" color={color || "#fff"}/>
        <Text style={{ color: color || "#fff" }}>Đang xử lí</Text>
        <StatusBar barStyle="default" />
      </View>
    )
  }
}