import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
export default class ImageModal extends Component {
    render() {
        const { image, modalImageVisible } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalImageVisible}
                onRequestClose={this.props.closeImage}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressOut={this.props.closeImage}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.3)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={this.props.closeImage}>
                                <View style={{ right: 0, alignItems: 'flex-start', margin: 10 }}>
                                    <Image source={require('../../assets/icons/icon_close.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: image || 'agagaga' }} style={styles.dish_img_big} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    dish_img_big: {
        width: '95%',
        height: 240,
        borderRadius: 10,
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        width: "80%",
        justifyContent: "center",
        borderRadius: 10,
        paddingBottom: 15
    },
})
