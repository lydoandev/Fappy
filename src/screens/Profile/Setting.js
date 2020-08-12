import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';

export default class Setting extends Component {
    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Icon
                                type="font-awesome"
                                name="tools"
                                color="black"
                                size={16}
                            />
                            <Text>Thay đổi password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Icon
                                type="entypo"
                                name="log-out"
                                color="black"
                                size={16}
                            />
                            <Text>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
