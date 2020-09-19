import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: true,
    };
  }
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        {this.state.showIndicator && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
