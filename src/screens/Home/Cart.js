import React, { Component } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import ItemCart from '../../components/Cart/ItemCart'
import navigateTo from '../../until/navigateTo';
import * as userActions from '../../reduxs/authRedux/actions'
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import ModalNotification from '../../components/Home/ModalNotification';
import firebase from 'react-native-firebase'
import * as productActions from '../../reduxs/productRedux/actions'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askDelete: false,
      idBookDelete: '',
      deleteSuccess: false,
      successMess: '',
      askMess: '',
      error: '',
      deleteAll: false
    }
    Navigation.events().bindComponent(this);
  }

  deleteItemCart = async () => {
    const { idUser, cart } = this.props;
    const { idProdDelete, deleteAll } = this.state;

    if (deleteAll) {
      var refCart = firebase.database().ref('carts').child(cart.id).remove();
      this.props.fetchCart(idUser);
    } else {
      var refCart = firebase.database().ref('carts');
      refCart.orderByChild("userId")
        .equalTo(idUser).once('value')
        .then(snapshot => {
          var { items } = Object.values(snapshot.val())[0];
          var index = items.findIndex(item => item.id == idProdDelete);

          items.splice(index, 1);
          if (items.length <= 0) {
            firebase.database().ref('carts').child(cart.id).remove();
          } else {
            refCart.child(cart.id).update({ items });

          }
          this.props.fetchCart(idUser);

        })
    }
    this.setState(prevState => ({
      ...prevState,
      deleteSuccess: !prevState.deleteSuccess,
      askDelete: !prevState.askDelete,
      error: "Xóa giỏ hàng thành công"
    }))

  }

  navigateToDetail = item => {
    navigateTo({
      item
    }, this.props.componentId, 'Detail');
  };

  changeDeleteSuccess = () => {
    this.setState(prevState => ({
      ...prevState,
      deleteSuccess: !prevState.deleteSuccess,
      successMess: '',
      error: ''
    }))
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'deleteAll') {
      this.setState(prevState => ({
        ...prevState,
        deleteAll: true
      }))
      this.changeAskDelete("", "Bạn có chắc chắn muốn xoá toàn bộ giỏ hàng không?");
    }
  };

  changeAskDelete = (idProdDelete, askMess) => {
    this.setState(prevState => ({
      ...prevState,
      askDelete: !prevState.askDelete,
      idProdDelete,
      askMess
    }))
  }

  //   changeQuantity = async (BookId, Quantity) => {
  //     const { token, idUser, idCart } = this.props;
  //     const info = { BookId, UserId: idUser, Quantity }

  //     try {
  //       var data = await callAPI(`api/basket/${idCart}`, 'PUT', info, token);
  //       this.props.getCart({ basketId: idCart, userId: idUser, token });
  //     } catch (error) {

  //       this.setState(prevState => ({
  //         ...prevState,
  //         error: error.response.data.Message
  //       }))

  //     }
  //   }

  //   order = async () => {
  //     const { token, idUser, idCart } = this.props;
  //     const info = { ShippingAddress: '', ShippingRequired: false, UserId: idUser, Note: '' }

  //     try {
  //       var data = await callAPI('api/orders', 'POST', info, token);

  //       this.props.getCart({ basketId: idCart, userId: idUser, token });
  //       this.setState(prevState => ({
  //         ...prevState,
  //         successMess: 'Đặt sách thành công',
  //       }))
  //     } catch (error) {

  //       this.setState(prevState => ({
  //         ...prevState,
  //         error: error.response.data.Message
  //       }))

  //     }
  //   }

  navigateToResDetail = (sellerInfo) => {
    const { name } = sellerInfo;

    navigateTo(sellerInfo, this.props.componentId, 'RestaurantDetail', {
      title: {
        text: name,
        alignment: 'center'
      }
    });
  }

  navigateToOrder = () => {
    this.changeDeleteSuccess();
    navigateTo({}, this.props.componentId, 'Order', {
      text: 'Danh sách đơn hàng',
      alignment: 'center'
    })
  }

  render() {
    const { askDelete, deleteSuccess, successMess, error, askMess } = this.state;
    console.log("Cart 2: ", this.props)
    return (
      <>
        <View style={{ marginBottom: 45 }}>
          <FlatList
            data={this.props.cart.items}
            renderItem={({ item }) => (
              <ItemCart
                item={item}
                navigateToDetail={this.navigateToDetail}
                navigateToResDetail={this.navigateToResDetail}
                deleteItemCart={this.changeAskDelete}
                changeQuantity={this.changeQuantity}
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginHorizontal: 15 }}
          />
          <ModalNotification
            modalVisible={askDelete}
            setModalVisible={this.changeAskDelete}
            text={askMess}
            textButton='Có'
            textButton2='Không'
            navigateToCall={this.deleteItemCart}
          />
          <ModalNotification
            modalVisible={error != '' ? true : false}
            navigateToCall={this.changeDeleteSuccess}
            text={error}
            textButton='Đã hiểu'
          />
          <ModalNotification
            modalVisible={successMess != '' ? true : false}
            navigateToCall={this.navigateToOrder}
            setModalVisible={this.changeDeleteSuccess}
            text={successMess}
            textButton2='Lúc khác'
            textButton='Xem đơn hàng'
          />
        </View>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <TouchableOpacity style={styles.btnOrder} onPress={this.order}>
            <Text style={styles.btnText}>Đặt Món</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  btnOrder: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2A90F"
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20
  }
})

function mapStateToProps(state) {
  return {
    cart: state.productReducer.cart,
    idUser: state.authReducer.user.id,
    token: state.authReducer.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCart: (userId) => dispatch(productActions.fetchCart(userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
