import React, { Component } from 'react'
import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge, Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux'
import InputText from '../../components/Form/InputText'
import * as userActions from '../../reduxs/authRedux/actions'
import Title from '../../components/Form/Title'
import database from '@react-native-firebase/database';
import Error from '../../components/Form/Error'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            phone: props.user.phone,
            fullName: props.user.fullName,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            errors: {}
        }
    }

    onEdit = () => {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit
        }))
    }

    getData = (name, text) => {
        this.setState({
            [name]: text
        })
    }

    saveUpdate = () => {
        const { firstName, lastName, phone } = this.state;
        const user = {...this.props.user, firstName, lastName, phone, fullName: lastName + ' ' + firstName };
        console.log('Err: ', this.checkValidate());
        
        if (this.checkValidate() == 0) {
            console.log('Hello');
            
            database().ref('users').child(user.id).update(user);
            this.props.loginSuccessed(user);
            this.onEdit();
        }
    }

    checkValidate = () => {
        var { firstName, phone, lastName } = this.state;
        var countErr = 0;
        var { firstNameErr, phoneErr, lastNameErr } = this.state.errors;
        firstNameErr = "";
        phoneErr = "";
        lastNameErr = "";
        if (firstName == "") {
            firstNameErr = "Tên là trường bắt buộc";
            countErr++;
        }
        if (lastName == "") {
            lastNameErr = "Họ là trường bắt buộc"
            countErr++;
        }
        if (phone == "") {
            countErr++;
            phoneErr = "Phone là trường bắt buộc";
        } else if (phone.length != 10) {
            countErr++;
            phoneErr = "Phone không đúng format "
        }
        this.setState({
            errors: {
                firstNameErr,
                lastNameErr,
                phoneErr
            }
        })
        return countErr;
    }

    render() {
        const { isEdit, phone, lastName, firstName } = this.state;
        const { firstNameErr, lastNameErr, phoneErr } = this.state.errors;
        const { user } = this.props;
        const displayPhone = user.phone ? (user.phone.substring(0, 4) + user?.phone.substring(4, 7) + user?.phone.substring(7, 10)) : '';
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <LinearGradient colors={['#F2A90F', '#ffb31a', '#ffd480']} style={styles.gradient}>
                        <View style={{ margin: 10, position: "absolute", bottom: 20, left: 25 }}>
                            <View>
                                <Text style={styles.name}>{this.props.user.fullName}</Text>
                                <View style={styles.rowContainer}>
                                    <Badge status="success"></Badge>
                                    <Text style={styles.status}>Đang hoạt động</Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Icon
                                        type="feather"
                                        name="phone"
                                        color="black"
                                        size={16}
                                    />
                                    <Text style={styles.status}>{displayPhone}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 10, flex: 1, margin: 15, flexDirection: 'column' }}>
                        {!isEdit ? (
                            <>
                                <ListItem
                                    leftIcon={{ type: 'feather', name: 'user', color: "#aaaaaa" }}
                                    title="Họ và tên"
                                    titleStyle={styles.title}
                                    subtitle={this.props.user.fullName}
                                    subtitleStyle={styles.subtitle}
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={this.handleOpenProfileUpdateModal}
                                        >
                                            <Icon type="antdesign" name="edit" color='#111' />
                                        </TouchableOpacity>
                                    }
                                    bottomDivider
                                />
                                <ListItem
                                    leftIcon={{ type: 'feather', name: 'phone', color: "#aaaaaa" }}
                                    title="Số điện thoại"
                                    titleStyle={styles.title}
                                    subtitle={phone}
                                    subtitleStyle={styles.subtitle}
                                    bottomDivider
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 40, marginTop: 20 }}>
                                    <TouchableOpacity onPress={this.onEdit} style={styles.btnUpdate}>
                                        <Text style={{ color: '#616161' }}>Thay đổi</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                                <View>
                                    <View style={{ flex: 1, marginBottom: 10, }}>
                                        <InputText name="firstName" value={firstName} getData={this.getData} icon='user' autoFocus={true}></InputText>
                                        <Error errorText={firstNameErr}></Error>
                                    </View>
                                    <View style={{ flex: 1, marginBottom: 10, }}>
                                        <InputText name="lastName" value={lastName} getData={this.getData} icon='user'></InputText>
                                        <Error errorText={lastNameErr}></Error>
                                    </View>
                                    <View style={{ flex: 1, marginBottom: 10, }}>
                                        <InputText name="phone" value={phone} getData={this.getData} icon='phone'></InputText>
                                        <Error errorText={phoneErr}></Error>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 40 }}>
                                        <TouchableOpacity onPress={this.saveUpdate} style={styles.btnUpdate}>
                                            <Text style={{ color: '#616161' }}>Lưu</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      loginSuccessed: user => dispatch(userActions.loginSuccessed(user)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    gradient: {
        height: 170,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    rowContainer: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        paddingLeft: 5
    },
    name: {
        fontSize: 20
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        fontSize: 15
    },
    btnUpdate: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F2A90F',
        backgroundColor: '#F2A90F'
    },
})
