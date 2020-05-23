import React, { Component } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import ItemCart from '../../components/Cart/ItemCart'
import navigateTo from '../../until/navigateTo';
import * as userActions from '../../reduxs/authRedux/actions'
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
// import ModalAddCart from '../../components/Home/ModalAddCart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askDelete: false,
      idBookDelete: '',
      deleteSuccess: false,
      successMess: '',
      error: '',
      deleteAll: false
    }
    Navigation.events().bindComponent(this);
  }

//   deleteItemCart = async () => {
//     const { token, idUser, idCart } = this.props;
//     const { idBookDelete, deleteAll } = this.state;
//     const info = { BookId: idBookDelete, UserId: idUser, DeleteAll: deleteAll }

//     try {
//       var data = await callAPI('api/basket', 'DELETE', info, token);
//       this.props.getCart({ basketId: idCart, userId: idUser, token });
//       this.changeAskDelete();
//       this.setState(prevState => ({
//         ...prevState,
//         deleteSuccess: !prevState.deleteSuccess,
//         error: "Xóa sách thành công"
//       }))
//     } catch (error) {

//       this.setState(prevState => ({
//         ...prevState,
//         error: error.response.data.Message
//       }))

//     }
//   }

  navigateToDetail = item => {
    navigateTo({
      item
    }, this.props.componentId, 'Detail');
  };

//   changeDeleteSuccess = () => {
//     this.setState(prevState => ({
//       ...prevState,
//       deleteSuccess: !prevState.deleteSuccess,
//       successMess: '',
//       error: ''
//     }))
//   }

//   navigationButtonPressed = ({ buttonId }) => {
//     if (buttonId === 'deleteAll') {
//       this.setState(prevState => ({
//         ...prevState,
//         deleteAll: true
//       }))
//       this.changeAskDelete("");
//     }
//   };

//   changeAskDelete = (idBookDelete) => {
//     this.setState(prevState => ({
//       ...prevState,
//       askDelete: !prevState.askDelete,
//       idBookDelete
//     }))
//   }

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
  const {name } = sellerInfo;

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
    const { askDelete, deleteSuccess, successMess, error } = this.state;
    console.log("Cart 2: ", this.props)
    return (
      <>
        <View style={{ marginBottom: 45 }}>
          <FlatList
            data={this.props.items}
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
          {/* <ModalAddCart
            modalVisible={askDelete}
            setModalVisible={this.changeAskDelete}
            text='Bạn có chắc chắn muốn xóa sách này khỏi giỏ hàng không?'
            textButton='Có'
            textButton2='Không'
            navigateToCall={this.deleteItemCart}
          />
          <ModalAddCart
            modalVisible={error != '' ? true : false}
            navigateToCall={this.changeDeleteSuccess}
            text={error}
            textButton='Đã hiểu'
          />
          <ModalAddCart
            modalVisible={successMess != '' ? true : false}
            navigateToCall={this.navigateToOrder}
            setModalVisible={this.changeDeleteSuccess}
            text={successMess}
            textButton2='Lúc khác'
            textButton='Xem đơn hàng'
          /> */}
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
    idCart: state.authReducer.idCart,
    cart: state.authReducer.cart,
    idUser: state.authReducer.user.Id,
    token: state.authReducer.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCart: ({ basketId, userId, token }) => dispatch(userActions.getCart({ basketId, userId, token })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
