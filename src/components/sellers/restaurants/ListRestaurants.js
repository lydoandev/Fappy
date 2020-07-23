import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  
} from '@coreui/react'

import fire from "../../../config/fire";
import * as routesUrl from '../../../routesUrl'

const fields = ['name','phone','location', 'image','actions']

class ListRestaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listRestaurant:null,
      totalRecordsRes: 0,
    }
  }
  componentDidMount() {
    fire.database().ref('restaurants').on('value', snapshot => {
        const restaurantObject = snapshot.val();
        const restaurantList = Object.keys(restaurantObject).map(key => ({
          ...restaurantObject[key],
          uid: key,
        }));
  
        this.setState({
          listRestaurant: restaurantList,
          totalRecordsRes: restaurantList.length
        });
      });
  }

  handleEdit = (rowData, url) => {
    this.props.history.push(`${routesUrl[url]}/${rowData.uid}`);
  }

  handleDelete = (rowData, nameCollection) => {
    let itemRef = fire.database().ref(`${nameCollection}/${rowData.uid}`)
    itemRef.remove()
    .then(() => {
      alert(`This ${nameCollection} deleted sucess`)
    })
    .catch((error) => {
      alert(`This ${nameCollection} not exist!`);
    })
  }

  handleAdd = (nameRouter) => {
    this.props.history.push(routesUrl[nameRouter]);
  }

  render() {
    const { totalRecordsRes, listRestaurant} = this.state
    
    return (
      <>
        <CRow >
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="mr-3 d-inline">List Restaurants ({totalRecordsRes}) Items </h5>   
                <button onClick={() => this.handleAdd("NEW_RESTAURANTS")} className="btn btn-outline-success btn-sm"><i className="fas fa-plus"></i></button>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={listRestaurant}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'image':
                  (item)=>(
                    <td>
                      <img src={item.image} className="image" alt=""/>
                    </td>
                  ),
                  'location':
                  (item)=>(
                    <td>
                      {item.location.address}
                    </td>
                  )
                  ,'actions':
                    (item)=>(
                      <td>
                        <button onClick={() => this.handleEdit(item, "NEW_RESTAURANTS")} className="btn btn-outline-info btn-sm"><i className="fas fa-marker"></i></button>
                        <button onClick={() => this.handleDelete(item, "restaurants")} className="btn btn-outline-danger btn-sm ml-3"><i className="fas fa-times"></i></button>
                      </td>
                    )
                    
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default ListRestaurants
