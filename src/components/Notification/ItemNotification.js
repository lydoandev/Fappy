import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import format from '../../until/dateFormater'

export default class ItemNotification extends Component {

    openNotification = () => {
        this.props.openNotification(this.props.item);
    }
    render() {
        const { createAt, notification, order, isSeen } = this.props.item;
        return (
            <TouchableOpacity style={[styles.notifi, { backgroundColor: isSeen ? '#fff' : '#E4E9F1', }]} onPress={this.openNotification}>
                <TouchableOpacity style={[{ backgroundColor: '#F2A90F' }, styles.icon]}>
                    <Icon
                        type="font-awesome"
                        name="bell-o"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#4a4a4a', fontSize: 18 }}>Thông báo</Text>
                        <Text style={{ color: '#ababab', fontSize: 15 }}>{format(createAt)}</Text>
                    </View>
                    <Text style={{ color: '#7f7f7f', fontSize: 17 }}>{notification.title}</Text>
                    <Text style={{ color: '#7f7f7f', fontSize: 16 }} numberOfLines={2}>{notification.body}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifi: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#b3b3b3',
    }
})