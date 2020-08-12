import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import ScrollableTabView, {
    ScrollableTabBar,
} from 'react-native-scrollable-tab-view-universal';
import moment from 'moment'
import ListDish from '../../components/Home/ListDish'
import StarIcon from '../../components/Home/StarIcon'
import TitleSection from '../../components/Home/TitleSection'
import navigateTo from '../../until/navigateTo'
import getProductBySeller from '../../until/getProductBySeller'
import getCommentBySeller from '../../until/getCommentBySeller'
import CommentForm from '../../components/Home/CommentForm'

class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            height: 800,
            seeHourOpen: false,
            openCommentForm: false,
        }
    }
    checkIsOpen = () => {
        const { openHour, closeHour } = this.props;
        var currentTime = moment();
        var startTime = moment(openHour, "HH:mm a");
        var endTime = moment(closeHour, "HH:mm a");

        return currentTime.isBetween(startTime, endTime);
    }

    componentDidMount() {
        this.getProductOfRestaurant();
        this.getCommentsOfRestaurant();
    }

    navigateToDetail = ({ item, sellerInfo }) => {

        navigateTo({
            item,
            sellerInfo
        }, this.props.componentId, 'Detail');
    };

    getProductOfRestaurant = async () => {
        const { id } = this.props;
        var products = await getProductBySeller(id);
        this.setState({ products })

    }

    getCommentsOfRestaurant = async () => {
        const { id } = this.props;
        var comments = await getCommentBySeller(id);
        console.log('Commetns: ', comments);

        this.setState({
            comments
        })
    }

    navigateToSeeAll = () => {
        const { products } = this.state;
        const { name } = this.props;
        navigateTo({ data: products }, this.props.componentId, 'SeeAll',
            {
                title: {
                    text: name,
                    alignment: 'center'
                }
            });
    };

    seeHourOpen = () => {
        this.setState((prevState) => ({ seeHourOpen: !prevState.seeHourOpen }))
    }

    checkIsAuth = (id) => {
        const { user } = this.props;

        return user.id == id;
    }

    openCommentForm = (item) => {
        console.log('Heloo');

        this.setState(prevState => ({
            editComment: item,
            openCommentForm: !prevState.openCommentForm
        }))
    }

    updateComment = async (comment) => {
        await firebase.database().ref("comments").child(comment.id).update(comment);
        this.openCommentForm();
        this.getCommentsOfRestaurant();
    }

    render() {
        var isOpen = this.checkIsOpen();
        const { products, seeHourOpen, contentsHeight, comments, openCommentForm, editComment } = this.state;
        console.log('Comm:', comments);


        const { name, location, image, starRating, openHour, closeHour } = this.props;
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View>
                        <Image source={{ uri: image }} style={styles.res_image}></Image>
                        <View style={styles.generalInfo}>
                            <Text style={styles.res_name}>{name}</Text>
                            {/* <Icon type='entypo' name='location-pin' color='#F2A90F' size={20}></Icon> */}
                            <Text>{location.address}</Text>
                            {/* <Text>(+84) {phone}</Text> */}
                            <StarIcon star={starRating} />
                            <View style={styles.hours}>
                                <Text style={{ color: isOpen ? '#F2A90F' : '#a6a6a6', fontWeight: '800' }}>{isOpen ? 'Đang mở cửa' : 'Chưa mở cửa'}</Text>
                                <TouchableOpacity onPress={this.seeHourOpen}>
                                    <Text style={{ color: '#0080ff' }}>Xem giờ mở cửa</Text>
                                </TouchableOpacity>
                            </View>
                            {seeHourOpen && (
                                <View style={{ marginTop: 10 }}>
                                    <Text>{openHour} - {closeHour}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ marginTop: 5, padding: 15, backgroundColor: '#fff', flex: 1 }}>
                        <ScrollableTabView
                            style={{}}
                            tabBarInactiveTextColor={'#111'}
                            tabBarActiveTextColor={'#F2A90F'}
                            tabBarUnderlineStyle={{ backgroundColor: '#F2A90F' }}
                            tabBarTextStyle={{ fontWeight: 'bold' }}
                            renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}
                        >
                            <View tabLabel="MÓN ĂN" style={{ margin: 5, fontSize: 25, flex: 1 }}>
                                {/* <TitleSection type="MÓN ĂN" data={products} navigateToSeeAll={this.navigateToSeeAll}></TitleSection> */}
                                <ListDish flex='row' horizontal={false} data={products} navigateToDetail={this.navigateToDetail}></ListDish>
                            </View>
                            <View tabLabel="ĐÁNH GIÁ" style={{ fontSize: 25, flex: 1 }}>
                                {comments && comments.map(item => (
                                    <>
                                        <ListItem
                                            containerStyle={{ width: "100%" }}
                                            leftAvatar={{ rounded: true, source: require('../../assets/images/user.png') }}
                                            title={item.buyer.fullName}
                                            titleStyle={styles.title}
                                            subtitle={
                                                <>
                                                    <StarIcon star={item.rating}></StarIcon>
                                                    <Text style={styles.comment}>{item.comment}</Text>
                                                </>
                                            }
                                            subtitleStyle={styles.comment}
                                            rightIcon={
                                                this.checkIsAuth(item.buyer.id) && (<TouchableOpacity
                                                    onPress={() => this.openCommentForm(item)}
                                                >
                                                    <Icon type="antdesign" name="edit" color='#111' />
                                                </TouchableOpacity>)
                                            }
                                            bottomDivider
                                        />

                                        <CommentForm
                                            modalVisible={openCommentForm}
                                            comment={editComment || {}}
                                            isUpdate={true}
                                            setModalVisible={this.openCommentForm}
                                            updateComment={this.updateComment}
                                        />
                                    </>
                                ))}
                            </View>

                        </ScrollableTabView>
                    </View>
                </ScrollView>

            </>
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
        flex: 1,
        marginTop: 5,
        padding: 15,
        backgroundColor: '#fff',
    },
    comment: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 15,
        color: '#ababab',
    }
})

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, null)(RestaurantDetail)
