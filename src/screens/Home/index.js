import React, { Component } from 'react'
import firebase from 'react-native-firebase'

import { Text, View, SectionList, ScrollView, FlatList } from 'react-native'
import ItemDish from '../../components/Home/ItemDish'
import navigateTo from '../../until/navigateTo'
import ListDish from '../../components/Home/ListDish'
import TitleSection from '../../components/Home/TitleSection'
import { Navigation } from 'react-native-navigation'
import Sliders from '../../components/Home/Sliders'
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions'
import Loading from "../../components/Home/Loading"
import fetchData from '../../until/fetchData'
import RestaurantItem from '../../components/Home/RestaurantItem'
import IconCart from '../../components/Cart/IconCart'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            restaurants: [],
            marketers: []
        }
        Navigation.events().bindComponent(this)
    }

    componentDidMount = async () => {

        this.setState({ loading: true })

        const refPro = firebase.database().ref('products')
        let products = [];
        await refPro.on('child_added', snapshot => {
            products.push({ ...snapshot.val(), id: snapshot.key })
            this.setState({
                products
            })
        })

        const refRes = firebase.database().ref('restaurants')
        let restaurants = [];
        await refRes.on('child_added', snapshot => {
            restaurants.push({ ...snapshot.val(), id: snapshot.key })
            this.setState({
                restaurants
            })
        })

        const refMar = firebase.database().ref('marketers')
        let marketers = [];
        await refMar.on('child_added', snapshot => {
            marketers.push({ ...snapshot.val(), id: snapshot.key })
            this.setState({
                marketers
            })
        })

        this.props.fetchCart(this.props.user.id);

        setTimeout(() => this.setState({ loading: false }), 2000)

    }

    filterProduct = () => {
        const { products, restaurants } = this.state;
        var data = [];
        var dishList = [];
        var ingredientList = [];

        products.forEach(item => {
            if (item.cateId == "CT2") {
                dishList.push(item)
            } else ingredientList.push(item)
        })

        if (dishList.length > 0) {
            data.push({
                type: "Món ăn",
                data: [{ products: dishList }],
            });
        }
        if (ingredientList.length > 0) {
            data.push({
                type: "Nguyên liệu",
                data: [{ products: ingredientList }],
            });
        }
        return data;
    }

    navigationButtonPressed = ({ buttonId }) => {
        const { componentId } = this.props;
        try {
            if (buttonId === 'SideBar') {
                Navigation.mergeOptions(componentId, {
                    sideMenu: {
                        left: {
                            visible: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    navigateToResDetail = (restaurant) => {
        const { id, name } = restaurant;
        var page = "";
        // if (id.includes("RES")) {
        //     page = "RestaurantDetail"
        // } else page = "MarketerDetail"

        navigateTo(restaurant, this.props.componentId, "RestaurantDetail", {
            title: {
                text: name,
                alignment: 'center'
            }
        });
    }

    navigateToDetail = ({ item, sellerInfo }) => {

        navigateTo({
            item,
            sellerInfo
        }, this.props.componentId, 'Detail');
    };

    navigateToSeeAll = (data, type) => {
        navigateTo({ data }, this.props.componentId, 'SeeAll',
            {
                title: {
                    text: type,
                    alignment: 'center'
                }
            });
    };
    render() {
        console.log("Cart nè: ", this.props.cart);

        const images = [
            'https://chuphinhmonan.com/wp-content/uploads/2017/03/avalon-1.jpg',
            'https://dichvuvietbaiseo.vn/wp-content/uploads/2018/01/dich-vu-chup-anh-mon-an-cho-nha-hang-2.jpg',
            'https://kenh14cdn.com/2016/qcao2a-1459155252599.png',
            'https://dichvuvietbaiseo.vn/wp-content/uploads/2018/01/dich-vu-chup-anh-mon-an-cho-nha-hang-1.jpg'
        ]

        var item = {
            image: 'https://toplist.vn/images/800px/ga-bo-xoi-ngon-da-nang-333872.jpg',
            name: 'Gà bó xôi',
            quantity: 2,
            price: 70000,
            sellerName: 'Nhà hàng tiệc cưới King & Queen',
            starRating: 4,
            createAt: 'Mon Feb 17 2020 16:27:08 GMT+0700'
        };

        const { loading, restaurants, marketers } = this.state;


        var products = this.filterProduct();
        var listDishes = [item, item, item, item, item]
        const { isAuthenticated } = this.props;
        if (!isAuthenticated) {
            Navigation.dismissAllModals()
            Navigation.setRoot({
                root: {
                    component: {
                        name: 'Auth'
                    }
                }
            })
            return <View />
        }
        if (loading) {
            return (
                <Loading color='#F2A90F' bkg='#fff'></Loading>
            )
        }
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 15 }}>
                    <Sliders images={images}></Sliders>
                    <SectionList
                        ListHeaderComponent={() => (
                            <>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Nhà hàng</Text>
                                    <FlatList
                                        data={restaurants}
                                        horizontal={true}
                                        renderItem={({ item }) => (
                                            <RestaurantItem item={item} navigateToResDetail={this.navigateToResDetail} navigateToDetail={this.navigateToDetail}></RestaurantItem>
                                        )}
                                        keyExtractor={item => item.id}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '1500', marginBottom: 10 }}>Tiểu thương</Text>
                                    <FlatList
                                        data={marketers}
                                        horizontal={true}
                                        renderItem={({ item }) => (
                                            <RestaurantItem item={item} navigateToResDetail={this.navigateToResDetail} navigateToDetail={this.navigateToDetail}></RestaurantItem>
                                        )}
                                        keyExtractor={item => item.id}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </>
                        )}
                        showsVerticalScrollIndicator={false}
                        sections={products}
                        keyExtractor={(item, index) => item + index}
                        renderItem={item => (
                            <ListDish horizontal={true} navigateToDetail={this.navigateToDetail} data={item.section.data[0].products} flex='column'></ListDish>

                        )}
                        renderSectionHeader={({ section: { type, data } }) => (
                            <TitleSection
                                type={type}
                                data={data[0].products}
                                navigateToSeeAll={this.navigateToSeeAll}
                            />
                        )}

                    />
                </ScrollView>
                {isAuthenticated && <IconCart cart={this.props.cart} />}
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.user,
        cart: state.productReducer.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCart: (userId) => dispatch(productActions.fetchCart(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

