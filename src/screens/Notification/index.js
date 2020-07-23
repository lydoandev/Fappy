import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import ItemNotification from '../../components/Notification/ItemNotification'
import { connect } from 'react-redux'
import * as productActions from '../../reduxs/productRedux/actions'

class Notification extends Component {
    componentDidMount(){
        const {id} = this.props.user;
        this.props.fetchNotification(id);
    }
    render() {
        const {notifications} = this.props;
        return (
            <View style={{ marginTop: 20, marginBottom: 40 }}>
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
                            updateSeen={this.updateSeen}
                        />
                    )} />
            </View>
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

