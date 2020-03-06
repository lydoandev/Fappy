import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"

export default class Title extends Component {
  render() {
    var { title } = this.props;
    return (
      <View style={styles.textView}>
        <Text style={{fontSize: 14}}>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    // flex: 1,
  }
})