import React, { Component } from 'react';
import { FlatList, ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Item from '../../components/Product/Item';
import database from '@react-native-firebase/database'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux/productRedux/actions'
import showModal from '../../until/showModal'
import ModalNotification from '../../components/Product/ModalNotification'

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status: '',
      askDelete: false
    };
  }
  componentDidMount() {
    this.props.onFetchProducts();
  }

  moveAddProd = () => {
    showModal({product: {}}, "AddProd");
  }

  moveUpdateProd = (product) => {
    showModal({product, isUpdate: true}, "AddProd")
  }

  deleteItem = async() => {
    const { prodDelete } = this.state;
    
    const newProd = {
      ...prodDelete,
      deleted: true
    }
    console.log('Dele', newProd);

    await database().ref("products").child(prodDelete.id).update(newProd);
    this.props.onFetchProducts();
    this.changeAskDelete()
  }

  changeAskDelete = (prodDelete, askMess) => {
    this.setState(prevState => ({
      ...prevState,
      askDelete: !prevState.askDelete,
      prodDelete,
      askMess
    }))
  }

  render() {
    const {askDelete, askMess} = this.state;
    return (
      <>
        <View style={{ margin: 20 }}>
          <FlatList
            data={this.props.products}
            renderItem={({ item }) => (
              <Item item={item} moveUpdateProd={this.moveUpdateProd} deleteItem={this.changeAskDelete}/>
            )}
          />

        </View>
        <ModalNotification
            modalVisible={askDelete}
            setModalVisible={this.changeAskDelete}
            text={askMess}
            textButton='Có'
            textButton2='Không'
            navigateToCall={this.deleteItem}
          />
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.btnOrder} onPress={this.moveAddProd}>
            <Text style={styles.btnText}>Thêm Sản Phẩm Mới</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapState = state => {
  return {
    products: state.productReducer.products,
    auth: state.userReducer
  }
}

const mapDispatch = dispatch => {
  return {
    onFetchProducts: () => dispatch(fetchProducts())
  }
}

const styles = StyleSheet.create({
  btnOrder: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2A90F"
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20
  },
  bottom: {
    position: 'absolute',
    left: 0, right: 0,
    bottom: 0,
    shadowColor: '#111',
    backgroundColor: '#FFF'
  },
})

export default connect(mapState, mapDispatch)(ProductList);


