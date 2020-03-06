import React, { Component } from 'react'
import firebase from 'react-native-firebase'

import { Text, View, SectionList } from 'react-native'
import ItemDish from '../../components/Home/ItemDish'
import navigateTo from '../../until/navigateTo'
import ListDish from '../../components/Home/ListDish'
import TitleSection from '../../components/Home/TitleSection'
import { Navigation } from 'react-native-navigation'
import Sliders from '../../components/Home/Sliders'
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions'
import Loading from "../../components/Home/Loading"

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: []
        }
        Navigation.events().bindComponent(this)
    }

    componentDidMount() {
        console.log("Voo nef");

        const ref = firebase.database().ref("products")
        var products = [];
        ref.on('child_added', snapshot => {
            products.push({ ...snapshot.val(), id: snapshot.key })
            this.setState({
                products
            })

        })

        setTimeout(() => this.setState({ loading: false }), 2000)
    }

    filterProduct = () => {
        const { products } = this.state;
        var data = [];
        var dishList = [];
        var ingredientList = [];

        products.forEach(item => {
            if (item.cateId == "CT2") {
                dishList.push(item)
            } else ingredientList.push(item)
        })
        console.log("Nguyên: ", ingredientList);
        
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
    navigateToDetail = item => {

        navigateTo({
            item
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

        const { loading } = this.state;
        var products = this.filterProduct();
        console.log("Product: ", products);

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
            <View style={{ margin: 15, marginBottom: 150 }}>
                <Sliders images={images}></Sliders>
                <SectionList
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
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        product: state.productReducer.data
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadProduct: () => dispatch(productActions.fetchHome())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

