import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import TimePicker from 'react-native-simple-time-picker';
import { Icon } from 'react-native-elements'
import ReviewOrderItem from '../../components/Home/ReviewOrderItem';
import navigateTo from '../../until/navigateTo';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import * as productActions from '../../reduxs/productRedux/actions'

class ConfirmBeforeOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            totalPrice: 0
        }
    }

    componentDidMount() {
        this.calTotalPrice();
    }

    handleOpenNote = () => {
        this.setState(prevState => ({
            openNote: !prevState.openNote,
        }))
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
                    this.calTotalPrice();
                })
        }

    }

    changeQuantity = (productId, quantity, quantityOrdered) => {
        const { idUser, cart } = this.props;
        const { items } = cart;
        console.log('Hello', quantityOrdered);

        if (quantityOrdered >= 1) {
            console.log("bef", quantity);

            if (quantity >= quantityOrdered) {
                console.log("bef");

                const index = items.findIndex(item => item.id === productId);
                items[index].quantityOrdered = quantityOrdered;

                firebase.database().ref('carts').child(cart.id).update({ items });
                this.props.fetchCart(idUser);
                this.calTotalPrice();
            }
        } else {
            this.deleteItemCart(productId);
        }
    }

    order = () => {
        const { cart, idUser } = this.props;
        const { items } = cart;
        const { totalPrice } = this.state;
        var order = { userId: idUser, seller: this.props.sellerInfo, items: items, orderDate: new Date(), totalPrice };
        var refCart = firebase.database().ref('orders');
        refCart.push(order);
        firebase.database().ref('carts').child(cart.id).remove();
        this.props.fetchCart(idUser);
        navigateTo({order}, this.props.componentId, 'OrderDetail',{
            title: {
              text: "Chi tiết đơn hàng",
              alignment: 'center'
            }
          });
    }

    render() {
        const { name, address, phone } = this.props.sellerInfo;
        const { openNote, totalPrice } = this.state;
        return (
            <>
                <View style={styles.content}>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, }}>
                        <Text style={styles.title}>Thông tin cửa hàng</Text>
                        <View style={styles.infoRes}>
                            <Icon
                                type="font-awsome"
                                name="home"
                                size={20}
                                color="#F2A90F"
                                style={{ marginHorizontal: 5 }}
                            />
                            <Text style={styles.txt} numberOfLines={1}>{name}</Text>
                        </View>
                        <View style={styles.infoRes}>
                            <Icon
                                type="entypo"
                                name="location"
                                size={19}
                                color="#F2A90F"
                                style={{ marginHorizontal: 5 }}
                            />
                            <Text style={styles.txt} numberOfLines={2}>{address}</Text>
                        </View>
                        <View style={styles.infoRes}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Icon
                                    type="font-awsome"
                                    name="phone"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginHorizontal: 5 }}
                                />
                                <Text style={styles.txt} numberOfLines={2}>{phone.substring(0, 4)} {phone.substring(4, 7)} {phone.substring(7, 10)}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={this.handleOpenNote}>
                                    <Icon
                                        type="material"
                                        name={openNote ? "arrow-drop-up" : "arrow-drop-down"}
                                        size={30}
                                        color="#F2A90F"
                                        style={{ marginHorizontal: 5 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {openNote && (
                    <View style={styles.content}>
                        <View style={{ marginHorizontal: 10, marginVertical: 15, }}>
                            <Text style={styles.title}>Lưu ý: </Text>
                            <View style={styles.infoRes}>
                                <Icon
                                    type="simple-line-icon"
                                    name="note"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginHorizontal: 5 }}
                                />
                                <Text style={styles.txt} numberOfLines={3}>Vui lòng đến đúng địa chỉ và liên hệ với người bán qua số điện thoại trên để nhận hàng</Text>
                            </View>
                        </View>
                    </View>
                )}
                <View style={[styles.content, { marginBottom: 10 }]}>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, }}>
                        <Text style={[styles.title, { marginBottom: 10, }]}>Chi tiết đơn hàng: </Text>
                        <FlatList
                            data={this.props.cart.items}
                            renderItem={({ item }) => (
                                <ReviewOrderItem
                                    item={item}
                                    changeQuantity={this.changeQuantity}
                                />
                            )}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginHorizontal: 15 }}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.totalPrice}>
                        <Text style={[styles.txt, { flex: 1 }]}>Tổng tiền: </Text>
                        <Text style={styles.txt}>{String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                    </View>
                    <TouchableOpacity style={styles.btnOrder} onPress={this.order}>
                        <Text style={styles.btnText}>Đặt món</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        backgroundColor: '#fff'
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
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    infoRes: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        marginHorizontal: 10
    },
    txt: {
        fontSize: 16,
        paddingLeft: 5,
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
        backgroundColor: '#FFF',
        marginTop: 10
    }
})

function mapStateToProps(state) {
    return {
        cart: state.productReducer.cart,
        idUser: state.authReducer.user.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCart: (userId) => dispatch(productActions.fetchCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBeforeOrder);
