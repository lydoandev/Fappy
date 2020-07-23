import React from "react";
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
  CTextarea,
  CImg
} from "@coreui/react";
import * as routesUrl from "../../../routesUrl";
import firebase from "../../../config/fire";

const INITAL_STATE = {
  image: "",
  location: {
    address: ""
  },
  name: "",
  phone: "",
  starRating: 1,
};

class EditMarketer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketers: null,
      imageAsFile: "", 
      errors: {
        firstName: false,
        image: false,
        address: false,
        name: false,
        phone: false,
        starRating: false,
      },
    };
  }

  componentDidMount = () => {
    let {marketers} = this.state
    if (this.props.match.params.id) {

      firebase.database().ref(`marketers/${this.props.match.params.id}`)
        .on('value', snapshot => {
          this.setState({
            marketers: snapshot.val(),
          });
        });
    } else {
      marketers = INITAL_STATE
      this.setState({ marketers })
    }
  }

  componentWillUnmount() {
    firebase.database().ref(`marketers/${this.props.match.params.id}`).off();
  }

  handleChange = (event) => {
    let { marketers } = this.state;
    let stateValue = event.target.value;
    let stateName = event.target.name;
    marketers[stateName] = stateValue
    this.setState({ marketers });
  };

  handleChangeAddress = (event) => {
    let stateValue = event.target.value;
    this.setState(prevState => ({
      marketers: {                 
        ...prevState.marketers,   
        location: {
          ...prevState.marketers.location,
          address: stateValue
        }
      }
    }))
  }

  handleChangeImage = async (e) => {
    let image = e.target.files[0]
    await this.setState({ imageAsFile: image })
    this.uploadImage()
  }

  uploadImage = () => {
    let { imageAsFile, marketers } = this.state;
    
    const storage = firebase.storage()
    if(imageAsFile === '' ) {
      alert(`not an image, the image file is a ${typeof(imageAsFile)}`)
    } 
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed', 
    (snapShot) => {
    }, (err) => {
    },() => {
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         marketers["image"] = fireBaseUrl
         this.setState(prevObject => ({...prevObject, marketers}))
       })
       
    })
  }

  handleSave = () => {
    let isValid = true;
    let { marketers, errors} = this.state;

    Object.keys(marketers).forEach((key) => {
      if (marketers[key] === "") {
        errors[key] = true;
      } else if (marketers["location"]['address'] === "") {
        errors["address"] = true;
      }
      else {
        errors[key] = false;
      }
    });
    this.setState({ errors });

    Object.keys(errors).forEach(
      (key) => errors[key] === true && (isValid = false)
    );

    if (isValid) {
      this.EditMarketer(this.state.marketers);
    } else {
      alert("this marketers has data incorrect!");
    }
  };

  EditMarketer = (marketers) => {
    const ref = firebase.database().ref(`marketers/${this.props.match.params.id}`);
    ref.update(marketers)
      .then(() => {
        alert("this marketers update success");
      })
      .catch((error) => {
        alert("update marketers incorrect");
      });
  };

  handleButton = () => {
    this.inputRef.click();
  }

  handleClose = () => {
    this.props.history.push(routesUrl.LIST_MARKETER);
  };

  render() {
    const { marketers } = this.state;
    const invalidValue = [undefined, null];

    return (
      marketers && (
        <CRow className="justify-content-center">
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                marketers Form
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="font-weight-bold">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        placeholder="enter name"
                        value={invalidValue.includes(marketers.name) ? "" : marketers.name}
                        onChange={this.handleChange}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="font-weight-bold">Phone Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={marketers.phone}
                        onChange={this.handleChange}
                      />
                      <CFormText>Please enter your phone number</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="font-weight-bold">Star Rating</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CSelect
                        name="starRating"
                        placeholder="start"
                        value={marketers.starRating}
                        onChange={this.handleChange}
                      >
                        <option value="1">1 star</option>
                        <option value="2">2 star</option>
                        <option value="3">3 star</option>
                        <option value="4">4 star</option>
                        <option value="5">5 star</option>
                      </CSelect>
                    </CCol>
                    <CCol md="2" className="text-right">
                      <CLabel className="font-weight-bold">Image</CLabel>
                    </CCol>
                    <CCol xs="12" md="4" >
                      <CImg className="image border border-primary rounded mr-3" src={marketers.image} />
                      <CButton 
                        onClick={this.handleButton}
                        className="btn-sm btn-outline-success"
                      >
                        <span className="fas fa-upload"></span>
                      </CButton>
                      <input 
                        type="file"
                        className="d-none"
                        name="image" 
                        onChange={this.handleChangeImage} 
                        accept="image/png, image/jpeg"
                        ref={(ref) => this.inputRef = ref}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="font-weight-bold">Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea 
                        rows="5"
                        placeholder="address" 
                        value={invalidValue.includes(marketers.location.address) ? "" : marketers.location.address}
                        onChange={this.handleChangeAddress}
                      />
                    </CCol>
                  </CFormGroup>

                </CForm>
              </CCardBody>
              <CCardFooter>

                <CButton
                  className="mr-3 font-weight-bold"
                  size="sm"
                  color="success"
                  onClick={this.handleSave}
                >
                  SAVE
                </CButton>

                <CButton
                  className="font-weight-bold"
                  size="sm"
                  color="danger"
                  onClick={this.handleClose}>
                  CANCEL
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      )
    );
  }
}

export default EditMarketer;
