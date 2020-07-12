import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { sideMenu } from '../../config/bottomTabs';

export default class SwiperSlider extends Component {
  constructor(props) {
    super(props);
  }

  moveToHome = () => {
    Navigation.setRoot({
      root: {
        sideMenu,
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.styleContent}>
          <Image source={this.props.sourceImage} style={styles.styleImage} />
          <Text style={styles.styleTitle}>{this.props.title}</Text>
          <Text style={styles.styleDescription}>{this.props.description}</Text>
        </View>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={styles.styleButtonStart}
            onPress={this.moveToHome}>
            <Text>Bắt Đầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleContent: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTitle: {
    margin: 15,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'SVN-ProximaNova',
    color: '#262626',
    textAlign: 'center',
  },
  styleDescription: {
    margin: 15,
    fontFamily: 'SVN-ProximaNova',
    fontSize: 16,
    textAlign: 'center',
    color: '#848484',
  },
  styleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 80,
  },
  styleButtonStart: {
    borderColor: '#F2A90F',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2A90F',
    width: 150,
    borderRadius: 10,
  },
  styleImage: {
    height: 200,
  },
});