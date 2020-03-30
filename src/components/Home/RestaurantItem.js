import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import navigateTo from '../../until/navigateTo'

export default class RestaurantItem extends Component {

    navigateToResDetail = () => {
        this.props.navigateToResDetail(this.props.item)
    }
    
    render() {
        const { image, name, address } = this.props.item;
        return (
            <View style={{ width: 230, paddingRight: 10 }}>
                <TouchableOpacity onPress={this.navigateToResDetail}>
                    <Image source={{ uri: image }} style={styles.res_image}></Image>
                    <View style={{ position: 'absolute', top: 100, paddingHorizontal: 5 }}>
                        <Text style={styles.res_name} numberOfLines={1} onPress={this.navigateToResDetail}>{name}</Text>
                        <Text style={styles.res_address} numberOfLines={1}>{address}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    res_image: {
        height: 150,
        width: 220,
        borderRadius: 5,
        position: 'relative'
    },
    res_name: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    res_address: {
        color: '#fff'
    }
})

