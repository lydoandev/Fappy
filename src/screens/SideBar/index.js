import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import {connect} from 'react-redux'
import * as userActions from '../../reduxs/authRedux/actions'

class SideBar extends Component {
  handleCloseSideMenu = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', width: '90%' }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
            padding: 18,
            borderBottomWidth: 1,
            borderColor: '#E9E9E9',
            backgroundColor: '#F2A90F'
          }}>
          <View />
          <Text style={{ fontSize: 18, color: '#ffffff' }}>FAPPY</Text>
          <TouchableOpacity onPress={this.handleCloseSideMenu}>
            <Icon
              type="EvilIcons"
              name="close"
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.menu}
            onPress={this.handleOpenProfile}
          >
            <Icon
              type="font-awesome"
              name="user-circle"
              color='#F2A90F'
            />
            <Text style={styles.menuTitle}>Trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu}
            onPress={this.handleOpenOrderHistory}
          >
            <Icon
              type="font-awesome"
              name="handshake-o"
              color='#F2A90F'
            />
            <Text style={styles.menuTitle}>Trở thành đối tác</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menu}
            onPress={this.props.onLogout}
          >
            <Icon
              type="antdesign"
              color='#F2A90F'
              name="logout"
            />
            <Text style={styles.menuTitle}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e9e9e9'
  }, menuTitle: {
    fontSize: 15,
    paddingLeft: 10
  }
})


const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(userActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(SideBar)

