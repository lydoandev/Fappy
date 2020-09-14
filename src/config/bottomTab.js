export const 
    sideMenu =  {
      left: {
        component: {
          name: 'SideMenu',
        }
      },
      center: {  
        bottomTabs: {
          options: {
            bottomTabs: {
              animate: false,
            },
          },
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'MainScreen',
                      options: {
                        topBar: {
                          title: {
                            text: 'Trang chủ',
                          },
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    animate: false,
                    icon: require('../assets/image/home.png'),
                    text: 'Trang chủ',
                    selectedTextColor: '#DAA520',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'OrderList',
                      options: {
                        topBar: {
                          title: {
                            text: 'Thông báo',
                          },
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    animate: false,
                    icon: require('../assets/image/notifi.png'),
                    text: 'Thông báo',
                    selectedTextColor: '#DAA520',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'ProductList',
                      options: {
                        topBar: {
                          title: {
                            text: 'Sản phẩm',
                          },
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    animate: false,
                    icon: require('../assets/image/cart-icon.png'),
                    text: 'Sản phẩm',
                    selectedTextColor: '#DAA520',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'OrderList',
                      options: {
                        topBar: {
                          title: {
                            text: 'Đơn hàng',
                          },
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    animate: false,
                    icon: require('../assets/image/order.png'),
                    text: 'Đơn hàng',
                    selectedTextColor: '#DAA520',
                  },
                },
              },
            },
          ],
        },
      },
    }