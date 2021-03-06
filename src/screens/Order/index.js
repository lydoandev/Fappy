import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import ScrollableTabView, {
    ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions'
import showModal from '../../until/showModal'
import OrderItem from '../../components/Order/OrderItem'

class Order extends Component {

    componentDidMount() {
        this.props.fetchOrder(this.props.user.id);

    }

    navigateToOrderDetail = (orderId) => {
        showModal({ orderId }, 'OrderDetail', {
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

    render() {
        const { orders } = this.props;
        var unConfirmOrders = [];
        var unReceived = [];
        var received = [];
        if (orders.length > 0) {
            unConfirmOrders = orders.filter(item => item.status == "unConfirmed");
            unReceived = orders.filter(item => item.status == "confirmed");
            received = orders.filter(item => item.status == "received");
        }
        return (
            <ScrollableTabView
                style={{ paddingBottom: 10 }}
                tabBarInactiveTextColor={'#111'}
                tabBarActiveTextColor={'#F2A90F'}
                tabBarUnderlineStyle={{ backgroundColor: '#F2A90F' }}
                tabBarTextStyle={{ fontWeight: 'bold' }}
                renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}>
                <View tabLabel="Đợi xác nhận" style={{ margin: 15 }}>
                    <FlatList
                        data={unConfirmOrders}
                        horizontal={false}
                        renderItem={({ item }) => (
                            <OrderItem
                                item={item}
                                navigateToOrderDetail={this.navigateToOrderDetail}
                            />
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View tabLabel="Chưa nhận" style={{ margin: 15 }}>
                    <FlatList
                        data={unReceived}
                        horizontal={false}
                        renderItem={({ item }) => (
                            <OrderItem
                                item={item}
                                navigateToOrderDetail={this.navigateToOrderDetail}
                            />
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View tabLabel="Đã nhận" style={{ margin: 15 }}>
                    <FlatList
                        data={received}
                        horizontal={false}
                        renderItem={({ item }) => (
                            <OrderItem
                                item={item}
                                navigateToOrderDetail={this.navigateToOrderDetail}
                            />
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollableTabView>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        orders: state.productReducer.orders,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (userId) => dispatch(productActions.fetchOrder(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
