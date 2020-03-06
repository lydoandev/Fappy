import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class RestaurantDetail extends Component {
    render() {
        return (
            <View>
                <Image source={{ uri: 'https://cuoihoi365.com.vn/wp-content/uploads/2017/06/image1-29.jpeg' }} style={styles.res_image}></Image>
                <View>
                    <View style={styles.generalInfo}>
                        <Text style={styles.res_name}>Nhà hàng tiệc cưới for you</Text>
                        {/* <Icon type='entypo' name='location-pin' color='#F2A90F' size={20}></Icon> */}
                        <Text>123 Nguyễn Chí Thanh, Quận Hải Châu, Đà Nẵng</Text>
                        <View style={styles.hours}>
                            <Text style={styles.status}>Chưa mở cửa</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#0080ff' }}>Xem giờ mở cửa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.dishes}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>MÓN ĂN</Text>
                    </View>
                </View>
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
        backgroundColor: '#fff'
    }
})
