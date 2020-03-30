import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import moment from 'moment'
import ListDish from '../../components/Home/ListDish'
import StarIcon from '../../components/Home/StarIcon'
import TitleSection from '../../components/Home/TitleSection'
import navigateTo from '../../until/navigateTo'
import getProductBySeller from '../../until/getProductBySeller'

export default class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    checkIsOpen = () => {
        const { openHour, closeHour } = this.props;
        var currentTime = moment();
        var startTime = moment(openHour, "HH:mm a");
        var endTime = moment(closeHour, "HH:mm a");

        return currentTime.isBetween(startTime, endTime);
    }

    componentDidMount() {
        this.getProductOfRestaurant()
    }

    navigateToDetail = ({ item, sellerInfo }) => {

        navigateTo({
            item,
            sellerInfo
        }, this.props.componentId, 'Detail');
    };

    getProductOfRestaurant = async () => {
        const { id } = this.props;
        // var refProducts = await firebase.database().ref("products").orderByChild('sellerId')
        //     .equalTo(id).once('value')
        //     .then(snapshot => {
        //         if (snapshot.val() != null) {
        //             return snapshot.val()
        //         }
        //     })
        // var products = [];
        // refProducts.map(item => {
        //     if (item != null) {
        //         products.push(item)
        //     }
        // })
        var products = await getProductBySeller(id);
        this.setState({ products })

    }
    render() {
        var isOpen = this.checkIsOpen();
        const { products } = this.state;

        const { name, address, image, starRating, phone } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Image source={{ uri: image }} style={styles.res_image}></Image>
                    <View style={styles.generalInfo}>
                        <Text style={styles.res_name}>{name}</Text>
                        {/* <Icon type='entypo' name='location-pin' color='#F2A90F' size={20}></Icon> */}
                        <Text>{address}</Text>
                        {/* <Text>(+84) {phone}</Text> */}
                        <StarIcon star={starRating} />
                        <View style={styles.hours}>
                            <Text style={{ color: isOpen ? '#F2A90F' : '#a6a6a6', fontWeight: '800' }}>{isOpen ? 'Đang mở cửa' : 'Chưa mở cửa'}</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#0080ff' }}>Xem giờ mở cửa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.dishes}>
                    <TitleSection type="Món ăn" data={products} navigateToSeeAll={this.navigateToSeeAll}></TitleSection>
                    <ListDish flex='row' horizontal={false} data={products} navigateToDetail={this.navigateToDetail}></ListDish>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    res_image: {
        height: 200,
        width: '100%'
    },
    res_name: {
        fontWeight: 'bold',
        fontSize: 17
    },
    generalInfo: {
        backgroundColor: '#fff',
        padding: 15
    },
    hours: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    status: {
        color: '#a6a6a6',
        fontWeight: '800'
    },
    dishes: {
        marginTop: 5,
        padding: 15,
        backgroundColor: '#fff',
    }
})
