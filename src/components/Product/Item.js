import React, {Component} from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {showModal} from '../../screens/Navigations';

export default class Item extends Component {
  moveToDetail = item => {
    this.props.moveToDetail(item);
  };
  addProd = () => {
    showModal('AddProd');
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.moveToDetail(this.props.element)}
          style={styles.container}>
          <Image style={styles.img} source={{uri: this.props.element.image}} />
          <Text style={styles.title}>
            {this.props.element.name}
            <Text style={styles.price}> ({this.props.element.price}đ/{this.props.element.unit})</Text>
          </Text>
          <Text style={styles.date}>Số lượng : {this.props.element.quantity} {this.props.element.unit}</Text>
          <Text style={styles.venue}>
            Tạo lúc: {this.props.element.createAt}
          </Text>
          <Text style={styles.venue}>
            Thời gian sử dụng: {this.props.element.createAt} tiếng kể từ lúc tạo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addProd}>
          <Text style={styles.addTxt}>Thêm sản phẩm mới</Text>
        </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  date: {
    fontSize: 15,
    color: '#FF6347',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  venue: {
    fontSize: 15,
    color: '#C0C0C0',
  },
  img: {
    borderRadius: 20,
    height: 200,
  },
  price: {
    fontSize: 15,
    color: '#FF6347',
    textAlign: 'right',
    paddingLeft: 20,
  },
  addTxt: {
    color: '#ffffff',
    fontWeight: "bold",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#DAA520",
    borderRadius: 5,
    marginHorizontal: 15,
    textAlign: "center"
  }
});
