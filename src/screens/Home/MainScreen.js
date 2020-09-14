import React, {Component} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import Pie from 'react-native-pie'

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status:''
    };
  }
  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titletxt}>Thống kê theo tháng</Text>
        </View>
        <VerticalBarGraph
          data={[20, 45, 28, 80, 99, 43, 50]}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
          width={Dimensions.get('window').width - 90}
          height={200}
          barRadius={5}
          barWidthPercentage={0.65}
          barColor='#53ae31'
          baseConfig={{
            hasXAxisBackgroundLines: false,
            xAxisLabelStyle: {
              position: 'right',
              prefix: '$'
            }
          }}
          style={{
            marginBottom: 30,
            padding: 10,
            paddingTop: 20,
            borderRadius: 20,
            backgroundColor: `#dff4d7`,
            width: Dimensions.get('window').width - 70
          }}
        />
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
            <Pie
              radius={80}
              sections={[
                {
                  percentage: 10,
                  color: '#C70039',
                },
                {
                  percentage: 20,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              strokeCap={'butt'}
            />
          </View>
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  title:{
    backgroundColor: '#DAA520',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1, 
    flexDirection: 'row'
  },
  titletxt:{
    color: '#fff',
    fontWeight: "bold",
    fontSize: 15,
    width: "90%"
  },
})

