import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import ItemNotification from '../../components/Notification/ItemNotification'
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions';
import showModal from '../../until/showModal';
import EmptyNotifi from '../../components/Empty/EmptyNotifi'
import database from '@react-native-firebase/database';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentDidMount() {
        const { id } = this.props.user;
        console.log('user: ', id)
        this.props.fetchNotification(id);
        console.log(this.props.notifications);
        setInterval(() => this.props.fetchNotification(id), 1000);
    }

    getNotification = (refreshing = false) => {
        this.setState({
            refreshing
        })
        this.props.fetchNotification(this.props.user.id);
        this.setState({
            refreshing: false
        })
    }

    openNotification = (item) => {
        const { order, id } = item;
        item.isSeen = true;
        database().ref('notifications').child(id).update(item);

        showModal({ orderId: order.orderId }, 'OrderDetail', {
            title: {
                text: "Chi tiết đơn hàng",
                alignment: 'center',
                leftButtons: {
                    id: 'left',
                    text: 'Huy',
                }
            }
        });
    }

    seenAll = () => {
        const { notifications} = this.props;
        notifications.map(item => {
            item.isSeen = true;
            database().ref('notifications').child(item.id).update(item);
        });
        this.props.fetchNotification(this.props.user.id);
    }

    render() {
        const { notifications } = this.props;
        const { refreshing } = this.state;
        if(notifications.length == 0) {
            return <EmptyNotifi />
        }
        return (
            <ScrollView style={{ marginTop: 20, marginBottom: 20 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => this.getNotification(true)} />}
            >
                <TouchableOpacity onPress={this.seenAll}>
                    <Text
                        style={{ alignSelf: 'flex-end', color: '#ababab', fontSize: 15, paddingRight: 15, paddingBottom: 15 }}
                    >
                        Đánh dấu tất cả là đã đọc
                    </Text>
                </TouchableOpacity>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={notifications}
                    renderItem={({ item }) => (
                        <ItemNotification
                            item={item}
                            openNotification={this.openNotification}
                        />
                    )} />
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        notifications: state.productReducer.notifications,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotification: (userId) => dispatch(productActions.fetchNotification(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

