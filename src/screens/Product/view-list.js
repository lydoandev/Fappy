import React, {Component} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Item from '../../components/Product/Item';
import database from '@react-native-firebase/database'

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status:''
    };
  }
  componentDidMount(){
    var products = [];
    database()
    .ref(`/products`)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(function(prodSnapshot) {
        var product = prodSnapshot.val();
        if (product != null){
          if(product.sellerId == 'RES1') {
            product['key'] = prodSnapshot.key
            products.push(product)
          }else{
            console.log('falsed')
          }
        } 
      }) 
      this.setState({
        items : products
      })
    })
  }
  moveToDetail = item => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                item,
              },
              options: {
                topBar: {
                  title: {
                    text: 'Chi tiết sản phẩm',
                  },
                },
              },
            },
          },
        ],
      },
    });
  };
  render() {
    return (
      <View>
        <ScrollView>
          <FlatList
            data={this.state.items}
            renderItem={({item}) => (
              <Item element={item} moveToDetail={() => this.moveToDetail(item)} />
            )}
          />
        </ScrollView>
      </View>
      
    );
  }
}

