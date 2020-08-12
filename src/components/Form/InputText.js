import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from "react-native";
import { Input, Icon } from 'react-native-elements';
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
    const { icon } = this.props;
    return (
      <View>
        <Input
          style={styles.txtInput}
          inputStyle={{ paddingHorizontal: 10, paddingVertical: 5, color: '#555555' }}
          secureTextEntry={this.props.pass}
          onChangeText={(text) => this.onChangeText(text)}
          ref={(r) => this.ref = r}
          returnKeyType={this.props.returnKeyType}
          value={this.props.value}
          {...this.props}
          leftIcon={
            <Icon
              type='feather'
              name={icon}
              size={24}
              color='#aaa'
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtInput: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 17,
  }
})