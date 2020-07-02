import { Navigation } from 'react-native-navigation'

export default function showModal(props, page, topBar) {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: page,
                    passProps: {
                        ...props
                    },
                    options: {
                        topBar: {
                            ...topBar,
                            leftButtons: {
                                id: 'left',
                                icon: require('../assets/icons/icon_left.png'),
                            }
                        }
                    }
                }
            }]
        }
    });
}