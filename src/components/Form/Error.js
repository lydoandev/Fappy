import React, { Component } from 'react'

import { View, Text, StyleSheet } from 'react-native'

export default class Error extends Component {

  render() {
    return (
      <View style={{
        display: this.props.errorText != "" ? 'flex' : 'none',
        marginTop: 5,
        height: 20,
      }}>
        <Text style={styles.errorText} >{this.props.errorText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorText: {
    paddingLeft: 5,
    color: '#ff3333'
  }
})