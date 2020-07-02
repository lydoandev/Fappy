import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ReviewOrderItem from '../../components/Home/ReviewOrderItem';
import firebase from 'react-native-firebase';

class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            order: {},
            refreshing: false
        }
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        this.getOrder();
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'left') {
            Navigation.dismissAllModals();
        }
    }

    getOrder = () => {
        const { orderId } = this.props;
        this.setState({
            refreshing: true
        })
        var order;
        firebase.database().ref("orders/" + orderId).once("value").then(snapshot => {
            order = snapshot.val();
            this.setState({
                order,
                refreshing: false
            })
        })
    }

    handleOpenNote = () => {
        this.setState(prevState => ({
            openNote: !prevState.openNote,
        }))
    }

    getTime = () => {
        const { receiveTime } = this.state.order;
        var time = new Date(receiveTime);
        return time.getHours() + ':' + time.getMinutes();
    }

    render() {
        const { openNote, order, refreshing } = this.state;
        const { seller, items, dateOrder, status, totalPrice, receiveTime } = order;
        const { fullName, phone } = this.props.user;
        var activeStep = 1;
        var isComplete = false;
        if (status === 'confirmed') {
            activeStep = 2;
        }
        if (status === 'received') {
            isComplete = true
        }
        if (Object.getOwnPropertyNames(order).length >= 1) {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.getOrder} />}
                >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Text style={styles.txtTitle}>
                                {seller.name}
                            </Text>
                            <View style={styles.infoRes}>
                                <Icon
                                    type="entypo"
                                    name="location"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginHorizontal: 5 }}
                                />
                                <Text style={styles.txt} numberOfLines={2}>{seller.address}</Text>
                            </View>
                            <View style={styles.infoRes}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Icon
                                        type="font-awsome"
                                        name="phone"
                                        size={19}
                                        color="#F2A90F"
                                        style={{ marginHorizontal: 5 }}
                                    />
                                    <Text style={styles.txt} numberOfLines={2}>{seller.phone.substring(0, 4)} {seller.phone.substring(4, 7)} {seller.phone.substring(7, 10)}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ margin: 15 }}>
                            <Text style={styles.txtTitle}>
                                Người nhận
                            </Text>
                            <View style={styles.infoRes}>
                                <Icon
                                    type="entypo"
                                    name="user"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginHorizontal: 5 }}
                                />
                                <Text style={styles.txt} numberOfLines={2}>{fullName}</Text>
                            </View>
                            <View style={styles.infoRes}>
                                <Icon
                                    type="font-awsome"
                                    name="phone"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginHorizontal: 5 }}
                                />
                                <Text style={styles.txt} numberOfLines={2}>{phone.substring(0, 4)} {phone.substring(4, 7)} {phone.substring(7, 10)}</Text>
                            </View>
                            <View style={styles.infoRes}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Icon
                                        type="simple-line-icon"
                                        name="clock"
                                        size={19}
                                        color="#F2A90F"
                                        style={{ marginHorizontal: 5 }}
                                    />
                                    <Text style={styles.txt} numberOfLines={2}>Giờ đến nhận: {this.getTime()}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={this.handleOpenNote}>
                                        <Icon
                                            type="material"
                                            name={openNote ? "arrow-drop-up" : "arrow-drop-down"}
                                            size={30}
                                            color="#F2A90F"
                                            style={{ marginHorizontal: 5 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {openNote && (
                        <View style={styles.container}>
                            <View style={{ margin: 15 }}>
                                <Text style={styles.txtTitle}>Lưu ý: </Text>
                                <View style={styles.infoRes}>
                                    <Icon
                                        type="simple-line-icon"
                                        name="note"
                                        size={19}
                                        color="#F2A90F"
                                        style={{ marginHorizontal: 5 }}
                                    />
                                    <Text style={styles.txt} numberOfLines={3}>Vui lòng đến đúng địa chỉ và liên hệ với người bán qua số điện thoại trên để nhận hàng</Text>
                                </View>
                                <View style={styles.infoRes}>
                                    <Icon
                                        type="simple-line-icon"
                                        name="clock"
                                        size={19}
                                        color="#F2A90F"
                                        style={{ marginHorizontal: 5 }}
                                    />
                                    <Text style={styles.txt} numberOfLines={3}>Sau 30 phút chưa tới nhận hàng, đơn hàng sẽ tự động huỷ</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={[styles.container, { height: 120, alignContent: 'center' }]}>
                        <ProgressSteps activeStep={activeStep}
                            isComplete={isComplete}
                            completedProgressBarColor='#F2A90F'
                            activeStepIconBorderColor='#F2A90F'
                            completedStepIconColor='#F2A90F'
                            activeLabelColor='#F2A90F'>
                            <ProgressStep label="Đã đặt" removeBtnRow={false} previousBtnStyle={{ display: 'none' }} nextBtnStyle={{ display: 'none' }}>
                                <View style={{ alignItems: 'center', height: 20 }}>
                                    <Text>This is the content within step 1!</Text>
                                </View>
                            </ProgressStep>
                            <ProgressStep label="Xác thực từ người bán" previousBtnStyle={{ display: 'none' }} nextBtnStyle={{ display: 'none' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 2!</Text>
                                </View>
                            </ProgressStep>
                            <ProgressStep label="Nhận hàng" removeBtnRow={false} previousBtnStyle={{ display: 'none' }} nextBtnStyle={{ display: 'none' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 3!</Text>
                                </View>
                            </ProgressStep>
                        </ProgressSteps>
                    </View>
                    <View style={styles.container}>
                        <View style={{ margin: 15, }}>
                            <Text style={[styles.txtTitle, { marginBottom: 10, }]}>Sản phẩm </Text>
                            <FlatList
                                data={order.items}
                                renderItem={({ item }) => (
                                    <ReviewOrderItem
                                        item={item}
                                    />
                                )}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ marginHorizontal: 15 }}
                            />
                            <View style={styles.totalPrice}>
                                <Text style={[styles.txtTitle, { flex: 1 }]}>Tổng tiền: </Text>
                                <Text style={styles.txtTitle}>{String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={{ margin: 15 }}>
                            <Text style={[styles.txtTitle, {marginBottom: 5}]}>Liên hệ - CSKH Fappy</Text>
                            <Text style={styles.txt}>Fappy sẵn sàng hỗ trợ trong trường hợp quý khách cần tư vấn hoặc gặp sự cố với đơn hàng</Text>
                            <Text style={styles.txt}>Người bán chịu trách nhiệm chính trong các vấn đề liên quan đến chất lượng sản phầm</Text>
                            <Text style={styles.txt}>Hotline: <Text style={styles.txtTitle}>0348 543 343</Text></Text>
                            <Text style={styles.txt}>Email: <Text style={styles.txtTitle}>hotrofappy@gmail.com</Text></Text>
                        </View>
                    </View>
                </ScrollView >
            )
        }
        return <></>
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 15
    },
    container: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    txtTitle: {
        fontWeight: 'bold',
        fontSize: 17
    },
    txt: {
        fontSize: 16,
        paddingLeft: 5
    },
    totalPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        height: 40,
        borderTopColor: '#cccccc',
        borderTopWidth: 1
    },
    infoRes: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        marginHorizontal: 10
    },
})

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
    };
}

export default connect(mapStateToProps, null)(OrderDetail);
