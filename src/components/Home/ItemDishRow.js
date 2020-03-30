import React, { Component } from 'react'
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
      modalImageVisible: false
    }
  }

  openImageModal = () => {

    this.setState(prevState => ({
      ...prevState,
      modalImageVisible: true
    }))
  }

  closeImage = () => {
    this.setState(prevState => ({
      ...prevState,
      modalImageVisible: false
    }))
  }

  navigateToDetail = () => {
    
    this.props.navigateToDetail(this.props.item)
  }

  render() {
    const { image, name, quantity, price, sellerName } = this.props.item;
    const { modalImageVisible } = this.state;
    var flex = 'column'

    return (
      <>
        <TouchableOpacity
          style={[styles.dish_item, { flexDirection: flex }]}
          onPress={this.navigateToDetail}>
          <TouchableOpacity onPress={this.openImageModal}>
            <Image source={{ uri: image || 'agagaga' }} style={styles.dish_img} />
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'row', marginTop: 20}}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.author} numberOfLines={1}>{sellerName}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
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
    width: 105,
    marginRight: 13,
  },
  dish_img_big: {
    width: '50%',
    height: 300,
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
