import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class ReviewOrderItem extends Component {

    render() {
        const { name, price, quantityOrdered } = this.props.item;
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <Text style={[styles.txt, { flex: 1 }]}>{name}</Text>
                    <View>
                        <Text style={styles.txt}>{quantityOrdered} x {String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 17
    },
    icon: {
        paddingHorizontal: 10
    },
})
