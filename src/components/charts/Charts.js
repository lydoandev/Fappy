import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
} from '@coreui/react-chartjs'

import fire from "../../config/fire";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2020,
      listOrder: null,
    };
  }
  componentDidMount() {
    fire.database().ref('orders').on('value', snapshot => {
      const orderObject = snapshot.val();

      const orderList = Object.keys(orderObject).map(key => ({
        ...orderObject[key],
        uid: key,
      }));

      this.setState({
        totalRecords: orderList.length,
        listOrder: orderList,
      });
    });
  }
  handleChange = event => {
    this.setState({
      year: event.target.value
    });
  };

  calRevenue = monthInput => {
    const { year: yearInput , listOrder} = this.state;
    if (listOrder.length > 0 ) {
      let listOrders = listOrder.filter(order => {
        let dateOrder = new Date(order.orderDate);
        let month = dateOrder.getMonth() + 1;
        let year = dateOrder.getFullYear();
        if (
          month === monthInput &&
          year === Number(yearInput)
        ) {
          return listOrders;
        }
        return "";
      });
    }
  };

  calTotalAmountCus = () => {
    const { orders } = this.props;
    let array = [];
    if (orders.length > 0) {
      let listCus = orders.map(order => order.idCus).filter(item => item);

      listCus = [...new Set(listCus)];

      array = listCus.map(idCus => {
        let total = orders.reduce((total, item) => {
          if (item.idCus === idCus) {
            total += item.amount;
          }

          return total;
        }, 0);
        return { idCus, total };
      });
    }
    array.sort((a, b) => b.total - a.total);
    return array.slice(0, 8);
  };
  render() {
    let years = [2020,2019, 2018, 2017, 2016, 2015, 2014];
    // const { customers, orders } = this.props;

    // let listCustomer = this.calTotalAmountCus();
  return (
    <CCardGroup columns className = "cols-2" >
     <label>Choose Year: </label>
                <select className="form-control" onChange={this.handleChange}>
                  {years.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
      <CCard>
        <CCardHeader>
          Bar Chart
          <div className="card-header-actions">
            <a href="" className="card-header-action">
              <small className="text-muted">Monthly Order</small>
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="bar"
            datasets={[
              {
                label: 'Monthly Order',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              }
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Doughnut Chart
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            type="Doughnut"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }
            }
            
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}
}
export default Charts
