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
import ImageModal from './ImageModal'
import { Icon } from 'react-native-elements'
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

  componentDidMount(){
    const {sellerId} = this.props.item;
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

  navigateToDetail = () => {
    this.props.navigateToDetail({item: this.props.item, sellerInfo: this.state.sellerInfo})
  }

  render() {
    const { image, name, quantity, price} = this.props.item;
    const { modalImageVisible } = this.state;
    const { flex } = this.props;
    // var flex = 'column'
    // this.getInfoSeller();


    return (
      <>
        <TouchableOpacity
          style={[styles.dish_item, { flexDirection: flex, width: flex == 'row' ? 215 : 105 }]}
          onPress={this.navigateToDetail}>
          <TouchableOpacity onPress={this.openImageModal}>
            <Image source={{ uri: image || 'agagaga' }} style={styles.dish_img} />
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'column', marginTop: flex == 'row' ? 15 : 5, marginLeft: flex == 'row' ? 10 : 0 }}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.author} numberOfLines={flex == 'row' ? 2 : 1}>{this.state.sellerInfo.name}</Text>
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
                <Text>{quantity}</Text>
              </View>
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
        </TouchableOpacity>
        <ImageModal
          modalImageVisible={modalImageVisible}
          closeImage={this.closeImage}
          image={image}
        />
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
    width: 200,
    height: 240,
    borderRadius: 10,
    marginRight: 5
  },
  dish_img: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 5
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 17,
  },
  author: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15,
    color: '#ababab',
  }
});
