import React, { Component } from 'react'
import database from '@react-native-firebase/database'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment'
export default class ItemDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalImageVisible: false,
      sellerInfo: {}
    }
  }

  openImageModal = () => {

    this.setState(prevState => ({
      ...prevState,
      modalImageVisible: true
    }))
  }

  componentDidMount() {
    const { sellerId } = this.props.item;
    var nameRef = '';
    if (sellerId.includes("RES")) {
      nameRef = "restaurants/" + sellerId;
    } else {
      nameRef = "marketers/" + sellerId;
    }
    var ref = database().ref(nameRef)
    ref.once('value').then(snapshot => {
      this.setState({
        sellerInfo: { ...snapshot.val(), id: snapshot.key }
      })
    });

  }


  closeImage = () => {
    this.setState(prevState => ({
      ...prevState,
      modalImageVisible: false
    }))
  }

  moveToUpdateProd = () => {
    this.props.moveUpdateProd(this.props.item)
  }

  handleDelete = () => {
    console.log('Delete nef');

    this.props.deleteItem(this.props.item, "Bạn có chắc chắn xoá sản phẩm này không?");
  }

  render() {
    const { image, name, quantity, price, createAt } = this.props.item;
    const { modalImageVisible } = this.state;
    // var flex = 'column'
    // this.getInfoSeller();


    return (
      <>
        <TouchableOpacity
          style={[styles.dish_item, { flexDirection: 'row', width: 300 }]}
          onPress={this.moveToUpdateProd}>
          <TouchableOpacity onPress={this.openImageModal}>
            <Image source={{ uri: image || 'agagaga' }} style={styles.dish_img} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', width: 230 }}>
            <View style={{ alignItems: 'flex-end', marginBottom: 0, height: 20, marginLeft: 0 }}>
              <TouchableOpacity
                onPress={this.handleDelete}>
                <Icon
                  type="antdesign"
                  name="close"
                  size={22}
                  color="#F2A90F"
                  onPress={this.handleDelete}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: 'column', marginTop: 5, marginLeft: 10 }}>
              <Text style={styles.title} numberOfLines={1}>
                {name}
              </Text>
              <View style={{ alignItems: 'center', flexDirection: 'row', paddingRight: 7 }}>
                <Icon
                  type="entypo"
                  name="clock"
                  size={19}
                  color="#F2A90F"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.txt}>{moment(createAt).format('DD-MM-YYYY HH:mm:ss')}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', paddingRight: 7 }}>
                  <Icon
                    type="material-community"
                    name="disqus"
                    size={19}
                    color="#F2A90F"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.txt}>{quantity}</Text>
                </View>
                <Icon
                  type="font-awesome"
                  name="tag"
                  size={17}
                  color="#F2A90F"
                  style={{ marginHorizontal: 5 }}
                />
                <Text style={styles.txt}>{String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }
}
const styles = StyleSheet.create({
  dish_item: {
    marginVertical: 20,
    marginRight: 13,
  },
  dish_img_big: {
    width: 250,
    height: 280,
    borderRadius: 10,
    marginRight: 5
  },
  dish_img: {
    width: 130,
    height: 150,
    borderRadius: 10,
    marginRight: 5
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 18,
    fontWeight: 'bold'
  },
  author: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15,
    color: '#ababab',
  },
  txt: {
    fontSize: 17
  }
});