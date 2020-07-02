import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import StarIcon from '../Home/StarIcon'
import getProductBySeller from '../../until/getProductBySeller'

export default class RestaurantForSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProductOfRestaurant();
    }

    getProductOfRestaurant = async () => {
        const { id } = this.props.item;
        var products = await getProductBySeller(id);
        this.setState({ products });
    }

    navigateToResDetail = () => {
        const { item } = this.props;
        this.props.navigateToResDetail(item);
    }

    render() {
        const { name, image, starRating } = this.props.item;
        const { products } = this.state;
        return (
            <TouchableOpacity
                style={styles.contain}
                onPress={this.navigateToResDetail}>
                <Image source={{ uri: image || 'agagaga' }} style={styles.res_image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                        {name}
                    </Text>
                    <StarIcon star={starRating} />
                    <Text style={styles.prodTitle}>Sản phẩm ({products.length})</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        margin: 15,
        width: 215
    },
    res_image: {
        height: 110,
        width: 130,
        borderRadius: 5
    },
    title: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 17,
        paddingBottom: 5
    },
    prodTitle: {
        fontSize: 16,
        paddingTop: 5
    },
    info: {
        justifyContent: 'center',
        marginHorizontal: 10
    }
})
