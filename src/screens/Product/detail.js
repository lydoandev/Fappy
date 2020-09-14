import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Button,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import database from '@react-native-firebase/database'

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      unit:'',
      timeUsed:'',
      cateId:''
    };
    Navigation.events().bindComponent(this);
  }
  deletedProd = (id) =>{
    database()
      .ref('/products/'+id)
      .remove()
      .then(()=>{
        Alert.alert('Fappy','Xoá sản phẩm thành công');
      });
    Navigation.dismissModal(this.props.componentId);
  }
  updateProd = () =>{
    database()
      .ref('/products/'+id)
      .update(this.state.item)
      .then(()=>{
        Alert.alert('Fappy','Sửa sản phẩm thành công');
      });
    Navigation.dismissModal(this.props.componentId);
  }
  navigationButtonPressed = ({buttonId}) => {
    const {componentId} = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };
  componentDidMount(){
    this.setState({
      name: this.props.item.name,
      cateId: this.props.item.cateId,
      price: this.props.item.price,
      quantity: this.props.item.quantity,
      unit: this.props.item.unit,
    })
  }
  render() {
    return (
      <ScrollView>
        <ImageBackground
          source={{uri: this.props.item.image}}
          style={styles.top}>
          <Text style={styles.title}>{this.props.item.name} ({this.props.item.price}đ)</Text>      
          <Text style={styles.title}>{this.props.item.name} ({this.props.item.price}đ)</Text>
          <Text style={styles.text_in_top}>Thể loại: rau củ</Text>
          <Text style={styles.text_in_top}>{this.props.item.createAt}</Text>
        </ImageBackground>
        <View style={styles.cate}>
          <Text style={styles.cate_title}>Mô tả chi tiết</Text>
          <TextInput 
                onChangeText={text => this.setState({name:text})}
                value={this.state.name}/>
          <TextInput 
                onChangeText={text => this.setState({price:text})}
                value={this.state.price}/>
          <TextInput 
                onChangeText={text => this.setState({unit:text})}
                value={this.state.unit}/>
          <TextInput 
                onChangeText={text => this.setState({quantity:text})}
                value={this.state.quantity}/>
          <TextInput 
                onChangeText={text => this.setState({timeUsed:text})}
                value={this.state.timeUsed}/>
        </View>
        <View style={styles.wrap_btn}>
          <TouchableOpacity style={{width: "50%"}} onPress={this.updateProd(this.props.item.key)}>
            <Text style={styles.btntxtedit}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: "50%"}} onPress={this.deletedProd(this.props.item.key)}>
            <Text style={styles.btntxtremove}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    height: 200,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    textTransform: 'capitalize',
    color: '#fff',
    marginLeft: 10,
  },
  text_in_top: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 10,
  },
  sub_slide: {
    flex: 1,
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 7,
  },
  cate: {
    margin: 10,
  },
  cate_title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  wrap_btn: {
    flex: 1,
    flexDirection: 'row',
    marginTop: "20%"
  }, 
  btntxtedit: {
    color: '#ffffff',
    fontWeight: "bold",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#DAA520",
    borderRadius: 5,
    marginHorizontal: 15,
    textAlign: "center"
  },
  btntxtremove: {
    color: '#ffffff',
    fontWeight: "bold",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "red",
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 15,
  }
});
