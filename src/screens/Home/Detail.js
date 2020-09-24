import React, { Component } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation';
import StarIcon from '../../components/Home/StarIcon'
import { Icon } from 'react-native-elements'
import format from '../../until/dateFomrter'
import ListDish from '../../components/Home/ListDish'
import TitleSection from '../../components/Home/TitleSection'
import ModalNotification from '../../components/Home/ModalNotification'
import navigateTo from '../../until/navigateTo'
import showModal from '../../until/showModal'
import { showModalCart } from '../../until/showModal'
import database from '@react-native-firebase/database';
import moment from 'moment'
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions'
import getProductBySeller from '../../until/getProductBySeller'

class Detail extends Component {
    constructor(props) {
        super(props);
        const { item } = props;
        this.state = {
            relatedDishes: [],
            addedToCart: false,
            haveError: false,
            message: '',
            existSeller: false,
            keyCart: ''
        }
        Navigation.events().bindComponent(this);
    }
    componentDidMount() {
        this.getProductOfRestaurant();
    }

    getProductOfRestaurant = async () => {
        const { id } = this.props.sellerInfo;
        var products = await getProductBySeller(id);
        const index = products.findIndex(item => item.id == this.props.item.id);
        products.splice(index, 1);
        this.setState({ relatedDishes: products });
    }

    navigateToDetail = ({ item, sellerInfo }) => {
        navigateTo({ item, sellerInfo }, this.props.componentId, 'Detail');
    };

    navigateToResDetail = () => {
        const { id, name } = this.props.sellerInfo;

        navigateTo(this.props.sellerInfo, this.props.componentId, 'RestaurantDetail', {
            title: {
                text: name,
                alignment: 'center'
            }
        });
    }

    calTimeUsed = () => {
        const { createAt, timeUsed } = this.props.item;
        var now = moment.utc();
        var dateCreate = moment.utc('Thu Jul 04 2020 18:24:56');
        var timeExpride = dateCreate.add(timeUsed, "hours").format('YYYY-MM-DD HH:mm:ss');
        console.log("Time: ", timeExpride);
        
        var duration =moment.duration(now.diff(timeExpride));
        var hours = 0;
        if(duration.asHours() < 0){
            var hi = -(duration.asMilliseconds());
            hours = moment.utc(hi).format("HH:mm:ss");
        }
        
        return hours;
    }

    navigateToSeeAll = () => {
        const { relatedDishes } = this.state;
        navigateTo({ data: relatedDishes }, this.props.componentId, 'SeeAll');
    };

