import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { fcmService } from '../FCMService'
import { Navigation } from 'react-native-navigation';
import { localNotificationService } from '../LocalNotificationService'

export default class SplashScreen extends Component {

    componentDidMount() {
        // Register FCM Service
        fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
        // Configure notification options
        localNotificationService.configure(this.onOpenNotification)
    }

    // NOTIFICATION SETUP
    onRegister = (token) => {
        console.log("Splash -> onRegister -> token", token);
    }

    onNotification = (notify) => {
        console.log('hihi')
        const options = {
            playSound: true
        }
        localNotificationService.showNotification(
            0,
            notify.title,
            notify.body,
            notify,
            options
        )
    }

    onOpenNotification = (notification) => {
        console.log("SplashScreen -> onOpenNotification -> notification", notification)
    }

    render() {
        return (
            <View>
                <Text>Splash Screen</Text>
            </View>
        )
    }
}