import React, { Component } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import ItemCart from '../../components/Cart/ItemCart'
import navigateTo from '../../until/navigateTo';
import showModal from '../../until/showModal'
import DateTimePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import ModalNotification from '../../components/Home/ModalNotification';
import database from '@react-native-firebase/database';
import Loading from "../../components/Home/Loading"
import uuid from 'react-native-uuid'
import * as productActions from '../../reduxs/productRedux/actions'
import EmptyCart from '../../components/Empty/EmptyCart'
import moment from 'moment';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askDelete: false,
      loading: true,
      idBookDelete: '',
      deleteSuccess: false,
      successMess: '',
      askMess: '',
      error: '',
      deleteAll: false,
      sellerInfo: {},
      mode: 'date',
      time: new Date()
    }
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.setState({ loading: true })
    const { sellerId } = this.props.cart;
    var nameRef = '';
    if (sellerId) {
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
      this.calTotalPrice();
    }
    setTimeout(() => this.setState({ loading: false }), 1500)
  }

  calTotalPrice = () => {
    const { items } = this.props.cart;
    var totalPrice = items.reduce((total, { quantityOrdered, price }) => total + quantityOrdered * price, 0);
    this.setState({
      totalPrice: totalPrice
    })
  }


  deleteItemCart = () => {
    const { idUser, cart } = this.props;
    const { idProdDelete, deleteAll } = this.state;

    if (deleteAll) {
      var refCart = database().ref('carts').child(cart.id).remove();
      this.props.fetchCart(idUser);
    } else {
      var refCart = database().ref('carts');
      refCart.orderByChild("userId")
        .equalTo(idUser).once('value')
        .then(snapshot => {
          var { items } = Object.values(snapshot.val())[0];
          var index = items.findIndex(item => item.id == idProdDelete);

          items.splice(index, 1);
          if (items.length <= 0) {
            database().ref('carts').child(cart.id).remove();
          } else {
            refCart.child(cart.id).update({ items });

          }
          this.props.fetchCart(idUser);
          this.calTotalPrice();
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
    if (buttonId == 'left') {
      Navigation.dismissAllModals();
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

  changeQuantity = (productId, quantity, quantityOrdered) => {
    const { idUser, cart } = this.props;
    const { items } = cart;
    if (quantityOrdered < 1) {
      this.changeAskDelete(productId, "Bạn có chắc chắn muốn xoá toàn bộ giỏ hàng không?");
    } else {
      if (quantity >= quantityOrdered) {
        const index = items.findIndex(item => item.id === productId);
        items[index].quantityOrdered = quantityOrdered;

        database().ref('carts').child(cart.id).update({ items });
        this.props.fetchCart(idUser);
        this.calTotalPrice();
      } else {
        this.setState({
          error: 'Không còn đủ số lượng'
        })
      }
    }
  }

  order = () => {
    const { cart, idUser, orders, user } = this.props;
    const { items } = cart;
    const { totalPrice, time } = this.state;
    console.log('time: ', time)

    const totalUnReceivedOrder = orders.reduce((total, item) => {
      if (item.status == 'unConfirmed' || item.status == "confirmed") {
        return total + 1;
      }
      return total
    }, 0);

    const orderDate = moment().format();
    

    var orderId = uuid.v4();
    var order = { status: 'unConfirmed', orderId, buyer: user, seller: this.state.sellerInfo, items: items, orderDate, totalPrice, receiveTime: time };
    
    if (totalUnReceivedOrder < 2) {
      var refCart = database().ref('orders/' + orderId);
      refCart.set(order);
      database().ref('carts').child(cart.id).remove();
      this.props.fetchCart(idUser);
      this.props.fetchOrder(idUser);
      showModal({ orderId }, 'OrderDetail', {
        title: {
          text: "Chi tiết đơn hàng",
          alignment: 'center',
          leftButtons: {
            id: 'left',
            text: 'Huy',
          }
        }
      });
    }else {
      this.setState({
        error: 'Bạn đang có 2 đơn hàng chưa nhận. Vui lòng nhận trước khi tiếp tục order'
      })
    }
  }

  navigateToResDetail = (sellerInfo) => {
    const { name } = sellerInfo;

    navigateTo(this.state.sellerInfo, this.props.componentId, 'RestaurantDetail', {
      title: {
        text: name,
        alignment: 'center'
      }
    });
  }

  navigateToOrder = () => {
    this.changeDeleteSuccess();
    navigateTo({ changeQuantity: this.changeQuantity }, this.props.componentId, 'Order', {
      text: 'Danh sách đơn hàng',
      alignment: 'center',

    })
  }

  convertDate = (dateStr) => {
     // From mm-dd-yyyy to yyyy-mm-ddThh:MM:ssZ
     var dArr = dateStr.split("-");
     return dArr[2] + "-" + dArr[0] + "-" + dArr[1] + "T00:00:00"; //2017-09-13T00:13:28
  }

  onChange = (timer) => {
    const { time } = this.state;
    
    var finalTime = moment(time).format('YYYY-MM-DD') + ' ' + timer + ':00';
    console.log("final:  ",  finalTime)
    const time2 = moment(finalTime, 'YYYY-MM-DD HH:mm:ss', true).format();
    console.log('Time 1: ', time2);

    this.setState(prevState => ({
      ...prevState,
      time: time2
    }))
  }

  render() {
    const { askDelete, deleteSuccess, successMess, error, askMess, sellerInfo, totalPrice, mode, time, loading } = this.state;
    
    if (loading) {
      return (
          <Loading color='#F2A90F' bkg='#fff'></Loading>
      )
  }
    if (!this.props.cart.items) {
      return <EmptyCart />;
    }
    return (
      <>
        <View style={{ marginBottom: 45, marginTop: 20 }}>

          <TouchableOpacity onPress={this.navigateToResDetail}>
            <Text style={styles.sellerName} numberOfLines={1}>{sellerInfo.name || ''}</Text>
          </TouchableOpacity>
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
        <View style={styles.bottom}>
          <View style={styles.time}>
            <Text style={[styles.txt, { flex: 1 }]}>Giờ đến nhận: </Text>
            <DateTimePicker
              onDateChange={(time) => this.onChange(time)}
              testID="dateTimePicker"
              date={moment(time)}
              mode='time'
              // minTime='13:45:34'
              dateFormat='HH:mm:ss'
              is24Hour={true}
            />
          </View>
          <View style={styles.totalPrice}>
            <Text style={[styles.txt, { flex: 1 }]}>Tổng tiền: </Text>
            <Text style={styles.txt}>{String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
          </View>
          <TouchableOpacity style={styles.btnOrder} onPress={this.order}>
            <Text style={styles.btnText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  btnOrder: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2A90F"
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20
  },
  txt: {
    fontSize: 17,
  },
  sellerName: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 17,
    paddingLeft: 23,
    fontWeight: 'bold'
  },
  totalPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 40,
    marginHorizontal: 15,
  },
  bottom: {
    position: 'absolute',
    left: 0, right: 0,
    bottom: 0,
    shadowColor: '#111',
    backgroundColor: '#FFF'
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 40,
    marginHorizontal: 15,
    marginVertical: 10
  }
})

function mapStateToProps(state) {
  return {
    cart: state.productReducer.cart,
    orders: state.productReducer.orders,
    idUser: state.authReducer.user.id,
    token: state.authReducer.token,
    user: state.authReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCart: (userId) => dispatch(productActions.fetchCart(userId)),
    fetchOrder: (userId) => dispatch(productActions.fetchOrder(userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