    addToCart = () => {
        const { id } = this.props.user;

        const item = {...this.props.item, quantityOrdered: 1};
        console.log('Itm: ', item);
        

        var refCart = database().ref('carts');
        refCart.orderByChild("userId")
            .equalTo(id).once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    console.log('Snap: ', snapshot.val());
                    
                    var { items, sellerId } = Object.values(snapshot.val())[0];
                    if (sellerId != this.props.sellerInfo.id) {
                        this.setModalVisibleExistSeller();
                    } else {
                        var existPro = items.find(item => item.id == this.props.item.id);
                        if (existPro) {
                            this.setModalVisibleHaveError("Sản phẩm này đã có trong giỏ hàng");
                        } else {
                            items.push(item);
                            console.log('items: ', items);
                            
                            var keyCart = Object.keys(snapshot.val())[0];
                            this.setState({
                                keyCart
                            })
                            
                            refCart.child(keyCart).update({ items });

                            this.completedAddToCart();
                        }
                    }
                } else {
                    refCart.push({ userId: id, sellerId: this.props.sellerInfo.id, items: [item] });
                    this.completedAddToCart();
                }
            })
    }

    deleteBeforeAdd = () => {
        this.setModalVisibleExistSeller();
        const { id } = this.props.user;
        const { keyCart } = this.state;
        var refCart = database().ref('carts').child(keyCart).remove();
        this.addToCart();
    }

    setModalVisibleHaveError = (message = '') => {
        this.setState(prevState => ({
            haveError: !prevState.haveError,
            message
        }))
    }

    navigateToCart = () => {

        const { cart } = this.props;
        this.completedAddToCart();
        showModalCart(cart, "Cart", {
            visible: true,
            title: {
                text: 'Danh sách giỏ hàng',
                alignment: 'center'
            },
            rightButtons: {
                id: 'deleteAll',
                icon: require('../../assets/icons/icon_delete.png'),
            },
        });
    };

    completedAddToCart = () => {
        this.props.fetchCart(this.props.user.id);
        this.setState(prevState => ({
            addedToCart: !prevState.addedToCart
        }))
    }

    setModalVisibleExistSeller = () => {
        this.setState(prevState => ({
            existSeller: !prevState.existSeller
        }))
    }

    render() {
        const { item } = this.props;
        const { image, name, sellerName, quantity, price, createAt, timeUsed } = item;
        const { starRating } = this.props.sellerInfo;
        const { relatedDishes, haveError, addedToCart, message, existSeller } = this.state;

        return (
            <View style={{position: 'relative', flex: 1}}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.info}>
                        <Image
                            source={{ uri: image }}
                            style={styles.dish_image}
                        />
                        <Text style={styles.nameDish} numberOfLines={1}>
                            {name}
                        </Text>

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


                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingRight: 7 }}>
                            <Icon
                                type="entypo"
                                name="clock"
                                size={19}
                                color="#F2A90F"
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.sellerName}>{format(createAt)}</Text>
                        </View>
                        <View>
                            <Text><Text style={styles.sellerName}>Còn khả dụng:</Text> {this.calTimeUsed()}</Text>
                        </View>

                        <TouchableOpacity onPress={this.navigateToResDetail}>
                            <Text style={styles.sellerName}>{this.props.sellerInfo.name}</Text>
                        </TouchableOpacity>
                        <StarIcon star={starRating} />
                    </View>
                    <TitleSection type="Món tương tự" data={relatedDishes} navigateToSeeAll={this.navigateToSeeAll}></TitleSection>
                    <ListDish flex='row' horizontal={false} data={relatedDishes} navigateToDetail={this.navigateToDetail}></ListDish>
                    <ModalNotification
                        modalVisible={haveError}
                        setModalVisible={this.setModalVisibleHaveError}
                        text={message}
                        textButton2='Đã hiểu'
                    >
                    </ModalNotification>
                    <ModalNotification
                        modalVisible={addedToCart}
                        setModalVisible={this.completedAddToCart}
                        text='Thêm vào giỏ hàng thành công'
                        textButton='Đến giỏ hàng'
                        textButton2='Lúc khác'
                        navigateToCall={this.navigateToCart}
                    >
                    </ModalNotification>
                    <ModalNotification
                        modalVisible={existSeller}
                        setModalVisible={this.setModalVisibleExistSeller}
                        text='Bạn có chắc chắn muốn xóa giỏ hàng cũ không'
                        textButton='Có'
                        textButton2='Không'
                        navigateToCall={this.deleteBeforeAdd}
                    >
                    </ModalNotification>
                </ScrollView>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                    <TouchableOpacity style={styles.btnAddToCart} onPress={this.addToCart}>
                        <Text style={styles.btnText}>Thêm vào giỏ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        marginBottom: 60,
        marginHorizontal: 15,
        marginTop: 20,
        padding: 5
    },
    dish_image: {
        width: 175,
        height: 210,
        borderRadius: 6,
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameDish: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 18,
    },
    sellerName: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 16,
        color: '#ababab',
    },
    textContent: {
        color: '#7f7f7f',
    },
    btnAddToCart: {
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2A90F",
    },
    btnText: {
        color: '#fff',
        fontSize: 17
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        cart: state.productReducer.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCart: (userId) => dispatch(productActions.fetchCart(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
