import React, { Component } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import StarIcon from '../../components/Home/StarIcon'
import { Icon } from 'react-native-elements'
import format from '../../until/dateFomrter'
import ListDish from '../../components/Home/ListDish'
import TitleSection from '../../components/Home/TitleSection'
import navigateTo from '../../until/navigateTo'
export default class Detail extends Component {
    constructor(props) {
        super(props);
        const { item } = props;
        this.state = {
            relatedDishes: [item, item, item, item]
        }
    }
    navigateToDetail = item => {
        navigateTo({ item }, this.props.componentId, 'Detail');
    };

    navigateToResDetail = () => {
        console.log("Rss detail");

        navigateTo(null, this.props.componentId, 'RestaurantDetail');
    }

    navigateToSeeAll = () => {
        const { relatedDishes } = this.state;
        navigateTo({ data: relatedDishes }, this.props.componentId, 'SeeAll');
    };

    render() {
        const { item } = this.props;
        const { image, name, sellerName, quantity, price, starRating, createAt } = item;
        console.log("Star", starRating);
        const { relatedDishes } = this.state;
        return (
            <View>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.info}>
                        <Image
                            source={{ uri: image }}
                            style={styles.dish_image}
                        />
                        <Text style={styles.nameDish} numberOfLines={1}>
                            {name}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', paddingRight: 7 }}>
                                <Icon
                                    type="material-community"
                                    name="disqus"
                                    size={19}
                                    color="#F2A90F"
                                    style={{ marginRight: 5 }}
                                />
                                <Text>{quantity}</Text>
                            </View>
                            <Icon
                                type="font-awesome"
                                name="tag"
                                size={17}
                                color="#F2A90F"
                                style={{ marginHorizontal: 5 }}
                            />
                            <Text>{String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                        </View>


                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingRight: 7 }}>
                            <Icon
                                type="entypo"
                                name="clock"
                                size={19}
                                color="#F2A90F"
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.sellerName}>{format(createAt)}</Text>
                        </View>
                        <View>
                            <Text><Text style={styles.sellerName}>Còn khả dụng:</Text> 3 giờ</Text>
                        </View>

                        <TouchableOpacity onPress={this.navigateToResDetail}>
                            <Text style={styles.sellerName}>{sellerName}</Text>
                        </TouchableOpacity>
                        <StarIcon star={starRating} />
                    </View>
                    <TitleSection type="Món tương tự" data={relatedDishes} navigateToSeeAll={this.navigateToSeeAll}></TitleSection>
                    <ListDish flex='row' horizontal={false} data={relatedDishes} navigateToDetail={this.navigateToDetail}></ListDish>
                    {/* <ModalAddCart
                        modalVisible={modalVisible}
                        setModalVisible={this.setModalVisible}
                        text='Bạn cần đăng nhập để thực hiện chức năng này'
                        textButton='Đăng nhập'
                        textButton2='Lúc khác'
                        navigateToCall={this.showLogin}
                    >
                    </ModalAddCart>
                    <ModalAddCart
                        modalVisible={addedToCart}
                        setModalVisible={this.completedAddToCart}
                        text='Thêm vào giỏ hàng thành công'
                        textButton='Đến giỏ hàng'
                        textButton2='Lúc khác'
                        navigateToCall={this.navigateToCart}
                    >
                    </ModalAddCart> */}
                </ScrollView>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                    <TouchableOpacity style={styles.btnAddToCart} onPress={this.addToCart}>
                        <Text style={styles.btnText}>Thêm vào giỏ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        marginBottom: 60,
        marginHorizontal: 15,
        marginTop: 20,
        padding: 5
    },
    dish_image: {
        width: 175,
        height: 210,
        borderRadius: 6,
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameDish: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 18,
    },
    sellerName: {
        fontFamily: 'SVN-ProximaNova',
        fontSize: 16,
        color: '#ababab',
    },
    textContent: {
        color: '#7f7f7f',
    },
    btnAddToCart: {
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2A90F"
    },
});
