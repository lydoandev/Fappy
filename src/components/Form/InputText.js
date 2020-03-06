import React, { Component } from 'react'
import { View, TextInput } from "react-native"
export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return nextProps
    }
    return false;
  }

  getInnerRef = () => this.ref;

  onChangeText = (value) => {
    this.setState({
      value
    })
    this.props.getData(this.props.name, value);
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ height: 42, borderRadius: 5, backgroundColor: '#fff', width: '100%', fontSize: 17 }}
          secureTextEntry={this.props.pass}
          onChangeText={(text) => this.onChangeText(text)}
          ref={(r) => this.ref = r}
          returnKeyType={this.props.returnKeyType}
          value={this.props.value}
        />
      </View>
    )
  }
}