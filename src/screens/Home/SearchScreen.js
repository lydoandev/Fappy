import React, { Component } from 'react';
import database from '@react-native-firebase/database';
import { View, Text, ScrollView, SectionList, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import navigateTo from '../../until/navigateTo'

import ItemDish from '../../components/Home/ItemDish'
import RestaurantForSearch from '../../components/Home/RestaurantForSearch';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      listSeller: [],
      listProductBySeller: [],
      isFirst: true,
      totalProd: 0
    };
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId == 'left') {
      Keyboard.dismiss();
      Navigation.dismissAllModals();
    }
  };

  onTextChange = searchText => {
    this.setState({
      searchText,
    });
  };

  getSellerName = sellerId => {
    const { restaurants, marketers } = this.props;

    var res = {};
    if (sellerId.includes("RES")) {
      res = restaurants.find(res => res.id == sellerId);
    } else {
      res = marketers.find(res => res.id == sellerId);
    }
    return res?.name;
  }

  navigateToDetail = ({ item, sellerInfo }) => {

    navigateTo({
      item,
      sellerInfo
    }, this.props.componentId, 'Detail');
  };

  navigateToResDetail = (restaurant) => {
    const { id, name } = restaurant;
    navigateTo(restaurant, this.props.componentId, "RestaurantDetail", {
      title: {
        text: name,
        alignment: 'center'
      }
    });
  }

  search = () => {
    const { restaurants, products, marketers } = this.props;
    const { searchText } = this.state;

    var restaurantsResult = restaurants.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    var marketersResult = marketers.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    var productsResult = products.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const productsEnd = _.groupBy(productsResult, 'sellerId');

    const productKey = Object.keys(productsEnd);


    var listProductBySeller = [];

    if (productKey.length > 0) {
      productKey.map(key => {
        listProductBySeller.push({
          type: key,
          data: [{ products: productsEnd[key] }],
        });
      });
    }

    const listSeller = restaurantsResult.concat(marketersResult);

    this.setState({
      listProductBySeller,
      listSeller,
      totalProd: productsResult.length,
      isFirst: false,
    });
  };

  render() {
    const { searchText, isFirst, listSeller, listProductBySeller, totalProd } = this.state;
    const txtSeller = 'Nhà hàng (' + listSeller.length + ')';
    const txtProduct = 'Món ăn (' + totalProd + ')';

    return (
      <>
        <View style={{ marginHorizontal: 15, marginTop: 15 }}>
          <SearchBar
            inputStyle={{ backgroundColor: 'white' }}
            inputContainerStyle={{ backgroundColor: 'white', height: 30 }}
            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 15,
              height: 45,
              borderColor: '#cccccc',
              borderTopColor: '#ccc',
              borderBottomColor: '#ccc',
            }}
            placeholder="Nhập tên món ăn hoặc cửa hàng..."
            autoFocus={true}
            onTouchStart={this.touch}
            onSubmitEditing={this.search}
            value={searchText}
            onChangeText={this.onTextChange}
          />
        </View>
        {(!isFirst) && <View style={{ height: '95%' }}>
          <ScrollableTabView
            style={{ paddingBottom: 10 }}
            tabBarInactiveTextColor={'#111'}
            tabBarActiveTextColor={'#F2A90F'}
            tabBarUnderlineStyle={{ backgroundColor: '#F2A90F' }}
            tabBarTextStyle={{ fontWeight: 'bold' }}
            renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}>
            <View tabLabel={txtProduct}>
              <View style={{ margin: 15 }}>
                <SectionList
                  showsVerticalScrollIndicator={false}
                  sections={listProductBySeller}
                  keyExtractor={(item, index) => item + index}
                  renderItem={(item, index) => {
                    console.log("Product by seller: ", item.section.data)
                    return (
                      <FlatList
                        data={item.section.data[0].products}
                        horizontal={false}
                        renderItem={({ item }) => (
                          <ItemDish
                            item={item}
                            flex='row'
                            navigateToDetail={this.navigateToDetail}
                          />
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}

                      />
                    )
                  }}
                  renderSectionHeader={({ section: { type, data } }) => (
                    <Text style={{ fontSize: 18 }}>{this.getSellerName(type)}</Text>
                  )}
                />
              </View>
            </View>
            <View tabLabel={txtSeller} style={{ marginBottom: 50 }}>
              <FlatList
                data={listSeller}
                horizontal={false}
                renderItem={({ item }) => (
                  <RestaurantForSearch
                    item={item}
                    flex='row'
                    navigateToResDetail={this.navigateToResDetail}
                  />
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollableTabView>
        </View>}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productReducer.products,
    marketers: state.productReducer.marketers,
    restaurants: state.productReducer.restaurants,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SearchScreen);
