import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/AntDesign'

export default function showModal(props, page, topBar, rightButton) {
    Promise.all([
        Icon.getImageSource('arrowleft', 25),
        Icon.getImageSource('delete', 25),
      ]).then((sources) => {
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
                                    icon: sources[0],
                                },
                            }
                        }
                    }
                }]
            }
        });
      }).catch(error => error);
    
}

export function showModalCart(props, page, topBar, rightButton) {
    Promise.all([
        Icon.getImageSource('arrowleft', 25),
        Icon.getImageSource('delete', 15),
      ]).then((sources) => {
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
                                    icon: sources[0],
                                },
                                rightButton: {
                                    id: 'deleteAll',
                                    icon: sources[1],
                                },
                            }
                        }
                    }
                }]
            }
        });
      }).catch(error => error);
    
}