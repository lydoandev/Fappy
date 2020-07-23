import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CLabel,
  CSelect
} from '@coreui/react'

import fire from "../../config/fire";
import * as routesUrl from '../../routesUrl'

const fields = ['firstName', 'lastName', 'fullName', 'phone', 'role', 'status', 'actions']

class ListUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listUsers: null,
      totalRecords: 0,
      row: 10,
    }
  }
  componentDidMount() {
    fire.database().ref('users').on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        totalRecords: usersList.length,
        listUsers: usersList,
      });
    });
  }

  handleEdit = (rowData) => {
    this.props.history.push(`${routesUrl.USER_ADD}/${rowData.uid}`);
  }

  handleDelete = (rowData) => {
    let itemRef = fire.database().ref(`users/${rowData.uid}`)
    itemRef.remove()
      .then(() => {
        alert("this user deleted sucess")
      })
      .catch((error) => {
        alert("this user not exist!");
      })
  }

  handleAdd = () => {
    this.props.history.push(routesUrl.USER_ADD);
  }

  handleSelected = (event) => {
    this.setState({ row: parseInt(event.target.value) })
  }

  render() {
    const { listUsers, totalRecords, row } = this.state

    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="mr-3 d-inline">List User ({totalRecords})</h5>
                <button onClick={this.handleAdd} className="btn-add-user btn btn-outline-success btn-sm"><i className="fas fa-user-plus"></i></button>
                <CFormGroup className="d-flex justify-content-end align-items-end">
                  <CLabel>Rows</CLabel>
                  <CSelect className="w-auto ml-3" value={row} onChange={this.handleSelected}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </CSelect>
                </CFormGroup>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={listUsers}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={row}
                  pagination
                  scopedSlots={{
                    'actions':
                      (item) => (
                        <td>
                          <button onClick={() => this.handleEdit(item)} className="btn btn-outline-info btn-sm"><i className="fas fa-user-edit"></i></button>
                          <button onClick={() => this.handleDelete(item)} className="btn btn-outline-danger btn-sm ml-3"><i className="fas fa-user-minus"></i></button>
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

export default ListUsers
