import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Navigation } from "react-native-navigation"

import LogIn from './Login'
import Register from './Register'
import { sideMenu } from '../../config/bottomTabs'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    // componentDidUpdate(nextProps){
    //     if(this.props.data.isAuthenticated != nextProps.data.isAuthenticated){

    //     }
    // }
    changeState = () => {
        this.setState(prevState => ({
            ...prevState,
            isLogin: !prevState.isLogin
        }))
    }
    render() {
        const { isLogin, modalVisible } = this.state;
        const { isAuthenticated } = this.props.data;
        console.log("Is: ", isAuthenticated);
        
        if (isAuthenticated) {
            Navigation.setRoot({
                root: {
                    sideMenu
                }
            });
            return <></>;
        }
        return (
            <>
                {isLogin ? <LogIn changeState={this.changeState} login={this.login}></LogIn> : <Register changeState={this.changeState} register={this.register}></Register>}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.authReducer,
    };
}

export default connect(mapStateToProps, null)(Auth);
