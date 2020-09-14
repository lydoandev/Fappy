import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

export default class EmptyComment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/images/empComment.png")}/>
                <View style={{marginTop: 60}}>
                    <Text style={styles.txt}>Hiện chưa có bất kì bình luận nào!!!</Text>
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
        height: 400,
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
