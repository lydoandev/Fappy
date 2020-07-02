import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'

export default class OrderItem extends Component {
    
    navigateToOrderDetail = () => {
        const { id } = this.props.item;
        this.props.navigateToOrderDetail(id);
    }

    render() {
        const { seller, items, totalPrice, receiveTime, orderDate } = this.props.item;
        const time = moment(receiveTime).format('HH:mm DD/MM/YYYY');
        return (
            <TouchableOpacity style={styles.container} onPress={this.navigateToOrderDetail}>
                <View style={styles.content}>
                    <Image source={{ uri: seller.image || 'agagaga' }} style={styles.res_img}></Image>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={styles.title}>{seller.name}</Text>
                        <View style={styles.info}>
                            <Text>{items.length} món</Text>
                            <Text style={styles.txtTitle}>{String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                        </View>
                        <Text>{time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#fff',
        marginVertical: 5,
    },
    res_img: {
        height: 60,
        width: 60,
        borderRadius: 10,
        marginRight: 10
    },
    content: {
        margin: 5,
        flexDirection: 'row',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

