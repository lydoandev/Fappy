import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

export default class EmptyCart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/images/empNotifi.png")}/>
                <View style={{marginTop: 60}}>
                    <Text style={styles.txt}>Hiện bạn chưa có bất kì thông báo nào !!!</Text>
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
        margin: 20,
        flex:1,
        // justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        marginTop: 30,
        width: 250,
        height: 250
    },
    txt: {
        textAlign: 'center',
        fontSize: 17
    }
})
