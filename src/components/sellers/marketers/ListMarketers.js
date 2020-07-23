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

class ListMarketer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listMarketer: null,
      totalRecordsMar: 0,
    }
  }
  componentDidMount() {
    fire.database().ref('marketers').on('value', snapshot => {
      const marketerObject = snapshot.val();
      const marketerList = Object.keys(marketerObject).map(key => ({
        ...marketerObject[key],
        uid: key,
      }));

      this.setState({
        listMarketer: marketerList,
        totalRecordsMar: marketerList.length,
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
    const { listMarketer,totalRecordsMar} = this.state
    
    return (
      <>
       <CRow >
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="mr-3 d-inline">List Marketers ({totalRecordsMar}) Items</h5>   
                <button onClick={() => this.handleAdd("NEW_MARKETER")} className="btn btn-outline-success btn-sm"><i className="fas fa-plus"></i></button>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={listMarketer}
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
                  ,
                  'actions':
                    (item)=>(
                      <td>
                        <button onClick={() => this.handleEdit(item, "NEW_MARKETER")} className="btn btn-outline-info btn-sm"><i className="fas fa-marker"></i></button>
                        <button onClick={() => this.handleDelete(item, "marketers")} className="btn btn-outline-danger btn-sm ml-3"><i className="fas fa-times"></i></button>
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

export default ListMarketer
