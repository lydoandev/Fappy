import React, { Component } from 'react';
import { FlatList, ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux'
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import Pie from 'react-native-pie'
import { fetchOrders } from '../../redux/orderRedux/actions';
import { ORDER_STATUS } from '../../constants/orderStatus';
import { PieChart, LineChart } from "react-native-chart-kit";
import Loading from '../../components/Loading/Loading'
import moment from 'moment'


class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status: '',
      dataPie: [],
      dataByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ordering != this.props.ordering) {
      const { ordering } = this.props;
      if (ordering.length > 0) {
        this.calPercentOrderStatus();
        this.calRevenueYear()
      }
    }
  }

  fetchData = async () => {
    await this.props.onFetchOrders();
    const { ordering } = this.props;
    if (ordering.length > 0) {
      this.calPercentOrderStatus();
      this.calRevenueYear();
    }
  }

  calRevenueYear = () => {
    const dataByMonth = [
      this.calRevenueByMonth(1),
      this.calRevenueByMonth(2),
      this.calRevenueByMonth(3),
      this.calRevenueByMonth(4),
      this.calRevenueByMonth(5),
      this.calRevenueByMonth(6),
      this.calRevenueByMonth(7),
      this.calRevenueByMonth(8),
      this.calRevenueByMonth(9),
      this.calRevenueByMonth(10),
      this.calRevenueByMonth(11),
      this.calRevenueByMonth(12)
    ]
    this.setState({
      dataByMonth
    })
  }

  calPercentOrderStatus = () => {
    const { ordering } = this.props;
    console.log('oredering: ', ordering)

    var unConfirmed = ordering.filter(item => item.status == ORDER_STATUS.unConfirmed).length;
    var confirmed = ordering.filter(item => item.status == ORDER_STATUS.confirmed).length;
    var received = ordering.filter(item => item.status == ORDER_STATUS.received).length;
    var canceled = ordering.filter(item => item.status == ORDER_STATUS.canceled).length;
    const totalOrder = ordering.length;
    this.setState({
      dataPie: [
        unConfirmed,
        confirmed,
        received,
        canceled,
      ]
    })
  }

  calRevenueByMonth = (month) => {
    var { ordering } = this.props;
    if (ordering.length <= 0) {
      return 0
    }
    let listOrder = ordering.filter(item => {
      var check = moment(item.orderDate, 'YYYY/MM/DD');

      var checkMonth = check.format('M');

      if (checkMonth == month && item.status == ORDER_STATUS.received) {
        return item
      }
      return null
    })

    let totalPrice = listOrder.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    return totalPrice
  }


  render() {
    const { isAuthenticated } = this.props;
    const { dataPie, dataByMonth } = this.state;
    const data = [
      {
        name: "Chưa xác nhận",
        population: parseInt(dataPie[0]) || 0,
        color: "#EBD22F",
        legendFontColor: "#EBD22F",
        legendFontSize: 15
      },
      {
        name: "Đợi lấy",
        population: parseInt(dataPie[1]) || 0,
        color: "#44CD40",
        legendFontColor: "#44CD40",
        legendFontSize: 15
      },
      {
        name: "Đã huỷ",
        population: parseInt(dataPie[2]) || 0,
        color: "#C70039",
        legendFontColor: "#C70039",
        legendFontSize: 15
      },
      {
        name: "Đã nhận",
        population: parseInt(dataPie[3]) || 0,
        color: "#0099ff",
        legendFontColor: "#0099ff",
        legendFontSize: 15
      },
    ];





    if (!isAuthenticated) {
      Navigation.setRoot({
        root: {
          component: {
            name: 'Login'
          }
        }
      })
      return null
    }

    console.log('Chart: ', dataByMonth)
    return (
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titletxt}>Thống kê theo tháng</Text>
        </View>
        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                {
                  data: dataByMonth
                }
              ]
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220}
            yAxisSuffix="đ"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titletxt}>Thống kê theo đơn hàng</Text>
        </View>
        <View
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            width: 350,
            justifyContent: 'space-between',
          }}
        >
          <PieChart
            data={data}
            width={Dimensions.get("window").width - 20}
            height={220}
            paddingLeft="15"
            accessor="population"
            absolute
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flex: 1,
    marginBottom: 15
  },
  titletxt: {
    fontWeight: "bold",
    fontSize: 17,
    width: "90%",

  },
})

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    isAuthenticated: state.userReducer.isAuthenticated,
    ordering: state.ordering.orders,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);

