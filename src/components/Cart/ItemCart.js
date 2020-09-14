import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarIcon from '../Home/StarIcon';
import navigateTo from '../../until/navigateTo'

export default class ItemCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sellerInfo: {}
    }
  }

  navigateToResDetail = () => {
    this.props.navigateToResDetail(this.props.navigateToResDetail(this.state.sellerInfo))
  }

  navigateToDetail = async () => {
    const { item } = this.props;
    this.props.navigateToDetail(item);

  };

  handleDeleteItemCart = () => {
    this.props.deleteItemCart(this.props.item.id, "Bạn có chắc chắn xoá sản phẩm này khỏi giỏ hàng không?");
  }

  changeQuantity = (quantityOrdered) => {
    const { quantity, id } = this.props.item;
    this.props.changeQuantity(id, quantity, quantityOrdered);
  }

  render() {
    var {
      name,
      image,
      starRating,
      price,
      quantity,
      quantityOrdered,
      unit
    } = this.props.item;


    return (
      <View
        style={[styles.product_item, { flexDirection: 'row' }]}
      >
        <TouchableOpacity onPress={this.navigateToDetail} >
          <Image source={{ uri: image || '' }} style={styles.product_img} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: 180 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Icon
              onPress={this.handleDeleteItemCart}
              name="close"
              size={19}
              color="#F2A90F"
            />
          </View>
          <View
            style={{ flexDirection: 'column', marginTop: 5 }}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Icon
                type="font-awesome"
                name="tag"
                size={17}
                color="#F2A90F"
                style={{ marginHorizontal: 5 }}
              />
              <Text>{String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
            </View>

          </View>
          <View style={styles.product_info}>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                onPress={() => this.changeQuantity(quantityOrdered - 1)}
                name="minus"
                size={17}
                style={styles.icon}
                color="#F2A90F" />
              <Text style={[styles.icon, { fontSize: 16 }]}>{quantityOrdered}</Text>
              <Icon
                name="plus"
                size={17}
                color="#F2A90F"
                style={styles.icon}
                onPress={() => this.changeQuantity(quantityOrdered + 1)}
              />
              <Text style={styles.unit}>{unit}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  product_item: {
    width: '100%',
    marginVertical: 20,
    marginHorizontal: 8,
  },
  product_img: {
    width: 90,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 17,
  },
  author: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15,
    color: '#ababab',
  },
  star_icon: {
    paddingHorizontal: 2,
  },
  icon: {
    paddingHorizontal: 5
  },
  unit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  product_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  }
});