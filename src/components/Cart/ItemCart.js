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
import firebase from 'react-native-firebase'
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

  componentDidMount() {
    const { sellerId } = this.props.item;
    console.log("item", sellerId)
    var nameRef = '';
    if (sellerId.includes("RES")) {
      nameRef = "restaurants/" + sellerId;
    } else {
      nameRef = "marketers/" + sellerId;
    }
    var ref = firebase.database().ref(nameRef)
    ref.once('value').then(snapshot => {
      this.setState({
        sellerInfo: { ...snapshot.val(), id: snapshot.key }
      })
    });

  }

  navigateToDetail = async () => {
    const { item } = this.props;
    this.props.navigateToDetail(item);

  };

  handleDeleteItemCart = () => {
    this.props.deleteItemCart(this.props.item.Id);
  }

  changeQuantity = (quantity) => {
    if (quantity >= 1) {
      this.props.changeQuantity(this.props.item.Id, quantity);
    } else {
      this.props.deleteItemCart(this.props.item.Id);
    }
  }

  render() {
    var {
      name,
      image,
      starRating,
      price,
      quantity,
    } = this.props.item;

    console.log("Seller: ", this.state.sellerInfo)


    return (
      <View
        style={[styles.book_item, { flexDirection: 'row' }]}
      >
        <TouchableOpacity onPress={this.navigateToDetail} >
          <Image source={{ uri: image || '' }} style={styles.book_img} />
        </TouchableOpacity>
        <View style={{ marginTop: 5 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Icon
              onPress={this.handleDeleteItemCart}
              name="close"
              size={19}
              color="#F2A90F"
            />
          </View>
          <View
            style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <TouchableOpacity onPress={this.navigateToResDetail}>
              <Text style={styles.sellerName} numberOfLines={1}>{this.state.sellerInfo.name || ''}</Text>
            </TouchableOpacity>

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <Text style={{ fontSize: 16, }}>Quantity</Text>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', }}>
              <Icon
                onPress={() => this.changeQuantity(quantity - 1)}
                name="minus"
                size={17}
                style={styles.icon}
                color="#F2A90F" />
              <Text style={[styles.icon, { fontSize: 16 }]}>{quantity}</Text>
              <Icon
                name="plus"
                size={17}
                color="#F2A90F"
                style={styles.icon}
                onPress={() => this.changeQuantity(quantity + 1)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  book_item: {
    width: 155,
    marginVertical: 20,
    marginHorizontal: 8,
  },
  book_img: {
    width: 145,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
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
  sellerName: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 16,
    color: '#ababab',
  },
});