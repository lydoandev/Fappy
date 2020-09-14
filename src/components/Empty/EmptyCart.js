import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

export default class EmptyCart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/images/empCart.png")}/>
                <View style={{marginTop: 60}}>
                    <Text style={styles.txt}>Hiện chưa có sản phẩm nào trong giỏ hàng của bạn !!!</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: "#ffffff",
        padding: 20,
        flex: 1,
        // justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginTop: 30,
        width: 150,
        height: 150
    },
    txt: {
        textAlign: 'center',
        fontSize: 17
    }
})
