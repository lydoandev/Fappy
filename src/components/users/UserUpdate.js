import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as routesUrl from '../../routesUrl'
import firebase from '../../config/fire'

const INITAL_STATE = {
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  role: "",
  sellerId: "",
}

class UserUpdate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
      passwordConfirm: "",
      showPasswordConfirm: false,
      errors: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        phone: false,
        role: false,
        sellerId: false,
      }
    }
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }
    if (this.props.match.params.id) {
      this.setState({ loading: true });

      firebase.database().ref(`users/${this.props.match.params.id}`)
        .on('value', snapshot => {
          this.setState({
            user: snapshot.val(),
          });
        });
    } else {
      let {user} = this.state
      user = INITAL_STATE
      this.setState({user, showPasswordConfirm: true})
    }
  }

  componentWillUnmount() {
    firebase.database().ref(`users/${this.props.match.params.id}`).off();
  }

  handleChange = (event) => {
    let { user } = this.state
    let stateValue = event.target.value
    let stateName = event.target.name

    user[stateName] = stateValue
    this.handleUpdate(stateName, user)
    this.setState({user})
  }

  handleUpdate = (stateName, user) => {
    switch (stateName) {
      case "firstName":
      case "lastName":
        user["fullName"] = user.lastName + " " + user.firstName
        break;
      default:
        break;
    }
    this.setState({user})
  }

  handleSave = () => {
    let isValid = true
    let { user, errors, showPasswordConfirm, passwordConfirm } = this.state

    if (showPasswordConfirm) {
      user.passwordConfirm = user.password === passwordConfirm ? passwordConfirm : ""
    } else {
      delete user.passwordConfirm
    }

    Object.keys(user).forEach((key) => {
      if (user[key] === "" && key !== "fullname") {
        errors[key] = true
      } else {
        errors[key] = false
      }
    })
    this.setState({errors})

    Object.keys(errors).forEach((key) => errors[key] === true && (isValid = false))

    if (isValid) {
      delete user.passwordConfirm
      this.updateUser(user)

    } else {
      alert("this user has data incorrect!");
    }
  }
  
  updateUser = (user) => {
    let refUser = firebase.database().ref(`users/${this.props.match.params.id}`)

    refUser.update(user)
    .then(() => {
      this.setState({ showPasswordConfirm: false })
      alert("this user updated sucess");
    })
    .catch((error) => {
      alert("update user incorrect");
    })
  }

  handleChangePassword = (event) => {
    let { user } = this.state
    let currentPassword = user.password
    let stateValue = event.target.value
    let stateName = event.target.name

    if (stateName === "password") {
      if (stateValue !== currentPassword) {
        user[stateName] = stateValue
        this.setState({showPasswordConfirm: true, user})
      } else {
        alert("New password must be different from the old password");
      }
    } else {
      this.setState({passwordConfirm: stateValue})  
    }
  }

  handleClose = () => {
    this.props.history.push(routesUrl.LIST_USERS)
  }

  render() {
    const { user, passwordConfirm, errors, showPasswordConfirm } = this.state;
    const invalidValue = [undefined, null]

    return (
      user &&
      <CRow className="justify-content-center">
        <CCol xs="12" md="6" >
          <CCard>
            <CCardHeader> 
            <span>Detail User: </span>   
              <span className="font-weight-bold"> {user.fullName}</span>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
               
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="font-weight-bold">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="firstName" 
                      placeholder="First Name" 
                      value={invalidValue.includes(user.firstName) ? "" : user.firstName}
                      onChange={this.handleChange}
                    />
                    <CFormText>Please enter your first name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="font-weight-bold">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="lastName" 
                      placeholder="Last Name" 
                      value={invalidValue.includes(user.lastName) ? "" : user.lastName}
                      onChange={this.handleChange}
                    />
                    <CFormText>Please enter your last name</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="font-weight-bold">Emaill</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput 
                    name="email" 
                    value={invalidValue.includes(user.email) ? "" : user.email} 
                    onChange={this.handleChange}
                  />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="font-weight-bold">Phone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      type="tel" 
                      name="phone" 
                      placeholder="Phone" 
                      value={user.phone}
                      onChange={this.handleChange}
                    />
                    <CFormText>Please enter your phone number</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="font-weight-bold">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      value={user.password}
                      onChange={this.handleChangePassword}
                      required
                    />
                    <CFormText className="help-block">Please enter a complex password</CFormText>
                  </CCol>
                </CFormGroup>
                {showPasswordConfirm &&
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="font-weight-bold">Password confirm</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput 
                        type="password" 
                        name="passwordConfirm"
                        required={errors.passwordConfirm} 
                        placeholder="Password confirm" 
                        value={passwordConfirm}
                        onChange={this.handleChangePassword}
                      />
                      <CFormText className="help-block">Please enter password again</CFormText>
                    </CCol>
                  </CFormGroup>
                }
                
                <CFormGroup row >
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel className="font-weight-bold">Role</CLabel>
                      <CSelect
                        name="role"
                        placeholder="role"
                        value={user.role}
                        onChange={this.handleChange}
                      >
                        <option value="Seller">Seller</option>
                        <option value="Buyer">Buyer</option>
                      </CSelect>
                      <CFormText>Please choose your role</CFormText>
                    </CFormGroup>
                    </CCol>
                  
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel className="font-weight-bold">Status</CLabel>
                      <CSelect
                        name="status"
                        placeholder="role"
                        value={user.status}
                        onChange={this.handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Pause">Pause</option>
                      </CSelect>
                      <CFormText>Please choose your status</CFormText>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton className="mr-3" size="sm" color="success" onClick={this.handleSave}><CIcon name="cil-check" />SAVE</CButton>
              <CButton size="sm" color="danger" onClick={this.handleClose}><CIcon name="cil-X" /> CANCEL</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}


export default UserUpdate
