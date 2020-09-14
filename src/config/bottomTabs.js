import Icon from 'react-native-vector-icons/AntDesign'

const getIcon = async (name, size) => {
    const source = await Icon.getImageSource(name, size)
    return source
}

export const sideMenu = {
    left: {
        component: {
            name: 'SideBar',
            options: {
                topBar: {
                    title: {
                        text: 'Thể loại',
                        alignment: 'center',
                    },
                },
            },
        },
        visible: true,
    },
    center: {

        stack: {
            children: [
                {
                    bottomTabs: {
                        children: [
                            {
                                component: {
                                    name: 'HomeScreen',
                                    options: {
                                        topBar: {
                                            visible: true,
                                            title: {
                                                text: 'FAPPY',
                                                alignment: 'center'
                                            },
                                            leftButtons: {
                                                id: 'SideBar',
                                                component: {
                                                    name: 'SideBar',
                                                },
                                                icon: {uri: "file:///data/data/com.fappy/cache/-1aabu5t_25@2x.png", scale: 2},
                                            },
                                        },
                                        bottomTab: {
                                            text: 'Trang Chủ',
                                            icon: require('../assets/icons/icon_home.png'),
                                            selectedIconColor: '#F2A90F',
                                        },
                                    },
                                },
                            },
                            {
                                component: {
                                    name: 'OrderScreen',
                                    options: {
                                        topBar: {
                                            visible: true,
                                            title: {
                                                text: 'Danh sách đơn hàng',
                                                alignment: 'center'
                                            },
                                        },
                                        bottomTab: {
                                            text: 'Đơn Hàng',
                                            icon: require('../assets/icons/icon_order.png'),
                                            selectedIconColor: '#F2A90F',
                                        },
                                    },
                                },
                            },
                            {
                                component: {
                                    id: 'NOTIFICATION',
                                    name: 'NotificationScreen',
                                    options: {
                                        topBar: {
                                            visible: true,
                                            title: {
                                                text: 'Thông báo',
                                                alignment: 'center'
                                            },
                                        },
                                        bottomTab: {
                                            text: 'Thông Báo',
                                            icon: require('../assets/icons/icon_notification.png'),
                                            selectedIconColor: '#F2A90F',
                                        },
                                    },
                                },
                            },
                            {
                                component: {
                                    name: 'ProfileScreen',
                                    options: {
                                        topBar: {
                                            visible: true,
                                            title: {
                                                text: 'Tài khoản',
                                                alignment: 'center'
                                            },
                                        },
                                        bottomTab: {
                                            text: 'Tài Khoản',
                                            icon: require('../assets/icons/icon_profile.png'),
                                            selectedIconColor: '#F2A90F',
                                        },
                                    },
                                },
                            },

                        ],
                        options: {
                            backgroundColor: 'white',
                            animate: false,
                            drawBehind: false,
                            titleDisplayMode: 'alwaysHide',
                            topBar: {
                                visible: false,
                            },
                        },
                    }
                }
            ]
        }
    }
}